import React from 'react';

export default function GlassCard({
  children,
  className = '',
  glow = false,
  glowColor = 'cyan',
  scanline = false,
  onClick,
  ...props
}) {
  const colorClass = glowColor === 'amber'
    ? 'cyber-card cyber-card-amber'
    : glowColor === 'purple'
    ? 'cyber-card cyber-card-purple'
    : 'cyber-card';

  return (
    <div
      onClick={onClick}
      className={`${colorClass} p-6 ${scanline ? 'scanlines overflow-hidden' : ''} ${className}`}
      {...props}
    >
      {/* Decorative corner brackets for AAA game HUD look */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm pointer-events-none opacity-80" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm pointer-events-none opacity-80" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm pointer-events-none opacity-80" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 rounded-br-sm pointer-events-none opacity-80" />

      {children}
    </div>
  );
}
