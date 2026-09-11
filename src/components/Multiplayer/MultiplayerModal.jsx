import React, { useState } from 'react';
import { X, Users, Copy, Check, LogOut, Sparkles, Wifi, ArrowRight, Shield, MapPin } from 'lucide-react';
import { multiplayerService } from '../../services/multiplayerService';
import { soundService } from '../../services/soundService';

export default function MultiplayerModal({
  isOpen = true,
  onClose,
  npc,
  roomCode,
  remotePlayers = [],
  onSwitchScenery,
  onTeleportToPlayer
}) {
  const [inputCode, setInputCode] = useState('');
  const [playerName, setPlayerName] = useState(npc?.name || 'Student');
  const [copied, setCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState('join'); // 'host' | 'join'

  if (!isOpen) return null;

  const isConnected = multiplayerService.isConnected();
  const allPlayers = isConnected
    ? [multiplayerService.getLocalPlayer(), ...remotePlayers].filter(Boolean)
    : [];

  const handleHost = async () => {
    soundService.playSelect();
    setIsConnecting(true);
    try {
      await multiplayerService.hostRoom(null, {
        name: playerName.trim() || 'Host Student',
        avatar: npc.avatar
      });
      soundService.playSuccess();
    } catch (e) {
      console.error(e);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleJoin = async () => {
    if (!inputCode.trim()) return;
    soundService.playSelect();
    setIsConnecting(true);
    try {
      await multiplayerService.joinRoom(inputCode.trim(), {
        name: playerName.trim() || 'Guest Student',
        avatar: npc.avatar
      });
      soundService.playSuccess();
    } catch (e) {
      console.error(e);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCopyCode = () => {
    if (!roomCode) return;
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    soundService.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeave = () => {
    soundService.playClick();
    multiplayerService.leaveRoom();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0b101e] border-2 border-cyan-400/50 rounded-3xl p-6 shadow-[0_0_60px_rgba(6,182,212,0.4)] flex flex-col gap-5 text-white">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-xl">
              👥
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide text-cyan-300 uppercase font-mono flex items-center gap-2">
                <span>Campus Multiplayer</span>
                {isConnected && (
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/40 font-normal">
                    ● Live Room
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">
                Hang out, walk, and chat with 2 to 3 friends simultaneously!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONNECTED STATE: Room Roster & Code Sharing */}
        {isConnected ? (
          <div className="space-y-4">
            {/* Room Code Banner */}
            <div className="bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-purple-950/80 border-2 border-cyan-400/50 rounded-2xl p-4 flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[10px] font-mono text-cyan-300 font-bold block">
                  ROOM CODE (SHARE WITH FRIENDS):
                </span>
                <span className="font-retro text-lg text-yellow-300 tracking-wider">
                  {roomCode}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition-all active:scale-95"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Active Students List (2-3+ players) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span>STUDENTS IN ROOM ({allPlayers.length})</span>
                <span className="text-emerald-400 font-bold">Max 4 Players</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {allPlayers.map((player) => {
                  const isLocal = player.id === multiplayerService.getLocalPlayer()?.id;
                  return (
                    <div
                      key={player.id}
                      className="bg-slate-900/80 border border-white/10 rounded-2xl p-3 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-center justify-center text-lg">
                          {player.avatar?.gender === 'girl' ? '👧' : '👦'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-xs text-white">
                              {player.name || 'Student'}
                            </span>
                            {isLocal && (
                              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-500/30">
                                YOU
                              </span>
                            )}
                            {player.isHost && (
                              <span className="text-[9px] font-mono text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-500/30">
                                HOST
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            <span>{player.scenery || 'Canteen Street'}</span>
                          </span>
                        </div>
                      </div>

                      {!isLocal && player.scenery && (
                        <button
                          onClick={() => {
                            onSwitchScenery?.(player.scenery);
                            onTeleportToPlayer?.(player);
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-slate-300 hover:text-cyan-300 cursor-pointer transition-colors"
                          title="Teleport to friend's location"
                        >
                          Go to Place →
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leave Room Button */}
            <div className="pt-2 border-t border-white/10 flex justify-between items-center">
              <span className="text-[11px] text-slate-400 font-mono">
                Tip: Open another browser tab to test local 2-player mode instantly!
              </span>
              <button
                onClick={handleLeave}
                className="px-3.5 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Leave Room</span>
              </button>
            </div>
          </div>
        ) : (
          /* DISCONNECTED STATE: Host or Join Form */
          <div className="space-y-4">
            {/* Player Name Input */}
            <div>
              <label className="text-[10px] font-mono text-cyan-400 block mb-1">
                YOUR CAMPUS HANDLE / NAME:
              </label>
              <input
                type="text"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                placeholder="Enter your student name..."
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none font-bold"
              />
            </div>

            {/* Host or Join Tabs */}
            <div className="flex bg-[#070b14] p-1 rounded-2xl border border-white/5 text-xs font-mono font-bold">
              <button
                onClick={() => setActiveTab('join')}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'join'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Join Existing Room
              </button>
              <button
                onClick={() => setActiveTab('host')}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'host'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create New Room
              </button>
            </div>

            {activeTab === 'join' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">
                    ENTER ROOM CODE (e.g. CHAI-42):
                  </label>
                  <input
                    type="text"
                    value={inputCode}
                    onChange={e => setInputCode(e.target.value.toUpperCase())}
                    placeholder="CHAI-42"
                    className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl px-4 py-3 text-center text-lg font-retro text-yellow-300 focus:border-cyan-400 focus:outline-none tracking-widest uppercase"
                  />
                </div>

                <button
                  onClick={handleJoin}
                  disabled={!inputCode.trim() || isConnecting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white font-black text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Wifi className="w-4 h-4" />
                  <span>{isConnecting ? 'CONNECTING...' : 'JOIN CAMPUS ROOM'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-white/5">
                  Host a private room for your friends! Anyone with your 4-letter room code can enter, walk alongside you, and chat simultaneously.
                </p>

                <button
                  onClick={handleHost}
                  disabled={isConnecting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isConnecting ? 'CREATING ROOM...' : 'GENERATE & HOST ROOM'}</span>
                </button>
              </div>
            )}

            {/* Quick-Join Multi-Tab tip */}
            <div className="bg-[#080f1e] rounded-xl p-2.5 border border-cyan-500/20 text-[11px] font-mono text-cyan-300/80 flex items-center gap-2">
              <span className="text-base">💡</span>
              <span>
                Want to test with 2 or 3 players right now? Just open <strong>another browser tab</strong> and join the same room!
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
