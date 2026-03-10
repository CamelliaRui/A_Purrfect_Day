// Video Template - Replace ReplitLoadingScene with your scenes

import { AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';

import { SceneTitle } from './video_scenes/SceneTitle';
import { SceneActivity } from './video_scenes/SceneActivity';
import { SceneAchievements } from './video_scenes/SceneAchievements';

// Images
import catCommute from '@/assets/images/cat-commute.png';
import catBrainstorm from '@/assets/images/cat-brainstorm.png';
import catResearch from '@/assets/images/cat-research.png';
import catLab from '@/assets/images/cat-lab.png';
import catGym from '@/assets/images/cat-gym.png';
import catCommuteHome from '@/assets/images/cat-commute-home.png';
import catCoding from '@/assets/images/cat-coding.png';
import catReading from '@/assets/images/cat-reading.png';
import catSleep from '@/assets/images/cat-sleep.png';

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

export default function VideoTemplate() {
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
        {currentSceneKey === 'title' && <SceneTitle key="title" />}
        
        {currentSceneKey === 'commuteMorning' && (
          <SceneActivity 
            key="commuteMorning" 
            imageSrc={catCommute}
            time="08:30 AM"
            activity="Morning Commute"
            description="Heading to campus on the train. A quick power nap before the day begins."
            color="#FFFBEB" // amber-50
            align="left"
          />
        )}

        {currentSceneKey === 'brainstorm' && (
          <SceneActivity 
            key="brainstorm" 
            imageSrc={catBrainstorm}
            time="10:00 AM"
            activity="Brainstorming"
            description="Figuring out the architecture. Sticky notes everywhere."
            color="#F0FDF4" // green-50
            align="right"
          />
        )}

        {currentSceneKey === 'research' && (
          <SceneActivity 
            key="research" 
            imageSrc={catResearch}
            time="11:30 AM"
            activity="Deep Research"
            description="Reading papers and writing code. Do not disturb!"
            color="#EFF6FF" // blue-50
            align="left"
          />
        )}

        {currentSceneKey === 'labMeeting' && (
          <SceneActivity 
            key="labMeeting" 
            imageSrc={catLab}
            time="02:00 PM"
            activity="Lab Meeting"
            description="Presenting my findings to the group. They seem impressed (I hope)."
            color="#FAF5FF" // fuchsia-50
            align="right"
          />
        )}

        {currentSceneKey === 'gym' && (
          <SceneActivity 
            key="gym" 
            imageSrc={catGym}
            time="05:30 PM"
            activity="Gym Time"
            description="Lifting tiny dumbbells to maintain peak feline performance."
            color="#FEF2F2" // red-50
            align="left"
          />
        )}

        {currentSceneKey === 'commuteHome' && (
          <SceneActivity 
            key="commuteHome" 
            imageSrc={catCommuteHome}
            time="07:00 PM"
            activity="Commute Home"
            description="Watching the sunset on the train ride back. It was a good day."
            color="#FFF7ED" // orange-50
            align="right"
          />
        )}

        {currentSceneKey === 'vibeCoding' && (
          <SceneActivity 
            key="vibeCoding" 
            imageSrc={catCoding}
            time="08:30 PM"
            activity="Vibe Coding"
            description="Headphones on, RGB lights on, building cool stuff."
            color="#F8FAFC" // slate-50
            align="left"
          />
        )}

        {currentSceneKey === 'reading' && (
          <SceneActivity 
            key="reading" 
            imageSrc={catReading}
            time="10:30 PM"
            activity="Bedtime Reading"
            description="Winding down with a good book in my cozy bed."
            color="#FDF4FF" // fuchsia-50
            align="right"
          />
        )}

        {currentSceneKey === 'sleep' && (
          <SceneActivity 
            key="sleep" 
            imageSrc={catSleep}
            time="11:30 PM"
            activity="Zzzzz..."
            description="Dreaming of infinite treats and zero bugs."
            color="#F1F5F9" // slate-100
            align="left"
          />
        )}

        {currentSceneKey === 'achievements' && <SceneAchievements key="achievements" />}

      </AnimatePresence>
    </div>
  );
}
