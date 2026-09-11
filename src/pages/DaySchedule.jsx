import React from 'react';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import Button from '../components/UI/Button';
import { DAILY_TIMELINE } from '../data/locations';
import { soundService } from '../services/soundService';

export default function DaySchedule({ npc, onProceed, onBack }) {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-black font-heading tracking-wide text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400">5.</span> A Day in the Life
        </h2>
        <span className="text-xs font-mono text-slate-400">
          STAGE 5 OF 9
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Main Timeline Card matching Panel 5 */}
        <div className="md:col-span-8 bg-[#111726] border border-blue-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <div className="space-y-3">
            {DAILY_TIMELINE.map((item, idx) => {
              const isDeviation = item.destination;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all ${
                    isDeviation
                      ? 'bg-amber-950/40 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                      : 'bg-slate-950/60 border-white/5'
                  }`}
                >
                  {/* Timestamp */}
                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-400 w-14 shrink-0">
                    {item.time}
                  </span>

                  {/* Icon */}
                  <span className="text-xl shrink-0">
                    {item.icon}
                  </span>

                  {/* Activity */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${isDeviation ? 'text-amber-300 font-bold' : 'text-slate-200'}`}>
                      {item.text}
                    </p>
                    {isDeviation && (
                      <p className="text-xs text-amber-400 font-mono mt-0.5">
                        Destination: {item.destination}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Yellow Handwritten Note matching Panel 5 */}
        <div className="md:col-span-4 flex flex-col items-start sm:items-center justify-center space-y-6">
          <span className="handwritten-note text-2xl sm:text-3xl text-yellow-300 text-left">
            Rules? <br />
            Needs? <br />
            Decisions? <br />
            <span className="text-cyan-300">→ All AI powered! ☺</span>
          </span>

          <div className="bg-[#111726] border border-white/10 p-4 rounded-xl text-xs text-slate-400 space-y-1 w-full max-w-xs">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
              Automated NPC Logic
            </span>
            <p>Whenever energy drops below 30%, pathfinding algorithm diverts automatically to Canteen.</p>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Back to Campus Map
        </button>

        <Button
          size="lg"
          variant="primary"
          onClick={() => {
            soundService.playSelect();
            onProceed();
          }}
          icon={ArrowRight}
          className="w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold"
        >
          Enter Life in the Simulation →
        </Button>
      </div>
    </div>
  );
}
