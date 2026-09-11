import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import WorldMap from '../components/World/WorldMap';
import Button from '../components/UI/Button';
import { soundService } from '../services/soundService';

export default function WorldPage({ npc, selectedLocation, setSelectedLocation, onProceed, onBack }) {
  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-black font-heading tracking-wide text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400">4.</span> Your World
        </h2>
        <span className="text-xs font-mono text-slate-400">
          STAGE 4 OF 9
        </span>
      </div>

      <WorldMap
        npc={npc}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      />

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Back to NPC Profile
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
          View A Day in the Life →
        </Button>
      </div>
    </div>
  );
}
