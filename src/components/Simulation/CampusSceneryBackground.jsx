import React from 'react';

/**
 * CampusSceneryBackground
 * Renders rich, immersive environmental art, lush trees, architectural details,
 * and campus atmosphere for all 9 college locations.
 */
export default function CampusSceneryBackground({
  currentScenery,
  inventory = [],
  onPickItem,
  onAskQuestion
}) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* ============================================================ */}
      {/* 1. CANTEEN STREET */}
      {/* ============================================================ */}
      {currentScenery === 'canteen' && (
        <div className="absolute inset-0">
          {/* Sky & Distant Campus */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#182942] via-[#0f1d33] to-[#0a1220]" />
          <div className="absolute top-4 left-1/3 text-2xl opacity-30">☁️</div>
          <div className="absolute top-8 right-1/4 text-xl opacity-20">☁️</div>

          {/* Distant College Academic Block Silhouette */}
          <div className="absolute bottom-36 left-0 right-0 h-44 opacity-25 flex items-end justify-between px-10 pointer-events-none">
            <div className="w-28 h-32 bg-slate-700/60 rounded-t-lg border-t border-slate-500/30 flex flex-col items-center pt-2">
              <div className="w-16 h-3 bg-cyan-400/30 rounded-sm mb-2" />
              <div className="w-16 h-3 bg-cyan-400/30 rounded-sm mb-2" />
              <div className="w-16 h-3 bg-cyan-400/30 rounded-sm" />
            </div>
            <div className="w-36 h-40 bg-slate-700/70 rounded-t-xl border-t border-slate-500/30 flex flex-col items-center pt-3">
              <div className="w-6 h-6 rounded-full bg-amber-300/40 mb-3 border border-amber-200/50" />
              <div className="w-20 h-4 bg-cyan-400/30 rounded-sm mb-2" />
              <div className="w-20 h-4 bg-cyan-400/30 rounded-sm" />
            </div>
            <div className="w-32 h-28 bg-slate-700/50 rounded-t-lg" />
          </div>

          {/* Shady Gulmohar & Neem Trees on Street Side */}
          <div className="absolute left-3 top-2 pointer-events-none anim-leaf-sway">
            <svg width="220" height="240" viewBox="0 0 220 240" fill="none">
              {/* Gulmohar Trunk */}
              <path d="M70 240 C75 190 60 140 85 90 C95 70 120 50 140 40" stroke="#3b2010" strokeWidth="16" strokeLinecap="round" />
              <path d="M85 120 C105 105 135 110 155 95" stroke="#3b2010" strokeWidth="9" strokeLinecap="round" />
              <path d="M75 160 C55 145 35 140 20 130" stroke="#3b2010" strokeWidth="8" strokeLinecap="round" />
              {/* Foliage Layers */}
              <circle cx="85" cy="55" r="48" fill="#15803d" opacity="0.9" />
              <circle cx="130" cy="45" r="42" fill="#16a34a" opacity="0.95" />
              <circle cx="160" cy="85" r="36" fill="#22c55e" opacity="0.9" />
              <circle cx="50" cy="75" r="38" fill="#166534" opacity="0.95" />
              <circle cx="105" cy="75" r="45" fill="#15803d" />
              {/* Red Gulmohar Blossom Highlights */}
              <circle cx="75" cy="40" r="6" fill="#ef4444" />
              <circle cx="120" cy="30" r="7" fill="#f87171" />
              <circle cx="150" cy="70" r="6" fill="#ef4444" />
              <circle cx="50" cy="65" r="5" fill="#f87171" />
              <circle cx="100" cy="60" r="7" fill="#dc2626" />
            </svg>
          </div>

          {/* Vintage Chetak Scooter & Bicycle by the curb */}
          <div className="absolute left-32 bottom-36 flex items-end gap-3 opacity-90 z-10">
            <div className="text-3xl drop-shadow-md">🛵</div>
            <div className="text-2xl drop-shadow-md">🚲</div>
          </div>

          {/* Street Lamp Post with Fest Poster */}
          <div className="absolute left-60 bottom-36 flex flex-col items-center pointer-events-none z-10">
            <div className="w-5 h-5 rounded-full bg-amber-300 shadow-[0_0_20px_#f59e0b] border-2 border-amber-100 anim-lamp-glow" />
            <div className="w-1.5 h-36 bg-slate-600 rounded-full" />
            <div className="absolute top-12 left-1.5 bg-rose-600 text-[8px] font-mono text-white px-1 py-0.5 rounded rotate-6 border border-white/20 shadow">
              FEST '26
            </div>
          </div>

          {/* Canteen Shopfront Building (Right Side) */}
          <div
            onClick={(e) => { e.stopPropagation(); onAskQuestion?.("What is fresh in the canteen right now?", 'rahul'); }}
            className="absolute right-4 top-8 w-80 h-66 bg-[#162238] rounded-3xl border-2 border-amber-400/60 p-4 shadow-2xl flex flex-col justify-between pointer-events-auto cursor-pointer group hover:border-amber-400 transition-all z-10"
          >
            {/* Striped Canteen Awning */}
            <div className="w-full bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 border-b-4 border-[#0f4024] py-1.5 px-4 rounded-xl text-center shadow-lg group-hover:brightness-110 transition-all flex items-center justify-between">
              <span className="text-xs">🏮</span>
              <span className="font-retro text-xs sm:text-sm text-yellow-200 tracking-widest">COLLEGE CANTEEN</span>
              <span className="text-xs">🏮</span>
            </div>

            {/* Steaming Chai Counter with Menu */}
            <div className="bg-[#0b121f] rounded-2xl p-2.5 border border-white/10 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <span className="text-3xl animate-bounce block">☕</span>
                  <span className="absolute -top-2 left-2 text-xs text-amber-200 anim-mist">♨️</span>
                </div>
                <div>
                  <span className="font-bold text-xs text-white block">Chechi's Hot Snacks</span>
                  <span className="text-[10px] text-amber-300 font-mono block">Parippuvada • Egg Puff • Chai</span>
                </div>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-500/40">[Ask Rahul]</span>
            </div>

            {/* Outdoor Cafe Stools and Counter */}
            <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/60 p-2 rounded-xl border border-white/5 font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <span>🪑</span>
                <span className="text-emerald-400 font-bold">Chai ₹10</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🥟</span>
                <span className="text-amber-400 font-bold">Puff ₹18</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🍪</span>
                <span className="text-orange-400 font-bold">Samosa ₹15</span>
              </div>
            </div>
          </div>

          {/* Collectible item: Cutting Chai */}
          {!inventory.includes('chai') && (
            <button
              onClick={(e) => { e.stopPropagation(); onPickItem?.('chai', 'Cutting Chai'); }}
              className="absolute left-44 bottom-38 pointer-events-auto cursor-pointer bg-amber-950/95 hover:bg-amber-900 border-2 border-amber-400 text-amber-200 text-xs px-3 py-1.5 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center gap-1.5 animate-bounce transition-all z-20"
              title="Pick up Cutting Chai"
            >
              <span className="text-base">☕</span>
              <span className="font-mono text-[10px] font-bold">Pick Chai</span>
            </button>
          )}

          {/* Paved Brick Roadway & Sidewalk Curb */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-[#162033] border-t-4 border-[#2b3a55]">
            <div className="h-4 bg-[#1f2d47] border-b-2 border-slate-700/60 flex justify-around items-center px-4">
              <div className="w-8 h-1 bg-yellow-400/40 rounded-full" />
              <div className="w-8 h-1 bg-yellow-400/40 rounded-full" />
              <div className="w-8 h-1 bg-yellow-400/40 rounded-full" />
              <div className="w-8 h-1 bg-yellow-400/40 rounded-full" />
              <div className="w-8 h-1 bg-yellow-400/40 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. CLASSROOM 302 */}
      {/* ============================================================ */}
      {currentScenery === 'classroom' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b2537] via-[#0f1728] to-[#080d17]" />

          {/* Arched Windows on Left showing outdoor trees & sunlight */}
          <div className="absolute left-5 top-8 w-24 h-48 bg-cyan-900/20 rounded-t-full border-4 border-slate-600/80 p-1.5 shadow-xl flex flex-col justify-between overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-sky-400/40 via-emerald-400/20 to-emerald-600/30 rounded-t-full relative flex items-center justify-center">
              <span className="text-2xl opacity-70">🌳</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Overhead Ceiling Fans */}
          <div className="absolute left-1/4 top-3 flex flex-col items-center pointer-events-none">
            <div className="w-1 h-6 bg-slate-500" />
            <div className="w-16 h-16 relative flex items-center justify-center anim-fan-spin opacity-70">
              <div className="absolute w-14 h-2 bg-slate-400 rounded-full" />
              <div className="absolute w-2 h-14 bg-slate-400 rounded-full" />
              <div className="w-4 h-4 rounded-full bg-slate-600 z-10" />
            </div>
          </div>

          <div className="absolute right-1/4 top-3 flex flex-col items-center pointer-events-none">
            <div className="w-1 h-6 bg-slate-500" />
            <div className="w-16 h-16 relative flex items-center justify-center anim-fan-spin opacity-70">
              <div className="absolute w-14 h-2 bg-slate-400 rounded-full" />
              <div className="absolute w-2 h-14 bg-slate-400 rounded-full" />
              <div className="w-4 h-4 rounded-full bg-slate-600 z-10" />
            </div>
          </div>

          {/* Big Green Blackboard */}
          <div
            onClick={(e) => { e.stopPropagation(); onAskQuestion?.("Why is the professor staring at our backbench?", 'rahul'); }}
            className="absolute left-1/2 -translate-x-1/2 top-6 w-3/4 max-w-xl h-44 bg-[#114627] rounded-2xl border-4 border-[#78350f] p-4 shadow-2xl flex flex-col justify-between pointer-events-auto cursor-pointer hover:border-amber-400 transition-all z-10"
          >
            <div className="flex justify-between items-center text-xs font-mono text-emerald-200/80 border-b border-emerald-400/30 pb-1">
              <span>MODULE 4 • ENGINEERING MATHEMATICS</span>
              <span className="text-amber-300 font-bold">ATTENDANCE: 74.8% ⚠️</span>
            </div>
            <div className="text-center font-handwritten text-2xl text-yellow-100 leading-tight drop-shadow">
              "Derive Fourier Transform for Question 3 on Page 84!"
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-emerald-200/60">
              <span>📅 Series Exam: Monday 9:30 AM</span>
              <span className="text-cyan-300 font-bold">[Click to Ask Rahul]</span>
            </div>
          </div>

          {/* Notice Board with Pinned Timetable on Right */}
          <div className="absolute right-6 top-10 w-24 h-36 bg-[#854d0e]/60 rounded-xl border-2 border-amber-900/80 p-2 shadow-lg flex flex-col justify-between pointer-events-none z-10">
            <div className="text-[8px] font-mono font-bold text-amber-200 border-b border-amber-400/40 pb-0.5 text-center">NOTICE</div>
            <div className="bg-amber-100/90 text-slate-900 text-[7px] font-mono p-1 rounded rotate-1 shadow">
              📌 PROXY IS STRICTLY FORBIDDEN!
            </div>
            <div className="bg-white/90 text-slate-900 text-[7px] font-mono p-1 rounded -rotate-2 shadow">
              📋 Submissions by 4 PM
            </div>
          </div>

          {/* Collectible item: Signed Lab Record */}
          {!inventory.includes('lab_record') && (
            <button
              onClick={(e) => { e.stopPropagation(); onPickItem?.('lab_record', 'Signed Lab Record'); }}
              className="absolute left-24 bottom-38 pointer-events-auto cursor-pointer bg-emerald-950/95 hover:bg-emerald-900 border-2 border-emerald-400 text-emerald-200 text-xs px-3 py-1.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.6)] flex items-center gap-1.5 animate-bounce transition-all z-20"
              title="Pick up Signed Lab Record"
            >
              <span className="text-base">📋</span>
              <span className="font-mono text-[10px] font-bold">Pick Record</span>
            </button>
          )}

          {/* Classroom Wooden Tiled Floor */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-[#182130] border-t-4 border-[#2f3d54]">
            <div className="h-full w-full opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. LIBRARY AC HALL */}
      {/* ============================================================ */}
      {currentScenery === 'library' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#09152b] via-[#050c1b] to-[#02050f]" />

          {/* Silence Banner */}
          <div className="absolute left-1/2 -translate-x-1/2 top-3 bg-blue-950/95 border-2 border-cyan-400/40 px-5 py-1.5 rounded-full text-xs font-mono font-bold text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2 z-20">
            <span>🤫</span>
            <span>STRICT SILENCE • 18°C AC STUDY ZONE</span>
            <span>📚</span>
          </div>

          {/* Bookshelves Architecture (Left & Center-Left) */}
          <div
            onClick={(e) => { e.stopPropagation(); onAskQuestion?.("Did you study for tomorrow's exam?", 'sneha'); }}
            className="absolute left-8 top-14 w-68 h-64 bg-[#1a233a] rounded-2xl border-2 border-blue-500/50 p-3.5 shadow-2xl flex flex-col justify-between pointer-events-auto cursor-pointer hover:border-cyan-400 transition-colors z-10"
          >
            <div className="text-xs font-bold text-cyan-300 border-b border-white/10 pb-1 flex justify-between items-center">
              <span>📚 CENTRAL ACADEMIC ARCHIVES</span>
              <span className="text-[10px] text-amber-300 font-mono">AISLE 4</span>
            </div>
            <div className="space-y-1.5 text-[10px] text-slate-200 font-mono">
              <div className="bg-blue-900/80 p-1.5 rounded flex justify-between border border-blue-400/30">
                <span>📕 Data Structures & Algorithms</span>
                <span className="text-cyan-300 font-bold">800p</span>
              </div>
              <div className="bg-rose-900/80 p-1.5 rounded flex justify-between border border-rose-400/30">
                <span>📗 Circuit Theory & Networks</span>
                <span className="text-amber-300 font-bold">Vol 2</span>
              </div>
              <div className="bg-amber-900/80 p-1.5 rounded flex justify-between border border-amber-400/30">
                <span>📙 1 Night Before Exam Guide</span>
                <span className="text-emerald-300 font-bold">⭐ Top</span>
              </div>
              <div className="bg-purple-900/80 p-1.5 rounded flex justify-between border border-purple-400/30">
                <span>📘 AI & Neural Networks</span>
                <span className="text-cyan-300 font-bold">2026</span>
              </div>
            </div>
            <span className="text-[9px] font-mono text-cyan-400 text-right">[Ask Sneha for Notes]</span>
          </div>

          {/* Reading Table with Green Banker's Lamp */}
          <div className="absolute right-12 top-18 w-56 h-48 bg-[#151c2e] rounded-2xl border-2 border-emerald-500/40 p-3 shadow-xl flex flex-col justify-between pointer-events-none z-10">
            <div className="flex justify-between items-center">
              <div className="w-8 h-4 rounded-t-full bg-emerald-500 shadow-[0_0_15px_#10b981] border border-emerald-200" />
              <span className="text-[10px] font-mono text-emerald-400 font-bold">STUDY BAY A1</span>
            </div>
            <div className="text-center text-3xl">📖 💻 ☕</div>
            <div className="text-[9px] font-mono text-slate-400 text-center">Reference Journal Section</div>
          </div>

          {/* Indoor Potted Monstera Plant */}
          <div className="absolute left-80 bottom-36 text-4xl opacity-90 z-10">🪴</div>

          {/* Carpeted Silent Library Floor */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-[#0c182c] border-t-4 border-[#1e3a5f]" />
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. HOSTEL ROOM 4B */}
      {/* ============================================================ */}
      {currentScenery === 'hostel' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#181a2e] via-[#0e101f] to-[#06070f]" />

          {/* Window showing Starry Sky */}
          <div className="absolute left-8 top-8 w-28 h-36 bg-[#060a17] rounded-xl border-2 border-purple-500/40 p-2 shadow-xl flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between text-xs">
              <span>⭐</span>
              <span>🌙</span>
            </div>
            <div className="text-right text-[10px]">✨</div>
          </div>

          {/* Fairy Lights on Wall */}
          <div className="absolute top-4 left-44 right-44 flex justify-around text-xs anim-lamp-glow opacity-80">
            <span>🟡</span>
            <span>🟣</span>
            <span>🟢</span>
            <span>🔵</span>
            <span>🟡</span>
            <span>🟣</span>
          </div>

          {/* Wooden Bunk Bed on Left */}
          <div className="absolute left-40 top-12 w-48 h-56 bg-[#261e18] rounded-2xl border-2 border-[#5c4033] p-2.5 shadow-xl flex flex-col justify-between pointer-events-none z-10">
            <div className="bg-[#1b2b45] p-2 rounded-lg border border-blue-400/30 text-[10px] text-blue-200 font-mono flex justify-between">
              <span>Top Bunk</span>
              <span>🛏️ [Kevin]</span>
            </div>
            <div className="text-center text-2xl">💤 🎸</div>
            <div className="bg-[#2d1b45] p-2 rounded-lg border border-purple-400/30 text-[10px] text-purple-200 font-mono flex justify-between">
              <span>Bottom Bunk</span>
              <span>🛏️ [Rahul]</span>
            </div>
          </div>

          {/* RGB Battlestation (Right Side) */}
          <div
            onClick={(e) => { e.stopPropagation(); onAskQuestion?.("Are we playing Valorant tonight?", 'kevin'); }}
            className="absolute right-8 top-10 w-76 h-64 bg-[#16182c] rounded-2xl border-2 border-purple-500/50 p-4 shadow-2xl flex flex-col justify-between pointer-events-auto cursor-pointer hover:border-purple-400 transition-colors z-10"
          >
            <div className="flex justify-between items-center text-xs font-bold text-purple-300">
              <span>💻 RGB BATTLESTATION</span>
              <span className="text-xs font-mono text-emerald-400 font-bold animate-pulse">100 Mbps WiFi</span>
            </div>
            <div className="text-center text-4xl drop-shadow-[0_0_15px_#a855f7] animate-pulse">
              🎧 🖥️ ⌨️
            </div>
            <div className="bg-slate-950 p-2 rounded-xl border border-white/10 text-[10px] font-mono flex justify-between">
              <span className="text-purple-300">DISCORD: #gaming-voice</span>
              <span className="text-emerald-400">● 5 Online</span>
            </div>
            <div className="text-[9px] font-mono text-cyan-400 text-right">[Click to Ask Kevin]</div>
          </div>

          {/* Collectible item: RGB Mousepad */}
          {!inventory.includes('mousepad') && (
            <button
              onClick={(e) => { e.stopPropagation(); onPickItem?.('mousepad', 'RGB Gaming Mousepad'); }}
              className="absolute left-32 bottom-38 pointer-events-auto cursor-pointer bg-purple-950/95 hover:bg-purple-900 border-2 border-purple-400 text-purple-200 text-xs px-3 py-1.5 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.6)] flex items-center gap-1.5 animate-bounce transition-all z-20"
              title="Pick up RGB Mousepad"
            >
              <span className="text-base">🎮</span>
              <span className="font-mono text-[10px] font-bold">Pick Mousepad</span>
            </button>
          )}

          {/* Hostel Room Wooden Parquet Floor */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-[#161826] border-t-4 border-[#2b2e47]" />
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. CAMPUS BUS STOP */}
      {/* ============================================================ */}
      {currentScenery === 'bus_stop' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b2b45] via-[#0f1b2d] to-[#080d16]" />

          {/* Big Shady Roadside Tree Canopy */}
          <div className="absolute left-4 top-2 pointer-events-none anim-leaf-sway">
            <svg width="240" height="220" viewBox="0 0 240 220" fill="none">
              <path d="M80 220 C85 170 70 130 95 80" stroke="#3b2010" strokeWidth="18" strokeLinecap="round" />
              <path d="M90 120 C120 100 160 110 190 90" stroke="#3b2010" strokeWidth="10" strokeLinecap="round" />
              <circle cx="85" cy="55" r="50" fill="#14532d" />
              <circle cx="140" cy="45" r="45" fill="#166534" />
              <circle cx="180" cy="80" r="38" fill="#15803d" />
              <circle cx="50" cy="70" r="40" fill="#16a34a" />
            </svg>
          </div>

          {/* Yellow College Bus No. 7 */}
          <div
            onClick={(e) => { e.stopPropagation(); onAskQuestion?.("Did the 8:45 AM bus leave already?", 'sneha'); }}
            className="absolute right-6 top-10 w-84 h-64 bg-[#ca8a04] rounded-3xl border-4 border-amber-300 p-4 shadow-2xl flex flex-col justify-between pointer-events-auto cursor-pointer hover:border-yellow-200 transition-all z-10"
          >
            <div className="flex justify-between items-center bg-[#854d0e] px-3 py-1.5 rounded-xl border border-yellow-200/40">
              <span className="font-retro text-xs text-white">INSTITUTE BUS NO. 7</span>
              <span className="text-xs font-mono bg-black/50 text-emerald-400 px-2 py-0.5 rounded font-bold">ROUTE 4</span>
            </div>
            <div className="flex justify-around items-center my-2">
              <div className="w-10 h-10 rounded-lg bg-cyan-200/90 border-2 border-slate-900 shadow-inner flex items-center justify-center text-xs">🪟</div>
              <div className="w-10 h-10 rounded-lg bg-cyan-200/90 border-2 border-slate-900 shadow-inner flex items-center justify-center text-xs">🪟</div>
              <div className="w-10 h-10 rounded-lg bg-cyan-200/90 border-2 border-slate-900 shadow-inner flex items-center justify-center text-xs">🪟</div>
              <div className="w-12 h-10 rounded-lg bg-cyan-300 border-2 border-slate-900 flex items-center justify-center text-sm font-bold">🚌</div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-amber-950 font-bold bg-amber-200/90 px-3 py-1 rounded-lg">
              <span>Next Departure: 11:00 AM</span>
              <span className="text-blue-900">[Ask Sneha]</span>
            </div>
          </div>

          {/* Bus Stop Shelter on Left */}
          <div className="absolute left-48 bottom-36 flex flex-col items-center pointer-events-none z-10">
            <div className="w-28 h-4 bg-cyan-700 rounded-t-xl border border-cyan-400/50" />
            <div className="w-24 h-18 bg-slate-900/80 border border-white/20 p-1.5 text-[8px] font-mono text-cyan-300">
              BUS TIMINGS<br />
              08:45 AM • 11:00 AM<br />
              01:15 PM • 04:30 PM
            </div>
            <div className="text-xl">🪑</div>
          </div>

          {/* Asphalt Road with White Dashed Center Markings */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-[#161c26] border-t-4 border-[#2b3547]">
            <div className="h-full flex items-center justify-around">
              <div className="w-12 h-2 bg-white/40 rounded-full" />
              <div className="w-12 h-2 bg-white/40 rounded-full" />
              <div className="w-12 h-2 bg-white/40 rounded-full" />
              <div className="w-12 h-2 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. MANGO TREE CORNER (EXPANDED WITH RICH ENVIRONMENT ART!) */}
      {/* ============================================================ */}
      {currentScenery === 'mango_tree' && (
        <div className="absolute inset-0">
          {/* Deep Campus Golden-Hour Twilight Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c2e1c] via-[#081f13] to-[#04100a]" />

          {/* Distant College Heritage Clock Tower & Architecture Silhouette */}
          <div className="absolute bottom-36 left-0 right-0 h-48 opacity-20 flex items-end justify-between px-16 pointer-events-none">
            {/* Distant campus trees */}
            <div className="text-5xl">🌲 🌳 🌲</div>
            {/* Clock Tower Silhouette */}
            <div className="w-24 h-44 bg-emerald-950 border-t-2 border-emerald-400/40 rounded-t-2xl flex flex-col items-center pt-2">
              <div className="w-8 h-8 rounded-full bg-amber-300/60 border-2 border-amber-200/80 flex items-center justify-center text-[10px] font-mono font-black text-slate-950">
                10:45
              </div>
              <div className="w-12 h-5 bg-emerald-800/40 rounded mt-3" />
              <div className="w-12 h-5 bg-emerald-800/40 rounded mt-2" />
            </div>
            <div className="text-5xl">🌳 🌲 🌳</div>
          </div>

          {/* ====================================================== */}
          {/* THE GRAND MANGO TREE (Expansive canopy across top) */}
          {/* ====================================================== */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Main Tree Trunk SVG */}
            <svg className="absolute left-0 top-0 w-full h-full" viewBox="0 0 800 490" fill="none">
              {/* Massive Gnarled Trunk rising from bottom-36 at x=140 */}
              <path
                d="M110 354 C120 290 100 220 140 160 C155 135 180 110 230 90 C320 60 460 70 600 50"
                stroke="#2a170a"
                strokeWidth="28"
                strokeLinecap="round"
              />
              {/* Branch spreading left */}
              <path
                d="M135 180 C110 160 80 150 40 140"
                stroke="#2a170a"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Branch spreading center-right */}
              <path
                d="M210 105 C260 130 330 140 420 135"
                stroke="#2a170a"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Branch spreading top-right */}
              <path
                d="M340 75 C400 60 490 55 580 70"
                stroke="#2a170a"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Branch texture bark lines */}
              <path d="M120 340 C125 290 115 240 145 190" stroke="#3d2311" strokeWidth="4" strokeLinecap="round" />
              <path d="M132 350 C138 310 130 260 155 210" stroke="#1d1007" strokeWidth="4" strokeLinecap="round" />
            </svg>

            {/* Layered Foliage Crowns Spanning the Upper Canvas */}
            {/* Left Canopy */}
            <div className="absolute left-4 top-2 anim-leaf-sway">
              <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
                <circle cx="80" cy="80" r="65" fill="#14532d" opacity="0.95" />
                <circle cx="140" cy="70" r="58" fill="#166534" opacity="0.95" />
                <circle cx="110" cy="110" r="52" fill="#15803d" />
                <circle cx="60" cy="110" r="48" fill="#16a34a" opacity="0.9" />
              </svg>
            </div>

            {/* Center-Top Lush Canopy */}
            <div className="absolute left-48 top-0 anim-leaf-sway" style={{ animationDelay: '1.2s' }}>
              <svg width="340" height="190" viewBox="0 0 340 190" fill="none">
                <circle cx="100" cy="65" r="70" fill="#14532d" />
                <circle cx="180" cy="55" r="65" fill="#15803d" />
                <circle cx="260" cy="70" r="58" fill="#166534" />
                <circle cx="140" cy="95" r="55" fill="#16a34a" opacity="0.95" />
                <circle cx="220" cy="100" r="50" fill="#22c55e" opacity="0.85" />
              </svg>
            </div>

            {/* Right-Top Sprawling Canopy */}
            <div className="absolute right-0 top-0 anim-leaf-sway" style={{ animationDelay: '2.4s' }}>
              <svg width="300" height="180" viewBox="0 0 300 180" fill="none">
                <circle cx="120" cy="60" r="65" fill="#14532d" />
                <circle cx="200" cy="50" r="60" fill="#15803d" />
                <circle cx="160" cy="95" r="52" fill="#16a34a" />
              </svg>
            </div>

            {/* Clusters of Plump Golden Mangoes Hanging from Stems */}
            <div className="absolute left-28 top-28 flex items-center gap-1">
              <span className="text-xl animate-bounce" style={{ animationDuration: '3.2s' }}>🥭</span>
              <span className="text-xs text-emerald-300">🍃</span>
            </div>
            <div className="absolute left-56 top-24 flex items-center gap-1">
              <span className="text-2xl animate-bounce" style={{ animationDuration: '4.1s' }}>🥭</span>
              <span className="text-xs text-emerald-300">🍃</span>
            </div>
            <div className="absolute left-84 top-20 flex items-center gap-1">
              <span className="text-xl animate-bounce" style={{ animationDuration: '3.6s' }}>🥭</span>
            </div>
            <div className="absolute left-1/2 top-24 flex items-center gap-1">
              <span className="text-2xl animate-bounce" style={{ animationDuration: '4.8s' }}>🥭</span>
              <span className="text-xs text-emerald-300">🍃</span>
            </div>
            <div className="absolute right-52 top-22 flex items-center gap-1">
              <span className="text-xl animate-bounce" style={{ animationDuration: '3.9s' }}>🥭</span>
            </div>

            {/* Cozy Warm Fairy Lights & Festival Lanterns Hanging Along Branches */}
            <div className="absolute top-16 left-36 right-36 flex justify-around anim-lamp-glow pointer-events-none">
              <span className="text-sm">🏮</span>
              <span className="text-xs text-amber-300">✨</span>
              <span className="text-sm">🏮</span>
              <span className="text-xs text-yellow-200">✨</span>
              <span className="text-sm">🏮</span>
            </div>

            {/* Perched Birds in Tree */}
            <div className="absolute left-40 top-12 text-base">🦜</div>
            <div className="absolute right-44 top-14 text-sm">🐦</div>

            {/* Drifting Leaves Falling to Ground */}
            <div className="absolute left-64 top-28 text-emerald-400 text-sm anim-leaf-drift-1">🍃</div>
            <div className="absolute left-1/2 top-32 text-amber-400 text-xs anim-leaf-drift-2">🍂</div>
            <div className="absolute right-64 top-24 text-emerald-300 text-sm anim-leaf-drift-3">🍃</div>
          </div>

          {/* ====================================================== */}
          {/* THE CIRCULAR STONE BENCH ("Chuvad / Thara") */}
          {/* ====================================================== */}
          {/* Natural Dressed Granite Stone Platform encircling the tree base */}
          <div className="absolute left-16 bottom-36 pointer-events-none z-10 flex items-end">
            {/* The circular stone bench structure */}
            <div className="relative">
              <div className="w-56 h-14 bg-gradient-to-r from-[#334155] via-[#475569] to-[#334155] rounded-2xl border-2 border-slate-400/50 shadow-2xl flex items-center justify-around px-4">
                {/* Stone block grout lines */}
                <div className="w-px h-8 bg-slate-700" />
                <div className="w-px h-8 bg-slate-700" />
                <div className="w-px h-8 bg-slate-700" />
                <div className="w-px h-8 bg-slate-700" />
              </div>
              {/* Stone Bench Top Lip */}
              <div className="absolute -top-2 inset-x-0 h-4 bg-[#64748b] rounded-t-2xl border-t border-slate-300/40 shadow" />

              {/* Student Gear propped on the Stone Bench */}
              <div className="absolute -top-7 left-6 flex items-center gap-2">
                <span className="text-3xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">🎸</span>
                <span className="text-lg">☕</span>
                <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/40">Physics Vol 1</span>
              </div>
            </div>
          </div>

          {/* Campus Direction Wooden Signpost on Left */}
          <div className="absolute left-3 bottom-36 pointer-events-none z-10 flex flex-col items-center">
            {/* Sign Boards */}
            <div className="bg-[#78350f] text-yellow-200 text-[8px] font-mono px-2 py-0.5 rounded border border-amber-900 shadow -rotate-3 mb-1">
              ⬅ CANTEEN 50m
            </div>
            <div className="bg-[#92400e] text-white text-[8px] font-mono px-2 py-0.5 rounded border border-amber-900 shadow rotate-2 mb-1">
              LIBRARY 100m ➡
            </div>
            <div className="bg-[#78350f] text-emerald-300 text-[8px] font-mono px-2 py-0.5 rounded border border-amber-900 shadow -rotate-1">
              AUDITORIUM ⬆
            </div>
            {/* Wooden Post */}
            <div className="w-2 h-20 bg-[#451a03] rounded-sm" />
          </div>

          {/* Interactive Hangout Info Card (Right Side) */}
          <div
            onClick={(e) => { e.stopPropagation(); onAskQuestion?.("Any advice for surviving engineering?", 'rahul'); }}
            className="absolute right-8 top-14 w-76 h-58 bg-[#102418]/90 backdrop-blur-md rounded-3xl border-2 border-emerald-500/50 p-4 shadow-2xl flex flex-col justify-between pointer-events-auto cursor-pointer hover:border-emerald-400 hover:scale-102 transition-all z-10"
          >
            <div className="flex justify-between items-center text-xs font-bold text-emerald-300 border-b border-emerald-400/20 pb-1.5">
              <span className="flex items-center gap-1.5">
                <span>🌿</span>
                <span>MANGO TREE BENCH</span>
              </span>
              <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40 font-mono">
                HQ SPOT
              </span>
            </div>

            <div className="bg-[#08150e] rounded-xl p-2.5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-pulse">🥭</span>
                <div>
                  <span className="text-xs text-white font-bold block">Favorite Hangout Corner</span>
                  <span className="text-[10px] text-emerald-300 font-mono">Chai, Guitar & Bunk Discussions</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-emerald-200/80 bg-emerald-950/60 p-2 rounded-xl border border-emerald-500/20">
              <span>🍃 Shaded Comfort 24/7</span>
              <span className="text-cyan-300 font-bold">[Click to Ask Rahul]</span>
            </div>
          </div>

          {/* Earthy Lawn Floor with Grass Tufts, Stepping Stones, and Fallen Mangoes */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-b from-[#143320] via-[#0f2719] to-[#0a1b11] border-t-4 border-[#1e4a2e]">
            {/* Stepping Stones Path */}
            <div className="h-full flex items-center justify-around px-8 opacity-70">
              <div className="w-10 h-6 bg-[#334155] rounded-full border border-slate-500/40" />
              <div className="w-12 h-7 bg-[#334155] rounded-full border border-slate-500/40 -translate-y-2" />
              <div className="w-10 h-6 bg-[#334155] rounded-full border border-slate-500/40 translate-y-1" />
              <div className="w-11 h-6 bg-[#334155] rounded-full border border-slate-500/40 -translate-y-1" />
              <div className="w-10 h-6 bg-[#334155] rounded-full border border-slate-500/40" />
            </div>

            {/* Fallen Mangoes & Wildflowers on Ground */}
            <div className="absolute top-2 left-28 text-base">🥭</div>
            <div className="absolute top-3 left-64 text-sm">🌼</div>
            <div className="absolute top-2 left-1/2 text-sm">🌸</div>
            <div className="absolute top-4 right-44 text-base">🥭</div>
            <div className="absolute top-2 right-20 text-sm">🌼</div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. COMPUTER LAB 101 */}
      {/* ============================================================ */}
      {currentScenery === 'computer_lab' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#06101e] to-[#02070e]" />

          {/* AC Ventilation Duct blowing Frost Mist */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 bg-slate-900 border-2 border-cyan-400/50 px-4 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] z-20">
            <span className="text-cyan-400 animate-spin">❄️</span>
            <span>HIGH-SPEED COMPUTING LAB • 16°C CHILL</span>
            <span className="text-xs text-cyan-200 anim-mist">💨</span>
          </div>

          {/* Server Rack & Terminal (Left Side) */}
          <div
            onClick={(e) => { e.stopPropagation(); onAskQuestion?.("Is the proxy working for gaming?", 'kevin'); }}
            className="absolute left-8 top-12 w-76 h-64 bg-[#09182d] rounded-2xl border-2 border-cyan-500/40 p-4 shadow-2xl flex flex-col justify-between pointer-events-auto cursor-pointer hover:border-cyan-400 transition-colors z-10"
          >
            <div className="flex justify-between items-center text-xs font-bold text-cyan-300">
              <span>💻 LINUX WORKSTATION #12</span>
              <span className="text-xs font-mono text-emerald-400 font-bold animate-pulse">● ONLINE</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-cyan-500/30 font-mono text-[10px] text-emerald-400 space-y-1 shadow-inner">
              <div>$ sudo systemctl status proxy</div>
              <div className="text-cyan-300">&gt; Port 8080: Bypassing Firewall...</div>
              <div>$ ping 1.1.1.1: 8ms latency</div>
              <div className="text-yellow-300">$ start steam_game.sh</div>
            </div>
            <div className="text-[10px] font-mono text-cyan-400 text-right">[Click to Ask Kevin for Gaming Proxy]</div>
          </div>

          {/* Rows of Glowing Workstations on Right */}
          <div className="absolute right-12 top-14 flex gap-4 pointer-events-none z-10">
            <div className="w-24 h-40 bg-[#0d1f38] rounded-xl border border-blue-400/30 p-2 flex flex-col justify-between items-center shadow-lg">
              <div className="w-18 h-12 bg-cyan-950 rounded border border-cyan-400/40 flex items-center justify-center text-xs font-mono text-cyan-300">C++</div>
              <div className="text-xl">⌨️</div>
            </div>
            <div className="w-24 h-40 bg-[#0d1f38] rounded-xl border border-purple-400/30 p-2 flex flex-col justify-between items-center shadow-lg">
              <div className="w-18 h-12 bg-purple-950 rounded border border-purple-400/40 flex items-center justify-center text-xs font-mono text-purple-300">Python</div>
              <div className="text-xl">⌨️</div>
            </div>
          </div>

          {/* Server Rack with Blinking LEDs */}
          <div className="absolute left-88 top-16 w-14 h-44 bg-slate-900 rounded-lg border border-slate-700 p-1 flex flex-col justify-around items-center pointer-events-none z-10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-ping" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          </div>

          {/* Anti-Static Raised Floor */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-[#071324] border-t-4 border-[#142948]" />
        </div>
      )}

      {/* ============================================================ */}
      {/* 8. MAIN CAMPUS GATE */}
      {/* ============================================================ */}
      {currentScenery === 'campus_gate' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2333] via-[#101521] to-[#090c13]" />

          {/* Grand Classical Stone Archway */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4/5 max-w-xl h-24 bg-gradient-to-r from-[#334155] via-[#475569] to-[#334155] rounded-t-3xl border-4 border-slate-400 p-2 shadow-2xl flex flex-col items-center justify-center z-10">
            <span className="font-retro text-xs sm:text-sm text-yellow-300 tracking-widest text-center">
              COLLEGE OF ENGINEERING
            </span>
            <span className="text-[10px] font-mono text-cyan-300 font-bold">ESTD. 1960 • MAIN ENTRANCE</span>
          </div>

          {/* Bougainvillea Flower Vines on Arch Pillars */}
          <div className="absolute left-16 top-6 text-3xl pointer-events-none anim-leaf-sway">🌺 🌿 🌺</div>
          <div className="absolute right-16 top-6 text-3xl pointer-events-none anim-leaf-sway">🌺 🌿 🌺</div>

          {/* Royal Palm Trees lining the Avenue */}
          <div className="absolute left-8 top-12 text-5xl pointer-events-none opacity-80">🌴</div>
          <div className="absolute left-32 top-18 text-4xl pointer-events-none opacity-70">🌴</div>
          <div className="absolute right-8 top-12 text-5xl pointer-events-none opacity-80">🌴</div>

          {/* Security Guard Booth (Right Side) */}
          <div
            onClick={(e) => { e.stopPropagation(); onAskQuestion?.("Can we leave campus without gate pass?", 'sneha'); }}
            className="absolute right-10 top-14 w-76 h-60 bg-[#162030] rounded-2xl border-2 border-blue-500/50 p-4 shadow-2xl flex flex-col justify-between pointer-events-auto cursor-pointer hover:border-blue-400 transition-colors z-10"
          >
            <div className="flex justify-between items-center text-xs font-bold text-blue-300">
              <span>⛩️ SECURITY CHECKPOST</span>
              <span className="text-xl">🚪</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-xl border border-white/10 text-center font-mono text-xs text-amber-400 font-black shadow-inner">
              GATE PASS REQUIRED AFTER 9 AM
            </div>
            <div className="text-[10px] font-mono text-slate-400 text-center">[Click to Ask Sneha]</div>
          </div>

          {/* Boom Barrier Pole & Auto Rickshaw by Gate */}
          <div className="absolute left-10 bottom-36 flex items-end gap-3 pointer-events-none z-10">
            <div className="text-3xl">🛺</div>
            <div className="w-40 h-2 bg-gradient-to-r from-red-500 via-white to-red-500 rounded-full border border-slate-900 shadow" />
          </div>

          {/* Collectible item: Forged Gate Pass */}
          {!inventory.includes('gate_pass') && (
            <button
              onClick={(e) => { e.stopPropagation(); onPickItem?.('gate_pass', 'Forged Gate Pass'); }}
              className="absolute left-40 bottom-38 pointer-events-auto cursor-pointer bg-rose-950/95 hover:bg-rose-900 border-2 border-rose-400 text-rose-200 text-xs px-3 py-1.5 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.6)] flex items-center gap-1.5 animate-bounce transition-all z-20"
              title="Pick up Forged Gate Pass"
            >
              <span className="text-base">🪪</span>
              <span className="font-mono text-[10px] font-bold">Pick Gate Pass</span>
            </button>
          )}

          {/* Main Entrance Driveway Tarmac */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-[#161a24] border-t-4 border-[#2b3347]">
            {/* Speed Breaker Zebra Stripes */}
            <div className="h-4 bg-yellow-400 flex justify-around items-center px-4">
              <div className="w-6 h-full bg-slate-950" />
              <div className="w-6 h-full bg-slate-950" />
              <div className="w-6 h-full bg-slate-950" />
              <div className="w-6 h-full bg-slate-950" />
              <div className="w-6 h-full bg-slate-950" />
              <div className="w-6 h-full bg-slate-950" />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 9. SPORTS TURF */}
      {/* ============================================================ */}
      {currentScenery === 'turf' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#113a24] via-[#0c2819] to-[#07170f]" />

          {/* Stadium Floodlight Stanchion Towers */}
          <div className="absolute left-6 top-3 flex flex-col items-center pointer-events-none z-10">
            <div className="w-12 h-6 bg-slate-800 rounded border border-amber-300 shadow-[0_0_25px_#fbbf24] flex items-center justify-around px-1">
              <div className="w-2 h-2 rounded-full bg-yellow-200" />
              <div className="w-2 h-2 rounded-full bg-yellow-200" />
              <div className="w-2 h-2 rounded-full bg-yellow-200" />
            </div>
            <div className="w-2 h-36 bg-slate-600" />
          </div>

          <div className="absolute right-6 top-3 flex flex-col items-center pointer-events-none z-10">
            <div className="w-12 h-6 bg-slate-800 rounded border border-amber-300 shadow-[0_0_25px_#fbbf24] flex items-center justify-around px-1">
              <div className="w-2 h-2 rounded-full bg-yellow-200" />
              <div className="w-2 h-2 rounded-full bg-yellow-200" />
              <div className="w-2 h-2 rounded-full bg-yellow-200" />
            </div>
            <div className="w-2 h-36 bg-slate-600" />
          </div>

          {/* Surrounding Tall Palm & Eucalyptus Trees */}
          <div className="absolute left-24 top-6 text-4xl pointer-events-none opacity-80">🌴</div>
          <div className="absolute left-48 top-8 text-3xl pointer-events-none opacity-70">🌲</div>
          <div className="absolute right-28 top-6 text-4xl pointer-events-none opacity-80">🌴</div>

          {/* Football Turf Board (Center Left) */}
          <div
            onClick={(e) => { e.stopPropagation(); onAskQuestion?.("Are we playing football after 4 PM?", 'kevin'); }}
            className="absolute left-1/2 -translate-x-1/2 top-10 w-80 h-58 bg-[#0f2e1d] rounded-2xl border-2 border-emerald-400/60 p-4 shadow-2xl flex flex-col justify-between pointer-events-auto cursor-pointer hover:border-emerald-300 transition-colors z-10"
          >
            <div className="flex justify-between items-center text-xs font-bold text-emerald-300">
              <span>⚽ CAMPUS 5-A-SIDE TURF</span>
              <span className="text-xs font-mono text-yellow-300 bg-yellow-950 px-2 py-0.5 rounded border border-yellow-500/30">MATCH TIME</span>
            </div>
            <div className="text-center text-4xl drop-shadow animate-bounce">🥅 ⚽ 🏟️</div>
            <div className="flex justify-between items-center text-[10px] font-mono text-emerald-300/90 bg-emerald-950/70 p-2 rounded-xl border border-emerald-500/30">
              <span>Hostel A vs Hostel B</span>
              <span className="text-cyan-300 font-bold">[Ask Kevin]</span>
            </div>
          </div>

          {/* Sports Bench with Water Bottles */}
          <div className="absolute right-24 bottom-36 flex items-center gap-2 pointer-events-none z-10">
            <span className="text-2xl">🪑</span>
            <span className="text-lg">🧃 ⚽</span>
          </div>

          {/* Lush Green Turf Ground with Boundary Lines */}
          <div className="absolute bottom-0 inset-x-0 h-36 bg-[#0c2417] border-t-4 border-[#173e28]">
            <div className="h-full flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-2 border-white/30" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
