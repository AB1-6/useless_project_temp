import React, { useState } from 'react';
import SimulationEngine from '../components/Simulation/SimulationEngine';
import RandomEvent from '../components/Simulation/RandomEvent';
import { CAMPUS_EVENTS } from '../data/events';
import { soundService } from '../services/soundService';

export default function SimulationPage({
  npc,
  onCompleteSimulation,
  onBack
}) {
  const [activeEvent, setActiveEvent] = useState(null);

  const handleTriggerEvent = () => {
    soundService.playQuestChime();
    setActiveEvent(CAMPUS_EVENTS[0]); // Panel 7: Surprise Assignment
  };

  const handleResolveEvent = (option) => {
    setActiveEvent(null);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-black font-heading tracking-wide text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400">6.</span> Life in the Simulation
        </h2>
        <span className="text-xs font-mono text-slate-400">
          STAGE 6 OF 9
        </span>
      </div>

      {/* Main Simulation Viewport matching Panel 6 */}
      <SimulationEngine
        npc={npc}
        onTriggerEvent={handleTriggerEvent}
        onFinishDay={onCompleteSimulation}
      />

      {/* Modal matching Panel 7: Random Event */}
      <RandomEvent
        event={activeEvent}
        isOpen={Boolean(activeEvent)}
        onResolve={handleResolveEvent}
        onClose={() => setActiveEvent(null)}
      />

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Back to Daily Timeline
        </button>

        <button
          onClick={onCompleteSimulation}
          className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer"
        >
          Skip to Behavior Analysis →
        </button>
      </div>
    </div>
  );
}
