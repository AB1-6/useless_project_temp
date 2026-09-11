import React from 'react';
import { ArrowRight, Sparkles, User, Palette, Check } from 'lucide-react';
import NPCCharacter from '../components/NPC/NPCCharacter';
import Button from '../components/UI/Button';
import { soundService } from '../services/soundService';

const OUTFIT_COLORS = [
  { label: 'Navy Blue', val: '#1e3a8a' },
  { label: 'Emerald Green', val: '#15803d' },
  { label: 'Rose Red', val: '#be185d' },
  { label: 'Amber Canteen', val: '#b45309' },
  { label: 'Stealth Slate', val: '#334155' },
  { label: 'Cyber Purple', val: '#6b21a8' }
];

const HAIR_COLORS = [
  { label: 'Deep Black', val: '#090d16' },
  { label: 'Chestnut Brown', val: '#78350f' },
  { label: 'Golden Blonde', val: '#ca8a04' },
  { label: 'Crimson Red', val: '#dc2626' }
];

const ACCESSORIES_LIST = [
  { id: 'backpack', label: 'College Backpack', icon: '🎒' },
  { id: 'headset', label: 'Gaming Headset', icon: '🎧' },
  { id: 'glasses', label: 'Student Glasses', icon: '👓' },
  { id: 'chai', label: 'Hot Chai Glass', icon: '☕' },
  { id: 'books', label: 'Exam Notes', icon: '📚' },
  { id: 'cap', label: 'Backwards Cap', icon: '🧢' },
  { id: 'none', label: 'No Accessory', icon: '✖' }
];

export default function AvatarEditor({
  npc,
  updateNpcField,
  onProceed,
  onBack
}) {
  const currentAvatar = npc.avatar || {
    gender: 'boy',
    hairStyle: 'messy',
    hairColor: '#090d16',
    outfitColor: '#1e3a8a',
    accessory: 'backpack'
  };

  const handleUpdate = (patch) => {
    soundService.playClick();
    const updated = {
      ...currentAvatar,
      ...patch
    };
    updateNpcField('avatar', updated);
  };

  const isGirl = currentAvatar.gender === 'girl';

  const hairstyles = isGirl ? [
    { id: 'ponytail', label: 'Cute Ponytail', icon: '👱‍♀️' },
    { id: 'bob', label: 'Short Bob', icon: '💇‍♀️' },
    { id: 'long', label: 'Long Wavy', icon: '👩' }
  ] : [
    { id: 'messy', label: 'Messy Anime', icon: '🧑' },
    { id: 'short', label: 'Casual Short', icon: '👦' },
    { id: 'long', label: 'Flowing Locks', icon: '💇‍♂️' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-black font-heading tracking-wide text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400">★</span> Customize Your Avatar
        </h2>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
          STAGE 3 OF 10: AVATAR RIG
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Live Avatar Viewport Stage */}
        <div className="md:col-span-5 flex flex-col items-center space-y-4">
          <div className="w-full h-84 bg-gradient-to-b from-[#111726] via-[#0b101d] to-[#070b14] rounded-3xl border-2 border-blue-500/30 p-6 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl">
            {/* Holographic background aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full flex justify-between items-center z-10 text-[10px] font-mono">
              <span className="text-cyan-400 uppercase font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                {currentAvatar.gender.toUpperCase()} • {currentAvatar.hairStyle.toUpperCase()}
              </span>
              <span className="text-slate-400">
                {npc.name}
              </span>
            </div>

            {/* Character Sprite Display */}
            <div className="relative z-10 my-auto">
              <NPCCharacter size="xl" avatar={currentAvatar} />
            </div>

            {/* Platform Ring */}
            <div className="w-44 h-6 rounded-full border border-cyan-400/50 bg-cyan-500/15 shadow-[0_0_20px_rgba(6,182,212,0.4)] pointer-events-none z-0" />
          </div>

          <div className="text-center text-xs text-slate-400 font-mono">
            *Updates immediately on screen*
          </div>
        </div>

        {/* Right: Customization Controls */}
        <div className="md:col-span-7 bg-[#111726] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* 1. Character Gender Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider block">
              1. Character Gender:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleUpdate({ gender: 'boy', hairStyle: 'messy' })}
                className={`py-3.5 px-4 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !isGirl
                    ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)] ring-2 ring-blue-400/40'
                    : 'bg-[#0b0f19] border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                }`}
              >
                <span className="text-xl">👦</span>
                <span>Boy Student</span>
                {!isGirl && <Check className="w-4 h-4 ml-1 text-cyan-300" />}
              </button>

              <button
                type="button"
                onClick={() => handleUpdate({ gender: 'girl', hairStyle: 'ponytail' })}
                className={`py-3.5 px-4 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isGirl
                    ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.6)] ring-2 ring-fuchsia-400/40'
                    : 'bg-[#0b0f19] border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                }`}
              >
                <span className="text-xl">👧</span>
                <span>Girl Student</span>
                {isGirl && <Check className="w-4 h-4 ml-1 text-fuchsia-200" />}
              </button>
            </div>
          </div>

          {/* 2. Hairstyle Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider block">
              2. Hairstyle ({isGirl ? 'Girl Styles' : 'Boy Styles'}):
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {hairstyles.map(hs => {
                const isSelected = currentAvatar.hairStyle === hs.id;
                return (
                  <button
                    key={hs.id}
                    type="button"
                    onClick={() => handleUpdate({ hairStyle: hs.id })}
                    className={`py-3 px-3 rounded-xl border font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'bg-blue-600/40 border-blue-400 text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.4)] ring-1 ring-blue-400'
                        : 'bg-[#0b0f19] border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    <span className="text-lg">{hs.icon}</span>
                    <span>{hs.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Hair Color */}
          <div className="space-y-2">
            <label className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider block">
              3. Hair Color:
            </label>
            <div className="flex gap-3">
              {HAIR_COLORS.map(col => (
                <button
                  key={col.val}
                  type="button"
                  onClick={() => handleUpdate({ hairColor: col.val })}
                  className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                    currentAvatar.hairColor === col.val
                      ? 'border-cyan-400 ring-4 ring-cyan-400/40 scale-110'
                      : 'border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.val }}
                  title={col.label}
                >
                  {currentAvatar.hairColor === col.val && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Outfit / Hoodie Color */}
          <div className="space-y-2">
            <label className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider block">
              4. Hoodie / Garment Color:
            </label>
            <div className="flex gap-3">
              {OUTFIT_COLORS.map(col => (
                <button
                  key={col.val}
                  type="button"
                  onClick={() => handleUpdate({ outfitColor: col.val })}
                  className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                    currentAvatar.outfitColor === col.val
                      ? 'border-cyan-400 ring-4 ring-cyan-400/40 scale-110'
                      : 'border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.val }}
                  title={col.label}
                >
                  {currentAvatar.outfitColor === col.val && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Accessories Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider block">
              5. College Accessories:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ACCESSORIES_LIST.map(acc => {
                const isSelected = currentAvatar.accessory === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleUpdate({ accessory: acc.id })}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/40 border-blue-400 text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.4)] ring-1 ring-blue-400'
                        : 'bg-[#0b0f19] border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    <span className="text-base">{acc.icon}</span>
                    <span className="truncate">{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Footer */}
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={onBack}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              ← Back to Details
            </button>

            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                soundService.playSelect();
                onProceed();
              }}
              icon={ArrowRight}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6"
            >
              Confirm Avatar & View Profile →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
