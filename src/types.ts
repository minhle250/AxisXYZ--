/**
 * [KERNEL] CORE DATA STRUCTURES
 * Axis XYZ-Sigma Validation: STRICT
*/
import React from 'react';

// [NEW] Elite Epistemology Types
export interface Principle {
  name: string;
  explanation: string;
  formula?: string;
}

export interface EliteSubject {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  status: string;
  foundation: {
    title: string;
    content: string;
    principles: Principle[];
  };
}

// [LEGACY RESTORED] Bắt buộc phải giữ để không sập constants.ts
export interface TacticalAsset {
  id: string;
  name: string;
  directive: string;
  description: string;
  longDescription?: string;
  strategicValue: number;
  category: 'Cognitive' | 'Operational' | 'Linguistic' | 'Physical';
  imageUrl: string;
  gallery?: string[];
  features: string[];
}

export interface StrategyBrief {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: React.ReactNode; 
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  triageStatus?: 'cleared' | 'rejected'; 
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'AUDITING', 
  ERROR = 'DISCREPANCY',
  SUCCESS = 'STREAMLINED'
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'product', product: TacticalAsset } 
  | { type: 'journal', article: StrategyBrief }
  | { type: 'checkout' };

// [NEW] Birkin Faubourg Layout Types
export interface TriptychLayoutProps {
  leftWing: React.ReactNode;
  centerStage: React.ReactNode;
  rightWing: React.ReactNode;
}

export interface DynamicHardwareProps {
  isExpanded: boolean;
  onToggle: () => void;
}
