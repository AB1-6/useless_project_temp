import React, { useState, useEffect } from 'react';
import {
  Clock, MapPin, Sparkles, MessageCircle, Coffee, Users,
  Footprints, AlertTriangle, Send, Wand2, Compass, Check,
  Volume2, HelpCircle, Key, Settings, ShieldCheck, Laptop,
  TreePine, Trophy, Gamepad2, Backpack
} from 'lucide-react';
import NPCCharacter from '../NPC/NPCCharacter';
import CampusNPC from './CampusNPC';
import CampusInventory from './CampusInventory';
import CampusMiniGames from './CampusMiniGames';
import CampusSceneryBackground from './CampusSceneryBackground';
import { multiplayerService } from '../../services/multiplayerService';
import RemotePlayer from '../Multiplayer/RemotePlayer';
import MultiplayerModal from '../Multiplayer/MultiplayerModal';
import CampusNightHeist from '../Heist/CampusNightHeist';
import {
  aiService,
  CHARACTER_PERSONAS,
  QUICK_PROMPT_QUESTIONS,
  AI_CAMPUS_DILEMMAS
} from '../../services/aiService';
import { soundService } from '../../services/soundService';

const SCENERIES = [
  { id: 'canteen', name: 'Canteen Street', icon: '🍴', tag: 'Chai & Snacks HQ' },
  { id: 'classroom', name: 'Classroom 302', icon: '🏫', tag: 'Backbench Zone' },
  { id: 'library', name: 'Library AC Hall', icon: '📚', tag: 'Silent Sleeping Lounge' },
  { id: 'hostel', name: 'Hostel Room 4B', icon: '🛏️', tag: 'Spawn Point & Gaming' },
  { id: 'bus_stop', name: 'Campus Bus Stop', icon: '🚌', tag: 'Morning Rush Spot' },
  { id: 'mango_tree', name: 'Mango Tree Corner', icon: '🌳', tag: 'Shaded Hangout Spot' },
  { id: 'computer_lab', name: 'Computer Lab 101', icon: '💻', tag: '16°C Coding Lab' },
  { id: 'campus_gate', name: 'Main Campus Gate', icon: '⛩️', tag: 'Security & Entry' },
  { id: 'turf', name: 'Sports Turf', icon: '🏟️', tag: 'Football & Evening Bunk' }
];

const SCENE_CHARACTERS = {
  canteen: [
    { charId: 'rahul', x: 260 },
    { charId: 'sneha', x: 440 },
    { charId: 'kevin', x: 620 }
  ],
  classroom: [
    { charId: 'rahul', x: 220 },
    { charId: 'sneha', x: 430 },
    { charId: 'kevin', x: 620 }
  ],
  library: [
    { charId: 'sneha', x: 240 },
    { charId: 'rahul', x: 440 },
    { charId: 'kevin', x: 630 }
  ],
  hostel: [
    { charId: 'kevin', x: 580 },
    { charId: 'rahul', x: 400 },
    { charId: 'sneha', x: 220 }
  ],
  bus_stop: [
    { charId: 'sneha', x: 240 },
    { charId: 'rahul', x: 440 },
    { charId: 'kevin', x: 630 }
  ],
  mango_tree: [
    { charId: 'rahul', x: 260 },
    { charId: 'sneha', x: 440 },
    { charId: 'kevin', x: 630 }
  ],
  computer_lab: [
    { charId: 'kevin', x: 260 },
    { charId: 'rahul', x: 440 },
    { charId: 'sneha', x: 630 }
  ],
  campus_gate: [
    { charId: 'sneha', x: 250 },
    { charId: 'rahul', x: 440 },
    { charId: 'kevin', x: 630 }
  ],
  turf: [
    { charId: 'rahul', x: 260 },
    { charId: 'kevin', x: 450 },
    { charId: 'sneha', x: 630 }
  ]
};

