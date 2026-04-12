import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

export type Mode = 'HOME' | 'HEGEMONY' | 'LIBRARY' | 'SIMULATOR';

export interface Note {
  id: string;
  content: string;
  timestamp: number;
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export interface SentinelContextType {
  activeMode: Mode;
  setActiveMode: (m: Mode) => void;
  fatigueLevel: number;
  setFatigueLevel: (n: number) => void;
  notes: Note[];
  addNote: (content: string) => void;
  deleteNote: (id: string) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  pomodoroTime: number;
  setPomodoroTime: (n: number) => void;
  isTimerActive: boolean;
  setIsTimerActive: (v: boolean) => void;
  isProcessing: boolean;
  setIsProcessing: (v: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (v: boolean) => void;
  currentBgIndex: number;
  isFocusMode: boolean;
  setIsFocusMode: (v: boolean) => void;
  isMusicOpen: boolean;
  setIsMusicOpen: (v: boolean) => void;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (v: boolean) => void;
  isClockOpen: boolean;
  setIsClockOpen: (v: boolean) => void;
  triggerBayesianShock: () => void;
  resetFatigue: () => void;
}

const SentinelContext = createContext<SentinelContextType | undefined>(undefined);

const WALLPAPERS = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2000',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000'
];

export const useSentinel = () => {
  const context = useContext(SentinelContext);
  if (!context) throw new Error("useSentinel must be used within a SentinelProvider");
  return context;
};

export const SentinelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeMode, setActiveMode] = useState<Mode>('HOME');
  const [fatigueLevel, setFatigueLevel] = useState(24);
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('axis_notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('axis_tasks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Initialize Neural Link', done: true }
    ];
  });
  const [pomodoroTime, setPomodoroTime] = useState(1500);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isClockOpen, setIsClockOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('axis_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('axis_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % WALLPAPERS.length);
    }, 60000); // Change every minute
    return () => clearInterval(interval);
  }, []);

  const addNote = (content: string) => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      timestamp: Date.now()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      done: false
    };
    setTasks(prev => [...prev, newTask]);
  };

  const resetFatigue = () => setFatigueLevel(0);
  const triggerBayesianShock = () => setFatigueLevel(Math.min(100, fatigueLevel + 20));

  const contextValue = useMemo(() => ({
    activeMode, setActiveMode,
    fatigueLevel, setFatigueLevel,
    notes, addNote, deleteNote,
    tasks, setTasks, addTask, deleteTask,
    pomodoroTime, setPomodoroTime,
    isTimerActive, setIsTimerActive,
    isProcessing, setIsProcessing,
    isAboutOpen, setIsAboutOpen,
    currentBgIndex,
    isFocusMode, setIsFocusMode,
    isMusicOpen, setIsMusicOpen,
    isMusicPlaying, setIsMusicPlaying,
    isClockOpen, setIsClockOpen,
    triggerBayesianShock,
    resetFatigue
  }), [activeMode, fatigueLevel, notes, tasks, pomodoroTime, isTimerActive, isProcessing, isAboutOpen, currentBgIndex, isFocusMode, isMusicOpen, isMusicPlaying, isClockOpen]);

  return (
    <SentinelContext.Provider value={contextValue}>
      {children}
    </SentinelContext.Provider>
  );
};
