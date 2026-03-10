import { motion } from 'framer-motion';
import { 
  sceneTransitions, 
  elementAnimations, 
  charVariants, 
  charContainerVariants,
  staggerConfigs
} from '@/lib/video';
import catTitle from '@/assets/images/cat-title.png';

export function SceneTitle() {
  const titleText = "A Purrfect Day".split('');
  const subtitleText = "My Life as a Grad Student".split('');

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#FDF2F8' }} // pink-50
      {...sceneTransitions.fadeBlur}
    >
      {/* Background Image with blur */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40"
        initial={{ scale: 1.1, filter: 'blur(10px)' }}
        animate={{ scale: 1, filter: 'blur(5px)' }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        <img 
          src={catTitle} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center" style={{ width: '85vw', maxWidth: '90vw' }}>
        <motion.div 
          style={{
            width: '18vw',
            height: '18vw',
            borderRadius: '50%',
            overflow: 'hidden',
            borderWidth: '0.5vw',
            borderColor: 'white',
            marginBottom: '4vh',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
          {...elementAnimations.elasticScale}
        >
          <img 
            src={catTitle} 
            alt="Cat Title" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.h1 
          style={{
            fontSize: 'clamp(3rem, 10vw, 12vw)',
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#1e293b',
            marginBottom: '2vh',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}
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
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 5vw)',
            fontFamily: '"DM Sans", sans-serif',
            color: '#475569',
            fontWeight: 500,
          }}
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
