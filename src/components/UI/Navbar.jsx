import React from 'react';
import { Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { soundService } from '../../services/soundService';

export default function Navbar({
  currentPage,
  setCurrentPage,
  soundMuted,
  setSoundMuted,
  onReset
}) {
  const toggleAudio = () => {
    const isMuted = soundService.toggleMute();
    setSoundMuted(isMuted);
    if (!isMuted) soundService.playSelect();
  };

  const steps = [
    { id: 'idea', label: '1. Idea' },
    { id: 'tellUs', label: '2. Tell Us' },
    { id: 'avatar', label: '3. Avatar' },
    { id: 'profile', label: '4. Profile' },
    { id: 'world', label: '5. World' },
    { id: 'timeline', label: '6. Timeline' },
    { id: 'simulation', label: '7. Simulation' },
    { id: 'report', label: '8. Report' },
    { id: 'result', label: '9. Result' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0b0f19]/95 backdrop-blur-md px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo matching Panel 1 & 9 */}
        <div
          onClick={() => {
            soundService.playClick();
            setCurrentPage('idea');
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-retro text-xs text-cyan-400">
            :(
          </div>
          <div>
            <div className="font-retro text-xs sm:text-sm text-cyan-300 tracking-wider font-bold">
              NPC SIMULATOR
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Turn Yourself Into a Background Character
            </p>
          </div>
        </div>

        {/* 9-Panel Step Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-[#111726] p-1 rounded-xl border border-white/10">
          {steps.map((step) => {
            const isActive = currentPage === step.id;
            return (
              <button
                key={step.id}
                onClick={() => {
                  soundService.playClick();
                  setCurrentPage(step.id);
                }}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </nav>

        {/* Audio Toggle & Restart */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono ${
              soundMuted
                ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                : 'bg-blue-950/60 border-blue-400/40 text-cyan-300'
            }`}
            title={soundMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            <span className="hidden sm:inline">{soundMuted ? 'Muted' : 'Sound'}</span>
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Restart from Beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
