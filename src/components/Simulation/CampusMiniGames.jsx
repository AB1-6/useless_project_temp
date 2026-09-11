import React, { useState, useEffect, useRef } from 'react';
import { X, Play, RotateCcw, Trophy, Award, Sparkles, Volume2, Timer, Flame, CheckCircle2, AlertTriangle } from 'lucide-react';
import { soundService } from '../../services/soundService';

export default function CampusMiniGames({ isOpen = true, onClose, onAddScore, onReward }) {
  const [selectedGame, setSelectedGame] = useState('canteen'); // 'canteen' | 'proxy' | 'xerox'
  const [gameState, setGameState] = useState('MENU'); // 'MENU' | 'PLAYING' | 'GAMEOVER'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [message, setMessage] = useState('');

  // -------------------------------------------------------------
  // GAME 1: CANTEEN SNACK RUSH STATE
  // -------------------------------------------------------------
  const [snackPositions, setSnackPositions] = useState([]);
  const snackTimerRef = useRef(null);

  // -------------------------------------------------------------
  // GAME 2: ROLL-CALL PROXY TIMING STATE
  // -------------------------------------------------------------
  const [proxyRoll, setProxyRoll] = useState(42);
  const [timingVal, setTimingVal] = useState(10);
  const [timingDir, setTimingDir] = useState(3);
  const [proxyRounds, setProxyRounds] = useState(0);
  const [successfulProxies, setSuccessfulProxies] = useState(0);
  const proxyLoopRef = useRef(null);

  // -------------------------------------------------------------
  // GAME 3: 8:59 AM XEROX SPRINT STATE
  // -------------------------------------------------------------
  const [sprintDistance, setSprintDistance] = useState(0);
  const [obstacleX, setObstacleX] = useState(100);
  const [isJumping, setIsJumping] = useState(false);
  const sprintLoopRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(snackTimerRef.current);
      cancelAnimationFrame(proxyLoopRef.current);
      cancelAnimationFrame(sprintLoopRef.current);
    };
  }, []);

  if (isOpen === false) return null;

  // -------------------------------------------------------------
  // START GAME LOGIC
  // -------------------------------------------------------------
  const handleStartGame = (gameId) => {
    setSelectedGame(gameId);
    setScore(0);
    setGameState('PLAYING');
    soundService.playSelect();

    if (gameId === 'canteen') {
      setTimeLeft(20);
      setSnackPositions([
        { id: 1, x: 20, y: 10, type: 'puff', icon: '🥪', points: 10 },
        { id: 2, x: 60, y: 20, type: 'chai', icon: '☕', points: 15 },
        { id: 3, x: 80, y: 15, type: 'samosa', icon: '🥟', points: 10 }
      ]);
    } else if (gameId === 'proxy') {
      setProxyRounds(1);
      setSuccessfulProxies(0);
      setProxyRoll(Math.floor(Math.random() * 20) + 30);
      setMessage('Watch the timing bar! Click when inside the GREEN sweet-spot!');
    } else if (gameId === 'xerox') {
      setSprintDistance(0);
      setObstacleX(100);
      setTimeLeft(25);
    }
  };

  // -------------------------------------------------------------
  // GAME 1: Canteen Timer Loop
  // -------------------------------------------------------------
  useEffect(() => {
    if (gameState === 'PLAYING' && selectedGame === 'canteen') {
      snackTimerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(snackTimerRef.current);
            setGameState('GAMEOVER');
            soundService.playLevelUp();
            onReward?.(Math.min(30, Math.floor(score / 3)));
            return 0;
          }
          return t - 1;
        });

        // Spawn random snacks
        if (Math.random() > 0.3) {
          const snackTypes = [
            { type: 'puff', icon: '🥪', points: 10 },
            { type: 'chai', icon: '☕', points: 15 },
            { type: 'samosa', icon: '🥟', points: 10 },
            { type: 'parippuvada', icon: '🍪', points: 12 },
            { type: 'rotten', icon: '🍌', points: -15 }
          ];
          const chosen = snackTypes[Math.floor(Math.random() * snackTypes.length)];
          setSnackPositions(prev => [
            ...prev.slice(-6),
            {
              id: Date.now() + Math.random(),
              x: Math.floor(Math.random() * 75) + 10,
              y: Math.floor(Math.random() * 60) + 15,
              ...chosen
            }
          ]);
        }
      }, 700);

      return () => clearInterval(snackTimerRef.current);
    }
  }, [gameState, selectedGame, score]);

  const handleCatchSnack = (snack) => {
    soundService.playClick();
    setScore(s => Math.max(0, s + snack.points));
    setSnackPositions(prev => prev.filter(p => p.id !== snack.id));
  };

  // -------------------------------------------------------------
  // GAME 2: Proxy Timing Oscillator Loop
  // -------------------------------------------------------------
  useEffect(() => {
    if (gameState === 'PLAYING' && selectedGame === 'proxy') {
      const step = () => {
        setTimingVal(prev => {
          let next = prev + timingDir;
          if (next >= 92) {
            setTimingDir(-3.5);
            next = 92;
          } else if (next <= 8) {
            setTimingDir(3.5);
            next = 8;
          }
          return next;
        });
        proxyLoopRef.current = requestAnimationFrame(step);
      };
      proxyLoopRef.current = requestAnimationFrame(step);
      return () => cancelAnimationFrame(proxyLoopRef.current);
    }
  }, [gameState, selectedGame, timingDir]);

  const handleShoutProxy = () => {
    soundService.playClick();
    // Green zone is between 40% and 60%
    const isSuccess = timingVal >= 38 && timingVal <= 62;
    if (isSuccess) {
      soundService.playLevelUp();
      setSuccessfulProxies(s => s + 1);
      setScore(s => s + 25);
      setMessage(`🎯 PERFECT PROXY! Roll ${proxyRoll} marked present in disguise!`);
    } else {
      soundService.playBuzzer();
      setMessage(`🚨 CAUGHT! Prof. Kurian glared: "Who shouted for Roll ${proxyRoll}?!"`);
    }

    if (proxyRounds >= 5) {
      setTimeout(() => {
        setGameState('GAMEOVER');
        onReward?.(successfulProxies * 10);
      }, 1000);
    } else {
      setProxyRounds(r => r + 1);
      setProxyRoll(Math.floor(Math.random() * 20) + 30);
    }
  };

  // -------------------------------------------------------------
  // GAME 3: Xerox Sprint Loop
  // -------------------------------------------------------------
  useEffect(() => {
    if (gameState === 'PLAYING' && selectedGame === 'xerox') {
      const loop = () => {
        setObstacleX(prev => {
          if (prev <= 0) {
            setScore(s => s + 15);
            return 100;
          }
          return prev - 2.2;
        });
        setSprintDistance(d => {
          const next = d + 1.2;
          if (next >= 100) {
            setGameState('GAMEOVER');
            soundService.playLevelUp();
            onReward?.(30);
          }
          return next;
        });
        sprintLoopRef.current = requestAnimationFrame(loop);
      };
      sprintLoopRef.current = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(sprintLoopRef.current);
    }
  }, [gameState, selectedGame]);

  const handleJump = () => {
    if (isJumping) return;
    soundService.playClick();
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 550);
  };

  // Keyboard listener for Spacebar in games
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'PLAYING') return;
      if (selectedGame === 'proxy' && e.code === 'Space') {
        e.preventDefault();
        handleShoutProxy();
      } else if (selectedGame === 'xerox' && (e.code === 'Space' || e.code === 'ArrowUp')) {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, selectedGame, timingVal, isJumping]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-xl bg-[#0b101e] border-2 border-cyan-400/50 rounded-3xl p-6 shadow-[0_0_60px_rgba(6,182,212,0.4)] flex flex-col gap-4 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-2 rounded-2xl bg-cyan-950 border border-cyan-500/40">🎮</span>
            <div>
              <h2 className="text-base font-black tracking-wide text-cyan-300 uppercase font-mono">
                Campus Arcade Mini-Games
              </h2>
              <p className="text-xs text-slate-400">Play college mini-challenges to earn XP and Friendship Rep!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Tabs */}
        {gameState === 'MENU' && (
          <div className="grid grid-cols-3 gap-2 bg-[#080d1a] p-2 rounded-2xl border border-white/5">
            {[
              { id: 'canteen', name: '☕ Canteen Rush', desc: 'Catch hot puffs before seniors grab them!' },
              { id: 'proxy', name: '🗣️ Proxy Timing', desc: 'Shout "Present Sir" without HOD catching you!' },
              { id: 'xerox', name: '🏃‍♂️ Xerox Sprint', desc: 'Sprint & jump obstacles to submit by 9 AM!' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedGame(tab.id)}
                className={`p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedGame === tab.id
                    ? 'bg-cyan-950/80 border-2 border-cyan-400 text-white shadow-lg'
                    : 'bg-[#101728] border border-white/5 text-slate-400 hover:text-white hover:bg-[#141e33]'
                }`}
              >
                <div className="font-bold text-xs text-cyan-300">{tab.name}</div>
                <div className="text-[10px] text-slate-400 mt-1 leading-snug">{tab.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* ============================================================== */}
        {/* GAME 1: CANTEEN SNACK RUSH SCREEN */}
        {/* ============================================================== */}
        {selectedGame === 'canteen' && gameState === 'PLAYING' && (
          <div className="relative w-full h-64 bg-[#0a1526] rounded-2xl border-2 border-amber-400/40 overflow-hidden p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2 z-10">
              <span className="text-amber-400 font-bold">SNACKS GRABBED: {score} PTS</span>
              <span className="text-cyan-400 font-bold flex items-center gap-1">
                <Timer className="w-3.5 h-3.5" /> {timeLeft}s LEFT
              </span>
            </div>

            {/* Clickable Snacks in playfield */}
            <div className="absolute inset-0 pt-10 pb-4 px-4 pointer-events-auto">
              {snackPositions.map(snack => (
                <button
                  key={snack.id}
                  onClick={() => handleCatchSnack(snack)}
                  className="absolute text-4xl transform hover:scale-125 transition-transform cursor-pointer drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] animate-bounce"
                  style={{ left: `${snack.x}%`, top: `${snack.y}%` }}
                  title={`${snack.type} (+${snack.points} pts)`}
                >
                  {snack.icon}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-mono text-center text-slate-400 z-10">
              Tap the fresh snacks quickly! Avoid 🍌 (-15 pts)!
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* GAME 2: PROXY TIMING SCREEN */}
        {/* ============================================================== */}
        {selectedGame === 'proxy' && gameState === 'PLAYING' && (
          <div className="relative w-full h-64 bg-[#0d1b1e] rounded-2xl border-2 border-emerald-400/40 p-4 flex flex-col justify-between text-center">
            <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2">
              <span className="text-emerald-400 font-bold">ROUND {proxyRounds}/5</span>
              <span className="text-cyan-400 font-bold">SCORE: {score} PTS</span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl animate-bounce">👨‍🏫</div>
              <div className="font-handwritten text-lg text-yellow-300">
                Prof. Kurian: "Roll No. {proxyRoll}? Is Roll {proxyRoll} present?!"
              </div>
              <div className="text-xs text-slate-300 font-mono">{message}</div>
            </div>

            {/* Timing Meter */}
            <div className="space-y-2">
              <div className="relative w-full h-7 bg-slate-950 rounded-full border-2 border-white/20 overflow-hidden flex items-center">
                {/* Green Sweet Spot (38% to 62%) */}
                <div className="absolute left-[38%] w-[24%] h-full bg-emerald-500/80 border-x-2 border-emerald-300 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-[0_0_15px_#10b981]">
                  SWEET SPOT
                </div>
                {/* Moving Indicator */}
                <div
                  className="absolute w-4 h-full bg-yellow-400 border border-white rounded-full shadow-[0_0_10px_#facc15] transition-all duration-75"
                  style={{ left: `${timingVal}%`, transform: 'translateX(-50%)' }}
                />
              </div>

              <button
                onClick={handleShoutProxy}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm tracking-wider cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-98 transition-all"
              >
                🗣️ SHOUT "PRESENT SIR!"
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* GAME 3: XEROX SPRINT SCREEN */}
        {/* ============================================================== */}
        {selectedGame === 'xerox' && gameState === 'PLAYING' && (
          <div
            onClick={handleJump}
            className="relative w-full h-64 bg-[#141e33] rounded-2xl border-2 border-blue-400/40 p-4 flex flex-col justify-between cursor-pointer overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2 z-10">
              <span className="text-cyan-400 font-bold">PROGRESS: {Math.floor(sprintDistance)}%</span>
              <span className="text-amber-400 font-bold">TIME: 8:59 AM</span>
            </div>

            {/* Runner Stage */}
            <div className="relative w-full h-36 flex items-end pb-2 border-b-4 border-slate-700">
              {/* Player Sprite with Jump */}
              <div
                className={`absolute left-10 text-4xl transition-all duration-200 ${
                  isJumping ? '-translate-y-20 scale-110' : 'translate-y-0'
                }`}
              >
                🏃‍♂️
              </div>

              {/* Rolling Obstacle */}
              <div
                className="absolute text-3xl"
                style={{ left: `${obstacleX}%` }}
              >
                🎒
              </div>

              {/* Destination Xerox Machine */}
              <div className="absolute right-2 text-4xl animate-pulse">
                🖨️
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); handleJump(); }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs font-mono shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer active:scale-98 transition-all z-10"
            >
              🦘 TAP OR PRESS SPACE TO JUMP!
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* GAME OVER SCREEN */}
        {/* ============================================================== */}
        {gameState === 'GAMEOVER' && (
          <div className="bg-[#0e172a] rounded-2xl border border-cyan-400/40 p-6 text-center space-y-4 animate-pop">
            <div className="text-5xl animate-bounce">🏆</div>
            <div>
              <h3 className="text-lg font-black text-white font-mono uppercase">CHALLENGE COMPLETE!</h3>
              <p className="text-xs text-amber-300 font-mono mt-1">Final Score: {score} Points</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleStartGame(selectedGame)}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
              <button
                onClick={() => setGameState('MENU')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-all"
              >
                <span>Other Games</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Start CTA in MENU */}
        {gameState === 'MENU' && (
          <button
            onClick={() => handleStartGame(selectedGame)}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-sm tracking-wider shadow-[0_0_25px_rgba(59,130,246,0.6)] cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>START {selectedGame.toUpperCase()} CHALLENGE</span>
          </button>
        )}

      </div>
    </div>
  );
}
