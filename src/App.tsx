import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SentinelProvider, useSentinel } from './context/SentinelContext';

// Components
import { MenuBar } from './components/Layout/MenuBar';
import { Sidebar } from './components/Layout/Sidebar';
import { DynamicIsland } from './components/UI/DynamicIsland';
import { Dock } from './components/UI/Dock';
import { AboutModal } from './components/UI/AboutModal';
import { HegemonyHub } from './components/Features/HegemonyHub';
import { Library } from './components/Features/Library';
import { Simulator } from './components/Features/Simulator';
import { Dispatcher } from './components/Features/Dispatcher';
import { MusicApp } from './components/Apps/MusicApp';
import { ClockApp } from './components/Apps/ClockApp';

const MainContent: React.FC = () => {
  const { activeMode, isAboutOpen, currentBgIndex, isFocusMode } = useSentinel();

  const WALLPAPERS = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000'
  ];

  return (
    <div className="min-h-screen text-stone-200 font-sans selection:bg-[#D95319] selection:text-white relative overflow-hidden">
      {/* BACKGROUND LAYER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${WALLPAPERS[currentBgIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10">
        <MenuBar />
        <DynamicIsland />
        
        <AnimatePresence>
          {isAboutOpen && <AboutModal />}
        </AnimatePresence>

        <MusicApp />
        <ClockApp />

        <div className="flex h-screen pt-8 overflow-hidden">
          {/* LEFT SIDEBAR */}
          <AnimatePresence>
            {/* Left sidebar is now hidden in all modes except maybe some special ones, 
                but user said "Only showing Right tab" for the main apps. 
                So we hide it for HOME, HEGEMONY, LIBRARY, SIMULATOR. */}
            {false && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Sidebar />
              </motion.div>
            )}
          </AnimatePresence>

          {/* CENTER STAGE */}
          <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
            <AnimatePresence mode="wait">
              {activeMode === 'HOME' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full w-full"
                />
              )}
            {activeMode === 'HEGEMONY' && <motion.div key="hegemony" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}><HegemonyHub /></motion.div>}
            {activeMode === 'LIBRARY' && <motion.div key="library" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}><Library /></motion.div>}
            {activeMode === 'SIMULATOR' && <motion.div key="simulator" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}><Simulator /></motion.div>}
          </AnimatePresence>
        </main>

        {/* RIGHT SIDEBAR */}
        <AnimatePresence>
          {(!isFocusMode && (activeMode === 'HEGEMONY' || activeMode === 'LIBRARY' || activeMode === 'SIMULATOR')) && (
            <motion.aside
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-[320px] liquid-glass flex flex-col p-6 shrink-0 m-4 rounded-3xl"
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                <h2 className="font-sans font-semibold tracking-tight text-3xl italic text-stone-200">Tactical Context</h2>
              </div>

              <div className="flex-1 flex flex-col gap-8 overflow-hidden">
                <Dispatcher />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* MACOS STYLE DOCK */}
        <Dock />
      </div>
    </div>
  </div>
  );
};

export default function App() {
  return (
    <SentinelProvider>
      <MainContent />
    </SentinelProvider>
  );
}
