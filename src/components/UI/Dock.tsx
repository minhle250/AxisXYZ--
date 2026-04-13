import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Shield, BookOpen, Terminal, Clock, FileText, Music } from 'lucide-react';
import { useSentinel, Mode } from '../../context/SentinelContext';

const DockItem = ({ app, mouseX, onClick }: { app: any, mouseX: any, onClick: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [44, 64, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button
      ref={ref as any}
      onClick={onClick}
      style={{ width, height: width }}
      className="liquid-glass-panel rounded-xl md:rounded-2xl flex items-center justify-center text-stone-200 hover:text-white transition-colors shadow-sm focus:outline-none"
    >
      <app.icon size={20} className="md:w-7 md:h-7" strokeWidth={1.5} />
    </motion.button>
  );
};

export const Dock: React.FC = () => {
  const context = useSentinel();
  const mouseX = useMotionValue(Infinity);

  const apps = [
    { icon: Shield, label: 'Hegemony', mode: 'HEGEMONY' as Mode },
    { icon: BookOpen, label: 'Library', mode: 'LIBRARY' as Mode },
    { icon: Terminal, label: 'Simulator', mode: 'SIMULATOR' as Mode },
    { icon: Clock, label: 'Clock', action: () => context.setIsClockOpen(true) },
    { icon: FileText, label: 'Notes', action: () => {} },
    { icon: Music, label: 'Music', action: () => context.setIsMusicOpen(true) },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]">
      <motion.div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="liquid-glass p-2 rounded-[24px] flex items-end gap-2 shadow-2xl border border-white/10"
      >
        {apps.map((app, i) => (
          <DockItem 
            key={i} 
            app={app} 
            mouseX={mouseX} 
            onClick={() => {
              if (app.mode) context.setActiveMode(app.mode);
              if (app.action) app.action();
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
