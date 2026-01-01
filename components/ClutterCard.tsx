
import React from 'react';
import { ClutterTask } from '../types';

interface ClutterCardProps {
  task: ClutterTask;
  index: number;
}

const ClutterCard: React.FC<ClutterCardProps> = ({ task, index }) => {
  const priorityColors = {
    High: 'bg-rose-100 text-rose-700 border-rose-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-bold px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
          {task.priority} Priority
        </span>
        <span className="text-slate-400 text-xs font-medium">#{index + 1}</span>
      </div>
      
      <h3 className="font-bold text-lg text-slate-800 mb-1">{task.item}</h3>
      <p className="text-sm text-slate-500 mb-4 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        Currently: {task.location}
      </p>

      <div className="space-y-3">
        <div className="p-3 bg-slate-50 rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Observation</p>
          <p className="text-sm text-slate-700 italic">"{task.problem}"</p>
        </div>

        <div>
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">AI Recommendation</p>
          <p className="text-sm text-slate-800 font-medium">{task.suggestion}</p>
        </div>

        {task.shoppingRecommendation && (
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center text-indigo-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span className="text-xs font-bold uppercase">Pro Tip: {task.shoppingRecommendation}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClutterCard;
