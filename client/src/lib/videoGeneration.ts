import { CAT_DATA, type CatChoice } from './cats';

const API_BASE = 'http://localhost:3001';

// All scene contexts that need video generation (excluding achievements which is text-only)
export const VIDEO_SCENES = [
  'title',
  'commute',
  'brainstorm',
  'research',
  'lab',
  'gym',
  'commuteHome',
  'coding',
  'reading',
  'sleep',
] as const;

export type SceneContext = (typeof VIDEO_SCENES)[number];

export interface GeneratedVideos {
  [sceneContext: string]: string; // sceneContext -> video URL
}

export interface GenerationProgress {
  completed: number;
  total: number;
  currentScene: string;
  error?: string;
}

/** Generate a video for a single scene */
async function generateSceneVideo(
  catId: CatChoice,
  sceneContext: string,
): Promise<string> {
  const cat = CAT_DATA[catId];
  const response = await fetch(`${API_BASE}/api/generate-video`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      catId,
      catBreed: cat.breed,
      sceneContext,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Video generation failed');
  }

  const data = await response.json();
  return `${API_BASE}${data.videoUrl}`;
}

const CONCURRENCY = 3; // Generate 3 scenes at a time

/** Generate videos for all scenes with parallel batches */
export async function generateAllVideos(
  catId: CatChoice,
  onProgress: (progress: GenerationProgress) => void
): Promise<GeneratedVideos> {
  const total = VIDEO_SCENES.length;
  const videos: GeneratedVideos = {};
  let completed = 0;

  // Process in batches of CONCURRENCY
  for (let i = 0; i < VIDEO_SCENES.length; i += CONCURRENCY) {
    const batch = VIDEO_SCENES.slice(i, i + CONCURRENCY);
    onProgress({ completed, total, currentScene: batch.join(', ') });

    const results = await Promise.allSettled(
      batch.map(async (scene) => {
        const url = await generateSceneVideo(catId, scene);
        return { scene, url };
      })
    );

    for (const result of results) {
      completed++;
      if (result.status === 'fulfilled') {
        videos[result.value.scene] = result.value.url;
      } else {
        const errorMsg = result.reason?.message || 'Unknown error';
        console.error(`Failed to generate video:`, errorMsg);
        onProgress({
          completed,
          total,
          currentScene: batch.join(', '),
          error: `Failed: ${errorMsg}`,
        });
      }
    }
  }

  onProgress({ completed: total, total, currentScene: 'done' });
  return videos;
}
