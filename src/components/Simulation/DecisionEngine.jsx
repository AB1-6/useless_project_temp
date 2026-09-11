import React from 'react';
import { MessageSquare, Sparkles, Wind, Crosshair, PackageCheck, AlertCircle } from 'lucide-react';
import GlassCard from '../UI/GlassCard';
import Button from '../UI/Button';
import { soundService } from '../../services/soundService';

export default function DecisionEngine({
  npc,
  currentTask,
  onTriggerAction,
  disabled = false,
  className = ''
}) {
  return (
    <GlassCard className={`p-4 sm:p-5 space-y-4 ${className}`}>
      {/* Current Task Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
            Assigned Routine
          </span>
        </div>
        <span className="text-xs text-slate-300 font-semibold bg-slate-950/60 px-3 py-1 rounded-lg border border-white/5">
          {currentTask?.action || 'Idling near waypoint'}
        </span>
      </div>

      {/* Manual Action Buttons */}
      <div className="space-y-2">
        <span className="text-[11px] font-retro text-slate-400 uppercase block">
          NPC Override Abilities:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button
            size="sm"
            variant="secondary"
            disabled={disabled}
            onClick={() => onTriggerAction('catchphrase')}
            icon={MessageSquare}
            className="text-xs hover:border-amber-400/50"
          >
            Say Catchphrase
          </Button>

          <Button
            size="sm"
            variant="secondary"
            disabled={disabled}
            onClick={() => onTriggerAction('wind')}
            icon={Wind}
            className="text-xs hover:border-cyan-400/50"
          >
            "Must be the wind"
          </Button>

          <Button
            size="sm"
            variant="secondary"
            disabled={disabled}
            onClick={() => onTriggerAction('t_pose')}
            icon={Crosshair}
            className="text-xs hover:border-purple-400/50"
          >
            Emergency T-Pose
          </Button>

          <Button
            size="sm"
            variant="secondary"
            disabled={disabled}
            onClick={() => onTriggerAction('sweep')}
            icon={Sparkles}
            className="text-xs hover:border-emerald-400/50"
          >
            Sweep Invisible Dirt
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
