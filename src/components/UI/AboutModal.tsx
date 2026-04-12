import React from 'react';
import { motion } from 'framer-motion';
import { useSentinel } from '../../context/SentinelContext';

export const AboutModal: React.FC = () => {
  const context = useSentinel();
  if (!context.isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-[600px] h-[400px] liquid-glass rounded-2xl shadow-2xl overflow-hidden flex border border-white/20"
      >
        {/* Sidebar */}
        <div className="w-[200px] bg-black/20 border-r border-white/10 p-4 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-4 overflow-hidden border-2 border-white/20 shadow-lg">
            <img 
              src="https://picsum.photos/seed/lanadelrey/200/200" 
              alt="Lana Del Rey" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-lg font-semibold text-white">Lana Del Rey</h2>
          <p className="text-xs text-white/50 mb-6">Administrator</p>
          
          <div className="w-full space-y-1">
            <div className="px-3 py-2 rounded-lg bg-white/10 text-sm text-white cursor-pointer">
              General
            </div>
            <div className="px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-white/70 cursor-pointer transition-colors">
              Displays
            </div>
            <div className="px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-white/70 cursor-pointer transition-colors">
              Storage
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 relative">
          <button 
            onClick={() => context.setIsAboutOpen(false)}
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <span className="text-3xl">✨</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Axis XYZ-Sigma</h1>
              <p className="text-sm text-white/60">Version 4.0.0 (Build 24A320)</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-[100px_1fr] gap-4 text-sm">
              <span className="text-white/50 text-right">Chip</span>
              <span className="text-white">Apple M4 Max</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 text-sm">
              <span className="text-white/50 text-right">Memory</span>
              <span className="text-white">128 GB</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 text-sm">
              <span className="text-white/50 text-right">Startup Disk</span>
              <span className="text-white">Macintosh HD</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 text-sm">
              <span className="text-white/50 text-right">Serial Number</span>
              <span className="text-white">C02XG0Y4JGH7</span>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors">
              System Report...
            </button>
            <button className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors">
              Software Update...
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
