import React from 'react';
import { MapPin } from 'lucide-react';

export default function Location({
  location,
  isActive = false,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
        isActive
          ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
          : 'bg-slate-900/60 border-white/10 hover:border-white/20 hover:bg-slate-800/60'
      }`}
    >
      <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-white'}`}>
        <MapPin className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate">
          {location.name}
        </h4>
        <p className="text-xs text-slate-400 truncate">
          {location.description}
        </p>
      </div>

      {isActive && (
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-900/50 px-2 py-0.5 rounded border border-cyan-500/30 shrink-0">
          CURRENT PATROL
        </span>
      )}
    </div>
  );
}
