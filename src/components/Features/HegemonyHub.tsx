import React, { useState } from 'react';
import { ExternalLink, Trash2, Clock } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const HegemonyHub: React.FC = () => {
  const context = useSentinel();
  const [campaign, setCampaign] = useState<'HSGTP' | 'IELTS' | 'DGNL' | 'THPTQG'>('THPTQG');
  const [noteInput, setNoteInput] = useState('');

  const campaigns = {
    HSGTP: { topics: ['Advanced Mechanics', 'Quantum Theory', 'Thermodynamics'], links: ['https://wikipedia.org', 'https://arxiv.org'] },
    IELTS: { topics: ['Lexical Resource', 'Cohesion & Coherence', 'Grammatical Range'], links: ['https://ielts.org', 'https://cambridgeenglish.org'] },
    DGNL: { topics: ['Logical Reasoning', 'Data Analysis', 'General Knowledge'], links: ['https://vnexpress.net'] },
    THPTQG: { topics: ['Mathematics', 'Physics', 'English'], links: ['https://moet.gov.vn'] },
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' });
  };

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <h2 className="font-sans font-semibold tracking-tight text-4xl text-stone-200 mb-8">
        Hegemony <span className="text-stone-500 italic">Hub</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="liquid-glass-panel p-6 rounded-3xl">
          <h3 className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-6">Tactical Campaigns</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(campaigns).map(c => (
              <button
                key={c}
                onClick={() => setCampaign(c as any)}
                className={cn(
                  "py-4 rounded-2xl text-[10px] font-bold tracking-widest transition-all",
                  campaign === c ? "bg-[#D95319] text-white shadow-lg" : "liquid-glass-panel text-stone-500 hover:text-stone-300"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-[#C5A059]">Core Patterns</h4>
            <div className="space-y-2">
              {campaigns[campaign].topics.map((t, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-stone-400">
                  <div className="w-1 h-1 bg-[#D95319] rounded-full" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="liquid-glass-panel p-6 rounded-3xl">
          <h3 className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-6">Weaponized Links</h3>
          <div className="grid grid-cols-1 gap-3">
            {campaigns[campaign].links.map((link, i) => (
              <a 
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 liquid-glass-panel rounded-2xl hover:border-[#C5A059] transition-all group"
              >
                <span className="text-xs text-stone-300 truncate">{link}</span>
                <ExternalLink size={14} className="text-stone-500 group-hover:text-[#C5A059]" />
              </a>
            ))}
          </div>
        </section>
      </div>

      <section className="liquid-glass-panel p-6 rounded-3xl">
        <h3 className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-6">Intel Input</h3>
        <div className="flex gap-4 mb-8">
          <input 
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="RECORD STRATEGIC NOTE..."
            className="flex-1 liquid-glass-panel rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-[#D95319] transition-colors text-stone-200"
          />
          <button 
            onClick={() => { if(noteInput) { context.addNote(noteInput); setNoteInput(''); } }}
            className="px-8 liquid-glass-panel text-stone-200 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-colors border border-white/10"
          >
            Record
          </button>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
            <Clock size={12} /> Recent Intel
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {context.notes.length === 0 ? (
              <div className="text-center py-8 opacity-20 text-xs uppercase tracking-widest">No intel recorded</div>
            ) : (
              context.notes.map(note => (
                <div key={note.id} className="group flex items-center justify-between p-4 liquid-glass-panel rounded-2xl hover:border-white/20 transition-all">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="text-sm text-stone-200 leading-relaxed">{note.content}</p>
                    <span className="text-[9px] text-stone-500 uppercase tracking-widest">{formatDate(note.timestamp)}</span>
                  </div>
                  <button 
                    onClick={() => context.deleteNote(note.id)}
                    className="ml-4 p-2 rounded-lg hover:bg-red-500/10 text-stone-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
