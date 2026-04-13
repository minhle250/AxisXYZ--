import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Gamepad2, Fingerprint } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className={cn(
        "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative",
        active 
          ? "text-stone-200" 
          : "text-stone-500 hover:text-stone-300 hover:bg-white/5"
      )}
    >
      {active && (
        <motion.div 
          layoutId="activeNavBackground" 
          className="absolute inset-0 liquid-glass-panel rounded-2xl shadow-lg" 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className={cn("transition-colors relative z-10", active ? "text-[#D95319]" : "group-hover:text-[#D95319]")}>{icon}</span>
      <span className="text-[11px] font-bold uppercase tracking-widest relative z-10">{label}</span>
    </button>
  );
}

export const Sidebar: React.FC = () => {
  const { activeMode, setActiveMode, fatigueLevel } = useSentinel();

  return (
    <aside className="w-[280px] liquid-glass flex flex-col p-6 shrink-0 m-4 rounded-3xl">
      <div className="flex flex-col items-center mb-12">
        <div className="w-16 h-16 liquid-glass-panel rounded-full flex items-center justify-center text-[#D95319] mb-4 shadow-xl overflow-hidden">
          <Fingerprint size={32} strokeWidth={1.5} />
        </div>
        <h1 className="font-sans font-semibold tracking-tight text-3xl italic text-stone-200 mb-1">Tiffany.</h1>
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">System Administrator</p>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem icon={<Shield size={16} />} label="Hegemony Hub" active={activeMode === 'HEGEMONY'} onClick={() => setActiveMode('HEGEMONY')} />
        <NavItem icon={<BookOpen size={16} />} label="Private Library" active={activeMode === 'LIBRARY'} onClick={() => setActiveMode('LIBRARY')} />
        <NavItem icon={<Gamepad2 size={16} />} label="Simulator" active={activeMode === 'SIMULATOR'} onClick={() => setActiveMode('SIMULATOR')} />
      </nav>

      <div className="mt-auto pt-8 border-t border-white/10 space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] uppercase tracking-widest text-stone-500">
            <span>Fatigue Level</span>
            <span>{fatigueLevel}%</span>
          </div>
          <div className="h-1 liquid-glass-panel rounded-full overflow-hidden">
            <div className="h-full bg-[#D95319]" style={{ width: `${fatigueLevel}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 liquid-glass-panel rounded-xl">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-stone-400">System Optimal</span>
        </div>
      </div>
    </aside>
  );
};
