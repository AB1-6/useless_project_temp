import React from 'react';
import { RotateCcw, Share2, Sparkles, UserPlus } from 'lucide-react';
import Button from '../components/UI/Button';
import NPCCharacter from '../components/NPC/NPCCharacter';
import { soundService } from '../services/soundService';

export default function ResultPage({ npc, onRestart, onNewCharacter }) {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-black font-heading tracking-wide text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400">9.</span> The Result
        </h2>
        <span className="text-xs font-mono text-slate-400">
          STAGE 9 OF 9 • FINALE
        </span>
      </div>

      {/* Main Result Card matching Panel 9 */}
      <div className="relative w-full h-[460px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between p-8 sm:p-12">
        {/* Sunset Artwork Skybox */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#7c2d12]/60 to-[#ea580c]/50" />
        
        {/* Sunset Glow and Clouds */}
        <div className="absolute top-0 right-12 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Silhouette of College Campus Buildings in Background */}
        <div className="absolute bottom-16 inset-x-0 h-40 flex items-end justify-around opacity-30 pointer-events-none">
          <div className="w-48 h-32 bg-black rounded-t-lg" />
          <div className="w-32 h-44 bg-black rounded-t-lg" />
          <div className="w-56 h-28 bg-black rounded-t-lg" />
        </div>

        {/* Top-Right Yellow Handwritten Reflection matching Panel 9 */}
        <div className="relative z-10 text-right">
          <span className="handwritten-note text-3xl sm:text-5xl text-yellow-300 drop-shadow-md">
            Different world... <br />
            Same you.
          </span>
        </div>

        {/* Center: Back of Student Boy looking at the sunset */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <NPCCharacter size="xl" avatar={npc.avatar} />
        </div>

        {/* Bottom Banner matching Panel 9 */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/90 backdrop-blur-md p-5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="font-retro text-xl text-cyan-400">
              :(
            </div>
            <div>
              <h3 className="font-retro text-lg text-cyan-300 tracking-wider">
                NPC SIMULATOR
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Because even you... are just a background character.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="md"
              variant="secondary"
              onClick={onNewCharacter}
              icon={UserPlus}
            >
              New NPC
            </Button>

            <Button
              size="md"
              variant="primary"
              onClick={onRestart}
              icon={RotateCcw}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
            >
              Restart Simulation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
