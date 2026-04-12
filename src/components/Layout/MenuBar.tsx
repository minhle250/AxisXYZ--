import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, ZapOff } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';

export const MenuBar: React.FC = () => {
  const context = useSentinel();
  const [time, setTime] = useState(new Date());
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsAppleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-8 bg-transparent z-[100] flex items-center justify-between px-4 text-xs font-medium text-white/90">
      <div className="flex items-center gap-4">
        <div className="relative" ref={menuRef}>
          <span 
            className="font-bold text-sm cursor-pointer hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors" 
            onClick={() => setIsAppleMenuOpen(!isAppleMenuOpen)}
          >
            ✨
          </span>
          
          <AnimatePresence>
            {isAppleMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-full left-0 mt-1 w-56 liquid-glass-panel rounded-xl shadow-2xl border border-white/10 py-1 overflow-hidden"
              >
                <div 
                  className="px-4 py-1.5 hover:bg-[#D95319] hover:text-white cursor-pointer transition-colors"
                  onClick={() => {
                    context.setIsAboutOpen(true);
                    setIsAppleMenuOpen(false);
                  }}
                >
                  About This Axis XYZ-Sigma
                </div>
                <div className="h-px bg-white/10 my-1 mx-2" />
                <div 
                  className="px-4 py-1.5 opacity-50 cursor-not-allowed"
                >
                  System Preferences (Locked)
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="font-bold cursor-pointer hover:text-white" onClick={() => context.setActiveMode('HOME')}>Axis XYZ-Sigma</span>
        <span className="hidden md:inline cursor-pointer hover:text-white">File</span>
        <span className="hidden md:inline cursor-pointer hover:text-white">Edit</span>
        <span className="hidden md:inline cursor-pointer hover:text-white">View</span>
        <span className="hidden md:inline cursor-pointer hover:text-white">Window</span>
        <span className="hidden md:inline cursor-pointer hover:text-white">Help</span>
      </div>

      <div className="flex items-center gap-4">
        <Shield size={14} className="cursor-pointer hover:text-white" />
        <button 
          onClick={() => context.setIsFocusMode(!context.isFocusMode)}
          className="hover:text-white transition-colors"
        >
          {context.isFocusMode ? <Zap size={14} className="text-[#D95319]" /> : <ZapOff size={14} />}
        </button>
        <span className="tabular-nums">{time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </header>
  );
};
