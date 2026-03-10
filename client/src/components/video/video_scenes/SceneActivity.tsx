import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video';
import { CAT_DATA, type CatChoice } from '@/lib/cats';

// Backgrounds
import bgCommute from '@/assets/images/bg-commute.png';
import bgBrainstorm from '@/assets/images/bg-brainstorm.png';
import bgResearch from '@/assets/images/bg-research.png';
import bgLab from '@/assets/images/bg-lab.png';
import bgGym from '@/assets/images/bg-gym.png';
import bgCommuteHome from '@/assets/images/bg-commute-home.png';
import bgCoding from '@/assets/images/bg-coding.png';
import bgReading from '@/assets/images/bg-reading.png';
import bgSleep from '@/assets/images/bg-sleep.png';

const BACKGROUNDS: Record<string, string> = {
  commute: bgCommute,
  brainstorm: bgBrainstorm,
  research: bgResearch,
  lab: bgLab,
  gym: bgGym,
  commuteHome: bgCommuteHome,
  coding: bgCoding,
  reading: bgReading,
  sleep: bgSleep,
};

interface SceneActivityProps {
  catId: CatChoice;
  time: string;
  activity: string;
  description?: string;
  color?: string;
  align?: 'left' | 'right';
  sceneContext: string;
  videoUrl?: string;
}

export function SceneActivity({
  catId,
  time,
  activity,
  description,
  color = '#F8FAFC',
  align = 'left',
  sceneContext,
  videoUrl
}: SceneActivityProps) {
  const isLeft = align === 'left';
  const cat = CAT_DATA[catId];
  const bgImage = BACKGROUNDS[sceneContext] || bgCommute;

  return (
    <motion.div
      className="absolute inset-0 flex items-center overflow-hidden"
      style={{ backgroundColor: color }}
      {...sceneTransitions.slideUp}
    >
      {/* Abstract Background Layer */}
      <motion.div
        className="absolute inset-0 z-0 opacity-30"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4 }}
      >
        <img src={bgImage} alt="Background" className="w-full h-full object-cover blur-sm" />
      </motion.div>

      <div className={`z-10 w-full max-w-[90vw] mx-auto px-[4vw] flex items-center gap-[4vw] ${isLeft ? '' : 'flex-row-reverse'}`}>

        {/* Image/Video Side */}
        <motion.div
          className="w-[45vw] flex justify-center items-center"
          initial={{ opacity: 0, x: isLeft ? -50 : 50, rotate: isLeft ? -5 : 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        >
          <div className="relative w-full aspect-[4/3]">
            {/* The actual generated background context */}
            <div className="absolute inset-0 bg-white rounded-[2vw] transform rotate-3 scale-105 shadow-xl opacity-50"></div>
            <div className="relative w-full h-full rounded-[2vw] shadow-2xl overflow-hidden bg-slate-200">
               {videoUrl ? (
                 <video
                   src={videoUrl}
                   autoPlay
                   loop
                   muted
                   playsInline
                   className="absolute inset-0 w-full h-full object-cover"
                 />
               ) : (
                 <>
                   <img src={bgImage} alt="Scene Context" className="absolute inset-0 w-full h-full object-cover" />
                   <motion.img
                     src={cat.img}
                     alt={cat.name}
                     className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] object-contain drop-shadow-2xl"
                     initial={{ y: 50, rotate: -10 }}
                     animate={{ y: 0, rotate: 0 }}
                     transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
                   />
                 </>
               )}
            </div>
          </div>
        </motion.div>

        {/* Text Side */}
        <div className="w-[40vw] flex flex-col bg-white/80 backdrop-blur-md p-[3vw] rounded-[2vw] shadow-xl border border-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="inline-block px-[1.5vw] py-[0.5vw] rounded-full bg-slate-900 text-white font-mono font-bold mb-[1.5vw]" style={{ fontSize: 'clamp(1rem, 1.5vw, 2rem)' }}>
              {time}
            </div>
            <h2 className="font-display font-bold text-slate-900 mb-[1.5vw] leading-tight" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 6rem)' }}>
              {activity}
            </h2>
            {description && (
              <p className="text-slate-700 font-body leading-relaxed" style={{ fontSize: 'clamp(1.2rem, 2vw, 3rem)' }}>
                {description}
              </p>
            )}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
