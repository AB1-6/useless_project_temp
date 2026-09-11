import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/UI/Button';
import NPCCharacter from '../components/NPC/NPCCharacter';
import { soundService } from '../services/soundService';

export default function Landing({ onStart }) {
  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 space-y-12">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-black font-heading tracking-wide text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400">1.</span> The Idea
        </h2>
        <span className="text-xs font-mono text-slate-400">
          STAGE 1 OF 9
        </span>
      </div>

      {/* Main Panel Content: Boy at desk on Left, Logo & Concept on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
        {/* Left Side: Relatable Boy in Hoodie at Desk Illustration */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-sm h-80 rounded-3xl bg-gradient-to-b from-slate-900 via-blue-950/40 to-slate-950 border border-white/10 p-6 flex flex-col items-center justify-between overflow-hidden shadow-2xl">
            {/* Ambient blue bedroom light */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-full text-left">
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
                11:42 PM • HOSTEL BEDROOM
              </span>
            </div>

            {/* Character */}
            <div className="relative z-10 my-auto">
              <NPCCharacter size="xl" />
            </div>

            <div className="w-full text-center bg-slate-950/80 rounded-xl p-2 border border-white/5 z-10">
              <p className="text-xs text-slate-400 italic">
                *Staring blankly at phone screen*
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Philosophy, Handwritten Note & Logo */}
        <div className="md:col-span-7 space-y-8 text-center md:text-left">
          {/* Main Philosophical Questions */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white leading-tight">
              What if... you're not the <br />
              <span className="text-cyan-400">main character</span> in your own life?
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 font-medium">
              What if you were just an NPC?
            </p>
          </div>

          {/* Yellow Handwritten Note */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <span className="handwritten-note text-2xl text-yellow-300">
              Same life... <br /> Different perspective. ↘
            </span>
          </div>

          {/* Centered Logo Box */}
          <div className="bg-[#111726] border border-blue-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden">
            {/* Sad Robot Face */}
            <div className="font-retro text-2xl text-cyan-400">
              :(
            </div>

            {/* Pixel Logo Title */}
            <h2 className="font-retro text-2xl sm:text-3xl text-cyan-300 tracking-wider">
              NPC SIMULATOR
            </h2>

            <p className="text-sm font-medium text-slate-300">
              Turn Yourself Into a Background Character
            </p>

            <div className="pt-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => {
                  soundService.playSelect();
                  onStart();
                }}
                icon={ArrowRight}
                className="w-full sm:w-auto px-8 py-3.5 text-base bg-blue-600 hover:bg-blue-500 border border-blue-400/40 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                Start Simulation →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
