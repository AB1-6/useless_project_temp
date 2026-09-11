import React, { useEffect } from 'react';
import { ArrowRight, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import NPCCharacter from '../components/NPC/NPCCharacter';
import Button from '../components/UI/Button';
import { soundService } from '../services/soundService';

export default function DailyReport({
  npc,
  simulationMetrics,
  onProceed,
  onBack
}) {
  useEffect(() => {
    soundService.playFanfare();
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-black font-heading tracking-wide text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400">8.</span> NPC Behavior Analysis
        </h2>
        <span className="text-xs font-mono text-slate-400">
          STAGE 8 OF 9
        </span>
      </div>

      {/* Main Scorecard Card matching Panel 8 */}
      <div className="bg-[#111726] border border-blue-500/20 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Top Header inside Card */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-950 rounded-2xl border border-cyan-400/40 flex items-center justify-center p-1 shadow-inner">
              <NPCCharacter size="sm" avatar={npc.avatar} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase tracking-wider">
                {npc.name}
              </h1>
              <p className="text-xs font-semibold text-slate-400">
                Daily NPC Report
              </p>
            </div>
          </div>

          {/* Top-Right NPC Score Badge matching Panel 8 */}
          <div className="bg-slate-950 px-4 py-2 rounded-2xl border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">NPC Score</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
              {simulationMetrics.npcScore}%
            </span>
          </div>
        </div>

        {/* Two Column Stats Grid matching Panel 8 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          {/* Left Column */}
          <div className="space-y-3 font-medium">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Distance travelled</span>
              <span className="font-mono font-bold text-white">{simulationMetrics.distanceTravelled}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Classes attended</span>
              <span className="font-mono font-bold text-white">{simulationMetrics.classesAttended}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Canteen visits</span>
              <span className="font-mono font-bold text-amber-400">{simulationMetrics.canteenVisits}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Study time</span>
              <span className="font-mono font-bold text-white">{simulationMetrics.studyTime}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Gaming time</span>
              <span className="font-mono font-bold text-fuchsia-400">{simulationMetrics.gamingTime}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Assignments completed</span>
              <span className="font-mono font-bold text-emerald-400">{simulationMetrics.assignmentsCompleted}</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono uppercase block">
                Most repeated dialogue
              </span>
              <p className="text-sm font-semibold text-slate-200 italic font-mono bg-slate-950 p-2.5 rounded-xl border border-white/5">
                "{npc.commonPhrase}."
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono uppercase block">
                Most visited location
              </span>
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300 bg-slate-950 p-2.5 rounded-xl border border-white/5">
                <span>👑</span>
                <span>{simulationMetrics.mostVisitedLocation}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono uppercase block">
                Final status
              </span>
              <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-black font-mono shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                <span>COMMON NPC</span>
                <span>☺</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Orange/Yellow Progress Bar matching Panel 8 */}
        <div className="space-y-3 pt-2">
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full w-[87%]" />
          </div>

          {/* Tagline matching Panel 8 */}
          <p className="text-center font-heading font-black text-base sm:text-lg text-slate-200 tracking-wide">
            Predictable. Lazy. Extremely consistent.
          </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Back to Simulation
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
          View The Result →
        </Button>
      </div>
    </div>
  );
}
