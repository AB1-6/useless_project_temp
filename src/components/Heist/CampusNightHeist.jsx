import React, { useState, useEffect, useRef } from 'react';
import {
  X, Shield, Key, Eye, EyeOff, Radio, Volume2, Sparkles,
  AlertTriangle, Check, ArrowRight, RotateCcw, Zap, Lock, Unlock,
  Coffee, Smartphone, Laptop, Award, Trophy, ChevronLeft, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundService } from '../../services/soundService';

export default function CampusNightHeist({
  isOpen = true,
  onClose,
  npc,
  onHeistSuccess
}) {
  // Phase: 'briefing' | 'stealth' | 'safe' | 'escape' | 'victory'
  const [phase, setPhase] = useState('briefing');

  // ==========================================
  // PHASE 2: STEALTH CORRIDOR STATE
  // ==========================================
  const [playerX, setPlayerX] = useState(60); // 40 to 670
  const [isHiding, setIsHiding] = useState(false);
  const [alertLevel, setAlertLevel] = useState(0); // 0 to 100
  const [guardX, setGuardX] = useState(540);
  const [guardDir, setGuardDir] = useState(-1); // -1: left, 1: right
  const [guardState, setGuardState] = useState('patrol'); // 'patrol' | 'investigating' | 'frozen'
  const [guardSpeech, setGuardSpeech] = useState(null);

  // Decoys & Cooldowns
  const [chaiCups, setChaiCups] = useState(2);
  const [phoneDecoyAvailable, setPhoneDecoyAvailable] = useState(true);
  const [cameraFreezeAvailable, setCameraFreezeAvailable] = useState(true);
  const [activeDecoyEffect, setActiveDecoyEffect] = useState(null); // 'cup' | 'phone' | 'camera'
  const [caughtNotice, setCaughtNotice] = useState(null);

  // Hide Spots Coordinates (x-range)
  const HIDE_SPOTS = [
    { id: 'pillar', name: 'Stone Pillar', x: 180, icon: '🏛️', width: 60 },
    { id: 'locker', name: 'Blue Metal Locker', x: 360, icon: '🗄️', width: 60 },
    { id: 'plant', name: 'Potted Croton Plant', x: 530, icon: '🌿', width: 60 }
  ];

  // Near hide spot check
  const currentNearSpot = HIDE_SPOTS.find(
    spot => Math.abs(playerX - spot.x) < 45
  );

  // ==========================================
  // PHASE 3: SAFE COMBINATION STATE
  // Target code: 2 - 7 - 4
  // Clue 1: ends in 4
  // Clue 2: backlogs = 7
  // Clue 3: sum = 13 (13 - 7 - 4 = 2)
  // ==========================================
  const [safeCode, setSafeCode] = useState([0, 0, 0]);
  const [safeUnlocked, setSafeUnlocked] = useState(false);
  const [safeError, setSafeError] = useState(false);
  const [radioStep, setRadioStep] = useState(1);

  // ==========================================
  // PHASE 4: ESCAPE STATE
  // ==========================================
  const [escapeProgress, setEscapeProgress] = useState(0); // 0 to 100
  const [escapeTimeLeft, setEscapeTimeLeft] = useState(5.0);

  // Background tension audio heartbeat
  useEffect(() => {
    if (!isOpen) return;
    if (phase === 'stealth') {
      const interval = setInterval(() => {
        soundService.playSuspense();
      }, 2400);
      return () => clearInterval(interval);
    }
  }, [isOpen, phase]);

  // ==========================================
  // STEALTH GUARD PATROL & DETECTION LOOP
  // ==========================================
  useEffect(() => {
    if (!isOpen || phase !== 'stealth') return;

    const patrolInterval = setInterval(() => {
      // If camera frozen, guard does not move
      if (guardState === 'frozen') return;

      // If investigating a decoy
      if (guardState === 'investigating') {
        return;
      }

      // Normal patrol movement
      setGuardX(prev => {
        let next = prev + guardDir * 7;
        if (next <= 140) {
          setGuardDir(1);
          return 140;
        }
        if (next >= 590) {
          setGuardDir(-1);
          return 590;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(patrolInterval);
  }, [isOpen, phase, guardDir, guardState]);

  // Flashlight Cone Detection
  useEffect(() => {
    if (!isOpen || phase !== 'stealth') return;

    const detectInterval = setInterval(() => {
      if (guardState === 'frozen') return;

      // Flashlight covers area in front of guard:
      // If guardDir == -1 (facing left), beam is [guardX - 175, guardX]
      // If guardDir == 1 (facing right), beam is [guardX, guardX + 175]
      const beamStart = guardDir === -1 ? guardX - 175 : guardX;
      const beamEnd = guardDir === -1 ? guardX : guardX + 175;

      const inBeam = playerX >= beamStart && playerX <= beamEnd;

      if (inBeam && !isHiding) {
        // Spotted in beam!
        setAlertLevel(prev => {
          const next = Math.min(100, prev + 12);
          if (next >= 100) {
            handleCaughtByGuard();
            return 0;
          }
          return next;
        });
      } else {
        // Cooling down
        setAlertLevel(prev => Math.max(0, prev - 5));
      }
    }, 120);

    return () => clearInterval(detectInterval);
  }, [isOpen, phase, guardX, guardDir, guardState, playerX, isHiding]);

  // Handle player getting caught by Appukuttan
  const handleCaughtByGuard = () => {
    soundService.playAlert();
    setGuardSpeech("AARAA AVDE?! NIKKEDA AVIDE!! (Who's that?! Stop right there!)");
    setCaughtNotice("Guard Appukuttan caught you! You pretended you were sleepwalking to the washroom. Sent back to entrance!");
    setPlayerX(60);
    setIsHiding(false);
    setAlertLevel(0);

    setTimeout(() => {
      setGuardSpeech(null);
      setCaughtNotice(null);
    }, 3500);
  };

  // Keyboard navigation for stealth phase
  useEffect(() => {
    if (!isOpen || phase !== 'stealth') return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        movePlayer(20);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        movePlayer(-20);
      } else if (e.key === 'h' || e.key === 'H' || e.key === ' ') {
        e.preventDefault();
        toggleHide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, phase, playerX, isHiding, currentNearSpot]);

  const movePlayer = (delta) => {
    if (isHiding) {
      setIsHiding(false); // stepping out of hide spot
    }
    soundService.playBleep(300, 'triangle', 0.04);
    setPlayerX(prev => {
      const next = Math.max(50, Math.min(670, prev + delta));
      // Reached HOD door!
      if (next >= 650) {
        soundService.playSuccess();
        setPhase('safe');
      }
      return next;
    });
  };

  const toggleHide = () => {
    if (!currentNearSpot) {
      soundService.playBuzzer();
      return;
    }
    soundService.playClick();
    setIsHiding(prev => !prev);
  };

  // Throw Chai Cup Decoy
  const handleThrowChaiCup = () => {
    if (chaiCups <= 0) return;
    setChaiCups(prev => prev - 1);
    soundService.playDecoy();
    setActiveDecoyEffect('cup');
    setGuardState('investigating');
    setGuardSpeech("Enthaada avde shabdham?! (What was that noise?!)");

    // Guard turns to investigate opposite direction
    setGuardDir(prev => (prev === 1 ? -1 : 1));

    setTimeout(() => {
      setGuardState('patrol');
      setGuardSpeech(null);
      setActiveDecoyEffect(null);
    }, 3800);
  };

  // Kevin's Bluetooth Ringtone Decoy
  const handlePhoneDecoy = () => {
    if (!phoneDecoyAvailable) return;
    setPhoneDecoyAvailable(false);
    soundService.playBleep(880, 'sine', 0.1);
    setTimeout(() => soundService.playBleep(1100, 'sine', 0.15), 120);
    setActiveDecoyEffect('phone');
    setGuardState('investigating');
    setGuardSpeech("Kevineee! Who is playing Tamil songs at 1 AM?!");
    // Guard walks all the way to left entrance
    setGuardDir(-1);
    setGuardX(150);

    setTimeout(() => {
      setGuardState('patrol');
      setGuardSpeech(null);
      setActiveDecoyEffect(null);
    }, 4500);
  };

  // Sneha's CCTV Freeze
  const handleFreezeCamera = () => {
    if (!cameraFreezeAvailable) return;
    setCameraFreezeAvailable(false);
    soundService.playLevelUp();
    setActiveDecoyEffect('camera');
    setGuardState('frozen');
    setGuardSpeech("CCTV monitor flickering... Must be rain static.");

    setTimeout(() => {
      setGuardState('patrol');
      setGuardSpeech(null);
      setActiveDecoyEffect(null);
    }, 3200);
  };

  // Safe Tumbler Handlers
  const handleDigitChange = (index, delta) => {
    soundService.playSafeClick();
    setSafeError(false);
    setSafeCode(prev => {
      const next = [...prev];
      next[index] = (next[index] + delta + 10) % 10;
      return next;
    });
  };

  const handleCrackSafe = () => {
    // Correct code: 2 - 7 - 4
    if (safeCode[0] === 2 && safeCode[1] === 7 && safeCode[2] === 4) {
      soundService.playSuccess();
      setSafeUnlocked(true);
      setSafeError(false);
    } else {
      soundService.playBuzzer();
      setSafeError(true);
    }
  };

  // Escape sequence sprint
  const handleEscapeTap = () => {
    soundService.playBleep(400 + escapeProgress * 5, 'sawtooth', 0.05);
    setEscapeProgress(prev => {
      const next = prev + 15;
      if (next >= 100) {
        handleMissionVictory();
        return 100;
      }
      return next;
    });
  };

  // Escape Countdown timer
  useEffect(() => {
    if (phase !== 'escape') return;

    soundService.playAlarm();
    const timer = setInterval(() => {
      setEscapeTimeLeft(prev => {
        if (prev <= 0.2) {
          clearInterval(timer);
          handleMissionVictory(); // Escape succeeded
          return 0;
        }
        return parseFloat((prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [phase]);

  const handleMissionVictory = () => {
    setPhase('victory');
    soundService.playFanfare();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    onHeistSuccess?.({
      id: 'exam_blueprint',
      name: "HOD's Exam Blueprint",
      icon: '📜'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-4xl bg-[#090e1a] border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col gap-4 text-white overflow-hidden">

        {/* Ambient Stealth Neon Rim */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400" />

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              🕵️
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide text-cyan-300 uppercase font-mono">
                  Operation: Midnight Blueprint
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950 border border-red-500/40 text-red-300 font-bold animate-pulse">
                  CLASSIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Admin Block Infiltration • Stealth Past Guard Appukuttan • Crack HOD's Safe
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Phase Pills */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-2xl border border-white/10 text-xs font-mono">
              <span className={`px-2 py-0.5 rounded-lg ${phase === 'briefing' ? 'bg-cyan-500/30 text-cyan-300 font-bold' : 'text-slate-500'}`}>1. Plan</span>
              <span className="text-slate-600">→</span>
              <span className={`px-2 py-0.5 rounded-lg ${phase === 'stealth' ? 'bg-cyan-500/30 text-cyan-300 font-bold' : 'text-slate-500'}`}>2. Stealth</span>
              <span className="text-slate-600">→</span>
              <span className={`px-2 py-0.5 rounded-lg ${phase === 'safe' ? 'bg-cyan-500/30 text-cyan-300 font-bold' : 'text-slate-500'}`}>3. Safe</span>
              <span className="text-slate-600">→</span>
              <span className={`px-2 py-0.5 rounded-lg ${phase === 'escape' || phase === 'victory' ? 'bg-emerald-500/30 text-emerald-300 font-bold' : 'text-slate-500'}`}>4. Escape</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* PHASE 1: CHALKBOARD MISSION BRIEFING                             */}
        {/* ================================================================ */}
        {phase === 'briefing' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* Chalkboard Frame */}
            <div className="relative rounded-2xl bg-[#0e1713] border-4 border-[#3c4e3f] p-5 shadow-2xl text-emerald-100 font-mono">
              <div className="absolute top-2 right-3 text-xs text-emerald-400/60 tracking-widest font-bold">
                SECRET SQUAD CHALKBOARD // 01:15 AM
              </div>

              <h3 className="text-lg font-black text-amber-300 tracking-wider mb-2 flex items-center gap-2">
                <span>📋</span> "OPERATION: DESTROY THE SEM 5 INTERNAL CURVE"
              </h3>
              <p className="text-xs text-emerald-300/80 mb-4">
                Tomorrow is the Engineering Elective Exam. Professor Kurian locked the official blueprint inside HOD Cabin 204.
                The squad has synchronized roles for this night heist.
              </p>

              {/* Squad Roles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
                {/* Sneha */}
                <div className="bg-[#14231b] border border-emerald-500/30 rounded-xl p-3 flex flex-col gap-1.5 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👧</span>
                    <div>
                      <div className="font-bold text-sm text-amber-300">Sneha (Hacker / Radio)</div>
                      <div className="text-[10px] text-emerald-400">Radio Frequency: 104.5 MHz</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 leading-relaxed italic">
                    "I looped CCTV 4. When you reach the heavy steel safe, radio me. I have decoded HOD Sir's 3-digit combination clues!"
                  </p>
                </div>

                {/* Rahul */}
                <div className="bg-[#14231b] border border-emerald-500/30 rounded-xl p-3 flex flex-col gap-1.5 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👦</span>
                    <div>
                      <div className="font-bold text-sm text-red-300">Rahul (Distraction Scout)</div>
                      <div className="text-[10px] text-emerald-400">Lockpicks & Chai Cups</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 leading-relaxed italic">
                    "I stole 2 empty chai cups from the canteen counter. Toss them down the corridor if Appukuttan walks your way to distract him!"
                  </p>
                </div>

                {/* Kevin */}
                <div className="bg-[#14231b] border border-emerald-500/30 rounded-xl p-3 flex flex-col gap-1.5 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎧</span>
                    <div>
                      <div className="font-bold text-sm text-cyan-300">Kevin (Audio Jammer)</div>
                      <div className="text-[10px] text-emerald-400">Bluetooth Sound Cannon</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 leading-relaxed italic">
                    "My speaker is hidden near the stairwell water cooler. Trigger my decoy and I'll blast a loud phone ringtone to make him run!"
                  </p>
                </div>
              </div>

              {/* Player Role */}
              <div className="mt-3 p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👤</span>
                  <div>
                    <span className="font-bold text-xs text-cyan-300 uppercase tracking-wide">
                      Your Role: {npc?.name || 'Infiltrator'} (The Ghost)
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Sneak through the corridor. Hide behind stone pillars & lockers to avoid Appukuttan's flashlight beam.
                    </p>
                  </div>
                </div>
                <div className="text-right text-[11px] text-amber-400 font-bold shrink-0">
                  Reward: 📜 HOD's Blueprint
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <div className="flex justify-end gap-3 pt-1">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs cursor-pointer transition-colors"
              >
                Abort Mission
              </button>
              <button
                onClick={() => {
                  soundService.playSelect();
                  setPhase('stealth');
                }}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Enter Admin Block (Start Mission)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* PHASE 2: STEALTH CORRIDOR CANVAS                                 */}
        {/* ================================================================ */}
        {phase === 'stealth' && (
          <div className="flex flex-col gap-3 animate-fade-in">
            {/* Top HUD: Alert Level & Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/90 border border-white/10 rounded-2xl px-4 py-2.5">
              {/* Alert Level Gauge */}
              <div className="flex items-center gap-2.5 flex-1 min-w-[200px]">
                <div className="flex items-center gap-1 text-xs font-mono font-bold">
                  <AlertTriangle className={`w-4 h-4 ${alertLevel > 50 ? 'text-red-400 animate-bounce' : 'text-amber-400'}`} />
                  <span className="text-slate-300">GUARD SUSPICION:</span>
                </div>
                <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-150 ${
                      alertLevel > 70 ? 'bg-red-500 shadow-[0_0_15px_#ef4444]' :
                      alertLevel > 30 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${alertLevel}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-slate-300 w-9 text-right">
                  {alertLevel}%
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 text-xs font-mono">
                {isHiding ? (
                  <span className="px-3 py-1 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                    <Shield className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>HIDDEN ({currentNearSpot?.name || 'Cover'})</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 font-bold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>EXPOSED IN CORRIDOR</span>
                  </span>
                )}
              </div>
            </div>

            {/* Main Interactive Corridor Viewport */}
            <div className="relative w-full h-[330px] rounded-3xl bg-[#060b14] border-2 border-cyan-500/30 overflow-hidden shadow-2xl">
              {/* Corridor Walls & Ceiling Grid */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1224] via-[#060d1c] to-[#040810]" />

              {/* Floor Perspective & Tiles */}
              <div className="absolute bottom-0 left-0 right-0 h-36 bg-[#030710] border-t-2 border-cyan-500/20">
                <div
                  className="w-full h-full opacity-30"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(6,182,212,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.2) 1px, transparent 1px)',
                    backgroundSize: '40px 20px'
                  }}
                />
              </div>

              {/* Background Doors & Room Signs */}
              <div className="absolute top-12 left-10 flex flex-col items-center">
                <div className="w-16 h-32 bg-slate-900/90 border border-white/10 rounded-t-lg relative flex flex-col items-center pt-2 shadow-inner">
                  <div className="text-[8px] font-mono font-bold text-amber-400 bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                    201 STAFF
                  </div>
                  <div className="absolute right-1 top-16 w-2 h-2 rounded-full bg-amber-400/80 shadow" />
                </div>
              </div>

              <div className="absolute top-12 left-64 flex flex-col items-center">
                <div className="w-16 h-32 bg-slate-900/90 border border-white/10 rounded-t-lg relative flex flex-col items-center pt-2 shadow-inner">
                  <div className="text-[8px] font-mono font-bold text-blue-400 bg-black/60 px-1.5 py-0.5 rounded border border-blue-500/30">
                    202 DEAN
                  </div>
                  <div className="absolute right-1 top-16 w-2 h-2 rounded-full bg-blue-400/80 shadow" />
                </div>
              </div>

              {/* TARGET: HOD Cabin 204 Door (Far Right) */}
              <div className="absolute top-8 right-8 flex flex-col items-center z-10 animate-pulse">
                <div className="w-20 h-36 bg-amber-950/80 border-2 border-amber-400 rounded-t-xl relative flex flex-col items-center pt-2.5 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                  <div className="text-[9px] font-black text-amber-200 bg-black/80 px-2 py-0.5 rounded border border-amber-400 shadow">
                    ⭐ HOD 204
                  </div>
                  <div className="absolute top-12 text-xs">🔒</div>
                  <div className="absolute bottom-2 text-[8px] font-mono text-amber-300 font-bold bg-amber-950/90 px-1.5 py-0.5 rounded">
                    SAFE INSIDE
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-300 mt-1 animate-bounce">
                  TARGET DOOR →
                </span>
              </div>

              {/* Emergency Exit Sign */}
              <div className="absolute top-4 left-6 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-mono font-bold text-emerald-400 flex items-center gap-1 shadow">
                <span>🏃 EXIT</span>
              </div>

              {/* Security Camera on Ceiling */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-6 h-3 bg-slate-800 rounded-t border border-white/20" />
                <div className="w-8 h-4 bg-slate-900 rounded-full border border-cyan-500/40 flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${guardState === 'frozen' ? 'bg-cyan-400' : 'bg-red-500 animate-ping'}`} />
                </div>
                <span className="text-[8px] font-mono text-slate-500">
                  {guardState === 'frozen' ? 'CCTV JAMMED' : 'CCTV 04'}
                </span>
              </div>

              {/* HIDE SPOTS ON CORRIDOR */}
              {HIDE_SPOTS.map(spot => {
                const isPlayerAtThisSpot = currentNearSpot?.id === spot.id;
                return (
                  <div
                    key={spot.id}
                    className="absolute bottom-10 flex flex-col items-center transition-transform pointer-events-auto cursor-pointer"
                    style={{ left: `${spot.x}px`, transform: 'translateX(-50%)' }}
                    onClick={() => {
                      setPlayerX(spot.x);
                      setIsHiding(true);
                      soundService.playClick();
                    }}
                  >
                    {/* Hide Prompt Label */}
                    {isPlayerAtThisSpot && (
                      <div className="mb-2 bg-cyan-950/90 border border-cyan-400 text-cyan-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full animate-bounce shadow">
                        {isHiding ? '✓ HIDING' : 'PRESS [H] TO HIDE'}
                      </div>
                    )}

                    {/* Spot Graphic */}
                    {spot.id === 'pillar' && (
                      <div className="w-12 h-44 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 rounded-lg border-2 border-white/20 shadow-2xl flex flex-col items-center justify-between p-1">
                        <div className="w-14 h-3 bg-slate-500 rounded-sm" />
                        <span className="text-xl">🏛️</span>
                        <div className="w-14 h-3 bg-slate-500 rounded-sm" />
                      </div>
                    )}
                    {spot.id === 'locker' && (
                      <div className="w-14 h-40 bg-gradient-to-r from-blue-900 to-blue-800 rounded-md border-2 border-blue-400/40 shadow-xl flex flex-col items-center justify-around p-1">
                        <div className="w-10 h-1 bg-white/20 rounded" />
                        <span className="text-xl">🗄️</span>
                        <div className="w-10 h-1 bg-white/20 rounded" />
                      </div>
                    )}
                    {spot.id === 'plant' && (
                      <div className="flex flex-col items-center">
                        <span className="text-4xl drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">🌿</span>
                        <div className="w-10 h-8 bg-amber-900 rounded-b-lg border border-amber-700 shadow" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* ================================================== */}
              {/* GUARD APPUKUTTAN & FLASHLIGHT CONE                 */}
              {/* ================================================== */}
              <div
                className="absolute bottom-12 transition-all duration-100 ease-linear flex flex-col items-center z-20 pointer-events-none"
                style={{ left: `${guardX}px`, transform: 'translateX(-50%)' }}
              >
                {/* Guard Speech Bubble */}
                {guardSpeech && (
                  <div className="mb-2 max-w-[200px] bg-red-950 border-2 border-red-500 text-red-200 font-bold text-[11px] px-3 py-1.5 rounded-2xl shadow-[0_0_20px_#ef4444] animate-pop text-center relative whitespace-normal">
                    {guardSpeech}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-950 rotate-45 border-r-2 border-b-2 border-red-500" />
                  </div>
                )}

                {/* Guard Character Sprite */}
                <div className="relative flex flex-col items-center">
                  <div className="text-4xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                    👮‍♂️
                  </div>
                  <div className="text-[9px] font-mono font-bold text-amber-300 bg-black/80 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Appukuttan
                  </div>
                </div>

                {/* Sweeping Flashlight Beam */}
                <div
                  className="absolute bottom-4 pointer-events-none transition-transform duration-200"
                  style={{
                    left: guardDir === -1 ? '-175px' : '20px',
                    width: '175px',
                    height: '80px',
                    background: guardDir === -1
                      ? 'linear-gradient(to left, rgba(254, 240, 138, 0.45), rgba(254, 240, 138, 0.05) 90%, transparent)'
                      : 'linear-gradient(to right, rgba(254, 240, 138, 0.45), rgba(254, 240, 138, 0.05) 90%, transparent)',
                    clipPath: guardDir === -1
                      ? 'polygon(100% 40%, 0% 0%, 0% 100%, 100% 60%)'
                      : 'polygon(0% 40%, 100% 0%, 100% 100%, 0% 60%)'
                  }}
                />
              </div>

              {/* ================================================== */}
              {/* PLAYER SPRITE                                      */}
              {/* ================================================== */}
              <div
                className={`absolute bottom-10 flex flex-col items-center z-30 transition-all duration-75 ease-out ${
                  isHiding ? 'opacity-40 scale-90' : 'opacity-100 scale-100'
                }`}
                style={{ left: `${playerX}px`, transform: 'translateX(-50%)' }}
              >
                {/* Hiding Indicator */}
                {isHiding && (
                  <span className="mb-1 text-[9px] font-mono font-bold text-cyan-300 bg-cyan-950/90 px-1.5 py-0.5 rounded border border-cyan-400 shadow">
                    🛡️ HIDDEN
                  </span>
                )}

                <div className="text-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  {npc?.avatar?.gender === 'girl' ? '👧' : '👦'}
                </div>
                <div className="text-[9px] font-mono font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-full border border-cyan-400/50">
                  {npc?.name || 'You'}
                </div>
              </div>

              {/* Caught Notification Toast */}
              {caughtNotice && (
                <div className="absolute inset-x-8 top-12 z-40 bg-red-950/95 border-2 border-red-500 text-red-200 text-xs font-bold p-3 rounded-2xl shadow-[0_0_35px_#ef4444] text-center animate-bounce">
                  ⚠️ {caughtNotice}
                </div>
              )}
            </div>

            {/* Bottom Controls Bar: Movement, Hide, and Decoy Gadgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Movement & Hide Pad */}
              <div className="flex items-center gap-2 bg-slate-950/80 p-2.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => movePlayer(-30)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-mono font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-all border border-white/10"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Left (A)</span>
                </button>

                <button
                  onClick={toggleHide}
                  className={`flex-1 py-2.5 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 border ${
                    isHiding
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : currentNearSpot
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse'
                      : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>{isHiding ? 'Step Out' : 'Hide (H)'}</span>
                </button>

                <button
                  onClick={() => movePlayer(30)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-mono font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-all border border-white/10"
                >
                  <span>Right (D)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Decoy Gadgets */}
              <div className="flex items-center gap-2 bg-slate-950/80 p-2.5 rounded-2xl border border-white/10">
                {/* Chai Cup Throw */}
                <button
                  onClick={handleThrowChaiCup}
                  disabled={chaiCups <= 0 || guardState !== 'patrol'}
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-mono font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                    chaiCups > 0 && guardState === 'patrol'
                      ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 hover:bg-amber-900/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'bg-slate-900 border-white/5 text-slate-600 opacity-50 cursor-not-allowed'
                  }`}
                  title="Throw empty chai cup to make Appukuttan investigate opposite direction"
                >
                  <div className="flex items-center gap-1">
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Chai Clatter</span>
                  </div>
                  <span className="text-[10px] text-amber-400/80">({chaiCups} left)</span>
                </button>

                {/* Kevin's Ringtone */}
                <button
                  onClick={handlePhoneDecoy}
                  disabled={!phoneDecoyAvailable || guardState !== 'patrol'}
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-mono font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                    phoneDecoyAvailable && guardState === 'patrol'
                      ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 hover:bg-purple-900/60 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                      : 'bg-slate-900 border-white/5 text-slate-600 opacity-50 cursor-not-allowed'
                  }`}
                  title="Kevin blasts phone ringtone near water cooler, drawing Appukuttan far left"
                >
                  <div className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Kevin Ring</span>
                  </div>
                  <span className="text-[10px] text-purple-300/80">({phoneDecoyAvailable ? '1x Ready' : 'Used'})</span>
                </button>

                {/* Sneha's Jammer */}
                <button
                  onClick={handleFreezeCamera}
                  disabled={!cameraFreezeAvailable || guardState !== 'patrol'}
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-mono font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                    cameraFreezeAvailable && guardState === 'patrol'
                      ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 hover:bg-cyan-900/60 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-900 border-white/5 text-slate-600 opacity-50 cursor-not-allowed'
                  }`}
                  title="Sneha jams camera feed & sensors for 3 seconds"
                >
                  <div className="flex items-center gap-1">
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Jam CCTV</span>
                  </div>
                  <span className="text-[10px] text-cyan-300/80">({cameraFreezeAvailable ? '1x Ready' : 'Used'})</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* PHASE 3: HOD SAFE COMBINATION TUMBLER PUZZLE                     */}
        {/* ================================================================ */}
        {phase === 'safe' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Left Column: Radio Chatter & Clues from Sneha */}
              <div className="md:col-span-5 bg-[#0a101f] border border-cyan-500/30 rounded-2xl p-4 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                      <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <span>WALKIE-TALKIE // 104.5 MHz</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      ENCRYPTED
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 mb-3">
                    <span className="text-2xl">👧</span>
                    <div>
                      <div className="font-black text-xs text-amber-300">Sneha (Radio Ops)</div>
                      <p className="text-xs text-slate-200 mt-1 italic leading-relaxed">
                        "Psst! {npc?.name || 'You'}! You made it into the HOD Cabin! I found his sticky note hints in the digital faculty drive:"
                      </p>
                    </div>
                  </div>

                  {/* 3 Encoded Clues */}
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-200">
                      <span className="text-amber-400 font-bold block text-[11px] mb-0.5">
                        💡 CLUE 1 (Last Tumbler Digit):
                      </span>
                      "HOD Sir's favourite batch year... ends in <strong className="text-amber-300 underline font-black">4</strong>!"
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-blue-500/30 text-blue-200">
                      <span className="text-blue-400 font-bold block text-[11px] mb-0.5">
                        💡 CLUE 2 (Middle Tumbler Digit):
                      </span>
                      "Number of backlogs he threatened Rahul with yesterday... exactly <strong className="text-blue-300 underline font-black">7</strong>!"
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-200">
                      <span className="text-emerald-400 font-bold block text-[11px] mb-0.5">
                        💡 CLUE 3 (First Tumbler Digit):
                      </span>
                      "The sum of all three digits is strictly <strong className="text-emerald-300 underline font-black">13</strong>!"
                      <span className="block text-[10px] text-slate-400 mt-0.5 font-sans italic">
                        (Hint: 13 - 7 - 4 = ?)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-500 border-t border-white/5 pt-2 mt-2 flex items-center justify-between">
                  <span>HOD Steel Tumbler Safe v4.2</span>
                  <span>Audio Feedback: ON</span>
                </div>
              </div>

              {/* Right Column: Interactive Steel Tumbler Safe */}
              <div className="md:col-span-7 bg-gradient-to-b from-[#182030] to-[#0c1220] border-4 border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center relative">
                
                {/* Safe Rivets & Metallic Border */}
                <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-slate-500 border border-black shadow-inner" />
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-slate-500 border border-black shadow-inner" />
                <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-slate-500 border border-black shadow-inner" />
                <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-slate-500 border border-black shadow-inner" />

                <div className="text-center mb-4">
                  <div className="text-xs font-mono text-slate-400 tracking-widest uppercase">
                    BHARATH HEAVY STEEL WORKS // SAFE-9000
                  </div>
                  <h4 className="text-base font-black text-amber-400 mt-0.5">
                    HOD EXAM ARCHIVE LOCK
                  </h4>
                </div>

                {/* 3 Tumbler Dials */}
                <div className="flex items-center gap-4 my-2">
                  {[0, 1, 2].map(idx => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => handleDigitChange(idx, 1)}
                        className="w-12 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-cyan-300 font-bold flex items-center justify-center border border-white/10 cursor-pointer shadow transition-all"
                      >
                        ▲
                      </button>

                      <div className="w-16 h-20 rounded-2xl bg-slate-950 border-2 border-cyan-500/50 flex items-center justify-center text-3xl font-black font-mono text-white shadow-[inset_0_0_15px_rgba(0,0,0,0.9)]">
                        {safeCode[idx]}
                      </div>

                      <button
                        onClick={() => handleDigitChange(idx, -1)}
                        className="w-12 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-cyan-300 font-bold flex items-center justify-center border border-white/10 cursor-pointer shadow transition-all"
                      >
                        ▼
                      </button>
                    </div>
                  ))}
                </div>

                {/* Safe Status Feedback */}
                {safeError && (
                  <div className="mt-3 text-xs font-mono font-bold text-red-400 bg-red-950/80 px-3 py-1 rounded-xl border border-red-500/40 animate-shake">
                    ❌ INCORRECT COMBINATION! Check Sneha's Clues!
                  </div>
                )}

                {safeUnlocked && (
                  <div className="mt-3 text-xs font-mono font-bold text-emerald-300 bg-emerald-950/90 px-4 py-1.5 rounded-xl border border-emerald-400 shadow-[0_0_20px_#10b981] animate-bounce flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>SAFE CRACKED! BLUEPRINT REVEALED!</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-5 flex gap-3">
                  {!safeUnlocked ? (
                    <button
                      onClick={handleCrackSafe}
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Turn Safe Handle</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setPhase('escape')}
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center gap-2 cursor-pointer transition-all animate-pulse"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>GRAB BLUEPRINT & SPRINT!</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* PHASE 4: ALARM ESCAPE SPRINT                                     */}
        {/* ================================================================ */}
        {phase === 'escape' && (
          <div className="flex flex-col items-center justify-center p-6 gap-5 animate-fade-in bg-red-950/40 rounded-3xl border-2 border-red-500/50">
            {/* Red Alert Banner */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-950 border border-red-500 text-red-300 font-mono text-xs font-black animate-ping">
                🚨 SECURITY TRIPWIRE TRIGGERED!
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-wider mt-2">
                RUN TO THE 3RD FLOOR FIRE ESCAPE!
              </h3>
              <p className="text-xs text-red-200">
                Guard Appukuttan is rushing up the stairs! Rapid tap the sprint button to escape!
              </p>
            </div>

            {/* Escape Sprint Progress Meter */}
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-slate-300">SPRINT DISTANCE:</span>
                <span className="text-amber-400">{escapeProgress}% ESCAPED</span>
              </div>
              <div className="w-full h-5 bg-slate-950 rounded-full overflow-hidden p-1 border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-100 shadow-[0_0_20px_#10b981]"
                  style={{ width: `${escapeProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>HOD Office</span>
                <span className="text-red-400 font-bold">{escapeTimeLeft}s remaining!</span>
                <span>Terrace Exit 🏃</span>
              </div>
            </div>

            {/* Big Sprint Tap Button */}
            <button
              onClick={handleEscapeTap}
              className="w-full max-w-sm py-4 rounded-3xl bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 hover:from-amber-400 hover:to-amber-400 text-slate-950 font-black text-base uppercase tracking-widest shadow-[0_0_35px_rgba(239,68,68,0.7)] active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🏃 SPRINT! (TAP RAPIDLY)</span>
            </button>

            {/* Squad Radio Encouragement */}
            <div className="flex items-center gap-3 text-xs font-mono text-slate-300 bg-slate-950/80 px-4 py-2 rounded-2xl border border-white/10">
              <span className="text-lg">👦</span>
              <span><strong>Rahul:</strong> "I held the fire door open! Just jump out to the terrace!!"</span>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* PHASE 5: VICTORY CELEBRATION & REWARD SCREEN                     */}
        {/* ================================================================ */}
        {phase === 'victory' && (
          <div className="flex flex-col items-center justify-center p-6 gap-5 animate-fade-in bg-gradient-to-b from-emerald-950/40 to-slate-950 rounded-3xl border-2 border-emerald-500/50 text-center">
            <div className="text-5xl animate-bounce">
              🏆
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-400 text-emerald-300 font-mono text-xs font-black">
                ✨ MISSION ACCOMPLISHED! S-RANK HEIST
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-wide mt-2">
                THE MIDNIGHT BLUEPRINT IS SECURED!
              </h3>
              <p className="text-xs text-slate-300 max-w-lg">
                You outsmarted Guard Appukuttan, cracked the HOD's antique steel safe, and escaped onto the campus terrace under the stars!
              </p>
            </div>

            {/* Reward Card */}
            <div className="bg-slate-900/90 border-2 border-amber-400/60 rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_30px_rgba(245,158,11,0.3)] max-w-md w-full text-left">
              <span className="text-4xl p-2 rounded-2xl bg-amber-950 border border-amber-400/40">
                📜
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm text-amber-300">
                    HOD's Exam Blueprint
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 border border-amber-400/50 text-amber-300 font-bold">
                    LEGENDARY
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Added to your Backpack Inventory! Gift it to Rahul, Sneha, or Kevin for +50 Friendship reputation!
                </p>
              </div>
            </div>

            {/* Squad Quotes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl w-full text-left text-xs font-mono">
              <div className="bg-red-950/60 border border-red-500/30 p-2.5 rounded-xl">
                <span className="text-red-300 font-bold block mb-0.5">👦 Rahul:</span>
                "Bhai we are passing Semester 5! Let's get morning cutting chai!"
              </div>
              <div className="bg-amber-950/60 border border-amber-500/30 p-2.5 rounded-xl">
                <span className="text-amber-300 font-bold block mb-0.5">👧 Sneha:</span>
                "You actually pulled it off! The internal grading curve is officially ours!"
              </div>
              <div className="bg-emerald-950/60 border border-emerald-500/30 p-2.5 rounded-xl">
                <span className="text-emerald-300 font-bold block mb-0.5">🎧 Kevin:</span>
                "Clip saved in 4K 60FPS! Adding your name to our batch hall of fame!"
              </div>
            </div>

            {/* Return Button */}
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer transition-all active:scale-95"
            >
              Claim Reward & Return to Campus
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
