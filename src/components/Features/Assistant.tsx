import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Sparkles, Send } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';
import { GeminiService } from '../../services/GeminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Assistant: React.FC = () => {
  const context = useSentinel();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    if (context.fatigueLevel > 90) {
      setMessages(prev => [...prev, { role: 'ai', text: "[MELTDOWN_RULE]: Fatigue critical. Tactical operations suspended. Rest required." }]);
      setLoading(false);
      return;
    }

    const response = await GeminiService.generateText(userMsg, "You are TIFFANY, a Strategic Intel Officer. Be candid, sharp, and zero moralizing.");
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <h3 className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold flex items-center gap-2">
          <Terminal size={12} /> Strategic Intel Officer
        </h3>
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center py-10 opacity-30">
            <Sparkles size={32} className="mx-auto mb-2 text-stone-500" />
            <p className="text-[10px] uppercase tracking-widest">Awaiting Command</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "p-3 rounded-xl text-xs leading-relaxed",
            m.role === 'user' ? "liquid-glass-panel ml-8" : "liquid-glass-panel border border-[#D95319]/20 mr-8 text-stone-300"
          )}>
            <span className="block text-[8px] uppercase tracking-widest text-stone-500 mb-1">
              {m.role === 'user' ? 'Operator' : 'Tiffany'}
            </span>
            {m.text}
          </div>
        ))}
        {loading && <div className="text-[10px] animate-pulse text-stone-500">PROCESSING...</div>}
      </div>

      <div className="relative">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="SEND DIRECTIVE..."
          className="w-full liquid-glass-panel rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#D95319] transition-colors text-stone-200"
        />
        <button 
          onClick={handleSend}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 hover:text-[#D95319]"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
