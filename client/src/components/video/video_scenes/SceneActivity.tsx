import { motion } from 'framer-motion';
import { sceneTransitions, elementAnimations } from '@/lib/video';

interface SceneActivityProps {
  imageSrc: string;
  time: string;
  activity: string;
  description?: string;
  color?: string;
  align?: 'left' | 'right';
}

export function SceneActivity({ 
  imageSrc, 
  time, 
  activity, 
  description,
  color = '#F8FAFC', // slate-50
  align = 'left' 
}: SceneActivityProps) {
  const isLeft = align === 'left';

  return (
    <motion.div
      className="absolute inset-0 flex items-center overflow-hidden"
      style={{ backgroundColor: color }}
      {...sceneTransitions.slideUp}
    >
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4vw',
        padding: '0 6vw',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
      }}>
        
        {/* Image Side */}
        <motion.div 
          style={{
            width: '35vw',
            display: 'flex',
            justifyContent: 'center',
            order: isLeft ? 0 : 1,
          }}
          initial={{ opacity: 0, x: isLeft ? -50 : 50, rotate: isLeft ? -5 : 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        >
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'white',
              borderRadius: '2vw',
              transform: 'rotate(3deg) scale(1.05)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              opacity: 0.5,
            }}></div>
            <img 
              src={imageSrc} 
              alt={activity} 
              style={{
                position: 'relative',
                width: '35vw',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                borderRadius: '2vw',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                zIndex: 10,
              }}
            />
          </div>
        </motion.div>

        {/* Text Side */}
        <div style={{
          width: '40vw',
          display: 'flex',
          flexDirection: 'column',
          order: isLeft ? 1 : 0,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div style={{
              display: 'inline-block',
              padding: '0.8vh 1.5vw',
              borderRadius: '9999px',
              backgroundColor: '#1e293b',
              color: 'white',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(1rem, 1.5vw, 1.5vw)',
              fontWeight: 'bold',
              marginBottom: '2vh',
            }}>
              {time}
            </div>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 6vw)',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '2vh',
              lineHeight: 1.2,
            }}>
              {activity}
            </h2>
            {description && (
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 2.5vw)',
                color: '#475569',
                fontFamily: '"DM Sans", sans-serif',
                lineHeight: 1.6,
                maxWidth: '90%',
              }}>
                {description}
              </p>
            )}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
