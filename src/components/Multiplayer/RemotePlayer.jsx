import React from 'react';
import NPCCharacter from '../NPC/NPCCharacter';

/**
 * RemotePlayer
 * Renders another player in the multiplayer campus room.
 * Displays their customized character sprite, nameplate badge, and live chat speech bubble.
 */
export default function RemotePlayer({ player, onClick }) {
  if (!player) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(player);
      }}
      className="absolute bottom-10 flex flex-col items-center pointer-events-auto cursor-pointer transition-all duration-150 ease-out z-30 group"
      style={{
        left: `${player.x || 300}px`,
        transform: 'translateX(-50%)'
      }}
      title={`Click to interact with ${player.name || 'Friend'}`}
    >
      {/* Live Speech Bubble */}
      {player.chatBubble && (
        <div className="mb-2.5 max-w-[220px] bg-slate-900/95 border-2 border-cyan-400 text-white font-bold text-xs px-3 py-2 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)] relative text-center animate-pop">
          <span className="text-[10px] text-cyan-300 font-mono block border-b border-white/10 pb-0.5 mb-1">
            {player.name || 'Friend'}
          </span>
          "{player.chatBubble}"
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45 border-r-2 border-b-2 border-cyan-400" />
        </div>
      )}

      {/* Nameplate Badge */}
      <div className="mb-1 bg-slate-950/90 border border-white/15 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow group-hover:border-cyan-400 transition-colors">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-bold text-white tracking-wide">
          {player.name || 'Student'}
        </span>
        {player.isHost && (
          <span className="text-[8px] font-mono text-amber-300 bg-amber-950/80 px-1 rounded border border-amber-500/30">
            HOST
          </span>
        )}
      </div>

      {/* Character Sprite */}
      <div className="transform group-hover:scale-105 transition-transform">
        <NPCCharacter
          size="lg"
          avatar={player.avatar || { gender: 'boy' }}
          state={player.walking ? 'WALK' : 'IDLE'}
          facing={player.facing || 'right'}
        />
      </div>
    </div>
  );
}
