import { motion } from 'framer-motion';
import { CAT_DATA, type CatChoice } from '@/lib/cats';

interface CatSelectionProps {
  onSelect: (cat: CatChoice) => void;
}

export function CatSelection({ onSelect }: CatSelectionProps) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 font-display">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Choose Your Star</h1>
        <p className="text-xl text-slate-300">Which cat will represent you today?</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {(Object.keys(CAT_DATA) as CatChoice[]).map((catId, index) => {
          const cat = CAT_DATA[catId];
          return (
            <motion.button
              key={catId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(catId)}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col items-center transition-colors hover:bg-white/20 group"
            >
              <div 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-4 flex items-center justify-center overflow-visible"
                style={{ backgroundColor: cat.color }}
              >
                <img 
                  src={cat.img} 
                  alt={cat.name}
                  className="w-[120%] h-[120%] object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{cat.name}</h2>
              <p className="text-sm text-slate-400 font-body">{cat.breed}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
