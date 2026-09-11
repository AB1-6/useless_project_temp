import React from 'react';
import { Megaphone, X } from 'lucide-react';
import { soundService } from '../../services/soundService';

export default function RandomEvent({
  event,
  isOpen,
  onResolve,
  onClose
}) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg animate-pop">
        {/* Yellow Handwritten Note pointing to buttons matching Panel 7 */}
        <div className="hidden sm:block absolute -right-44 top-2/3 -translate-y-1/2 z-20">
          <span className="handwritten-note text-3xl text-yellow-300">
            Classic NPC <br /> response ↙
          </span>
        </div>

        {/* Panel 7 Header Badge */}
        <div className="text-left mb-2">
          <span className="text-xs font-mono font-bold text-rose-400">
            STAGE 7 OF 9: RANDOM EVENT
          </span>
        </div>

        {/* Event Card matching Panel 7 */}
        <div className="bg-[#111726] border-2 border-rose-500/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(244,63,94,0.3)] relative">
          {/* Top Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-rose-600 px-3 py-1 rounded-full text-white text-xs font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(244,63,94,0.5)]">
              <Megaphone className="w-3.5 h-3.5" />
              <span>{event.badge || 'RANDOM EVENT'}</span>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Title and Description */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-rose-400 tracking-tight">
              {event.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-200 font-medium">
              {event.description}
            </p>
          </div>

          {/* Effects Section */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wide block">
              Effects:
            </span>
            <div className="space-y-1.5">
              {event.effects.map((eff, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm font-semibold text-rose-300 bg-slate-950/60 p-2.5 rounded-xl border border-white/5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400">💥</span>
                    <span>{eff.name}</span>
                  </div>
                  <span className="font-mono font-bold text-rose-400">
                    {eff.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Choices matching Panel 7: Panic vs Go to Canteen */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {event.options.map((opt, idx) => {
              const isCanteen = opt.variant === 'primary' || opt.text.includes('Canteen');

              return (
                <button
                  key={idx}
                  onClick={() => {
                    soundService.playSelect();
                    onResolve(opt);
                  }}
                  className={`py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
                    isCanteen
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-400/40'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] border border-rose-400/40'
                  }`}
                >
                  <span className="text-base">{opt.icon}</span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
