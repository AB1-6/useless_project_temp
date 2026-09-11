import React, { useState } from 'react';
import { Trophy, Shield, Filter, RotateCcw, Plus, Sparkles, Award } from 'lucide-react';
import GlassCard from '../components/UI/GlassCard';
import Button from '../components/UI/Button';
import { soundService } from '../services/soundService';

export default function Leaderboard({
  leaderboard = [],
  onNewNPC,
  onRestart
}) {
  const [selectedWorldFilter, setSelectedWorldFilter] = useState('All');

  const worlds = ['All', 'Riverbrook Medieval Hamlet', 'Neo-Slums District 04', 'Initech Cubicle Farm', 'Los Santos Crosswalk'];

  const filteredData = selectedWorldFilter === 'All'
    ? leaderboard
    : leaderboard.filter(item => item.world === selectedWorldFilter || item.world?.includes(selectedWorldFilter));

  const gradeColors = {
    'S+': 'text-amber-400 border-amber-400/50 bg-amber-400/10',
    'S': 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10',
    'A': 'text-purple-400 border-purple-400/50 bg-purple-400/10',
    'B': 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10',
    'C': 'text-slate-400 border-slate-500/50 bg-slate-500/10'
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Official Useless Projects Standings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white">
            Hall of Irrelevance
          </h2>
          <p className="text-sm text-slate-400">
            Recognizing the video game world's most stoic, ignored, and ceramic-deficient background characters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={onNewNPC}
            icon={Plus}
            sound="select"
          >
            Create New NPC
          </Button>
        </div>
      </div>

      {/* World Filters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter by World:
        </span>
        {worlds.map(w => (
          <button
            key={w}
            onClick={() => {
              soundService.playClick();
              setSelectedWorldFilter(w);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedWorldFilter === w
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:border-white/10 hover:text-white'
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      {/* Leaderboard Table / Cards */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/80 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">NPC Identity</th>
                <th className="py-4 px-6">World Setting</th>
                <th className="py-4 px-6 text-center">Grade</th>
                <th className="py-4 px-6 text-right">Ignored</th>
                <th className="py-4 px-6 text-right">Pots Lost</th>
                <th className="py-4 px-6 text-right">Irrelevance Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.map((item, idx) => {
                const isTop3 = idx < 3;
                const medalColors = ['text-amber-400', 'text-slate-300', 'text-amber-600'];

                return (
                  <tr
                    key={item.id || idx}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Rank */}
                    <td className="py-4 px-6 font-mono font-bold">
                      <div className="flex items-center gap-2">
                        {isTop3 ? (
                          <Award className={`w-4 h-4 ${medalColors[idx]}`} />
                        ) : (
                          <span className="w-4 text-center text-slate-500 text-xs">#{idx + 1}</span>
                        )}
                        <span className={isTop3 ? medalColors[idx] : 'text-slate-400'}>
                          #{idx + 1}
                        </span>
                      </div>
                    </td>

                    {/* NPC Name and Catchphrase */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/20 px-2 py-0.5 rounded">
                          {item.archetype}
                        </span>
                      </div>
                      {item.catchphrase && (
                        <p className="text-xs text-slate-400 italic truncate max-w-xs mt-0.5">
                          "{item.catchphrase}"
                        </p>
                      )}
                    </td>

                    {/* World */}
                    <td className="py-4 px-6 text-slate-300 text-xs font-medium">
                      {item.world}
                    </td>

                    {/* Grade */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block font-retro text-xs font-black px-2 py-1 rounded-md border ${gradeColors[item.grade] || gradeColors['A']}`}>
                        {item.grade}
                      </span>
                    </td>

                    {/* Ignored */}
                    <td className="py-4 px-6 text-right font-mono text-slate-300">
                      {item.ignored || 0}
                    </td>

                    {/* Pots Lost */}
                    <td className="py-4 px-6 text-right font-mono text-rose-400">
                      {item.potsBroken || 0}
                    </td>

                    {/* Score */}
                    <td className="py-4 px-6 text-right font-mono font-black text-cyan-300 text-base">
                      {item.score?.toLocaleString() || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Footer / CTA */}
      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          variant="secondary"
          onClick={onRestart}
          icon={RotateCcw}
        >
          Return to Home Screen
        </Button>
      </div>
    </div>
  );
}
