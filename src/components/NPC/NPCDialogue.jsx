import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function NPCDialogue({
  speaker = 'NPC',
  text = '',
  className = '',
  onClick,
  showIcon = true
}) {
  if (!text) return null;

  return (
    <div
      onClick={onClick}
      className={`relative max-w-md bg-slate-950/90 backdrop-blur-md border-2 border-amber-500/50 rounded-2xl p-4 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pop cursor-pointer hover:border-amber-400 transition-all ${className}`}
    >
      {/* Little speech arrow */}
      <div className="absolute -bottom-2.5 left-8 w-4 h-4 bg-slate-950 border-r-2 border-b-2 border-amber-500/50 rotate-45 transform" />

      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
        <div className="flex items-center gap-2">
          {showIcon && <MessageSquare className="w-3.5 h-3.5 text-amber-400" />}
          <span className="font-retro text-[10px] text-amber-400 tracking-wider uppercase">
            {speaker}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          [Click to continue]
        </span>
      </div>

      <p className="text-sm text-slate-100 font-medium italic leading-relaxed">
        "{text}"
      </p>
    </div>
  );
}
