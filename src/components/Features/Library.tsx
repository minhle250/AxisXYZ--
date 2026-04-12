import React from 'react';
import { Brain, Scissors, Zap, Sparkles } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Library: React.FC = () => {
  const tools = [
    { id: 'recall', title: 'Active Recall', desc: 'Neural reinforcement via spaced repetition.', icon: Brain, color: 'text-emerald-400' },
    { id: 'cruncher', title: 'Cruncher', desc: 'First Principles extraction from raw data.', icon: Scissors, color: 'text-[#D95319]' },
    { id: 'drill', title: 'Drill Station', desc: 'High-intensity tactical problem sets.', icon: Zap, color: 'text-[#C5A059]' },
  ];

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <h2 className="font-sans font-semibold tracking-tight text-4xl text-stone-200">
        Private <span className="text-stone-500 italic">Library</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map(tool => (
          <div 
            key={tool.id} 
            className="liquid-glass-panel p-8 rounded-[2.5rem] hover:border-white/20 transition-all group text-left"
          >
            <div className={cn("w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", tool.color)}>
              <tool.icon size={24} />
            </div>
            <h3 className="text-lg font-sans font-semibold tracking-tight text-stone-200 mb-2">{tool.title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{tool.desc}</p>
            <button className="mt-8 w-full py-3 liquid-glass-panel rounded-xl text-[10px] uppercase tracking-widest text-stone-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2">
              Initialize <Sparkles size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
