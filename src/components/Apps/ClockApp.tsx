import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Play, Pause, RotateCcw, AlertCircle, Zap, Target } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';

export const ClockApp: React.FC = () => {
  const { 
    isClockOpen, setIsClockOpen,
    pomodoroTime, setPomodoroTime,
    isTimerActive, setIsTimerActive,
    distractionCount, setDistractionCount,
    focusIntensity, setFocusIntensity
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
          <div className="w-full max-w-2xl liquid-glass-panel rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden pointer-events-auto flex flex-col md:flex-row h-[90vh] md:h-auto overflow-y-auto md:overflow-y-visible no-scrollbar">
            {/* Left Side: Timer */}
            <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
              <div className="flex items-center gap-3 mb-8 md:mb-12">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#D95319] flex items-center justify-center text-white shadow-lg shadow-[#D95319]/20">
                  <Clock size={16} className="md:w-5 md:h-5" />
                </div>
                <h2 className="font-sans font-bold text-xl md:text-2xl text-stone-200 tracking-tight">Axis Chronos</h2>
              </div>

              <div className="text-6xl md:text-8xl font-light tabular-nums text-stone-200 mb-8 md:mb-12 tracking-tighter drop-shadow-2xl">
                {formatTime(pomodoroTime)}
              </div>
              
              <div className="flex justify-center gap-4 md:gap-6">
                <button 
                  onClick={() => setIsTimerActive(!isTimerActive)}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center text-stone-200 hover:bg-[#D95319] hover:text-white transition-all duration-500 shadow-2xl group"
                >
                  {isTimerActive ? <Pause size={24} className="md:w-8 md:h-8" /> : <Play size={24} className="ml-1 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />}
                </button>
                <button 
                  onClick={() => { setIsTimerActive(false); setPomodoroTime(1500); setDistractionCount(0); }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center text-stone-400 hover:bg-white/10 hover:text-white transition-all duration-500"
                >
                  <RotateCcw size={20} className="md:w-7 md:h-7" />
                </button>
              </div>
            </div>

            {/* Right Side: Advanced Tools */}
            <div className="w-full md:w-72 bg-black/20 p-8 flex flex-col gap-8">
              <div className="flex justify-between items-start">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-600">Focus Protocol</h3>
                <button 
                  onClick={() => setIsClockOpen(false)}
                  className="p-2 rounded-full hover:bg-white/5 text-stone-600 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Intensity Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <Zap size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Intensity</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['LOW', 'MED', 'HIGH'] as const).map(level => (
                    <button
                      key={level}
                      onClick={() => setFocusIntensity(level)}
                      className={`py-2 rounded-xl text-[9px] font-black transition-all border ${
                        focusIntensity === level 
                          ? 'bg-[#D95319]/20 border-[#D95319] text-[#D95319]' 
                          : 'bg-white/5 border-transparent text-stone-600 hover:border-white/10'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distraction Tracker */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Distractions</span>
                </div>
                <div className="liquid-glass-panel p-4 rounded-2xl flex items-center justify-between">
                  <span className="text-2xl font-light text-stone-200">{distractionCount}</span>
                  <button 
                    onClick={() => setDistractionCount(distractionCount + 1)}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-stone-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
                  >
                    <AlertCircle size={18} />
                  </button>
                </div>
              </div>

              {/* Session Goal */}
              <div className="space-y-4 mt-auto">
                <div className="flex items-center gap-2 text-stone-400">
                  <Target size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Session Goal</span>
                </div>
                <div className="text-[11px] text-stone-500 leading-relaxed italic">
                  "The only way to do great work is to love what you do."
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
