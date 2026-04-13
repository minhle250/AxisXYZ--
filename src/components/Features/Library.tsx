import React, { useState } from 'react';
import { Sparkles, ArrowLeft, ExternalLink, Globe } from 'lucide-react';

interface Source {
  name: string;
  url: string;
  desc: string;
}

export const Library: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  const categories = [
    { 
      title: 'Geopolitics & Diplomacy', 
      sources: [
        { name: 'Foreign Affairs', url: 'https://www.foreignaffairs.com', desc: 'Council on Foreign Relations publication.' },
        { name: 'Chatham House', url: 'https://www.chathamhouse.org', desc: 'Royal Institute of International Affairs.' },
        { name: 'Brookings Institution', url: 'https://www.brookings.edu', desc: 'Public policy research organization.' }
      ]
    },
    { 
      title: 'Advanced Science & Tech', 
      sources: [
        { name: 'Nature Portfolio', url: 'https://www.nature.com', desc: 'Leading international weekly journal of science.' },
        { name: 'MIT Technology Review', url: 'https://www.technologyreview.com', desc: 'Authority on the future of technology.' },
        { name: 'ArXiv.org', url: 'https://arxiv.org', desc: 'Open-access archive for scholarly articles.' }
      ]
    },
    { 
      title: 'Finance & Global Markets', 
      sources: [
        { name: 'The Economist', url: 'https://www.economist.com', desc: 'Global news and analysis on business and finance.' },
        { name: 'Financial Times', url: 'https://www.ft.com', desc: 'International business news and insight.' },
        { name: 'IMF Data', url: 'https://www.imf.org/en/Data', desc: 'International Monetary Fund statistics.' }
      ]
    },
    { 
      title: 'Artificial Intelligence', 
      sources: [
        { name: 'OpenAI Research', url: 'https://openai.com/research', desc: 'Latest breakthroughs in AI safety and capabilities.' },
        { name: 'DeepMind Blog', url: 'https://deepmind.google/blog', desc: 'Research from Google DeepMind.' },
        { name: 'Stanford HAI', url: 'https://hai.stanford.edu', desc: 'Human-Centered Artificial Intelligence.' }
      ]
    }
  ];

  if (selectedSource) {
    return (
      <div className="animate-fade-in h-full flex flex-col space-y-6 pb-20">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setSelectedSource(null)}
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Library</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-stone-200 font-bold text-sm tracking-tight">{selectedSource.name}</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-widest font-black">Secure Neural Link</span>
            </div>
            <a 
              href={selectedSource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-stone-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <div className="flex-1 liquid-glass-panel rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative bg-stone-900/50 min-h-[600px]">
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="flex flex-col items-center gap-4 text-stone-700">
              <Globe size={48} className="animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Establishing Connection...</span>
            </div>
          </div>
          <iframe 
            src={selectedSource.url} 
            className="w-full h-full border-none opacity-95 hover:opacity-100 transition-opacity"
            title={selectedSource.name}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-12 pb-20 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
        <div>
          <h2 className="font-sans font-semibold tracking-tight text-4xl text-stone-200">
            Private <span className="text-stone-500 italic">Library</span>
          </h2>
          <p className="text-stone-500 text-sm mt-2 max-w-md uppercase tracking-widest font-bold">Strategic Intelligence & Mindset Growth</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="liquid-glass-panel px-4 py-2 rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-400/20">VERIFIED SOURCES</div>
          <div className="liquid-glass-panel px-4 py-2 rounded-full text-[10px] font-bold text-[#D95319] border border-[#D95319]/20">ACADEMIC GRADE</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="liquid-glass-panel p-8 rounded-[2.5rem] space-y-6">
            <h3 className="text-xs uppercase tracking-[0.3em] font-black text-stone-500 border-b border-white/5 pb-4">{cat.title}</h3>
            <div className="space-y-4">
              {cat.sources.map((source, sIdx) => (
                <button 
                  key={sIdx} 
                  onClick={() => setSelectedSource(source)}
                  className="w-full block group p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 text-left"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-stone-200 font-semibold group-hover:text-[#D95319] transition-colors">{source.name}</span>
                    <Sparkles size={14} className="text-stone-600 group-hover:text-[#D95319] transition-all" />
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">{source.desc}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
