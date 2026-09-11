import Peer from 'peerjs';

/**
 * MultiplayerService
 * Dual-layer real-time networking:
 * 1. BroadcastChannel: 0-latency instant sync for multiple browser tabs/windows on the same computer.
 * 2. WebRTC PeerJS: P2P room connection across different devices/laptops on network/internet.
 */
class MultiplayerService {
  constructor() {
    this.peer = null;
    this.connections = new Map(); // peerId -> DataConnection
    this.broadcastChannel = null;
    this.listeners = new Set();
    this.roomCode = null;
    this.isHostUser = false;
    this.localPlayer = null;
    this.remotePlayers = new Map(); // id -> player info
    this.heartbeatInterval = null;
  }

  // Subscribe to multiplayer events
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(event, data) {
    this.listeners.forEach(cb => {
      try {
        cb(event, data);
      } catch (err) {
        console.error('Error in multiplayer listener:', err);
      }
    });
  }

  // Generate a random 4-6 letter campus room code
  generateRoomCode() {
    const prefixes = ['CHAI', 'BUNK', 'TURF', 'LAB', 'EXAM', 'GATE', 'XEROX', 'ROOM'];
    const num = Math.floor(Math.random() * 90) + 10;
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    return `${prefix}-${num}`;
  }

  // Initialize BroadcastChannel for instant local multi-tab support
  initBroadcastChannel(code) {
    if (typeof window === 'undefined' || !window.BroadcastChannel) return;
    try {
      if (this.broadcastChannel) {
        this.broadcastChannel.close();
      }
      this.broadcastChannel = new BroadcastChannel(`npcify_room_${code.toUpperCase()}`);
      this.broadcastChannel.onmessage = (event) => {
        const message = event.data;
        if (!message || message.senderId === this.localPlayer?.id) return;
        this.handleIncomingMessage(message);
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported or error:', e);
    }
  }

  // Host a new Campus Room
  async hostRoom(code, playerInfo) {
    this.roomCode = (code || this.generateRoomCode()).toUpperCase();
    this.isHostUser = true;
    this.localPlayer = {
      id: 'host_' + Math.random().toString(36).substring(2, 9),
      isHost: true,
      ...playerInfo
    };
    this.remotePlayers.clear();

    // 1. Initialize local BroadcastChannel
    this.initBroadcastChannel(this.roomCode);

    // 2. Initialize WebRTC PeerJS Host
    try {
      const peerId = `npcify-campus-${this.roomCode.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      this.peer = new Peer(peerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      this.peer.on('open', (id) => {
        this.emit('ROOM_HOSTED', { roomCode: this.roomCode, localPlayer: this.localPlayer });
      });

      this.peer.on('connection', (conn) => {
        this.setupConnection(conn);
      });

      this.peer.on('error', (err) => {
        console.warn('PeerJS host error (fallback to local broadcast channel):', err);
      });
    } catch (e) {
      console.warn('PeerJS init failed, continuing in broadcast channel mode:', e);
    }

    this.startHeartbeat();
    this.broadcastMessage({
      type: 'PLAYER_JOIN',
      player: this.localPlayer
    });

    return { roomCode: this.roomCode, localPlayer: this.localPlayer };
  }

  // Join an existing Campus Room
  async joinRoom(code, playerInfo) {
    this.roomCode = code.toUpperCase().trim();
    this.isHostUser = false;
    this.localPlayer = {
      id: 'guest_' + Math.random().toString(36).substring(2, 9),
      isHost: false,
      ...playerInfo
    };
    this.remotePlayers.clear();

    // 1. Initialize local BroadcastChannel
    this.initBroadcastChannel(this.roomCode);

    // 2. Initialize WebRTC PeerJS Client
    try {
      const myPeerId = `npcify-peer-${Math.random().toString(36).substring(2, 9)}`;
      this.peer = new Peer(myPeerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      this.peer.on('open', () => {
        const hostPeerId = `npcify-campus-${this.roomCode.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        const conn = this.peer.connect(hostPeerId, { reliable: true });
        this.setupConnection(conn);
      });

      this.peer.on('error', (err) => {
        console.warn('PeerJS client error (falling back to broadcast channel):', err);
      });
    } catch (e) {
      console.warn('PeerJS join error:', e);
    }

    this.startHeartbeat();

    // Announce presence via broadcast channel & peer
    this.broadcastMessage({
      type: 'PLAYER_JOIN',
      player: this.localPlayer
    });

    this.emit('ROOM_JOINED', { roomCode: this.roomCode, localPlayer: this.localPlayer });
    return { roomCode: this.roomCode, localPlayer: this.localPlayer };
  }

