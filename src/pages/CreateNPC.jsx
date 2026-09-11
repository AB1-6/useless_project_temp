import React from 'react';
import { ArrowRight, Dices, Sparkles, Check } from 'lucide-react';
import Button from '../components/UI/Button';
import { HOBBIES, STUDY_HABITS, FAVORITE_PLACES, COMMON_PHRASES, COLLEGES } from '../data/npcDefaults';
import { soundService } from '../services/soundService';

export default function CreateNPC({ npc, updateNpcField, onProceed }) {
  const handleRandomize = () => {
    soundService.playClick();
    const names = ['Anlin', 'Kevin', 'Sneha', 'Rahul', 'Naveen', 'Ashwin', 'Devika'];
    const colleges = ['Sahrdaya', 'MEC', 'CET', 'GEC Thrissur', 'TKM', 'NIT Calicut'];
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    
    updateNpcField('name', pick(names));
    updateNpcField('college', pick(colleges));
    updateNpcField('hobby', pick(HOBBIES).label);
    updateNpcField('commonPhrase', pick(COMMON_PHRASES));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-black font-heading tracking-wide text-slate-100 flex items-center gap-2">
          <span className="text-cyan-400">2.</span> Tell Us About Yourself
        </h2>
        <span className="text-xs font-mono text-slate-400">
          STAGE 2 OF 9
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Main Card: Create Your NPC */}
        <div className="md:col-span-8 bg-[#111726] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-lg font-bold font-heading text-white">
              Create Your NPC
            </h3>
            <button
              type="button"
              onClick={handleRandomize}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <Dices className="w-3.5 h-3.5" /> Auto Fill Example
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              soundService.playSelect();
              onProceed();
            }}
            className="space-y-4 text-sm"
          >
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
              <label className="text-slate-300 font-medium">Name</label>
              <input
                type="text"
                value={npc.name}
                onChange={e => updateNpcField('name', e.target.value)}
                className="sm:col-span-2 bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g. Anlin"
                required
              />
            </div>

            {/* College */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
              <label className="text-slate-300 font-medium">College</label>
              <input
                type="text"
                value={npc.college}
                onChange={e => updateNpcField('college', e.target.value)}
                className="sm:col-span-2 bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g. Sahrdaya"
                required
              />
            </div>

            {/* Wake up time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
              <label className="text-slate-300 font-medium">Wake up time</label>
              <input
                type="text"
                value={npc.wakeTime}
                onChange={e => updateNpcField('wakeTime', e.target.value)}
                className="sm:col-span-2 bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g. 8:00 AM"
              />
            </div>

            {/* Class starts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
              <label className="text-slate-300 font-medium">Class starts</label>
              <input
                type="text"
                value={npc.classStart}
                onChange={e => updateNpcField('classStart', e.target.value)}
                className="sm:col-span-2 bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g. 9:00 AM"
              />
            </div>

            {/* Favorite place */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
              <label className="text-slate-300 font-medium">Favorite place</label>
              <input
                type="text"
                value={npc.favoritePlace}
                onChange={e => updateNpcField('favoritePlace', e.target.value)}
                className="sm:col-span-2 bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g. Canteen"
              />
            </div>

            {/* Character Hobby Selection Step (Requested specifically by user) */}
            <div className="pt-2 pb-1 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-slate-200 font-bold flex items-center gap-1.5">
                  <span className="text-cyan-400">★</span> Hobby Selection
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  Selected: <strong className="text-cyan-300">{npc.hobby}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HOBBIES.map((h) => {
                  const isSelected = npc.hobby === h.label || npc.hobby === h.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => {
                        soundService.playClick();
                        updateNpcField('hobby', h.label);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600/30 border-blue-400 text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          : 'bg-[#0b0f19] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="text-base">{h.icon}</span>
                      <span className="truncate">{h.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sleep time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
              <label className="text-slate-300 font-medium">Sleep time</label>
              <input
                type="text"
                value={npc.sleepTime}
                onChange={e => updateNpcField('sleepTime', e.target.value)}
                className="sm:col-span-2 bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g. 1:00 AM"
              />
            </div>

            {/* Study habit */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
              <label className="text-slate-300 font-medium">Study habit</label>
              <select
                value={npc.studyHabit}
                onChange={e => updateNpcField('studyHabit', e.target.value)}
                className="sm:col-span-2 bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-blue-500 focus:outline-none transition-colors cursor-pointer"
              >
                {STUDY_HABITS.map(sh => (
                  <option key={sh} value={sh} className="bg-slate-900 text-white">
                    {sh}
                  </option>
                ))}
              </select>
            </div>

            {/* Common phrase */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
              <label className="text-slate-300 font-medium">Common phrase</label>
              <input
                type="text"
                value={npc.commonPhrase}
                onChange={e => updateNpcField('commonPhrase', e.target.value)}
                className="sm:col-span-2 bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g. Tomorrow cheyyam bro"
              />
            </div>

            {/* Submit Button matching blue pill */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Generate My NPC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Yellow Handwritten Annotation Note */}
        <div className="md:col-span-4 flex flex-col items-start sm:items-center justify-center pt-8 md:pt-16">
          <div className="space-y-4">
            <span className="handwritten-note text-3xl sm:text-4xl text-yellow-300">
              Just be honest... <br /> (or not) ↙
            </span>

            <div className="bg-[#111726]/80 p-4 rounded-xl border border-white/5 text-xs text-slate-400 space-y-1.5 max-w-xs">
              <p className="font-bold text-slate-300">💡 Pro Tip:</p>
              <p>Choosing "Gaming" and "Rarely" study habits will maximize your true College NPC predictability score.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
