// Video Template - Replace ReplitLoadingScene with your scenes

import { AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import type { CatChoice } from '@/lib/cats';

import { SceneTitle } from './video_scenes/SceneTitle';
import { SceneActivity } from './video_scenes/SceneActivity';
import { SceneAchievements } from './video_scenes/SceneAchievements';

const SCENE_DURATIONS = {
  title: 4000,
  commuteMorning: 3500,
  brainstorm: 3500,
  research: 3500,
  labMeeting: 3500,
  gym: 3500,
  commuteHome: 3500,
  vibeCoding: 3500,
  reading: 3500,
  sleep: 3500,
  achievements: 6000,
};

export default function VideoTemplate({ selectedCat }: { selectedCat: CatChoice }) {
  const { currentSceneKey } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <div
      className="overflow-hidden relative"
      style={{
        width: '100vw',
        height: '56.25vw', // 16:9 aspect ratio
        maxHeight: '100vh',
        maxWidth: 'calc(100vh * 16 / 9)',
        backgroundColor: 'var(--color-bg-dark)',
        margin: '0 auto',
      }}
    >
      <AnimatePresence mode="wait">
        {currentSceneKey === 'title' && <SceneTitle key="title" catId={selectedCat} />}
        
        {currentSceneKey === 'commuteMorning' && (
          <SceneActivity 
            key="commuteMorning" 
            catId={selectedCat}
            time="08:30 AM"
            activity="Morning Commute"
            description="Heading to campus on the train. A quick power nap before the day begins."
            color="#FFFBEB"
            align="left"
            sceneContext="commute"
          />
        )}

        {currentSceneKey === 'brainstorm' && (
          <SceneActivity 
            key="brainstorm" 
            catId={selectedCat}
            time="10:00 AM"
            activity="Brainstorming"
            description="Figuring out the architecture. Sticky notes everywhere."
            color="#F0FDF4"
            align="right"
            sceneContext="brainstorm"
          />
        )}

        {currentSceneKey === 'research' && (
          <SceneActivity 
            key="research" 
            catId={selectedCat}
            time="11:30 AM"
            activity="Deep Research"
            description="Reading papers and writing code. Do not disturb!"
            color="#EFF6FF"
            align="left"
            sceneContext="research"
          />
        )}

        {currentSceneKey === 'labMeeting' && (
          <SceneActivity 
            key="labMeeting" 
            catId={selectedCat}
            time="02:00 PM"
            activity="Lab Meeting"
            description="Presenting my findings to the group. They seem impressed (I hope)."
            color="#FAF5FF"
            align="right"
            sceneContext="lab"
          />
        )}

        {currentSceneKey === 'gym' && (
          <SceneActivity 
            key="gym" 
            catId={selectedCat}
            time="05:30 PM"
            activity="Gym Time"
            description="Lifting tiny dumbbells to maintain peak feline performance."
            color="#FEF2F2"
            align="left"
            sceneContext="gym"
          />
        )}

        {currentSceneKey === 'commuteHome' && (
          <SceneActivity 
            key="commuteHome" 
            catId={selectedCat}
            time="07:00 PM"
            activity="Commute Home"
            description="Watching the sunset on the train ride back. It was a good day."
            color="#FFF7ED"
            align="right"
            sceneContext="commuteHome"
          />
        )}

        {currentSceneKey === 'vibeCoding' && (
          <SceneActivity 
            key="vibeCoding" 
            catId={selectedCat}
            time="08:30 PM"
            activity="Vibe Coding"
            description="Headphones on, RGB lights on, building cool stuff."
            color="#F8FAFC"
            align="left"
            sceneContext="coding"
          />
        )}

        {currentSceneKey === 'reading' && (
          <SceneActivity 
            key="reading" 
            catId={selectedCat}
            time="10:30 PM"
            activity="Bedtime Reading"
            description="Winding down with a good book in my cozy bed."
            color="#FDF4FF"
            align="right"
            sceneContext="reading"
          />
        )}

        {currentSceneKey === 'sleep' && (
          <SceneActivity 
            key="sleep" 
            catId={selectedCat}
            time="11:30 PM"
            activity="Zzzzz..."
            description="Dreaming of infinite treats and zero bugs."
            color="#F1F5F9"
            align="left"
            sceneContext="sleep"
          />
        )}

        {currentSceneKey === 'achievements' && <SceneAchievements key="achievements" catId={selectedCat} />}

      </AnimatePresence>
    </div>
  );
}
