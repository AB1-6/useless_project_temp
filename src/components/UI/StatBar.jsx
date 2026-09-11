import React from 'react';

export default function StatBar({
  label,
  value = 50,
  maxValue = 100,
  color = 'cyan',
  icon: Icon,
  description = '',
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));

  const colorStyles = {
    cyan: 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]',
    amber: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]',
    purple: 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]',
    emerald: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]',
    rose: 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]'
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-slate-200">
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />}
          <span>{label}</span>
        </div>
        <span className="font-mono text-slate-400 font-medium">
          {Math.round(value)} / {maxValue}
        </span>
      </div>

      <div className="h-2.5 w-full bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-white/5">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorStyles[color] || colorStyles.cyan}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {description && (
        <p className="text-[11px] text-slate-400 italic leading-tight">
          {description}
        </p>
      )}
    </div>
  );
}