export default function SimulationEngine({
  npc,
  onTriggerEvent,
  onFinishDay
}) {
  const [currentScenery, setCurrentScenery] = useState('canteen');
  const [playerX, setPlayerX] = useState(240);
  const [targetX, setTargetX] = useState(240);
  const [facing, setFacing] = useState('right');
  const [walking, setWalking] = useState(false);

  // Selected target character filter (9 characters)
  const [selectedTargetChar, setSelectedTargetChar] = useState('rahul');

  // AI Question & Active Character Response state
  const [activeQuestion, setActiveQuestion] = useState("What's your schedule today?");
  const [currentSpeaker, setCurrentSpeaker] = useState({
    charId: 'rahul',
    character: 'Rahul',
    role: 'Backbench Partner',
    avatar: '👦',
    emote: '☕',
    color: '#ef4444',
    reply: "Nothing broo chilling! Just attending 1st hour, interval canteen for tea, bunking lunch, then evening chill. Exactly how an NPC lives!"
  });

  const [floatingNotification, setFloatingNotification] = useState(null);
  const [aiCustomInput, setAiCustomInput] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('npcify_gemini_key') || '';
  });

  // Backpack Inventory & Mini-Games & Heist State
  const [showInventory, setShowInventory] = useState(false);
  const [showMiniGames, setShowMiniGames] = useState(false);
  const [showNightHeist, setShowNightHeist] = useState(false);
  const [inventory, setInventory] = useState(['chai', 'puff']);
  const [friendshipRep, setFriendshipRep] = useState({ rahul: 30, sneha: 35, kevin: 25 });

  // Multiplayer State
  const [showMultiplayerModal, setShowMultiplayerModal] = useState(false);
  const [roomCode, setRoomCode] = useState(() => multiplayerService.getRoomCode());
  const [remotePlayers, setRemotePlayers] = useState(() => multiplayerService.getRemotePlayers());
  const [chatMode, setChatMode] = useState('npc'); // 'npc' | 'room'
  const [playerChatBubble, setPlayerChatBubble] = useState(null);
  const [roomChatMessages, setRoomChatMessages] = useState([]);

  // Multiplayer Network Event Listeners
  useEffect(() => {
    const unsubscribe = multiplayerService.subscribe((event, data) => {
      switch (event) {
        case 'ROOM_HOSTED':
        case 'ROOM_JOINED':
          setRoomCode(data.roomCode);
          setRemotePlayers(multiplayerService.getRemotePlayers());
          soundService.playSuccess();
          setFloatingNotification({
            text: `🌐 Room ${data.roomCode} Connected!`,
            x: playerX
          });
          setTimeout(() => setFloatingNotification(null), 3000);
          break;
        case 'PLAYERS_UPDATED':
          setRemotePlayers([...data]);
          break;
        case 'PLAYER_MOVED':
          setRemotePlayers(prev => prev.map(p => p.id === data.playerId ? { ...p, ...data } : p));
          break;
        case 'PLAYER_CHATTED':
          soundService.playBleep(700, 'sine', 0.08);
          setRoomChatMessages(prev => [...prev.slice(-20), data]);
          setRemotePlayers(prev => prev.map(p => {
            if (p.id === data.playerId) {
              return { ...p, chatBubble: data.text };
            }
            return p;
          }));
          setTimeout(() => {
            setRemotePlayers(prev => prev.map(p => {
              if (p.id === data.playerId && p.chatBubble === data.text) {
                return { ...p, chatBubble: null };
              }
              return p;
            }));
          }, 4500);
          break;
        case 'REMOTE_NPC_ASK':
          setActiveQuestion(data.question);
          if (data.speaker) {
            setCurrentSpeaker(data.speaker);
            soundService.playCharacterVoice(data.speaker.charId);
          }
          setFloatingNotification({
            text: `💬 ${data.senderName} asked ${data.speaker?.character || 'NPC'}!`,
            x: playerX
          });
          setTimeout(() => setFloatingNotification(null), 2500);
          break;
        case 'RECEIVED_GIFT':
          setInventory(prev => [...prev, data.itemId]);
          soundService.playSuccess();
          setFloatingNotification({
            text: `🎁 ${data.fromName} gifted you ${data.itemName}!`,
            x: playerX
          });
          setTimeout(() => setFloatingNotification(null), 3500);
          break;
        case 'HEIST_VICTORY':
          soundService.playFanfare();
          setFloatingNotification({
            text: `🏆 ${data.playerName} pulled off the Midnight Campus Heist!`,
            x: playerX
          });
          setTimeout(() => setFloatingNotification(null), 4000);
          break;
        case 'ROOM_LEFT':
          setRoomCode(null);
          setRemotePlayers([]);
          break;
        default:
          break;
      }
    });

    return () => unsubscribe();
  }, [playerX]);

  // Sync local position with room peers
  useEffect(() => {
    if (multiplayerService.isConnected()) {
      multiplayerService.sendMove(playerX, facing, walking, currentScenery);
    }
  }, [playerX, facing, walking, currentScenery]);

  // Smooth Player Movement Loop
  useEffect(() => {
    if (Math.abs(playerX - targetX) > 5) {
      setWalking(true);
      const direction = targetX > playerX ? 1 : -1;
      setFacing(direction > 0 ? 'right' : 'left');

      const timer = setTimeout(() => {
        setPlayerX(prev => prev + direction * 15);
      }, 50);

      return () => clearTimeout(timer);
    } else {
      setWalking(false);
    }
  }, [playerX, targetX]);

  // Click on Ground to walk
  const handleGroundClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(80, Math.min(540, e.clientX - rect.left));
    setTargetX(clickX);
    soundService.playClick();
  };

  // Switch Scenery
  const handleSwitchScenery = (sceneId) => {
    soundService.playSelect();
    setCurrentScenery(sceneId);
    setPlayerX(220);
    setTargetX(220);

    const starterQuestions = {
      canteen: "What is fresh in the canteen?",
      classroom: "Why is the professor staring at us?",
      library: "How much attendance do I need to pass?",
      hostel: "Are we playing Valorant tonight?",
      bus_stop: "Did the 8:45 AM bus leave?",
      mango_tree: "Any cool advice for surviving college?",
      computer_lab: "Is the proxy working for gaming?",
      campus_gate: "Can we leave campus without gate pass?",
      turf: "Are we playing football after class?"
    };

    const q = starterQuestions[sceneId] || starterQuestions.canteen;
    handleAskQuestion(q, selectedTargetChar, sceneId);

    if (multiplayerService.isConnected()) {
      multiplayerService.sendSceneChange(sceneId);
    }
  };

  // Process and Ask AI Question
  const handleAskQuestion = async (questionText, targetChar = selectedTargetChar, scenery = currentScenery) => {
    if (!questionText || !questionText.trim()) return;

    soundService.playSelect();
    setFacing('right');
    const q = questionText.trim();
    setActiveQuestion(q);
    setAiCustomInput('');

    let res = null;

    // Check if live Gemini API is configured
    if (geminiApiKey) {
      res = await aiService.callGeminiAPI(q, targetChar, npc, geminiApiKey);
    }

    // Instant smart built-in semantic & contextual engine (100% offline, zero popups)
    if (!res) {
      res = aiService.generateCharacterResponse(q, targetChar, npc);
    }

    setCurrentSpeaker(res);

    // Audio cue
    setTimeout(() => {
      soundService.playCharacterVoice(res.charId);
    }, 150);

    setFloatingNotification({
      text: `💬 ${res.character} answered!`,
      x: playerX
    });
    setTimeout(() => setFloatingNotification(null), 2500);

    if (multiplayerService.isConnected()) {
      multiplayerService.sendNPCInteraction(q, res);
    }
  };

  // Save Gemini Key
  const handleSaveKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem('npcify_gemini_key', key);
    setShowKeyModal(false);
    soundService.playSelect();
  };

  // Backpack Gift Item Handler
  const handleGiftItem = (itemId, targetCharId) => {
    setInventory(prev => {
      const idx = prev.indexOf(itemId);
      if (idx !== -1) {
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      }
      return prev;
    });

    setFriendshipRep(prev => ({
      ...prev,
      [targetCharId]: Math.min(100, (prev[targetCharId] || 30) + 15)
    }));

    soundService.playSuccess();
    setFloatingNotification({
      text: `🎁 Gifted to ${targetCharId.toUpperCase()}! Friendship +15`,
      x: playerX
    });
    setTimeout(() => setFloatingNotification(null), 3000);
  };

  // Stage Collectible Item Pickup Handler
  const handlePickItem = (itemId, itemName) => {
    if (inventory.includes(itemId)) return;
    setInventory(prev => [...prev, itemId]);
    soundService.playSuccess();
    setFloatingNotification({
      text: `🎒 Picked up ${itemName}!`,
      x: playerX
    });
    setTimeout(() => setFloatingNotification(null), 2500);
  };

  // Handle Chat Input (NPC Question or Multiplayer Room Chat)
  const handleSendChatOrQuestion = (text) => {
    if (!text || !text.trim()) return;
    const trimmed = text.trim();
    setAiCustomInput('');

    if (chatMode === 'room') {
      if (!multiplayerService.isConnected()) {
        setShowMultiplayerModal(true);
        return;
      }
      setPlayerChatBubble(trimmed);
      multiplayerService.sendChat(trimmed);
      soundService.playBleep(800, 'sine', 0.08);
      setRoomChatMessages(prev => [...prev.slice(-20), {
        id: Date.now(),
        playerName: npc.name || 'You',
        text: trimmed,
        timestamp: Date.now()
      }]);
      setTimeout(() => setPlayerChatBubble(null), 4500);
    } else {
      handleAskQuestion(trimmed);
    }
  };

  // Only Sneha, Rahul, and Kevin stationed in the area
  const activeSceneCharacters = SCENE_CHARACTERS[currentScenery] || SCENE_CHARACTERS.canteen;

  return (
    <div className="space-y-4 select-none">
      {/* Top Scenery Selector Bar (9 Campus Sceneries) */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#111726] border border-white/10 p-2.5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 mr-1">
          <Compass className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>CAMPUS PLACES:</span>
        </div>

        <div className="flex flex-wrap gap-1.5 flex-1">
          {SCENERIES.map(sc => {
            const isActive = currentScenery === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => handleSwitchScenery(sc.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] border border-blue-400/40 scale-102'
                    : 'bg-slate-900/80 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{sc.icon}</span>
                <span>{sc.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {/* Multiplayer Room Button */}
          <button
            onClick={() => {
              soundService.playSelect();
              setShowMultiplayerModal(true);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all border ${
              roomCode
                ? 'bg-purple-950/90 border-purple-400/60 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Host or Join Campus Multiplayer Room"
          >
            <Users className={`w-3.5 h-3.5 ${roomCode ? 'text-emerald-400 animate-pulse' : 'text-cyan-400'}`} />
            <span>{roomCode ? `Room: ${roomCode} (${remotePlayers.length + 1})` : 'Multiplayer'}</span>
          </button>

          {/* Backpack Inventory Button */}
          <button
            onClick={() => {
              soundService.playSelect();
              setShowInventory(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.25)] transition-all"
            title="Open Backpack Inventory & Gift Items"
          >
            <Backpack className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Bag ({inventory.length})</span>
          </button>

          {/* Campus Mini-Games Button */}
          <button
            onClick={() => {
              soundService.playSelect();
              setShowMiniGames(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black tracking-wide cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1.5 transition-all"
            title="Play Campus Mini-Games"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-emerald-200" />
            <span>Mini-Games</span>
          </button>

          {/* Midnight Campus Heist Mission Button */}
          <button
            onClick={() => {
              soundService.playSelect();
              setShowNightHeist(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-800 via-indigo-800 to-slate-900 hover:from-purple-700 hover:to-indigo-700 text-purple-200 hover:text-white text-xs font-black tracking-wide cursor-pointer shadow-[0_0_18px_rgba(168,85,247,0.45)] border border-purple-400/50 flex items-center gap-1.5 transition-all relative group"
            title="Start Operation: Midnight Blueprint (Stealth Night Mission)"
          >
            <span className="text-sm">🕵️</span>
            <span>Midnight Heist</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </button>

          {/* Optional Gemini Key button */}
          <button
            onClick={() => setShowKeyModal(true)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-all border ${
              geminiApiKey
                ? 'bg-emerald-950/80 border-emerald-400/50 text-emerald-300'
                : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Optional Google Gemini API Key Setup"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>{geminiApiKey ? 'Gemini Active' : 'AI Key'}</span>
          </button>

          <button
            onClick={() => {
              const randomDilemma = AI_CAMPUS_DILEMMAS[Math.floor(Math.random() * AI_CAMPUS_DILEMMAS.length)];
              handleAskQuestion(randomDilemma);
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black tracking-wide cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-1.5 transition-all"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Dilemma</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Canvas Viewport */}
      <div
        onClick={handleGroundClick}
        className="relative w-full h-[490px] rounded-3xl bg-slate-950 border-2 border-blue-500/30 overflow-hidden shadow-2xl cursor-crosshair"
      >
        {/* Rich Campus Scenery Environmental Art Background */}
        <CampusSceneryBackground
          currentScenery={currentScenery}
          inventory={inventory}
          onPickItem={handlePickItem}
          onAskQuestion={handleAskQuestion}
        />

        {/* Floating Notification */}
        {floatingNotification && (
          <div
            className="absolute top-28 z-50 bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2 rounded-full shadow-[0_0_25px_#10b981] animate-bounce pointer-events-none"
            style={{ left: `${floatingNotification.x}px`, transform: 'translateX(-50%)' }}
          >
            {floatingNotification.text}
          </div>
        )}

        {/* CAMPUS CHARACTERS PRESENT IN THE AREA */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {activeSceneCharacters.map((c) => {
            const isSpeaker = currentSpeaker.charId === c.charId;
            return (
              <div
                key={c.charId}
                className="absolute bottom-8 transition-all duration-300 pointer-events-auto"
                style={{
                  left: `${c.x}px`,
                  transform: 'translateX(-50%)'
                }}
              >
                <CampusNPC
                  charId={c.charId}
                  isSpeaker={isSpeaker}
                  replyText={isSpeaker ? currentSpeaker.reply : null}
                  onClick={(clickedCharId) => {
                    soundService.playClick();
                    setSelectedTargetChar(clickedCharId);
                    handleAskQuestion(activeQuestion, clickedCharId);
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* REMOTE CONNECTED MULTIPLAYER STUDENTS */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {remotePlayers
            .filter(p => (p.scenery === currentScenery || (!p.scenery && currentScenery === 'canteen')))
            .map(p => (
              <RemotePlayer
                key={p.id}
                player={p}
                onClick={(targetPlayer) => {
                  soundService.playClick();
                  setFloatingNotification({
                    text: `✋ High-fived ${targetPlayer.name || 'Friend'}!`,
                    x: targetPlayer.x || playerX
                  });
                  setTimeout(() => setFloatingNotification(null), 2500);
                }}
              />
            ))}
        </div>

        {/* MAIN PLAYER SPRITE (Left/Walking in scenery) */}
        <div
          className="absolute bottom-10 flex flex-col items-center z-30 pointer-events-none transition-all duration-100 ease-out"
          style={{
            left: `${playerX}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {/* Player's Chat or Question Bubble */}
          {playerChatBubble ? (
            <div className="mb-2 max-w-[240px] bg-slate-900/95 border-2 border-cyan-400 text-white font-bold text-xs px-3.5 py-2 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)] relative text-center animate-pop whitespace-normal">
              <span className="text-[10px] text-cyan-300 font-mono block border-b border-white/10 pb-0.5 mb-1">
                {npc.name} (Room Chat)
              </span>
              "{playerChatBubble}"
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45 border-r-2 border-b-2 border-cyan-400" />
            </div>
          ) : activeQuestion ? (
            <div className="mb-2 w-max max-w-[260px] sm:max-w-[300px] bg-white text-slate-950 font-bold text-xs px-3.5 py-2 rounded-2xl shadow-2xl relative border-2 border-blue-400 text-center animate-pop whitespace-normal">
              "{activeQuestion}"
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-blue-400" />
            </div>
          ) : null}

          <NPCCharacter size="lg" avatar={npc.avatar} state={walking ? 'WALK' : 'IDLE'} facing={facing} />
        </div>

        {/* Top-Left HUD Card */}
        <div className="absolute top-4 left-4 bg-[#0f172a]/95 backdrop-blur-md border border-white/15 rounded-2xl p-2.5 flex items-center gap-3 shadow-xl z-30 pointer-events-none">
          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-xl">
            {npc.avatar?.gender === 'girl' ? '👧' : '👦'}
          </div>
          <div>
            <div className="font-bold text-xs text-white uppercase tracking-wide">
              {npc.name}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold">HP</span>
              <div className="w-24 h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Top-Right HUD Card */}
        <div className="absolute top-4 right-4 bg-[#0f172a]/95 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-xl z-30 text-right pointer-events-none">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>10:45 AM</span>
            </div>
            <span className="text-[10px] text-amber-400 font-bold tracking-wide">
              {SCENERIES.find(s => s.id === currentScenery)?.name || 'Campus'}
            </span>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* STREAMLINED AI QUESTION & ACTIVE CHARACTER CHAT CONSOLE */}
      {/* ================================================================ */}
      <div className="bg-[#111726] border border-white/10 rounded-2xl p-4 space-y-3.5 shadow-xl">
        {/* Active Character Response Card */}
        <div className="bg-slate-900/90 border border-white/10 rounded-xl p-3.5 flex items-start gap-3.5 shadow-inner">
          <div className="text-4xl animate-bounce drop-shadow flex-shrink-0">
            {currentSpeaker.avatar || '👦'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-white">
                  {currentSpeaker.character || 'Rahul'}
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {currentSpeaker.role || 'Backbench Partner'}
                </span>
              </div>
              <button
                onClick={() => soundService.playCharacterVoice(currentSpeaker.charId)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-mono"
                title="Replay character voice"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Replay Voice</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed italic border-l-2 border-cyan-400 pl-2.5">
              "{currentSpeaker.reply || 'Nothing broo chilling!'}"
            </p>
          </div>
        </div>

        {/* Who Responds Selector Pills (All 9 Characters) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400">
            <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>ASK CHARACTER:</span>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs font-bold">
            {[
              { id: 'rahul', label: '👦 Rahul', color: 'bg-red-600' },
              { id: 'sneha', label: '👧 Sneha', color: 'bg-amber-600' },
              { id: 'kevin', label: '🎧 Kevin', color: 'bg-emerald-600' }
            ].map(char => {
              const isSelected = selectedTargetChar === char.id;
              return (
                <button
                  key={char.id}
                  onClick={() => {
                    soundService.playClick();
                    setSelectedTargetChar(char.id);
                    handleAskQuestion(activeQuestion, char.id);
                  }}
                  className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? `${char.color} text-white shadow ring-2 ring-white/30 scale-102`
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {char.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Mode Switcher: Ask NPCs vs Live Room Chat */}
        <div className="flex items-center justify-between border-t border-white/5 pt-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setChatMode('npc')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                chatMode === 'npc'
                  ? 'bg-blue-600 text-white shadow ring-2 ring-blue-400/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <span>🤖</span>
              <span>Ask NPCs</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (!roomCode) {
                  setShowMultiplayerModal(true);
                } else {
                  setChatMode('room');
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                chatMode === 'room'
                  ? 'bg-purple-600 text-white shadow ring-2 ring-purple-400/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <span>💬</span>
              <span>Room Chat</span>
              {roomCode ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ) : (
                <span className="text-[9px] text-cyan-400 bg-cyan-950 px-1.5 rounded border border-cyan-500/30">Connect</span>
              )}
            </button>
          </div>

          {chatMode === 'room' && roomChatMessages.length > 0 && (
            <span className="text-[10px] font-mono text-purple-300">
              {roomChatMessages.length} message{roomChatMessages.length > 1 ? 's' : ''} in room
            </span>
          )}
        </div>

        {/* Custom Question / Chat Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendChatOrQuestion(aiCustomInput);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={aiCustomInput}
            onChange={e => setAiCustomInput(e.target.value)}
            placeholder={
              chatMode === 'room'
                ? `Type message to friends in room ${roomCode || ''}... (shows speech bubble!)`
                : `Ask ${currentSpeaker.character || 'character'} anything... (e.g. "whats your schedule today", "how are you broo")`
            }
            className={`flex-1 bg-[#0b0f19] border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors ${
              chatMode === 'room' ? 'border-purple-500/50 focus:border-purple-400' : 'border-white/10 focus:border-cyan-500'
            }`}
          />
          <button
            type="submit"
            className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 flex-shrink-0 shadow-lg ${
              chatMode === 'room'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{chatMode === 'room' ? 'Say' : 'Ask'}</span>
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap gap-1.5">
          {QUICK_PROMPT_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(q)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer text-left"
            >
              💬 "{q}"
            </button>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
          <div className="text-slate-400 text-[11px] font-mono">
            Speaking with: <strong className="text-amber-400">{currentSpeaker.character || 'Rahul'}</strong> ({currentSpeaker.role})
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTriggerEvent}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer shadow-[0_0_12px_rgba(244,63,94,0.4)] transition-all flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Trigger Surprise Assignment (Panel 7)</span>
            </button>

            <button
              onClick={onFinishDay}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all"
            >
              End Day →
            </button>
          </div>
        </div>
      </div>

      {/* Optional Gemini API Key Setup Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-cyan-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <span>Optional Google Gemini LLM Setup</span>
              </h3>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              By default, NPCify uses a zero-latency semantic AI engine with authentic college banter. You can optionally connect a free Google Gemini API key to run real-time generative responses for all 9 characters.
            </p>

            <div>
              <label className="text-[10px] font-mono text-cyan-400 block mb-1">
                GEMINI API KEY:
              </label>
              <input
                type="password"
                defaultValue={geminiApiKey}
                placeholder="AIzaSy..."
                id="geminiKeyInput"
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => handleSaveKey('')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Use Built-In Engine
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById('geminiKeyInput');
                  handleSaveKey(input?.value || '');
                }}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow cursor-pointer"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backpack Inventory Modal */}
      {showInventory && (
        <CampusInventory
          isOpen={true}
          inventory={inventory}
          friendshipRep={friendshipRep}
          remotePlayers={remotePlayers}
          onGiftItem={handleGiftItem}
          onGiftPlayer={(item, toPlayerId, toPlayerName) => {
            setInventory(prev => {
              const idx = prev.indexOf(item.id);
              if (idx !== -1) {
                const next = [...prev];
                next.splice(idx, 1);
                return next;
              }
              return prev;
            });
            multiplayerService.sendGift(toPlayerId, item.id, item.name);
            soundService.playSuccess();
            setFloatingNotification({
              text: `🎁 Gifted ${item.name} to ${toPlayerName}!`,
              x: playerX
            });
            setTimeout(() => setFloatingNotification(null), 3000);
          }}
          onClose={() => setShowInventory(false)}
        />
      )}

      {/* Campus Mini-Games Modal */}
      {showMiniGames && (
        <CampusMiniGames
          isOpen={true}
          onClose={() => setShowMiniGames(false)}
          onAddScore={(gameId, score) => {
            soundService.playSuccess();
            setFloatingNotification({
              text: `🏆 New record: ${score} pts!`,
              x: playerX
            });
            setTimeout(() => setFloatingNotification(null), 3000);
          }}
        />
      )}

      {/* Campus Multiplayer Room Modal */}
      {showMultiplayerModal && (
        <MultiplayerModal
          isOpen={true}
          onClose={() => setShowMultiplayerModal(false)}
          npc={npc}
          roomCode={roomCode}
          remotePlayers={remotePlayers}
          onSwitchScenery={handleSwitchScenery}
          onTeleportToPlayer={(targetPlayer) => {
            if (targetPlayer.x) {
              setPlayerX(targetPlayer.x);
              setTargetX(targetPlayer.x);
            }
          }}
        />
      )}

      {/* Midnight Campus Heist Mission Modal */}
      {showNightHeist && (
        <CampusNightHeist
          isOpen={true}
          npc={npc}
          onClose={() => setShowNightHeist(false)}
          onHeistSuccess={(blueprintItem) => {
            setInventory(prev => prev.includes('exam_blueprint') ? prev : [...prev, 'exam_blueprint']);
            setFriendshipRep(prev => ({
              rahul: (prev.rahul || 25) + 20,
              sneha: (prev.sneha || 30) + 20,
              kevin: (prev.kevin || 20) + 20
            }));
            setFloatingNotification({
              text: `📜 Secured HOD's Exam Blueprint! (+50 Rep with Squad)`,
              x: playerX
            });
            setTimeout(() => setFloatingNotification(null), 4000);
            if (multiplayerService.isConnected()) {
              multiplayerService.sendHeistVictory(npc.name);
            }
          }}
        />
      )}
    </div>
  );
}
