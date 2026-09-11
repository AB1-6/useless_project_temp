// Web Audio API Synthesizer for rich retro sound effects without external audio files
class SoundService {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playBleep(freq = 440, type = 'square', duration = 0.08) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio not allowed yet
    }
  }

  playClick() {
    this.playBleep(520, 'sine', 0.05);
  }

  playSelect() {
    if (this.muted) return;
    this.playBleep(660, 'triangle', 0.06);
    setTimeout(() => this.playBleep(880, 'triangle', 0.09), 60);
  }

  playQuestChime() {
    if (this.muted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playBleep(freq, 'triangle', 0.15), idx * 80);
    });
  }

  playPotSmash() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      // White noise buffer for crash
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {}
  }

  playGrunt() {
    if (this.muted) return;
    this.playBleep(140, 'sawtooth', 0.12);
  }

  playWind() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.6;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.3);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.6);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) {}
  }

  playFanfare() {
    if (this.muted) return;
    const chords = [
      { f: 440, t: 0 },
      { f: 554.37, t: 100 },
      { f: 659.25, t: 200 },
      { f: 880, t: 350 },
      { f: 1108.73, t: 500 }
    ];
    chords.forEach(c => {
      setTimeout(() => this.playBleep(c.f, 'triangle', 0.25), c.t);
    });
  }

  playCharacterVoice(charId = 'rahul') {
    if (this.muted) return;
    if (charId === 'bruno') {
      this.playBark();
      return;
    }
    const pitches = {
      rahul: [300, 360],
      sneha: [540, 620],
      kevin: [200, 240],
      chechi: [420, 480],
      prof: [150, 170],
      ashwin: [260, 310],
      ananya: [480, 560],
      guard: [140, 220]
    };
    const pair = pitches[charId] || [330, 400];
    this.playBleep(pair[0], 'triangle', 0.07);
    setTimeout(() => this.playBleep(pair[1], 'triangle', 0.09), 60);
  }

  playHonk() {
    if (this.muted) return;
    this.playBleep(350, 'sawtooth', 0.15);
    setTimeout(() => this.playBleep(440, 'sawtooth', 0.18), 40);
  }

  playCoin() {
    if (this.muted) return;
    this.playBleep(988, 'sine', 0.08);
    setTimeout(() => this.playBleep(1319, 'sine', 0.18), 70);
  }

  playKick() {
    if (this.muted) return;
    this.playBleep(120, 'sine', 0.12);
  }

  playBark() {
    if (this.muted) return;
    this.playBleep(220, 'sawtooth', 0.06);
    setTimeout(() => this.playBleep(180, 'sawtooth', 0.08), 70);
  }

  playSplash() {
    if (this.muted) return;
    this.playCoin();
    setTimeout(() => this.playBleep(600, 'sine', 0.1), 100);
  }

  playSuccess() {
    if (this.muted) return;
    this.playBleep(587.33, 'triangle', 0.1);
    setTimeout(() => this.playBleep(880, 'triangle', 0.15), 90);
  }

  playLevelUp() {
    if (this.muted) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playBleep(freq, 'triangle', 0.12), idx * 70);
    });
  }

  playBuzzer() {
    if (this.muted) return;
    this.playBleep(150, 'sawtooth', 0.2);
    setTimeout(() => this.playBleep(130, 'sawtooth', 0.25), 100);
  }

  playSuspense() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      // Sub-bass heartbeat pulse
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);

      // Second beat of heartbeat
      setTimeout(() => {
        if (!this.ctx || this.muted) return;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(60, this.ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
        gain2.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start();
        osc2.stop(this.ctx.currentTime + 0.18);
      }, 140);
    } catch (e) {}
  }

  playAlert() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      // Sharp metal gear style alert sting
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(950, this.ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  playSafeClick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      // Mechanical tumbler notch click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }

  playDecoy() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      // Clatter sound (chai cup hitting floor or quick vibration)
      this.playPotSmash();
      setTimeout(() => {
        this.playBleep(900, 'sine', 0.04);
      }, 50);
      setTimeout(() => {
        this.playBleep(750, 'sine', 0.04);
      }, 110);
    } catch (e) {}
  }

  playAlarm() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(950, this.ctx.currentTime + 0.15);
      osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    } catch (e) {}
  }
}

export const soundService = new SoundService();
