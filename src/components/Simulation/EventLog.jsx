import React from 'react';
import { Scroll, Terminal } from 'lucide-react';
import GlassCard from '../UI/GlassCard';

export default function EventLog({ logs = [], className = '' }) {
  return (
    <GlassCard className={`p-4 flex flex-col h-64 ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>NPC Observability Feed</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          {logs.length} events logged
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 italic text-center p-4">
            Nothing is happening. Exactly as programmed.
          </div>
        ) : (
          logs.map((log) => {
            const typeStyles = {
              pot: 'text-rose-400 border-l-2 border-rose-500 bg-rose-500/5',
              hero: 'text-amber-300 border-l-2 border-amber-500 bg-amber-500/5',
              routine: 'text-emerald-300 border-l-2 border-emerald-500 bg-emerald-500/5',
              action: 'text-cyan-300 border-l-2 border-cyan-500 bg-cyan-500/5',
              info: 'text-slate-300 border-l-2 border-slate-600 bg-slate-800/20'
            };

            return (
              <div
                key={log.id}
                className={`p-1.5 rounded text-[11px] leading-tight flex items-start gap-2 ${typeStyles[log.type] || typeStyles.info}`}
              >
                <span className="opacity-50 text-[10px] shrink-0">
                  [{log.time}]
                </span>
                <span className="flex-1">
                  {log.message}
                </span>
              </div>
            );
          })
        )}
      </div>
    </GlassCard>
  );
}
