import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, Play, Pause } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';

export const MusicApp: React.FC = () => {
  const { isMusicOpen, setIsMusicOpen, isMusicPlaying, setIsMusicPlaying } = useSentinel();

  return (
    <AnimatePresence>
      {isMusicOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 pointer-events-none"
        >
          <div className="w-full max-w-md liquid-glass-panel rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden pointer-events-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D95319] flex items-center justify-center text-white">
                  <Music size={18} />
                </div>
                <h2 className="font-sans font-semibold text-xl text-stone-200">Axis Music</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                  className="p-2 rounded-full hover:bg-white/5 text-[#D95319] transition-colors"
                >
                  {isMusicPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button 
                  onClick={() => setIsMusicOpen(false)}
                  className="p-2 rounded-full hover:bg-white/5 text-stone-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <iframe 
                data-testid="embed-iframe" 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/playlist/77KdzuXwL2mGhlcz0rWikj?utm_source=generator" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
