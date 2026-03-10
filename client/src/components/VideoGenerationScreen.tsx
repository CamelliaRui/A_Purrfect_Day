import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAT_DATA, type CatChoice } from '@/lib/cats';
import {
  generateAllVideos,
  VIDEO_SCENES,
  type GeneratedVideos,
  type GenerationProgress,
} from '@/lib/videoGeneration';

const SCENE_LABELS: Record<string, string> = {
  title: 'Title Scene',
  commute: 'Morning Commute',
  brainstorm: 'Brainstorming',
  research: 'Deep Research',
  lab: 'Lab Meeting',
  gym: 'Gym Time',
  commuteHome: 'Commute Home',
  coding: 'Vibe Coding',
  reading: 'Bedtime Reading',
  sleep: 'Sweet Dreams',
  done: 'All done!',
};

interface Props {
  catId: CatChoice;
  onComplete: (videos: GeneratedVideos) => void;
  onSkip: () => void;
}

export function VideoGenerationScreen({ catId, onComplete, onSkip }: Props) {
  const cat = CAT_DATA[catId];
  const [progress, setProgress] = useState<GenerationProgress>({
    completed: 0,
    total: VIDEO_SCENES.length,
    currentScene: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGeneration = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const videos = await generateAllVideos(catId, setProgress);
      const generatedCount = Object.keys(videos).length;
      if (generatedCount === 0) {
        setError('No videos were generated. Check that the server is running and FAL_KEY is set.');
      } else {
        onComplete(videos);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const pct = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: cat.color }}
    >
      <motion.div
        className="max-w-lg w-full mx-4 bg-white rounded-3xl shadow-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Cat avatar */}
        <motion.div
          className="w-32 h-32 mx-auto mb-6 rounded-full overflow-visible flex items-center justify-center border-4 border-white shadow-lg"
          style={{ backgroundColor: cat.color }}
          animate={isGenerating ? { rotate: [0, -5, 5, -5, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <img src={cat.img} alt={cat.name} className="w-[110%] h-[110%] object-contain" />
        </motion.div>

        <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">
          {isGenerating ? `Generating ${cat.name}'s Videos...` : `Generate AI Videos for ${cat.name}`}
        </h2>

        {!isGenerating && !error && (
          <>
            <p className="text-slate-600 font-body mb-6">
              This will use Gemini Veo to create unique AI-generated video clips for each scene.
              It takes about 1-2 minutes per scene ({VIDEO_SCENES.length} scenes total).
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={startGeneration}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Generate Videos
              </button>
              <button
                onClick={onSkip}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
              >
                Skip (use static images)
              </button>
            </div>
          </>
        )}

        {isGenerating && (
          <div className="mt-4">
            {/* Progress bar */}
            <div className="w-full bg-slate-200 rounded-full h-3 mb-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-slate-500 font-mono">
              {progress.completed} / {progress.total} scenes
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={progress.currentScene}
                className="text-slate-700 font-body mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {SCENE_LABELS[progress.currentScene] || progress.currentScene}
              </motion.p>
            </AnimatePresence>
            {progress.error && (
              <p className="text-amber-600 text-sm mt-2">{progress.error}</p>
            )}
          </div>
        )}

        {error && !isGenerating && (
          <div className="mt-4">
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={startGeneration}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Retry
              </button>
              <button
                onClick={onSkip}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
              >
                Skip (use static images)
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
