import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';

export const ClockApp: React.FC = () => {
  const { 
    isClockOpen, setIsClockOpen,
    pomodoroTime, setPomodoroTime,
    isTimerActive, setIsTimerActive
  } = useSentinel();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(pomodoroTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, pomodoroTime, setPomodoroTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isClockOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 pointer-events-none"
        >
          <div className="w-full max-w-sm liquid-glass-panel rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden pointer-events-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D95319] flex items-center justify-center text-white">
                  <Clock size={18} />
                </div>
                <h2 className="font-sans font-semibold text-xl text-stone-200">Axis Clock</h2>
              </div>
              <button 
                onClick={() => setIsClockOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 text-stone-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 text-center">
              <div className="text-7xl font-light tabular-nums text-stone-200 mb-8 tracking-tighter">
                {formatTime(pomodoroTime)}
              </div>
              
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setIsTimerActive(!isTimerActive)}
                  className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-stone-200 hover:bg-[#D95319] hover:text-white transition-all duration-300 shadow-xl"
                >
                  {isTimerActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <button 
                  onClick={() => { setIsTimerActive(false); setPomodoroTime(1500); }}
                  className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-stone-400 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <RotateCcw size={24} />
                </button>
              </div>
              
              <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold">
                Deep Work Protocol Active
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
