import React from 'react';

// Specialized animated SVG sprites for all 9 campus characters
export default function CampusNPC({
  charId,
  isSpeaker = false,
  replyText = null,
  onClick,
  className = ''
}) {
  const isSelected = isSpeaker;

  // Character-specific custom SVGs
  const renderCharacterSVG = () => {
    switch (charId) {
      // 1. RAHUL: Chill backbencher, red hoodie, messy hair, holding canteen paper cup with rising steam
      case 'rahul':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg" fill="none">
            <ellipse cx="50" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.35)" />
            {/* Legs */}
            <rect x="37" y="96" width="10" height="30" fill="#1e293b" />
            <rect x="53" y="96" width="10" height="30" fill="#1e293b" />
            <rect x="33" y="122" width="15" height="9" rx="2" fill="#ef4444" />
            <rect x="52" y="122" width="15" height="9" rx="2" fill="#ef4444" />
            {/* Red Hoodie */}
            <rect x="30" y="52" width="40" height="46" rx="7" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
            <path d="M42 52 L50 68 L58 52 Z" fill="#b91c1c" />
            {/* White Hoodie strings */}
            <path d="M46 64 L45 78" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 64 L55 78" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

            {/* Rising Hot Tea Steam (Animated!) */}
            <path d="M71 68 Q68 58 73 50" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
            <path d="M76 66 Q79 56 75 48" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" className="animate-pulse" />

            {/* Hand holding paper tea cup */}
            <rect x="68" y="72" width="10" height="13" rx="2" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
            <ellipse cx="73" cy="72" rx="5" ry="2" fill="#78350f" />
            {/* Head & Skin */}
            <rect x="35" y="24" width="30" height="28" rx="6" fill="#fcd34d" />
            {/* Face */}
            <circle cx="44" cy="36" r="2.5" fill="#1e293b" />
            <circle cx="56" cy="36" r="2.5" fill="#1e293b" />
            <path d="M47 44 Q52 48 57 44" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Messy Brown Hair */}
            <path d="M31 26 Q35 14 50 14 Q65 14 69 26 Q64 20 54 22 Q44 18 31 26 Z" fill="#5c2c16" />
            <rect x="31" y="22" width="8" height="12" rx="3" fill="#5c2c16" />
            <rect x="61" y="22" width="8" height="12" rx="3" fill="#5c2c16" />
          </svg>
        );

      // 2. SNEHA: Responsible Class CR, yellow cardigan, ponytail with coral ribbon, clipboard sparkles
      case 'sneha':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg" fill="none">
            <ellipse cx="50" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.35)" />
            {/* Ponytail behind */}
            <rect x="64" y="14" width="8" height="8" rx="2" fill="#f43f5e" />
            <path d="M68 18 Q86 24 82 52 Q76 46 70 30 Z" fill="#b45309" />
            {/* Legs & Dark Skirt/Pants */}
            <rect x="38" y="96" width="9" height="30" fill="#334155" />
            <rect x="53" y="96" width="9" height="30" fill="#334155" />
            <rect x="34" y="122" width="14" height="9" rx="2" fill="#0f172a" />
            <rect x="52" y="122" width="14" height="9" rx="2" fill="#0f172a" />
            {/* Yellow Knit Cardigan & White Shirt */}
            <rect x="31" y="52" width="38" height="46" rx="7" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
            <rect x="44" y="52" width="12" height="46" fill="#ffffff" />
            {/* Holding CR Clipboard with animated tick sparkles */}
            <rect x="22" y="68" width="16" height="22" rx="2" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
            <rect x="25" y="66" width="10" height="4" rx="1" fill="#cbd5e1" />
            <line x1="26" y1="74" x2="34" y2="74" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="26" y1="78" x2="34" y2="78" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="26" y1="82" x2="31" y2="82" stroke="#ffffff" strokeWidth="1.5" />
            {/* Clipboard pen sparkle */}
            <circle cx="21" cy="65" r="2.5" fill="#38bdf8" className="animate-ping" />
            {/* Head & Glasses */}
            <rect x="35" y="24" width="30" height="28" rx="6" fill="#fed7aa" />
            {/* Spectacles with glint */}
            <rect x="39" y="32" width="9" height="8" rx="2" stroke="#0284c7" strokeWidth="2" fill="none" />
            <rect x="52" y="32" width="9" height="8" rx="2" stroke="#0284c7" strokeWidth="2" fill="none" />
            <line x1="48" y1="36" x2="52" y2="36" stroke="#0284c7" strokeWidth="2" />
            <line x1="40" y1="33" x2="43" y2="35" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="43.5" cy="36" r="2" fill="#1e293b" />
            <circle cx="56.5" cy="36" r="2" fill="#1e293b" />
            <path d="M47 44 Q50 47 53 44" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Blonde/Brown Front Hair with Bangs */}
            <path d="M32 26 Q36 14 50 14 Q64 14 68 26 Q60 22 50 24 Q40 22 32 26 Z" fill="#d97706" />
          </svg>
        );

      // 3. KEVIN: Nocturnal Gamer, green hoodie, big glowing RGB gaming headset, live phone
      case 'kevin':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg" fill="none">
            <defs>
              <linearGradient id="kevinRGB" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.35)" />
            {/* Legs */}
            <rect x="37" y="96" width="10" height="30" fill="#0f172a" />
            <rect x="53" y="96" width="10" height="30" fill="#0f172a" />
            <rect x="33" y="122" width="15" height="9" rx="2" fill="#10b981" />
            <rect x="52" y="122" width="15" height="9" rx="2" fill="#10b981" />
            {/* Emerald Hoodie */}
            <rect x="30" y="52" width="40" height="46" rx="7" fill="#10b981" stroke="#047857" strokeWidth="2" />
            {/* Discord Gamer Logo on chest */}
            <circle cx="50" cy="70" r="6" fill="#064e3b" />
            <circle cx="48" cy="69" r="1.5" fill="#a7f3d0" />
            <circle cx="52" cy="69" r="1.5" fill="#a7f3d0" />
            {/* Holding glowing RGB phone with screen tap */}
            <rect x="45" y="76" width="12" height="18" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="47" y="78" width="8" height="12" rx="1" fill="#38bdf8" />
            <circle cx="51" cy="84" r="2" fill="#22d3ee" className="animate-ping" />
            {/* Head & Skin */}
            <rect x="35" y="24" width="30" height="28" rx="6" fill="#fcd34d" />
            {/* Sleepy gamer eyes */}
            <line x1="41" y1="36" x2="47" y2="36" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="53" y1="36" x2="59" y2="36" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="48" y1="44" x2="52" y2="44" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            {/* Spiky Black Hair */}
            <path d="M32 25 L36 12 L44 18 L50 10 L56 18 L64 12 L68 25 Z" fill="#090d16" />
            {/* Over-Ear Glowing RGB Gaming Headset */}
            <path d="M31 32 C31 16 69 16 69 32" stroke="url(#kevinRGB)" strokeWidth="4.5" strokeLinecap="round" fill="none" className="animate-pulse" />
            <rect x="26" y="27" width="8" height="15" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
            <rect x="66" y="27" width="8" height="15" rx="3" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
          </svg>
        );

      // 4. ASHWIN: Placement Senior, cyan jacket, sunglasses, relaxed confident posture
      case 'ashwin':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg" fill="none">
            <ellipse cx="50" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.35)" />
            {/* Legs */}
            <rect x="37" y="96" width="10" height="30" fill="#1e293b" />
            <rect x="53" y="96" width="10" height="30" fill="#1e293b" />
            <rect x="33" y="122" width="15" height="9" rx="2" fill="#ffffff" />
            <rect x="52" y="122" width="15" height="9" rx="2" fill="#ffffff" />
            {/* Cyan Bomber Jacket & White Inner Shirt */}
            <rect x="30" y="52" width="40" height="46" rx="7" fill="#06b6d4" stroke="#0e7490" strokeWidth="2" />
            <rect x="44" y="52" width="12" height="46" fill="#f8fafc" />
            {/* Head & Skin */}
            <rect x="35" y="24" width="30" height="28" rx="6" fill="#fcd34d" />
            {/* Dark Aviator Sunglasses */}
            <path d="M38 32 Q44 32 46 38 Q42 42 38 40 Z" fill="#0f172a" />
            <path d="M54 32 Q60 32 62 40 Q58 42 54 38 Z" fill="#0f172a" />
            <line x1="46" y1="34" x2="54" y2="34" stroke="#38bdf8" strokeWidth="2" />
            {/* Confident Smile */}
            <path d="M46 45 Q50 49 55 45" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Slick Modern Hair */}
            <path d="M33 24 Q36 12 52 14 Q66 16 67 25 Q58 20 48 20 Q38 20 33 24 Z" fill="#18181b" />
          </svg>
        );

      // 5. ANANYA: Coding Prodigy, pink hoodie, round specs, laptop bag, wavy hair
      case 'ananya':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg" fill="none">
            <ellipse cx="50" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.35)" />
            {/* Wavy hair behind back */}
            <rect x="26" y="24" width="48" height="44" rx="8" fill="#4c0519" />
            {/* Legs */}
            <rect x="38" y="96" width="9" height="30" fill="#334155" />
            <rect x="53" y="96" width="9" height="30" fill="#334155" />
            <rect x="34" y="122" width="14" height="9" rx="2" fill="#ec4899" />
            <rect x="52" y="122" width="14" height="9" rx="2" fill="#ec4899" />
            {/* Pink Tech Hoodie */}
            <rect x="31" y="52" width="38" height="46" rx="7" fill="#ec4899" stroke="#be185d" strokeWidth="2" />
            {/* Laptop Bag Sling */}
            <line x1="32" y1="54" x2="68" y2="88" stroke="#475569" strokeWidth="3.5" />
            <rect x="58" y="74" width="14" height="18" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            {/* Head & Round Spectacles */}
            <rect x="35" y="24" width="30" height="28" rx="6" fill="#fed7aa" />
            <circle cx="43" cy="36" r="4.5" stroke="#ec4899" strokeWidth="1.5" fill="none" />
            <circle cx="57" cy="36" r="4.5" stroke="#ec4899" strokeWidth="1.5" fill="none" />
            <line x1="47.5" y1="36" x2="52.5" y2="36" stroke="#ec4899" strokeWidth="1.5" />
            <circle cx="43" cy="36" r="2" fill="#0f172a" />
            <circle cx="57" cy="36" r="2" fill="#0f172a" />
            <path d="M47 45 Q50 48 53 45" stroke="#be185d" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Dark Hair with Violet Tint */}
            <path d="M31 26 Q35 14 50 14 Q65 14 69 26 Q59 20 48 22 Q39 20 31 26 Z" fill="#831843" />
          </svg>
        );

      // 6. CHECHI: Canteen Queen, warm smile, hair bun with flowers, Kerala sari & apron, holding tea glass
      case 'chechi':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg" fill="none">
            <ellipse cx="50" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.35)" />
            {/* Hair Bun with Jasmine Flowers */}
            <circle cx="50" cy="12" r="10" fill="#18181b" />
            <circle cx="44" cy="14" r="3" fill="#fef08a" />
            <circle cx="50" cy="8" r="3" fill="#ffffff" />
            <circle cx="56" cy="14" r="3" fill="#ffffff" />
            {/* Feet */}
            <rect x="36" y="124" width="12" height="7" rx="2" fill="#78350f" />
            <rect x="52" y="124" width="12" height="7" rx="2" fill="#78350f" />
            {/* Orange Canteen Apron & Sari */}
            <rect x="30" y="52" width="40" height="72" rx="6" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
            <rect x="38" y="52" width="24" height="34" fill="#ffedd5" />
            {/* Tea Serving Glass in hand */}
            <rect x="68" y="74" width="11" height="15" rx="1" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
            <rect x="69" y="78" width="9" height="9" fill="#92400e" />
            {/* Head & Warm Face */}
            <rect x="35" y="22" width="30" height="30" rx="7" fill="#fed7aa" />
            {/* Red Bindi */}
            <circle cx="50" cy="29" r="2.5" fill="#dc2626" />
            {/* Gentle Eyes & Smile */}
            <circle cx="43" cy="36" r="2.5" fill="#1e293b" />
            <circle cx="57" cy="36" r="2.5" fill="#1e293b" />
            <path d="M44 44 Q50 51 56 44" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Side Hair */}
            <path d="M33 24 Q38 18 50 18 Q62 18 67 24 Q62 21 50 21 Q38 21 33 24 Z" fill="#18181b" />
          </svg>
        );

      // 7. GUARD APPUKUTTAN: Security uniform, peak cap with gold badge, whistle, walkie-talkie
      case 'guard':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg" fill="none">
            <ellipse cx="50" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.35)" />
            {/* Legs & Dark Boots */}
            <rect x="36" y="96" width="11" height="30" fill="#1e3a8a" />
            <rect x="53" y="96" width="11" height="30" fill="#1e3a8a" />
            <rect x="32" y="122" width="16" height="10" rx="2" fill="#090d16" />
            <rect x="52" y="122" width="16" height="10" rx="2" fill="#090d16" />
            {/* Khaki / Blue Guard Uniform */}
            <rect x="28" y="52" width="44" height="46" rx="6" fill="#2563eb" stroke="#1e40af" strokeWidth="2" />
            {/* Gold Badge & Epaulets */}
            <rect x="26" y="52" width="10" height="4" fill="#fbbf24" />
            <rect x="64" y="52" width="10" height="4" fill="#fbbf24" />
            <circle cx="38" cy="62" r="3.5" fill="#f59e0b" />
            {/* Whistle lanyard */}
            <line x1="48" y1="52" x2="52" y2="72" stroke="#e2e8f0" strokeWidth="2" />
            <rect x="50" y="70" width="5" height="8" rx="1" fill="#e2e8f0" />
            {/* Head & Stern Face */}
            <rect x="35" y="24" width="30" height="28" rx="6" fill="#fcd34d" />
            {/* Security Peak Cap */}
            <rect x="28" y="14" width="44" height="12" rx="4" fill="#1e3a8a" />
            <rect x="26" y="24" width="48" height="4" rx="2" fill="#0f172a" />
            <circle cx="50" cy="20" r="3" fill="#fbbf24" />
            {/* Moustache */}
            <circle cx="43" cy="36" r="2.5" fill="#1e293b" />
            <circle cx="57" cy="36" r="2.5" fill="#1e293b" />
            <path d="M42 42 Q50 39 58 42 Q50 45 42 42 Z" fill="#334155" />
          </svg>
        );

      // 8. BRUNO: Campus Golden Mascot Dog, wagging tail, floppy ears, red collar
      case 'bruno':
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg" fill="none">
            <ellipse cx="50" cy="134" rx="30" ry="6" fill="rgba(0,0,0,0.35)" />
            {/* Wagging Tail */}
            <path
              d="M75 95 Q92 75 88 60"
              stroke="#d97706"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              className="animate-pulse"
            />
            {/* Dog Body (Sitting) */}
            <rect x="30" y="78" width="42" height="44" rx="16" fill="#f59e0b" />
            {/* Paws */}
            <ellipse cx="38" cy="126" rx="8" ry="6" fill="#d97706" />
            <ellipse cx="62" cy="126" rx="8" ry="6" fill="#d97706" />
            {/* Red Collar with Gold Tag */}
            <rect x="32" y="68" width="36" height="7" rx="3" fill="#ef4444" />
            <circle cx="50" cy="76" r="3.5" fill="#fbbf24" />
            {/* Dog Head */}
            <circle cx="50" cy="50" r="20" fill="#f59e0b" />
            {/* Floppy Ears */}
            <ellipse cx="32" cy="46" rx="6" ry="14" fill="#b45309" transform="rotate(-15 32 46)" />
            <ellipse cx="68" cy="46" rx="6" ry="14" fill="#b45309" transform="rotate(15 68 46)" />
            {/* Snout */}
            <ellipse cx="50" cy="56" rx="9" ry="7" fill="#fef3c7" />
            {/* Black Nose */}
            <ellipse cx="50" cy="53" rx="4" ry="3" fill="#0f172a" />
            {/* Happy Eyes */}
            <circle cx="43" cy="44" r="2.5" fill="#0f172a" />
            <circle cx="57" cy="44" r="2.5" fill="#0f172a" />
            {/* Panting Pink Tongue */}
            <path d="M48 60 Q50 68 53 60 Z" fill="#f43f5e" />
          </svg>
        );

      // 9. PROF. KURIAN: Strict HOD, purple tie, spectacles, grey mustache, register book
      default:
        return (
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg" fill="none">
            <ellipse cx="50" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.35)" />
            {/* Legs */}
            <rect x="36" y="96" width="11" height="30" fill="#1e293b" />
            <rect x="53" y="96" width="11" height="30" fill="#1e293b" />
            <rect x="32" y="122" width="16" height="9" rx="2" fill="#0f172a" />
            <rect x="52" y="122" width="16" height="9" rx="2" fill="#0f172a" />
            {/* Formal Purple/Lavender Shirt & Tie */}
            <rect x="28" y="52" width="44" height="46" rx="6" fill="#a855f7" stroke="#7e22ce" strokeWidth="2" />
            <polygon points="46,52 54,52 52,80 48,80" fill="#3b0764" />
            {/* Attendance Register held under arm */}
            <rect x="20" y="68" width="16" height="26" rx="2" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1.5" />
            <rect x="24" y="70" width="8" height="22" fill="#fef2f2" />
            {/* Head & Skin */}
            <rect x="35" y="24" width="30" height="28" rx="6" fill="#fcd34d" />
            {/* Receding Grey Hair */}
            <path d="M33 26 Q35 15 50 16 Q65 15 67 26 Q62 22 50 24 Q38 22 33 26 Z" fill="#64748b" />
            <rect x="33" y="24" width="5" height="12" fill="#64748b" />
            <rect x="62" y="24" width="5" height="12" fill="#64748b" />
            {/* Wire-Rim Glasses */}
            <rect x="38" y="32" width="10" height="8" rx="2" stroke="#475569" strokeWidth="1.5" fill="none" />
            <rect x="52" y="32" width="10" height="8" rx="2" stroke="#475569" strokeWidth="1.5" fill="none" />
            <line x1="48" y1="36" x2="52" y2="36" stroke="#475569" strokeWidth="1.5" />
            <circle cx="43" cy="36" r="2" fill="#0f172a" />
            <circle cx="57" cy="36" r="2" fill="#0f172a" />
            {/* Grey Mustache */}
            <path d="M42 43 Q50 40 58 43 Q50 46 42 43 Z" fill="#64748b" />
          </svg>
        );
    }
  };

  const characterMeta = {
    rahul: { name: 'Rahul', role: 'Backbench Partner', color: 'border-red-500 bg-red-950/80 text-red-300' },
    sneha: { name: 'Sneha', role: 'Class CR', color: 'border-amber-500 bg-amber-950/80 text-amber-300' },
    kevin: { name: 'Kevin', role: 'Hostel Gamer', color: 'border-emerald-500 bg-emerald-950/80 text-emerald-300' },
    ashwin: { name: 'Ashwin', role: 'Placement Senior', color: 'border-cyan-500 bg-cyan-950/80 text-cyan-300' },
    ananya: { name: 'Ananya', role: 'Coding Prodigy', color: 'border-pink-500 bg-pink-950/80 text-pink-300' },
    chechi: { name: 'Chechi', role: 'Snack Queen', color: 'border-orange-500 bg-orange-950/80 text-orange-300' },
    guard: { name: 'Guard', role: 'Appukuttan', color: 'border-blue-500 bg-blue-950/80 text-blue-300' },
    bruno: { name: 'Bruno', role: 'Campus Dog', color: 'border-yellow-500 bg-yellow-950/80 text-yellow-300' },
    prof: { name: 'Prof. Kurian', role: 'Strict HOD', color: 'border-purple-500 bg-purple-950/80 text-purple-300' }
  }[charId] || { name: charId, role: 'NPC', color: 'border-slate-500 bg-slate-900 text-slate-300' };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(charId);
      }}
      className={`relative group cursor-pointer transition-all duration-300 select-none flex flex-col items-center pointer-events-auto ${
        isSelected ? 'z-40' : 'z-20'
      } ${className}`}
    >
      {/* Full Speech Bubble (Never truncated, fully readable) */}
      {isSelected && replyText && (
        <div className="absolute bottom-[108%] left-1/2 -translate-x-1/2 z-50 w-64 sm:w-80 max-w-[85vw] p-3 rounded-2xl bg-[#0a0f1d]/95 backdrop-blur-md border-2 border-cyan-400 text-white shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(34,211,238,0.4)] text-center text-xs sm:text-[13px] font-medium leading-relaxed animate-pop pointer-events-none">
          <div className="flex items-center justify-between gap-1 border-b border-cyan-500/30 pb-1 mb-1.5 text-[10px] font-mono text-cyan-300 uppercase tracking-wider font-bold">
            <span>{characterMeta.name}</span>
            <span className="text-amber-400">{characterMeta.role}</span>
          </div>
          <p className="italic text-slate-100 whitespace-normal select-text">"{replyText}"</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0a0f1d] border-r-2 border-b-2 border-cyan-400 rotate-45" />
        </div>
      )}

      {/* Floating Interactive Name Badge */}
      <div
        className={`mb-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border shadow-lg flex items-center gap-1 transition-all ${
          isSelected
            ? 'scale-110 ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] bg-cyan-950 text-cyan-200 border-cyan-400'
            : `${characterMeta.color} opacity-90 group-hover:opacity-100 group-hover:scale-105`
        }`}
      >
        <span>{characterMeta.name}</span>
        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
      </div>

      {/* Main Animated Sprite Container */}
      <div
        className={`w-20 h-28 sm:w-24 sm:h-34 transition-all duration-200 ${
          isSelected
            ? 'scale-110 drop-shadow-[0_0_16px_rgba(34,211,238,0.4)] animate-bounce'
            : 'group-hover:scale-105'
        }`}
      >
        {renderCharacterSVG()}
      </div>

      {/* Ground Selection Shadow / Ring */}
      {isSelected && (
        <div className="absolute bottom-0 w-16 h-3 rounded-full bg-cyan-500/30 blur-[2px] animate-pulse pointer-events-none" />
      )}
    </div>
  );
}
