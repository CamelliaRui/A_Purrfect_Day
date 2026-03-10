import { motion } from 'framer-motion';
import { 
  sceneTransitions, 
  elementAnimations, 
  charVariants, 
  charContainerVariants
} from '@/lib/video';
import { CAT_DATA, type CatChoice } from '@/lib/cats';
import bgTitle from '@/assets/images/bg-title.png';

interface SceneTitleProps {
  catId: CatChoice;
  videoUrl?: string;
}

export function SceneTitle({ catId, videoUrl }: SceneTitleProps) {
  const cat = CAT_DATA[catId];
  const titleText = `A Purrfect Day`.split('');
  const subtitleText = `With ${cat.name}`.split('');

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#FDF2F8' }} // pink-50
      {...sceneTransitions.fadeBlur}
    >
      {/* Background Image with blur */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-60"
        initial={{ scale: 1.1, filter: 'blur(10px)' }}
        animate={{ scale: 1, filter: 'blur(5px)' }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        <img 
          src={bgTitle} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center max-w-[80vw] text-center">
        <motion.div
          className="w-[18vw] h-[18vw] rounded-full overflow-hidden flex items-center justify-center border-8 border-white shadow-2xl mb-[4vw]"
          style={{ backgroundColor: cat.color }}
          {...elementAnimations.elasticScale}
        >
          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={cat.img}
              alt={cat.name}
              className="w-[110%] h-[110%] object-contain drop-shadow-xl -rotate-6"
            />
          )}
        </motion.div>

        <motion.h1 
          className="font-display font-black tracking-tight text-slate-900 mb-[2vw] drop-shadow-sm"
          style={{ fontSize: 'clamp(3rem, 7vw, 10rem)' }}
          variants={charContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {titleText.map((char, i) => (
            <motion.span key={i} variants={charVariants} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          className="font-body text-slate-800 font-medium"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 4rem)' }}
          variants={charContainerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.8, staggerChildren: 0.02 }}
        >
          {subtitleText.map((char, i) => (
            <motion.span key={i} variants={charVariants} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </motion.div>
  );
}
