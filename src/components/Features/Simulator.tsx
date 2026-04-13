import React, { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Simulator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aspectRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new (GoogleGenAI as any)(import.meta.env.VITE_GEMINI_API_KEY || "");
      // Note: Image generation via GoogleGenAI might require specific models or setup not fully standard in all regions.
      // This is a placeholder for the user's original logic.
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      await model.generateContent(`Generate a visual simulation description for: ${prompt} with aspect ratio ${aspectRatio}`);
      
      // Since we can't actually generate images with the basic text model, we'll use a placeholder for the demo
      setImageUrl(`https://picsum.photos/seed/${encodeURIComponent(prompt)}/800/600`);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error generating simulation.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <h2 className="font-sans font-semibold tracking-tight text-4xl text-stone-200 mb-8">
        Visual <span className="text-stone-500 italic">Simulator</span>
      </h2>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 min-h-0 pb-20 lg:pb-0">
        <div className="flex flex-col gap-6 liquid-glass-panel p-6 rounded-3xl h-fit lg:h-full">
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-stone-500">Simulation Prompt</h3>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 liquid-glass-panel rounded-2xl p-4 text-sm focus:outline-none focus:border-[#D95319] transition-colors resize-none text-stone-200 custom-scrollbar"
              placeholder="Describe the visual simulation..."
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-stone-500">Aspect Ratio</h3>
            <div className="grid grid-cols-2 gap-2">
              {aspectRatios.map(ratio => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={cn(
                    "py-2 rounded-xl text-xs font-medium transition-colors",
                    aspectRatio === ratio 
                      ? "bg-[#D95319] text-white" 
                      : "liquid-glass-panel text-stone-400 hover:text-stone-200"
                  )}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="mt-auto w-full py-4 bg-[#D95319] hover:bg-[#D95319]/80 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
          >
            {isGenerating ? 'Rendering...' : 'Generate Simulation'}
          </button>
          
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
        </div>

        <div className="flex-1 liquid-glass-panel rounded-[3rem] overflow-hidden relative flex items-center justify-center p-8">
          {imageUrl ? (
            <img src={imageUrl} alt="Generated Simulation" className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" referrerPolicy="no-referrer" />
          ) : (
            <div className="text-center opacity-20">
              <Gamepad2 size={64} className="mx-auto mb-4 text-[#D95319] animate-pulse" />
              <p className="text-xs uppercase tracking-[0.5em] text-stone-500">Awaiting Simulation Parameters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
