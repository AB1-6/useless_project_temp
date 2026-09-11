import React from 'react';
import { Shield, Sparkles, MapPin, Repeat, Bug, HelpCircle, ArrowRight, FileBadge } from 'lucide-react';
import GlassCard from '../UI/GlassCard';
import Button from '../UI/Button';
import NPCCharacter from './NPCCharacter';
import NPCStats from './NPCStats';
import { GLITCH_TRAITS } from '../../data/npcDefaults';
import { soundService } from '../../services/soundService';

export default function NPCProfile({
  npc,
  onProceed,
  onEdit,
  className = ''
}) {
  const glitch = GLITCH_TRAITS.find(g => g.id === npc.glitch) || GLITCH_TRAITS[0];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top Dossier Header */}
      <GlassCard glow glowColor="cyan" className="p-6 sm:p-8 border-cyan-500/40">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
          {/* Avatar Showcase */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-40 h-52 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 rounded-2xl border-2 border-cyan-400/50 flex items-center justify-center relative overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.25)] p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,240,255,0.2),transparent)]" />
              <NPCCharacter sprite={npc.sprite} size="lg" />
            </div>
            <span className="text-[10px] font-retro text-cyan-300 bg-cyan-950 border border-cyan-400/50 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.3)]">
              PRE-RENDERED ASSET
            </span>
          </div>

          {/* Identity Dossier */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-500/15 px-3 py-1 rounded-lg border border-amber-400/30">
                <FileBadge className="w-4 h-4 text-amber-400" />
                <span>NPC REGISTRY ID: #{Math.floor(Math.random() * 89999 + 10000)}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
                {npc.name}
              </h2>
              <p className="text-base sm:text-lg text-cyan-300 font-bold">
                {npc.title}
              </p>
            </div>

            {/* Repetitive Catchphrase Showcase */}
            <div className="bg-slate-950/80 border-2 border-amber-500/40 rounded-2xl p-4 relative shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <span className="text-[10px] font-retro text-amber-400 uppercase block mb-1">
                Primary Dialogue Line (Permanent loop):
              </span>
              <p className="text-base font-bold text-amber-200 italic">
                "{npc.catchphrase}"
              </p>
            </div>

            {/* Glitch Trait Badge */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs bg-purple-950/80 border border-purple-400/50 text-purple-200 px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                <Bug className="w-4 h-4 text-purple-400" />
                <span><strong>Behavior Glitch:</strong> {glitch.name} — {glitch.desc}</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Two Column Section: Stats vs Routine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Psychometrics */}
        <GlassCard className="p-6 space-y-4 border-white/15">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-lg font-black font-heading text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>NPC Psychometrics</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              MIN FREE WILL
            </span>
          </div>
          <NPCStats stats={npc.stats} />
        </GlassCard>

        {/* Right: Routine & Dialogue Wheel */}
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4 border-white/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black font-heading text-white flex items-center gap-2">
                <Repeat className="w-5 h-5 text-emerald-400" />
                <span>Programmed Daily Loop</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">
                LOCKED TIMELINE
              </span>
            </div>

            <div className="space-y-2">
              {(npc.routine || []).map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-xs p-2.5 rounded-xl bg-slate-950/70 border border-white/10"
                >
                  <span className="font-mono text-cyan-400 font-black w-14 shrink-0">
                    {step.time}
                  </span>
                  <span className="text-slate-200 font-medium flex-1">
                    {step.action}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono px-2 py-0.5 rounded bg-slate-900 border border-white/5">
                    {step.location}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Dialogue Wheel Preview */}
          <GlassCard className="p-6 space-y-3 border-white/15">
            <h3 className="text-lg font-black font-heading text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>Standard Dialogue Wheel Preview</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 text-slate-300">
                <strong className="text-amber-300">💬 1. Any rumors?</strong>
                <p className="text-[11px] text-slate-400 mt-1">"The blacksmith lost his hammer. Again. For the 400th day."</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 text-slate-300">
                <strong className="text-cyan-300">💰 2. Trade goods?</strong>
                <p className="text-[11px] text-slate-400 mt-1">"I will buy your dragon bone for 2 gold pieces."</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <Button
          variant="secondary"
          onClick={onEdit}
        >
          ← Re-tune Traits & Rig
        </Button>

        <Button
          size="xl"
          variant="primary"
          onClick={onProceed}
          icon={ArrowRight}
          sound="select"
          className="w-full sm:w-auto shadow-[0_0_25px_rgba(0,240,255,0.4)]"
        >
          Confirm Dossier & Select World →
        </Button>
      </div>
    </div>
  );
}
