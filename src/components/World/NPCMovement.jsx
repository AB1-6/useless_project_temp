import React from 'react';
import NPCCharacter from '../NPC/NPCCharacter';

export default function NPCMovement({
  x = 200,
  y = 200,
  sprite,
  state = 'IDLE',
  facing = 'right',
  actionLabel = '',
  speech = '',
  size = 'md'
}) {
  return (
    <div
      className="absolute transition-all duration-700 ease-in-out z-10 pointer-events-none flex flex-col items-center"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -85%)'
      }}
    >
      {/* Dynamic Speech Bubble */}
      {speech && (
        <div className="mb-2 max-w-[200px] bg-slate-950/95 border border-amber-400 rounded-xl px-3 py-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pop text-center">
          <p className="text-[11px] font-semibold text-amber-300 italic leading-snug">
            "{speech}"
          </p>
        </div>
      )}

      {/* Routine Action Overhead Label */}
      {actionLabel && !speech && (
        <div className="mb-1 bg-slate-900/80 border border-white/10 px-2 py-0.5 rounded-full text-[10px] font-mono text-cyan-300 whitespace-nowrap shadow">
          {actionLabel}
        </div>
      )}

      {/* NPC Sprite */}
      <NPCCharacter
        sprite={sprite}
        state={state}
        facing={facing}
        size={size}
      />
    </div>
  );
}
