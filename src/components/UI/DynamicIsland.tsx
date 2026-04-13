import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Volume2, Music } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';
import { GeminiService } from '../../services/GeminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DynamicIsland: React.FC = () => {
  const context = useSentinel();
  const [isExpanded, setIsExpanded] = useState(false);

  const springConfig = { 
    type: "spring" as const, 
    stiffness: 500, 
    damping: 35, 
    mass: 0.8,
    restDelta: 0.001
  };

  const handleTTS = () => {
    if (context.notes.length > 0) {
      GeminiService.speak(context.notes[0].content);
    }
  };

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center pt-2 pointer-events-none">
      <motion.div 
        layout
        transition={springConfig}
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "overflow-hidden text-white relative shadow-2xl pointer-events-auto",
          isExpanded 
            ? "w-[90vw] md:w-[420px] rounded-[32px] md:rounded-[44px] p-4 md:p-6 cursor-default" 
            : "w-[180px] md:w-[220px] h-[32px] rounded-full flex items-center justify-center cursor-pointer"
        )}
        style={{
          background: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "0.5px solid rgba(255,255,255,0.12)"
        }}
        whileHover={!isExpanded ? { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } } : {}}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!isExpanded ? (
            <motion.div 
              key="collapsed"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)", transition: { duration: 0.01 } }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 0.8
              }}
              className="flex items-center justify-between w-full px-4 h-full"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                <span className="text-[9px] font-black tracking-[0.2em] uppercase opacity-60">{context.activeMode}</span>
              </div>
              
              {context.isMusicPlaying && (
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <Music size={10} className="text-[#D95319] animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-300">{context.currentTrack}</span>
                </div>
              )}

              <div className="flex items-center gap-1 h-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                    className="w-0.5 bg-[#D95319] rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="expanded"
              initial={{ opacity: 0, y: 10, filter: "blur(8px)", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: 10, filter: "blur(8px)", scale: 0.95, transition: { duration: 0.01 } }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 0.8
              }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div 
                    initial={{ rotate: -20, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D95319] to-[#C5A059] flex items-center justify-center shadow-xl border border-white/10"
                  >
                    {context.isMusicPlaying ? <Music size={24} className="text-white" /> : <Shield size={24} className="text-white" />}
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 mb-0.5">
                      {context.isMusicPlaying ? "Now Playing" : "Neural Link Active"}
                    </span>
                    <span className="text-base font-bold text-white tracking-tight">
                      {context.isMusicPlaying ? context.currentTrack : "Sentinel Directive"}
                    </span>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); handleTTS(); }}
                  className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/5 shadow-inner"
                >
                  <Volume2 size={20} className="text-[#C5A059]" />
                </motion.button>
              </div>
              
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-stone-300 leading-relaxed font-medium px-1"
              >
                {context.notes[0]?.content || "No active directives found in the neural link. System standing by."}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
