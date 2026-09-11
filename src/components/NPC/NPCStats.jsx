import React from 'react';
import { EyeOff, Clock, Repeat, FileText, ShieldAlert } from 'lucide-react';
import StatBar from '../UI/StatBar';

export default function NPCStats({ stats = {}, className = '' }) {
  const {
    obliviousness = 80,
    patience = 85,
    monotony = 90,
    scriptAdherence = 95,
    protagonistFear = 30
  } = stats;

  return (
    <div className={`space-y-3 ${className}`}>
      <StatBar
        label="Obliviousness"
        value={obliviousness}
        color="cyan"
        icon={EyeOff}
        description="Ability to completely ignore theft, screams, and sudden pottery destruction."
      />

      <StatBar
        label="Monotony"
        value={monotony}
        color="emerald"
        icon={Repeat}
        description="Satisfaction derived from walking the exact same 3-step square loop."
      />

      <StatBar
        label="Script Adherence"
        value={scriptAdherence}
        color="purple"
        icon={FileText}
        description="Strict discipline to say pre-rendered lines and never break the fourth wall."
      />

      <StatBar
        label="Patience"
        value={patience}
        color="amber"
        icon={Clock}
        description="Stamina to wait while player stands AFK in front of you for 4 hours."
      />

      <StatBar
        label="Protagonist Fear"
        value={protagonistFear}
        color="rose"
        icon={ShieldAlert}
        description="Panic level when an adventurer with glowing armor sprints into town."
      />
    </div>
  );
}
