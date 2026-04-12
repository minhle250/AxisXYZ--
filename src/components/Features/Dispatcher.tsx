import React, { useState } from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { useSentinel } from '../../context/SentinelContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Dispatcher: React.FC = () => {
  const { 
    tasks, setTasks, addTask, deleteTask
  } = useSentinel();
  const [taskInput, setTaskInput] = useState('');

  const handleAddTask = () => {
    if (taskInput.trim()) {
      addTask(taskInput.trim());
      setTaskInput('');
    }
  };

  return (
    <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
      {/* Tasks Widget */}
      <div className="liquid-glass-panel rounded-[2.5rem] p-6">
        <h3 className="text-[10px] uppercase tracking-widest text-stone-500 mb-4">Tactical Tasks</h3>
        
        <div className="flex gap-2 mb-6">
          <input 
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="NEW TASK..."
            className="flex-1 liquid-glass-panel rounded-xl py-2 px-3 text-[10px] focus:outline-none focus:border-white/20 transition-colors text-stone-200"
          />
        </div>

        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="group flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button 
                  onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
                  className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0",
                    task.done ? "bg-emerald-400 border-emerald-400" : "border-white/20 hover:border-[#D95319]"
                  )}
                >
                  {task.done && <CheckCircle2 size={10} className="text-black" />}
                </button>
                <span className={cn("text-xs transition-all truncate", task.done ? "text-stone-600 line-through" : "text-stone-300")}>
                  {task.title}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="p-1 rounded hover:bg-red-500/10 text-stone-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