  setupConnection(conn) {
    conn.on('open', () => {
      this.connections.set(conn.peer, conn);

      // Send local player info
      conn.send({
        type: 'PLAYER_JOIN',
        senderId: this.localPlayer.id,
        player: this.localPlayer
      });

      // If host, send full roster
      if (this.isHostUser) {
        const allPlayers = [this.localPlayer, ...Array.from(this.remotePlayers.values())];
        conn.send({
          type: 'ROOM_SYNC',
          senderId: this.localPlayer.id,
          players: allPlayers
        });
      }
    });

    conn.on('data', (data) => {
      if (!data || data.senderId === this.localPlayer?.id) return;
      this.handleIncomingMessage(data);

      // If host, relay data to other connected peers
      if (this.isHostUser) {
        this.connections.forEach((otherConn, peerId) => {
          if (peerId !== conn.peer && otherConn.open) {
            otherConn.send(data);
          }
        });
      }
    });

    conn.on('close', () => {
      this.connections.delete(conn.peer);
    });
  }

  // Handle incoming message from peer or broadcast channel
  handleIncomingMessage(msg) {
    if (!msg || !msg.type) return;

    switch (msg.type) {
      case 'PLAYER_JOIN': {
        if (msg.player && msg.player.id !== this.localPlayer?.id) {
          this.remotePlayers.set(msg.player.id, {
            ...msg.player,
            lastSeen: Date.now()
          });
          this.emit('PLAYERS_UPDATED', Array.from(this.remotePlayers.values()));

          // If someone joined, respond with our info so they know about us
          this.broadcastMessage({
            type: 'PLAYER_ANNOUNCE',
            player: this.localPlayer
          });
        }
        break;
      }

      case 'PLAYER_ANNOUNCE': {
        if (msg.player && msg.player.id !== this.localPlayer?.id) {
          this.remotePlayers.set(msg.player.id, {
            ...msg.player,
            lastSeen: Date.now()
          });
          this.emit('PLAYERS_UPDATED', Array.from(this.remotePlayers.values()));
        }
        break;
      }

      case 'ROOM_SYNC': {
        if (Array.isArray(msg.players)) {
          msg.players.forEach(p => {
            if (p && p.id !== this.localPlayer?.id) {
              this.remotePlayers.set(p.id, { ...p, lastSeen: Date.now() });
            }
          });
          this.emit('PLAYERS_UPDATED', Array.from(this.remotePlayers.values()));
        }
        break;
      }

      case 'PLAYER_MOVE': {
        const existing = this.remotePlayers.get(msg.playerId);
        if (existing) {
          existing.x = msg.x;
          existing.facing = msg.facing;
          existing.walking = msg.walking;
          existing.scenery = msg.scenery;
          existing.lastSeen = Date.now();
          this.emit('PLAYER_MOVED', { playerId: msg.playerId, ...msg });
        }
        break;
      }

      case 'PLAYER_CHAT': {
        const existing = this.remotePlayers.get(msg.playerId);
        if (existing) {
          existing.chatBubble = msg.text;
          existing.lastSeen = Date.now();
        }
        this.emit('PLAYER_CHATTED', {
          playerId: msg.playerId,
          playerName: msg.playerName,
          text: msg.text,
          timestamp: msg.timestamp || Date.now()
        });
        break;
      }

      case 'PLAYER_SCENE': {
        const existing = this.remotePlayers.get(msg.playerId);
        if (existing) {
          existing.scenery = msg.scenery;
          existing.lastSeen = Date.now();
          this.emit('PLAYERS_UPDATED', Array.from(this.remotePlayers.values()));
        }
        break;
      }

      case 'NPC_ASK': {
        this.emit('REMOTE_NPC_ASK', {
          senderName: msg.senderName,
          question: msg.question,
          speaker: msg.speaker
        });
        break;
      }

      case 'PLAYER_GIFT': {
        if (msg.toId === this.localPlayer?.id) {
          this.emit('RECEIVED_GIFT', {
            fromName: msg.fromName,
            itemId: msg.itemId,
            itemName: msg.itemName
          });
        }
        break;
      }

      case 'HEARTBEAT': {
        if (msg.playerId && msg.playerId !== this.localPlayer?.id) {
          const existing = this.remotePlayers.get(msg.playerId);
          if (existing) {
            existing.lastSeen = Date.now();
          } else if (msg.player) {
            this.remotePlayers.set(msg.playerId, { ...msg.player, lastSeen: Date.now() });
            this.emit('PLAYERS_UPDATED', Array.from(this.remotePlayers.values()));
          }
        }
        break;
      }

      case 'PLAYER_LEAVE': {
        if (msg.playerId) {
          this.remotePlayers.delete(msg.playerId);
          this.emit('PLAYERS_UPDATED', Array.from(this.remotePlayers.values()));
        }
        break;
      }

      case 'HEIST_VICTORY': {
        this.emit('HEIST_VICTORY', {
          playerName: msg.playerName,
          missionTitle: msg.missionTitle || 'Midnight Campus Heist'
        });
        break;
      }

      default:
        break;
    }
  }

