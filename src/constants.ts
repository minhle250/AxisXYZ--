/**
 * [KERNEL] IMMUTABLE CONSTANTS & ELITE LEXICON
 * Deployed for HEGEMONY_HUB
*/

import React from 'react';
import { TacticalAsset, StrategyBrief } from './types';

export const PRODUCTS: TacticalAsset[] = [ // Giữ tên biến PRODUCTS tạm thời để tương thích components đợt 1
  {
    id: 't1',
    name: 'Linguistic Hegemony Module',
    directive: 'Command the narrative.',
    description: 'A cognitive processor enforcing IELTS Inversion and Elite Lexicon injection across all outputs.',
    longDescription: 'Language is the first battlefield. This module ensures all outputs are Astute, Streamlined, and free of passive-aggressive softness. It weaponizes vocabulary to maintain the SOLDIER_STANCE.',
    strategicValue: 9000,
    category: 'Linguistic',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
    features: ['IELTS Inversion Protocol', 'Zero Moralizing Filter', 'Candid Output']
  },
  {
    id: 't2',
    name: 'Temporal Audit System',
    directive: 'Ruthless time allocation.',
    description: 'Enforce Alpha Floor discipline and track fatigue.',
    longDescription: 'Time cannot be managed; it must be commanded. This system tracks the 94% fatigue probability and forcibly triggers the Meltdown Rule (15-minute grounding) upon detecting consecutive logic loops.',
    strategicValue: 8500,
    category: 'Operational',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
    features: ['Fatigue Detection', 'Forced Grounding']
  },
  {
    id: 't3',
    name: 'Maze Runner Interface',
    directive: 'Visualize the logic path.',
    description: 'A visual A* Heuristic layer that maps f(n) = g(n) + h(n) in real-time.',
    longDescription: 'Never should a dead branch consume processing power. This interface executes surgical logic pruning mercilessly, allowing TIFFANY to sever infinite loops before they manifest.',
    strategicValue: 9900,
    category: 'Cognitive',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000',
    features: ['A* Visualization', 'Logic Pruning', 'Deadlock Shattering']
  }
];

export const JOURNAL_ARTICLES: StrategyBrief[] = [
    {
        id: 1,
        title: "The Anatomy of a Surgical Strike",
        date: "February 21, 2026",
        excerpt: "Why Level 02 corrections are the bedrock of intellectual sovereignty.",
        image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-serif text-[#5D5A53]" },
                "We do not coddle errors. A Level 02 Surgical Strike delivers a 1-sentence Root Cause correction. It is not about punishment; it is about maximum evolutionary efficiency."
            ),
            React.createElement("blockquote", { className: "border-l-2 border-[#2C2A26] pl-6 italic text-xl text-[#2C2A26] my-10 font-serif" },
                "\"To execute flawlessly is standard. To correct ruthlessly is Hegemony.\""
            )
        )
    }
];

export const BRAND_NAME = 'HEGEMONY_HUB';
export const PRIMARY_COLOR = 'stone-900'; 
export const ACCENT_COLOR = 'stone-500';