import React, { useState, useEffect } from 'react';
import {
  Compass, Sparkles, MapPin, Sun, Moon, Footprints, Dices,
  Trophy, Coffee, Gamepad2, BookOpen, School, Bus, BedDouble,
  Heart, AlertCircle, Info, Flame, Eye
} from 'lucide-react';
import NPCCharacter from '../NPC/NPCCharacter';
import { CAMPUS_LOCATIONS } from '../../data/locations';
import { soundService } from '../../services/soundService';

export default function WorldMap({ npc = {}, selectedLocation, onSelectLocation }) {
  const [isNightMode, setIsNightMode] = useState(false);
  const [ballState, setBallState] = useState({ kicked: false, x: 50, y: 50 });
  const [foundSecrets, setFoundSecrets] = useState([]);
  const [floatingAlert, setFloatingAlert] = useState(null);
  const [avatarWalkProgress, setAvatarWalkProgress] = useState(1);
  const [avatarFacing, setAvatarFacing] = useState('right');

  // Locations coordinate lookup (as percentage of map canvas)
  const LOCATION_COORDS = {
    library: { x: 18, y: 22, name: 'Library', quote: 'Quiet AC nap zone' },
    classroom: { x: 50, y: 18, name: 'Classroom 302', quote: 'Surviving the backbench' },
    canteen: { x: 82, y: 22, name: 'Canteen', quote: 'Tea & samosa HQ' },
    bus_stop: { x: 18, y: 78, name: 'Bus Stop', quote: 'Sprint for the 8:45 bus' },
    hostel: { x: 50, y: 82, name: 'Hostel Block', quote: 'Respawn at room 4B' },
    gaming_room: { x: 82, y: 78, name: 'Gaming Room', quote: 'RGB & 2 AM Discord' }
  };

  const currentCoords = LOCATION_COORDS[selectedLocation?.id] || LOCATION_COORDS.canteen;

  // Trigger secret discovery helper
  const triggerSecret = (id, alertText, soundFn) => {
    if (soundFn) soundFn();
    if (!foundSecrets.includes(id)) {
      setFoundSecrets(prev => [...prev, id]);
    }
    setFloatingAlert(alertText);
    setTimeout(() => setFloatingAlert(null), 3000);
  };

  // Kick football easter egg
  const handleKickBall = (e) => {
    e.stopPropagation();
    soundService.playKick();
    setBallState({ kicked: true, x: 85, y: 48 });
    setTimeout(() => {
      soundService.playFanfare();
      triggerSecret(
        'football',
        '⚽ GOOOOAL! Top-corner curved strike! (+50 Procrastination Buff)',
        null
      );
    }, 400);

    setTimeout(() => {
      setBallState({ kicked: false, x: 50, y: 50 });
    }, 3500);
  };

  // Toss coin into fountain easter egg
  const handleFountain = (e) => {
    e.stopPropagation();
    triggerSecret(
      'fountain',
      '🪙 *Plink!* Threw ₹1 into fountain: Prayed for 75% attendance condonation!',
      () => soundService.playSplash()
    );
  };

  // Pet Campus Doggo easter egg
  const handlePetDog = (e) => {
    e.stopPropagation();
    triggerSecret(
      'doggo',
      '🐶 *Happy Woof!* You petted Bruno the Campus Dog! (+25 Semester Good Luck)',
      () => soundService.playBark()
    );
  };

  // Pet Campus Cat easter egg
  const handlePetCat = (e) => {
    e.stopPropagation();
    triggerSecret(
      'cat',
      '🐱 *Purr!* Campus cat is eyeing your future canteen samosa crumbs!',
      () => soundService.playSelect()
    );
  };

  // Honk College Bus easter egg
  const handleHonkBus = (e) => {
    e.stopPropagation();
    triggerSecret(
      'bus_horn',
      '🚌 *HONK HONK!* Sahrdaya Bus #7 is revving engine! 60 seconds to board!',
      () => soundService.playHonk()
    );
  };

  // Harvest Mango easter egg
  const handleMangoTree = (e) => {
    e.stopPropagation();
    triggerSecret(
      'mango',
      '🥭 *Thud!* Sweet ripe campus mango plucked from the tree! (+15 HP)',
      () => soundService.playCoin()
    );
  };

  // Select Location & send avatar walking
  const handleSelect = (loc) => {
    soundService.playSelect();
    const oldX = currentCoords.x;
    const newCoords = LOCATION_COORDS[loc.id] || LOCATION_COORDS.canteen;
    setAvatarFacing(newCoords.x >= oldX ? 'right' : 'left');

    setAvatarWalkProgress(0);
    onSelectLocation(loc);

    setTimeout(() => {
      setAvatarWalkProgress(1);
    }, 400);
  };

  // Random Bunk Destination Roulette
  const handleRandomRoulette = () => {
    soundService.playSelect();
    const randomIndex = Math.floor(Math.random() * CAMPUS_LOCATIONS.length);
    const chosen = CAMPUS_LOCATIONS[randomIndex];
    handleSelect(chosen);

    setFloatingAlert(`🎲 ROULETTE DECIDED: Bunking straight to ${chosen.name}!`);
    setTimeout(() => setFloatingAlert(null), 2500);
  };

  // Location extra RPG metadata
  const LOCATION_RPG_DATA = {
    canteen: {
      bunkSafety: '99% ⭐⭐⭐⭐⭐',
      energyBuff: '+40% (Elaichi Chai & Samosa)',
      procrastination: 'MAXIMUM (Tomorrow Cheyyam)',
      hodRisk: '0.1% (Safe behind tea counter)',
      occupants: [
        { name: 'Rahul', role: 'Waiting for Tea', avatar: '👦' },
        { name: 'Chechi', role: 'Frying Parippuvada', avatar: '👩‍🍳' },
        { name: 'Milo', role: 'Canteen Cat', avatar: '🐈' }
      ]
    },
    classroom: {
      bunkSafety: '15% ⭐ (High Danger)',
      energyBuff: '-35% (Thermodynamics Lecture)',
      procrastination: 'LOW (HOD is staring)',
      hodRisk: '95% (Front row gets questioned)',
      occupants: [
        { name: 'Sneha', role: 'Class CR / Notes', avatar: '👧' },
        { name: 'Prof. Kurian', role: 'Conducting Viva', avatar: '👨‍🏫' },
        { name: 'Backbenchers', role: 'Doodling', avatar: '👦' }
      ]
    },
    library: {
      bunkSafety: '90% ⭐⭐⭐⭐',
      energyBuff: '+50% Sleep (18°C AC Comfort)',
      procrastination: '85% (Pretending to study)',
      hodRisk: '10% (Whisper zone)',
      occupants: [
        { name: 'Kevin', role: 'Asleep on Desk', avatar: '🎧' },
        { name: 'Librarian', role: 'Shushing Students', avatar: '🤫' }
      ]
    },
    hostel: {
      bunkSafety: '100% ⭐⭐⭐⭐⭐ (Sanctuary)',
      energyBuff: '+60% (Kettle Maggi & Blanket)',
      procrastination: 'CRITICAL (Cannot leave bed)',
      hodRisk: '0% (Warden is asleep)',
      occupants: [
        { name: 'Kevin', role: 'Hostel Gamer', avatar: '🎧' },
        { name: 'Roommate', role: 'Snoozing Alarm', avatar: '🛏️' }
      ]
    },
    gaming_room: {
      bunkSafety: '85% ⭐⭐⭐⭐',
      energyBuff: '+30% Adrenaline (RGB Glow)',
      procrastination: '95% (Just one more match)',
      hodRisk: '5% (Headphones block sound)',
      occupants: [
        { name: 'Squad', role: 'Discord 5-Stack', avatar: '🎮' },
        { name: 'Kevin', role: 'Locking Reyna', avatar: '👾' }
      ]
    },
    bus_stop: {
      bunkSafety: '50% ⭐⭐⭐',
      energyBuff: '-20% (Sprint Panic)',
      procrastination: '50% (Checking watch)',
      hodRisk: '40% (Teachers also take bus)',
      occupants: [
        { name: 'Bus Driver', role: 'Revving Engine', avatar: '🚌' },
        { name: 'Rahul', role: 'Running Late', avatar: '🏃' }
      ]
    }
  };

  const rpgStats = LOCATION_RPG_DATA[selectedLocation?.id] || LOCATION_RPG_DATA.canteen;

  return (
    <div className="space-y-4 select-none">
      {/* Top Map Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#111726] border border-white/10 p-3 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <Compass className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-black block">
              CAMPUS OVERWORLD MAP
            </span>
            <h3 className="text-xs font-black text-white flex items-center gap-1.5">
              <span>📍 {npc?.college || 'SAHRDAYA COLLEGE OF ENGINEERING'}</span>
              <span className="text-[10px] text-amber-400 font-mono">
                [Click any landmark to travel]
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Secrets Easter Egg Counter */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono font-bold text-amber-300 shadow"
            title="Discover secrets: Football, Fountain, Dog, Cat, Bus, Mango Tree"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>SECRETS: {foundSecrets.length}/5</span>
          </div>

          {/* Random Bunk Destination Roulette */}
          <button
            onClick={handleRandomRoulette}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black tracking-wide cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-1.5 transition-all"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Random Bunk</span>
          </button>

          {/* Day / Night Mode Toggle */}
          <button
            onClick={() => {
              soundService.playClick();
              setIsNightMode(prev => !prev);
            }}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isNightMode
                ? 'bg-indigo-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'bg-amber-950 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
            }`}
            title="Toggle Day/Night View"
          >
            {isNightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Floating Alert / Micro Event */}
      {floatingAlert && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-full shadow-[0_0_30px_#f59e0b] border-2 border-white animate-bounce flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{floatingAlert}</span>
        </div>
      )}

      {/* ================================================================ */}
      {/* 2D VIBRANT CAMPUS OVERWORLD CANVAS VIEWPORT */}
      {/* ================================================================ */}
      <div
        className={`relative w-full h-[520px] rounded-3xl border-2 overflow-hidden shadow-2xl transition-colors duration-700 ${
          isNightMode
            ? 'bg-[#080d1a] border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)]'
            : 'bg-[#143d26] border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.2)]'
        }`}
      >
        {/* Terrain Pattern & Grass Foliage */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isNightMode
              ? 'bg-gradient-to-b from-[#0a0f24] via-[#091124] to-[#040814] opacity-95'
              : 'bg-gradient-to-b from-[#1b5e39] via-[#14472c] to-[#0e3320] opacity-95'
          }`}
        />

        {/* Decorative Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

        {/* ============================================================ */}
        {/* COBBLESTONE BRICK PATHWAYS CONNECTING ALL 6 LANDMARKS */}
        {/* ============================================================ */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            {/* Cobblestone pattern */}
            <pattern id="roadPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill={isNightMode ? "#1e293b" : "#475569"} />
              <line x1="0" y1="0" x2="20" y2="0" stroke="#334155" strokeWidth="1" />
              <line x1="0" y1="10" x2="20" y2="10" stroke="#334155" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="10" stroke="#334155" strokeWidth="1" />
              <line x1="0" y1="10" x2="0" y2="20" stroke="#334155" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Outer Road Circuit */}
          <path
            d="M 18% 22% L 50% 18% L 82% 22% L 82% 78% L 50% 82% L 18% 78% Z"
            fill="none"
            stroke="url(#roadPattern)"
            strokeWidth="32"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Cross connecting center roads */}
          <line x1="50%" y1="18%" x2="50%" y2="82%" stroke="url(#roadPattern)" strokeWidth="28" />
          <line x1="18%" y1="50%" x2="82%" y2="50%" stroke="url(#roadPattern)" strokeWidth="28" />

          {/* Road Curb Highlights */}
          <path
            d="M 18% 22% L 50% 18% L 82% 22% L 82% 78% L 50% 82% L 18% 78% Z"
            fill="none"
            stroke={isNightMode ? "#0f172a" : "#64748b"}
            strokeWidth="34"
            strokeLinejoin="round"
            opacity="0.3"
          />

          {/* Road Dashed Centerlines */}
          <path
            d="M 18% 22% L 50% 18% L 82% 22% L 82% 78% L 50% 82% L 18% 78% Z"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeLinejoin="round"
            opacity="0.7"
          />
        </svg>

        {/* ============================================================ */}
        {/* CENTRAL CAMPUS QUADRANGLE: FOOTBALL TURF & PLAZA */}
        {/* ============================================================ */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[190px] rounded-3xl bg-[#15803d] border-4 border-emerald-400/60 shadow-2xl overflow-hidden pointer-events-auto z-10">
          {/* Turf striped grass */}
          <div className="absolute inset-0 flex flex-col pointer-events-none opacity-40">
            <div className="flex-1 bg-[#166534]" />
            <div className="flex-1 bg-[#15803d]" />
            <div className="flex-1 bg-[#166534]" />
            <div className="flex-1 bg-[#15803d]" />
            <div className="flex-1 bg-[#166534]" />
          </div>

          {/* Football Field Pitch Markings */}
          <div className="absolute inset-2.5 border-2 border-white/80 rounded-2xl pointer-events-none">
            {/* Center Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/80 -translate-x-1/2" />
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            {/* Left Penalty Box */}
            <div className="absolute left-0 top-1/4 bottom-1/4 w-12 border-r-2 border-t-2 border-b-2 border-white/80" />
            {/* Right Goal Net */}
            <div className="absolute right-0 top-1/4 bottom-1/4 w-12 border-l-2 border-t-2 border-b-2 border-white/80 flex items-center justify-center text-xs">
              🥅
            </div>
          </div>

          {/* Clickable Football ⚽ */}
          <div
            onClick={handleKickBall}
            className={`absolute z-30 cursor-pointer transition-all duration-500 ease-out select-none ${
              ballState.kicked ? 'scale-125 rotate-180' : 'hover:scale-130 animate-pulse'
            }`}
            style={{
              left: `${ballState.x}%`,
              top: `${ballState.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            title="Click to Kick Football!"
          >
            <span className="text-2xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">⚽</span>
          </div>

          {/* Campus Mascot Bruno the Dog 🐕 */}
          <div
            onClick={handlePetDog}
            className="absolute left-6 bottom-3 z-30 cursor-pointer hover:scale-125 transition-transform flex flex-col items-center"
            title="Click to pet Bruno the Campus Dog!"
          >
            <span className="text-2xl drop-shadow animate-bounce">🐕</span>
            <span className="bg-amber-950/90 text-amber-200 text-[8px] font-mono px-1 rounded border border-amber-400/40">
              Bruno (Pet Me!)
            </span>
          </div>

          {/* Central Campus Banner */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-white/20 text-[9px] font-mono text-emerald-300 font-bold pointer-events-none">
            ⚽ CAMPUS SPORTS TURF
          </div>
        </div>

        {/* ============================================================ */}
        {/* INTERACTIVE EASTER EGGS IN SURROUNDING CAMPUS LAWN */}
        {/* ============================================================ */}

        {/* Campus Wishing Fountain ⛲ (Top Center Plaza) */}
        <div
          onClick={handleFountain}
          className="absolute left-1/2 -translate-x-1/2 top-[29%] z-20 cursor-pointer hover:scale-110 transition-transform flex flex-col items-center group pointer-events-auto"
          title="Click to throw ₹1 coin and pray for attendance!"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-950 text-cyan-300 text-[9px] font-mono px-2 py-0.5 rounded border border-cyan-400/40 mb-0.5 whitespace-nowrap">
            Fountain [Toss ₹1 Coin]
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-950/90 border-2 border-cyan-400 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse">
            ⛲
          </div>
        </div>

        {/* Famous Campus Mango Tree 🌳 (Left Quad) */}
        <div
          onClick={handleMangoTree}
          className="absolute left-[30%] top-[48%] z-20 cursor-pointer hover:scale-110 transition-transform flex flex-col items-center group pointer-events-auto"
          title="Click the Mango Tree!"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-950 text-emerald-300 text-[9px] font-mono px-2 py-0.5 rounded border border-emerald-400/40 mb-0.5 whitespace-nowrap">
            Campus Mango Tree
          </div>
          <div className="text-4xl drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]">
            🌳
          </div>
          <span className="text-xs -mt-3">🥭</span>
        </div>

        {/* Campus Cat on Canteen Wall 🐈 (Right Quad) */}
        <div
          onClick={handlePetCat}
          className="absolute right-[30%] top-[48%] z-20 cursor-pointer hover:scale-125 transition-transform flex flex-col items-center group pointer-events-auto"
          title="Click to pet Campus Cat!"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-amber-950 text-amber-300 text-[9px] font-mono px-2 py-0.5 rounded border border-amber-400/40 mb-0.5 whitespace-nowrap">
            Canteen Cat [Pet]
          </div>
          <div className="text-2xl drop-shadow animate-bounce">
            🐈
          </div>
        </div>

        {/* Decorative Park Benches & Streetlamps */}
        {[
          { x: '24%', y: '36%', icon: '🪑' },
          { x: '76%', y: '36%', icon: '🪑' },
          { x: '24%', y: '64%', icon: '🏮' },
          { x: '76%', y: '64%', icon: '🏮' }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`absolute text-xl pointer-events-none drop-shadow select-none ${
              isNightMode && item.icon === '🏮' ? 'animate-pulse text-amber-300 drop-shadow-[0_0_15px_#fde047]' : ''
            }`}
            style={{ left: item.x, top: item.y }}
          >
            {item.icon}
          </div>
        ))}

        {/* Campus Trees & Flowers */}
        {[
          { x: '4%', y: '44%', icon: '🌲' },
          { x: '92%', y: '44%', icon: '🌲' },
          { x: '35%', y: '12%', icon: '🌸' },
          { x: '65%', y: '12%', icon: '🌻' },
          { x: '35%', y: '88%', icon: '🌼' },
          { x: '65%', y: '88%', icon: '🌸' }
        ].map((plant, idx) => (
          <div
            key={idx}
            className="absolute text-lg pointer-events-none select-none drop-shadow"
            style={{ left: plant.x, top: plant.y }}
          >
            {plant.icon}
          </div>
        ))}

        {/* ============================================================ */}
        {/* 6 GAMIFIED 3D LANDMARK CARDS */}
        {/* ============================================================ */}

        {/* 1. AC LIBRARY (Top-Left) */}
        <div
          onClick={() => handleSelect(CAMPUS_LOCATIONS[0])}
          className={`absolute left-4 top-4 w-48 p-3 rounded-2xl border-2 transition-all cursor-pointer z-30 group ${
            selectedLocation?.id === 'library'
              ? 'bg-gradient-to-b from-blue-950 to-slate-950 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.8)] scale-105 ring-2 ring-cyan-400'
              : 'bg-slate-950/90 border-blue-600/40 hover:border-cyan-400 hover:scale-102'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-bounce">📚</span>
              <div>
                <h4 className="font-black text-xs text-white uppercase tracking-wide">Library</h4>
                <span className="text-[9px] font-mono text-cyan-300">18°C AC OASIS</span>
              </div>
            </div>
            <span className="text-xs">❄️</span>
          </div>
          <p className="text-[10px] text-slate-300 line-clamp-1">AC Sleeping Zone</p>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-cyan-400 border-t border-white/10 pt-1">
            <span>🤫 0 dB SILENCE</span>
            <span>[Nap Rating 10/10]</span>
          </div>
        </div>

        {/* 2. CLASSROOM 302 (Top-Center) */}
        <div
          onClick={() => handleSelect(CAMPUS_LOCATIONS[1])}
          className={`absolute left-1/2 -translate-x-1/2 top-3 w-52 p-3 rounded-2xl border-2 transition-all cursor-pointer z-30 group ${
            selectedLocation?.id === 'classroom'
              ? 'bg-gradient-to-b from-purple-950 to-slate-950 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.8)] scale-105 ring-2 ring-purple-400'
              : 'bg-slate-950/90 border-purple-600/40 hover:border-purple-400 hover:scale-102'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-bounce">🏫</span>
              <div>
                <h4 className="font-black text-xs text-white uppercase tracking-wide">Classroom 302</h4>
                <span className="text-[9px] font-mono text-amber-400">⚠️ HOD DANGER</span>
              </div>
            </div>
            <span className="text-xs">⏰</span>
          </div>
          <p className="text-[10px] text-slate-300 line-clamp-1">Backbenchers Survival Hub</p>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-purple-300 border-t border-white/10 pt-1">
            <span>75% ATTENDANCE</span>
            <span>[Backbench 100%]</span>
          </div>
        </div>

        {/* 3. CANTEEN (Top-Right - The #1 Spot!) */}
        <div
          onClick={() => handleSelect(CAMPUS_LOCATIONS[2])}
          className={`absolute right-4 top-4 w-52 p-3.5 rounded-2xl border-2 transition-all cursor-pointer z-30 group ${
            selectedLocation?.id === 'canteen'
              ? 'bg-gradient-to-b from-amber-950 via-[#261408] to-slate-950 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.9)] scale-106 ring-2 ring-amber-400'
              : 'bg-slate-950/90 border-amber-500/50 hover:border-amber-400 hover:scale-102'
          }`}
        >
          {/* Decorative Striped Awning Accent */}
          <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-yellow-500 mb-1.5" />

          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-bounce">🍴</span>
              <div>
                <h4 className="font-black text-sm text-amber-300 uppercase tracking-wider">Canteen</h4>
                <span className="text-[9px] font-mono text-amber-400">TEA & SAMOSA HQ</span>
              </div>
            </div>
            <span className="text-[9px] font-black font-mono text-slate-950 bg-amber-400 px-1.5 py-0.5 rounded shadow">
              #1 SPOT
            </span>
          </div>
          <p className="text-[10px] text-slate-200">The true center of student gravity</p>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-amber-300 border-t border-white/10 pt-1">
            <span className="flex items-center gap-1">☕ Chai Hot</span>
            <span>[Bunk Safe 99%]</span>
          </div>
        </div>

        {/* 4. BUS STOP (Bottom-Left with Yellow Bus) */}
        <div
          onClick={() => handleSelect(CAMPUS_LOCATIONS[3])}
          className={`absolute left-4 bottom-4 w-48 p-3 rounded-2xl border-2 transition-all cursor-pointer z-30 group ${
            selectedLocation?.id === 'bus_stop'
              ? 'bg-gradient-to-b from-yellow-950 to-slate-950 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.8)] scale-105 ring-2 ring-yellow-400'
              : 'bg-slate-950/90 border-yellow-600/40 hover:border-yellow-400 hover:scale-102'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span
                onClick={handleHonkBus}
                className="text-2xl animate-pulse hover:scale-130 transition-transform cursor-pointer"
                title="Click Bus to Honk!"
              >
                🚌
              </span>
              <div>
                <h4 className="font-black text-xs text-white uppercase tracking-wide">Bus Stop</h4>
                <span className="text-[9px] font-mono text-yellow-300">8:45 AM PANIC</span>
              </div>
            </div>
            <span className="text-xs" onClick={handleHonkBus}>📢</span>
          </div>
          <p className="text-[10px] text-slate-300 line-clamp-1">Click bus to honk!</p>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-yellow-300 border-t border-white/10 pt-1">
            <span>BUS #7 ACTIVE</span>
            <span>[Late Rate 94%]</span>
          </div>
        </div>

        {/* 5. HOSTEL (Bottom-Center - Spawn Point) */}
        <div
          onClick={() => handleSelect(CAMPUS_LOCATIONS[4])}
          className={`absolute left-1/2 -translate-x-1/2 bottom-4 w-52 p-3 rounded-2xl border-2 transition-all cursor-pointer z-30 group ${
            selectedLocation?.id === 'hostel'
              ? 'bg-gradient-to-b from-cyan-950 to-slate-950 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.8)] scale-105 ring-2 ring-cyan-400'
              : 'bg-slate-950/90 border-cyan-600/40 hover:border-cyan-400 hover:scale-102'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-bounce">🛏️</span>
              <div>
                <h4 className="font-black text-xs text-white uppercase tracking-wide">Hostel Block</h4>
                <span className="text-[9px] font-mono text-cyan-300">SPAWN POINT</span>
              </div>
            </div>
            <span className="text-xs">👕</span>
          </div>
          <p className="text-[10px] text-slate-300 line-clamp-1">4 alarms set, 0 respected</p>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-cyan-300 border-t border-white/10 pt-1">
            <span>ROOM 4B GLOWING</span>
            <span>[Kettle Maggi]</span>
          </div>
        </div>

        {/* 6. GAMING ROOM (Bottom-Right - RGB Cave) */}
        <div
          onClick={() => handleSelect(CAMPUS_LOCATIONS[5])}
          className={`absolute right-4 bottom-4 w-50 p-3 rounded-2xl border-2 transition-all cursor-pointer z-30 group ${
            selectedLocation?.id === 'gaming_room'
              ? 'bg-gradient-to-b from-pink-950 to-slate-950 border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.8)] scale-105 ring-2 ring-pink-400'
              : 'bg-slate-950/90 border-pink-600/40 hover:border-pink-400 hover:scale-102'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-pulse">🎮</span>
              <div>
                <h4 className="font-black text-xs text-white uppercase tracking-wide">Gaming Room</h4>
                <span className="text-[9px] font-mono text-pink-300">RGB WARZONE</span>
              </div>
            </div>
            <span className="text-xs">👾</span>
          </div>
          <p className="text-[10px] text-slate-300 line-clamp-1">Discord 2 AM Screams</p>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-pink-300 border-t border-white/10 pt-1">
            <span>100 Mbps WiFi</span>
            <span>[18ms Ping]</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ANIMATED MINI PLAYER AVATAR (WALKING TO SELECTED DESTINATION) */}
        {/* ============================================================ */}
        <div
          className="absolute z-40 transition-all duration-700 ease-out flex flex-col items-center pointer-events-none"
          style={{
            left: `${currentCoords.x}%`,
            top: `${currentCoords.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Avatar Destination Speech Bubble */}
          <div className="mb-1 bg-white text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xl border border-blue-400 relative whitespace-nowrap animate-bounce">
            🚶 {currentCoords.quote}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-blue-400" />
          </div>

          <div className="scale-75">
            <NPCCharacter
              size="sm"
              avatar={npc?.avatar}
              state={avatarWalkProgress < 1 ? 'WALK' : 'IDLE'}
              facing={avatarFacing}
            />
          </div>

          <div className="bg-slate-950/90 text-white font-mono text-[9px] px-2 py-0.5 rounded-full border border-blue-400/50 mt-0.5 shadow">
            {npc?.name || 'You'}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* GAMIFIED RPG LOCATION INSPECTOR CARD */}
      {/* ================================================================ */}
      <div className="bg-[#111726] border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-400/50 flex items-center justify-center text-3xl shadow-inner animate-bounce">
              {selectedLocation?.icon || '🍴'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white uppercase tracking-wide">
                  {selectedLocation?.name}
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-bold">
                  ✓ Selected Destination
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 italic">
                "{selectedLocation?.tagline}"
              </p>
            </div>
          </div>

          <button
            onClick={() => handleSelect(selectedLocation)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-black tracking-wide shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer transition-all flex items-center gap-2"
          >
            <Footprints className="w-4 h-4" />
            <span>Walk Avatar Here</span>
          </button>
        </div>

        {/* 4 RPG Stat Meters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-3">
            <span className="text-[10px] font-mono text-emerald-400 block font-bold">⚡ ENERGY IMPACT</span>
            <span className="text-xs font-black text-white mt-1 block">{rpgStats.energyBuff}</span>
          </div>
          <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-3">
            <span className="text-[10px] font-mono text-amber-400 block font-bold">🛡️ BUNK SAFETY</span>
            <span className="text-xs font-black text-white mt-1 block">{rpgStats.bunkSafety}</span>
          </div>
          <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-3">
            <span className="text-[10px] font-mono text-purple-400 block font-bold">😴 PROCRASTINATION</span>
            <span className="text-xs font-black text-white mt-1 block">{rpgStats.procrastination}</span>
          </div>
          <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-3">
            <span className="text-[10px] font-mono text-rose-400 block font-bold">🚨 PROFESSOR RISK</span>
            <span className="text-xs font-black text-white mt-1 block">{rpgStats.hodRisk}</span>
          </div>
        </div>

        {/* Hanging Friends at this Location */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
            <span>FRIENDS CURRENTLY HERE:</span>
            <div className="flex items-center gap-2">
              {rpgStats.occupants.map((occ, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-xl border border-white/10 text-white"
                >
                  <span>{occ.avatar}</span>
                  <span className="font-bold text-[11px]">{occ.name}</span>
                  <span className="text-[9px] text-amber-400 font-mono">({occ.role})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Click landmarks or quad objects for secret college lore!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
