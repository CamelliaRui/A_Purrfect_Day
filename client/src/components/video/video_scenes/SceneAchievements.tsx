import { motion } from 'framer-motion';
import { sceneTransitions, containerVariants, itemVariants } from '@/lib/video';
import { CAT_DATA, type CatChoice } from '@/lib/cats';

interface SceneAchievementsProps {
  catId: CatChoice;
}

export function SceneAchievements({ catId }: SceneAchievementsProps) {
  const cat = CAT_DATA[catId];
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
      <div className="z-10 w-full max-w-[80vw] px-[2vw]">
        <motion.div 
          className="text-center mb-[4vw]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center items-center gap-[2vw] mb-[2vw]">
             <img src={cat.img} alt={cat.name} className="w-[10vw] h-[10vw] object-contain drop-shadow-lg" />
             <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(3rem, 6vw, 8rem)' }}>
               {cat.name}'s Achievements
             </h2>
          </div>
          <p className="text-indigo-200 font-body" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 4rem)' }}>
            Not a bad day's work for a cat!
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-[2vw]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {achievements.map((item, idx) => (
            <motion.div 
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-[1.5vw] p-[2vw] border border-white/20"
              variants={itemVariants}
            >
              <div className="flex items-start gap-[1.5vw]">
                <div className="bg-indigo-500 text-white w-[4vw] h-[4vw] rounded-full flex items-center justify-center shrink-0 font-display font-bold" style={{ fontSize: 'clamp(1.5rem, 2vw, 3rem)' }}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-[0.5vw]" style={{ fontSize: 'clamp(1.5rem, 2vw, 3rem)' }}>{item.title}</h3>
                  <p className="text-indigo-100/80 leading-snug" style={{ fontSize: 'clamp(1rem, 1.5vw, 2.5rem)' }}>{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
      </motion.div>
    </motion.div>
  );
}