  // Send message across all connections (BroadcastChannel + PeerJS connections)
  broadcastMessage(data) {
    const payload = {
      ...data,
      senderId: this.localPlayer?.id,
      timestamp: Date.now()
    };

    // 1. Send via local BroadcastChannel
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(payload);
      } catch (e) {
        console.warn('BroadcastChannel postMessage error:', e);
      }
    }

    // 2. Send via WebRTC Peer connections
    this.connections.forEach(conn => {
      if (conn.open) {
        try {
          conn.send(payload);
        } catch (e) {
          console.warn('Peer send error:', e);
        }
      }
    });
  }

  // Periodic heartbeat to maintain presence and prune stale players
  startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      if (!this.localPlayer) return;

      // Broadcast heartbeat
      this.broadcastMessage({
        type: 'HEARTBEAT',
        playerId: this.localPlayer.id,
        player: this.localPlayer
      });

      // Prune players inactive for more than 12 seconds
      const now = Date.now();
      let changed = false;
      this.remotePlayers.forEach((p, id) => {
        if (now - (p.lastSeen || 0) > 12000) {
          this.remotePlayers.delete(id);
          changed = true;
        }
      });
      if (changed) {
        this.emit('PLAYERS_UPDATED', Array.from(this.remotePlayers.values()));
      }
    }, 4000);
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // Public Actions
  sendMove(x, facing, walking, scenery) {
    if (!this.localPlayer) return;
    this.localPlayer.x = x;
    this.localPlayer.facing = facing;
    this.localPlayer.walking = walking;
    this.localPlayer.scenery = scenery;

    this.broadcastMessage({
      type: 'PLAYER_MOVE',
      playerId: this.localPlayer.id,
      x,
      facing,
      walking,
      scenery
    });
  }

  sendChat(text) {
    if (!this.localPlayer || !text.trim()) return;
    this.broadcastMessage({
      type: 'PLAYER_CHAT',
      playerId: this.localPlayer.id,
      playerName: this.localPlayer.name || 'Student',
      text: text.trim()
    });
  }

  sendSceneChange(scenery) {
    if (!this.localPlayer) return;
    this.localPlayer.scenery = scenery;
    this.broadcastMessage({
      type: 'PLAYER_SCENE',
      playerId: this.localPlayer.id,
      scenery
    });
  }

  sendNPCInteraction(question, speaker) {
    if (!this.localPlayer) return;
    this.broadcastMessage({
      type: 'NPC_ASK',
      senderName: this.localPlayer.name || 'Friend',
      question,
      speaker
    });
  }

  sendGift(toPlayerId, itemId, itemName) {
    if (!this.localPlayer) return;
    this.broadcastMessage({
      type: 'PLAYER_GIFT',
      fromId: this.localPlayer.id,
      fromName: this.localPlayer.name || 'Friend',
      toId: toPlayerId,
      itemId,
      itemName
    });
  }

  sendHeistVictory(playerName, missionTitle = 'Midnight Campus Heist') {
    this.broadcastMessage({
      type: 'HEIST_VICTORY',
      playerName: playerName || this.localPlayer?.name || 'Infiltrator',
      missionTitle
    });
  }

  leaveRoom() {
    this.stopHeartbeat();
    this.broadcastMessage({
      type: 'PLAYER_LEAVE',
      playerId: this.localPlayer?.id
    });

    this.connections.forEach(conn => conn.close());
    this.connections.clear();

    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }

    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }

    this.roomCode = null;
    this.localPlayer = null;
    this.remotePlayers.clear();
    this.emit('ROOM_LEFT');
  }

  getRoomCode() {
    return this.roomCode;
  }

  getLocalPlayer() {
    return this.localPlayer;
  }

  getRemotePlayers() {
    return Array.from(this.remotePlayers.values());
  }

  isHost() {
    return this.isHostUser;
  }

  isConnected() {
    return !!this.roomCode;
  }
}

export const multiplayerService = new MultiplayerService();
