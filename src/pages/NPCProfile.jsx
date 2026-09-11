import React from 'react';
import { ArrowRight, Star, Gamepad2, BookOpen, Armchair, Clock, Sparkles, UserCheck } from 'lucide-react';
import NPCCharacter from '../components/NPC/NPCCharacter';
import Button from '../components/UI/Button';
import { soundService } from '../services/soundService';

export default function NPCProfilePage({ npc, onProceed, onEdit }) {
  const statsList = [
    {
      label: 'Social',
      val: npc.stats.social,
      icon: Star,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400'
    },
    {
      label: 'Gaming',
      val: npc.stats.gaming,
      icon: Gamepad2,
      color: 'bg-fuchsia-500',
      textColor: 'text-fuchsia-400'
    },
    {
      label: 'Study',
      val: npc.stats.study,
      icon: BookOpen,
      color: 'bg-sky-500',
      textColor: 'text-sky-400'
    },
    {
      label: 'Laziness',
      val: npc.stats.laziness,
      icon: Armchair,
      color: 'bg-rose-500',
      textColor: 'text-rose-400'
    },
    {
      label: 'Sleep',
      val: npc.stats.sleep,
      icon: Clock,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-400'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-black font-heading tracking-wide text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400">3.</span> Your NPC Profile
        </h2>
        <span className="text-xs font-mono text-slate-400">
          STAGE 4 OF 10
        </span>
      </div>

      {/* Main Profile Card matching Panel 3 */}
      <div className="bg-[#111726] border border-blue-500/20 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Top Section: Avatar + Name + Rarity */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-6">
            {/* Customized Pixel Character Avatar */}
            <div className="w-24 h-36 bg-slate-950/80 rounded-2xl border border-white/10 flex items-center justify-center p-2 shadow-inner">
              <NPCCharacter size="md" avatar={npc.avatar} />
            </div>

            {/* Name, Title, Level */}
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-wider text-white uppercase">
                  {npc.name}
                </h1>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  {npc.avatar?.gender === 'girl' ? '👧 Female' : '👦 Male'}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-300">
                College Student • {npc.college}
              </p>
              <p className="text-xs font-mono text-blue-400">
                Level {npc.level} • Hobby: {npc.hobby}
              </p>
            </div>
          </div>

          {/* Right Badges: Rarity & Predictability */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2 text-right">
            <div className="bg-slate-900/90 border border-white/10 px-3.5 py-1.5 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Rarity</span>
              <span className="text-sm font-bold text-white font-mono">{npc.rarity}</span>
            </div>

            <div className="bg-slate-900/90 border border-white/10 px-3.5 py-1.5 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Predictability</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">{npc.predictability}%</span>
            </div>
          </div>
        </div>

        {/* Stat Bars List */}
        <div className="space-y-4">
          {statsList.map((st) => {
            const Icon = st.icon;
            return (
              <div key={st.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2 text-slate-200">
                    <div className="p-1 rounded bg-slate-900 border border-white/5">
                      <Icon className={`w-3.5 h-3.5 ${st.textColor}`} />
                    </div>
                    <span>{st.label}</span>
                  </div>
                  <span className="font-mono text-slate-300 font-bold">
                    {st.val}%
                  </span>
                </div>

                {/* Bar */}
                <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${st.color}`}
                    style={{ width: `${st.val}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Dialogue Catchphrase */}
        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-base sm:text-lg font-medium text-slate-300 italic font-mono">
            "{npc.commonPhrase}."
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onEdit}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Edit Avatar & Traits
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
          Explore Your World →
        </Button>
      </div>
    </div>
  );
}
