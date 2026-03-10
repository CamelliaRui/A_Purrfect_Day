import { motion } from 'framer-motion';
import { sceneTransitions, containerVariants, itemVariants } from '@/lib/video';

export function SceneAchievements() {
  const achievements = [
    { title: "Bug Squashed", desc: "Fixed that weird null pointer exception in the lab code" },
    { title: "Gains Achieved", desc: "Hit a new PR on the bench press" },
    { title: "Research Read", desc: "Actually finished reading that 40-page paper" },
    { title: "Vibes Maintained", desc: "Coded for 3 hours straight with lofi beats" }
  ];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1E1B4B' }} // indigo-950
      {...sceneTransitions.scaleFade}
    >
      <div style={{ zIndex: 10, width: '90vw', padding: '0 2vw' }}>
        <motion.div 
          style={{
            textAlign: 'center',
            marginBottom: '3vh',
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 8vw, 9vw)',
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1.5vh',
          }}>
            Daily Achievements
          </h2>
          <p style={{
            fontSize: 'clamp(1.5rem, 3vw, 3vw)',
            color: '#c7d2fe',
            fontFamily: '"DM Sans", sans-serif',
          }}>
            Not a bad day's work for a cat!
          </p>
        </motion.div>

        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2vw',
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {achievements.map((item, idx) => (
            <motion.div 
              key={idx}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5vw',
                padding: '1.5vw',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
              variants={itemVariants}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.2vw',
              }}>
                <div style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.5vw)',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  width: '3vw',
                  height: '3vw',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 'bold',
                }}>
                  {idx + 1}
                </div>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 2vw, 2vw)',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '0.5vh',
                    fontFamily: '"Space Grotesk", sans-serif',
                  }}>{item.title}</h3>
                  <p style={{
                    fontSize: 'clamp(0.9rem, 1.3vw, 1.3vw)',
                    color: 'rgba(199, 210, 254, 0.8)',
                    fontFamily: '"DM Sans", sans-serif',
                  }}>{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <motion.div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '40%',
          height: '40%',
          backgroundColor: '#6366f1',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(100px)',
          opacity: 0.3,
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '40%',
          height: '40%',
          backgroundColor: '#ec4899',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          filter: 'blur(100px)',
          opacity: 0.3,
        }}></div>
      </motion.div>
    </motion.div>
  );
}
