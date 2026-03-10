import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fal } from '@fal-ai/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve generated videos as static files
const videosDir = path.join(__dirname, '..', 'generated_videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}
app.use('/videos', express.static(videosDir));

const falKey = process.env.FAL_KEY;
if (!falKey) {
  console.error('FAL_KEY environment variable is required');
  process.exit(1);
}

fal.config({ credentials: falKey });

// Cache: catId -> uploaded fal.ai image URL (resized)
const uploadedImageCache: Record<string, string> = {};

// Cat image paths (no-bg PNGs)
const CAT_IMAGES: Record<string, string> = {
  porky: path.join(__dirname, '..', 'client/src/assets/cats/porky-nobg.png'),
  doubao: path.join(__dirname, '..', 'client/src/assets/cats/doubao-nobg.png'),
  ricecake: path.join(__dirname, '..', 'client/src/assets/cats/ricecake-nobg.png'),
  wanwan: path.join(__dirname, '..', 'client/src/assets/cats/wanwan-nobg.png'),
  mochi: path.join(__dirname, '..', 'client/src/assets/cats/mochi-nobg.png'),
  mocha: path.join(__dirname, '..', 'client/src/assets/cats/mocha-nobg.png'),
};

/** Resize a cat PNG to max 1024px and convert to JPEG, then upload to fal storage */
async function getOrUploadCatImage(catId: string): Promise<string> {
  if (uploadedImageCache[catId]) {
    return uploadedImageCache[catId];
  }

  const srcPath = CAT_IMAGES[catId];
  if (!srcPath || !fs.existsSync(srcPath)) {
    throw new Error(`Cat image not found: ${catId}`);
  }

  // Resize to 1024px max dimension and convert to JPEG using sips (macOS built-in)
  const tmpPath = path.join(videosDir, `${catId}_resized.jpg`);
  execSync(`sips -Z 1024 -s format jpeg "${srcPath}" --out "${tmpPath}" 2>/dev/null`);

  const imageBuffer = fs.readFileSync(tmpPath);
  const blob = new Blob([imageBuffer], { type: 'image/jpeg' });
  const file = new File([blob], `${catId}.jpg`, { type: 'image/jpeg' });
  const url = await fal.storage.upload(file);

  // Clean up temp file
  fs.unlinkSync(tmpPath);

  console.log(`Uploaded resized image for ${catId}: ${url}`);
  uploadedImageCache[catId] = url;
  return url;
}

// Scene prompts — focused on action/setting, the cat appearance comes from the reference image
const SCENE_PROMPTS: Record<string, string> = {
  title: 'This cute cat posing proudly, looking at the camera with a gentle smile, soft pink background, studio lighting, adorable, slow gentle movement',
  commute: 'This cute cat sitting on a train seat looking out the window at a morning cityscape, cozy and sleepy, warm sunlight, gentle swaying motion',
  brainstorm: 'This cute cat sitting at a desk covered with sticky notes and papers, thinking hard, paw on chin, office setting, subtle head tilts',
  research: 'This cute cat wearing tiny glasses reading a book at a library desk, concentrated, surrounded by stacked books, page turning',
  lab: 'This cute cat standing at a whiteboard giving a presentation, confident pose, academic setting, gesturing with paw',
  gym: 'This cute cat lifting tiny dumbbells at a gym, determined expression, wearing a tiny headband, funny and adorable, repetitive lifting motion',
  commuteHome: 'This cute cat sitting by a train window watching a beautiful sunset, peaceful and content, golden hour lighting, gentle swaying',
  coding: 'This cute cat typing on a laptop in a dark room with RGB lights, wearing headphones, focused and cool, typing motion',
  reading: 'This cute cat curled up in a cozy bed reading a book, warm lamp light, bedtime, relaxed and sleepy, slow breathing',
  sleep: 'This cute cat sleeping peacefully in a fluffy bed, dreaming, moonlight, slow breathing, peaceful',
};

interface GenerateRequest {
  catId: string;
  catBreed: string;
  sceneContext: string;
}

app.post('/api/generate-video', async (req: any, res: any) => {
  const { catId, catBreed, sceneContext } = req.body as GenerateRequest;

  if (!catId || !catBreed || !sceneContext) {
    res.status(400).json({ error: 'Missing required fields: catId, catBreed, sceneContext' });
    return;
  }

  const promptTemplate = SCENE_PROMPTS[sceneContext] || SCENE_PROMPTS.title;
  const prompt = promptTemplate;

  try {
    console.log(`Generating video for ${catId} - ${sceneContext}...`);

    // Upload cat reference image (cached after first upload)
    const imageUrl = await getOrUploadCatImage(catId);

    const result = await fal.subscribe('fal-ai/kling-video/v2.1/standard/image-to-video', {
      input: {
        prompt,
        image_url: imageUrl,
        duration: '5',
        aspect_ratio: '16:9',
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_QUEUE') {
          console.log(`  [${sceneContext}] In queue...`);
        } else if (update.status === 'IN_PROGRESS') {
          console.log(`  [${sceneContext}] Generating...`);
        }
      },
    });

    const videoUrl = (result.data as any)?.video?.url;
    if (!videoUrl) {
      res.status(500).json({ error: 'No video URL in response' });
      return;
    }

    // Download and save locally
    const videoResponse = await fetch(videoUrl);
    const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());
    const filename = `${catId}_${sceneContext}_${Date.now()}.mp4`;
    const filepath = path.join(videosDir, filename);
    fs.writeFileSync(filepath, videoBuffer);

    console.log(`Video saved: ${filename}`);
    res.json({ videoUrl: `/videos/${filename}` });
  } catch (error: any) {
    console.error(`Error generating video for ${sceneContext}:`, error);
    res.status(500).json({ error: error.message || 'Video generation failed' });
  }
});

// Health check
app.get('/api/health', (_req: any, res: any) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
