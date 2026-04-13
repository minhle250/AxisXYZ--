import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, ListMusic, RefreshCw, ExternalLink } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';

export const MusicApp: React.FC = () => {
  const { 
    isMusicOpen, setIsMusicOpen, 
    currentTrack, setCurrentTrack 
  } = useSentinel();

  const tracks = [
    'Axis Radio - LoFi',
    'Deep Work - Ambient',
    'Neural Link - Synthwave',
    'Tactical Focus - Minimal'
  ];

  return (
    <AnimatePresence>
      {isMusicOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 pointer-events-none"
        >
          <div className="w-full max-w-6xl liquid-glass-panel rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden pointer-events-auto flex flex-col h-[90vh] md:h-[700px]">
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#D95319] flex items-center justify-center text-white shadow-lg shadow-[#D95319]/20">
                  <Music size={16} className="md:w-5 md:h-5" />
                </div>
                <div className="flex flex-col">
                  <h2 className="font-sans font-bold text-lg md:text-xl text-stone-200 tracking-tight leading-none">Axis Music</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[8px] uppercase tracking-[0.2em] text-stone-500 font-black truncate max-w-[150px]">Neural Sync: {currentTrack}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMusicOpen(false)}
                  className="p-2 md:p-3 rounded-full hover:bg-white/5 text-stone-600 hover:text-white transition-colors border border-white/5"
                >
                  <X size={18} className="md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Sidebar: Channel Selection */}
              <div className="w-full md:w-72 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-4 md:p-6 flex flex-col gap-4 md:gap-6 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-400">
                    <ListMusic size={14} />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Neural Channels</span>
                  </div>
                  <RefreshCw size={12} className="text-stone-600" />
                </div>
                
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 no-scrollbar">
                  {tracks.map(track => (
                    <button
                      key={track}
                      onClick={() => setCurrentTrack(track)}
                      className={`shrink-0 md:shrink-1 w-48 md:w-full p-3 md:p-4 rounded-xl md:rounded-2xl text-left transition-all border flex items-center justify-between group ${
                        currentTrack === track 
                          ? 'bg-[#D95319]/10 border-[#D95319]/30 text-white' 
                          : 'bg-white/5 border-transparent text-stone-500 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <span className="text-[10px] md:text-[11px] font-bold tracking-tight">{track}</span>
                      {currentTrack === track && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="w-1.5 h-1.5 bg-[#D95319] rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="hidden md:block mt-auto p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[9px] text-stone-500 leading-relaxed">
                    Select a neural channel to synchronize the Dynamic Island with your current focus vibe.
                  </p>
                </div>
              </div>

              {/* Main Content: Expanded Spotify */}
              <div className="flex-1 bg-black/60 p-4 md:p-6 flex flex-col relative">
                <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10">
                  <a 
                    href="https://open.spotify.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all"
                  >
                    Spotify <ExternalLink size={10} className="md:w-3 md:h-3" />
                  </a>
                </div>
                
                <div className="flex-1 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-stone-900/50">
                  <iframe 
                    data-testid="embed-iframe" 
                    src="https://open.spotify.com/embed/playlist/77KdzuXwL2mGhlcz0rWikj?utm_source=generator" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    allowFullScreen={true} 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="opacity-95 hover:opacity-100 transition-opacity duration-500"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
