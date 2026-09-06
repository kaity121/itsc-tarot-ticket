class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private isAmbientPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Realistic card flip sound (paper snap & subtle air whoosh)
  public playCardFlip() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // 1. Paper snap click
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      const snapFilter = ctx.createBiquadFilter();

      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(320, now);
      snapOsc.frequency.exponentialRampToValueAtTime(70, now + 0.07);

      snapFilter.type = 'lowpass';
      snapFilter.frequency.setValueAtTime(1800, now);
      snapFilter.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      snapGain.gain.setValueAtTime(0.35, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      snapOsc.connect(snapFilter);
      snapFilter.connect(snapGain);
      snapGain.connect(ctx.destination);

      snapOsc.start(now);
      snapOsc.stop(now + 0.09);

      // 2. Paper slide/whoosh noise burst
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(2400, now);
      noiseFilter.Q.setValueAtTime(2.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.12);
    } catch {
      // Audio autoplay policies or background tab
    }
  }

  // Realistic card shuffle sound (multiple overlapping fluttering card slides)
  public playCardShuffle() {
    try {
      const ctx = this.initContext();
      const baseTime = ctx.currentTime;
      const flutterCount = 14;

      for (let i = 0; i < flutterCount; i++) {
        const offset = (i * 0.07) + (Math.random() * 0.03);
        const duration = 0.09;
        const bufferSize = Math.floor(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let j = 0; j < bufferSize; j++) {
          data[j] = (Math.random() * 2 - 1);
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400 + (Math.random() * 1800), baseTime + offset);
        filter.Q.setValueAtTime(3.5, baseTime + offset);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, baseTime + offset);
        gain.gain.linearRampToValueAtTime(0.22, baseTime + offset + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, baseTime + offset + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(baseTime + offset);
        noise.stop(baseTime + offset + duration);
      }

      // Final deck settle tap
      const settleOsc = ctx.createOscillator();
      const settleGain = ctx.createGain();
      settleOsc.type = 'sine';
      settleOsc.frequency.setValueAtTime(180, baseTime + 1.2);
      settleOsc.frequency.exponentialRampToValueAtTime(60, baseTime + 1.35);

      settleGain.gain.setValueAtTime(0.28, baseTime + 1.2);
      settleGain.gain.exponentialRampToValueAtTime(0.001, baseTime + 1.35);

      settleOsc.connect(settleGain);
      settleGain.connect(ctx.destination);

      settleOsc.start(baseTime + 1.2);
      settleOsc.stop(baseTime + 1.35);
    } catch {
      // Audio autoplay policies
    }
  }

  // Subtle tick when hovering a card in the fan
  public playCardHover() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.025);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Audio autoplay policies
    }
  }

  // Tactile swoosh + crystal chime when picking a card from the fan
  public playCardPick() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;

      // 1. Draw swoosh
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'sine';
      snapOsc.frequency.setValueAtTime(280, now);
      snapOsc.frequency.exponentialRampToValueAtTime(620, now + 0.09);

      snapGain.gain.setValueAtTime(0.2, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start(now);
      snapOsc.stop(now + 0.1);

      // 2. High crystal ring
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(880, now + 0.04);

      chimeGain.gain.setValueAtTime(0.09, now + 0.04);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now + 0.04);
      chimeOsc.stop(now + 0.5);
    } catch {
      // Audio autoplay policies
    }
  }

  // Soft mystical chime on revelation
  public playChime() {
    try {
      const ctx = this.initContext();
      const now = ctx.currentTime;
      const frequencies = [528, 792, 1056]; // Solfeggio 528Hz harmonious chord

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.06));

        gain.gain.setValueAtTime(0.08 / (idx + 1), now + (idx * 0.06));
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + (idx * 0.2));

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + (idx * 0.06));
        osc.stop(now + 2.2);
      });
    } catch {
      // ignore
    }
  }

  // Ambient calming lo-fi soundscape (warm analog drone with binaural harmonic undertones)
  public toggleAmbient(desiredState?: boolean): boolean {
    const ctx = this.initContext();

    if (desiredState === undefined) {
      desiredState = !this.isAmbientPlaying;
    }

    if (!desiredState) {
      // Fade out and stop
      if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        setTimeout(() => {
          this.ambientOscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch {}
          });
          this.ambientOscillators = [];
          if (this.noiseNode) {
            try { this.noiseNode.stop(); this.noiseNode.disconnect(); } catch {}
            this.noiseNode = null;
          }
        }, 1300);
      }
      this.isAmbientPlaying = false;
      return false;
    }

    // Start ambient
    try {
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.12, now + 2.5); // smooth fade in
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      // Polyphonic warm chord (Eb Maj9 chord: Eb3, G3, Bb3, D4, F4)
      const chordFrequencies = [155.56, 196.00, 233.08, 293.66, 349.23];

      chordFrequencies.forEach((freq) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const noteGain = ctx.createGain();

        osc.type = 'sine';
        // Slight detune for analog warmth
        osc.frequency.setValueAtTime(freq + (Math.random() * 0.6 - 0.3), now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        // Gentle breathing LFO for filter
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.12 + (Math.random() * 0.08), now); // very slow cycle (~8-10s)
        lfoGain.gain.setValueAtTime(90, now);
        lfo.connect(filter.frequency);
        lfo.start(now);
        this.ambientOscillators.push(lfo);

        noteGain.gain.setValueAtTime(0.18, now);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now);
        this.ambientOscillators.push(osc);
      });

      // Warm vinyl texture
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.015;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(800, now);
      noiseFilter.Q.setValueAtTime(1.2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, now);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      noise.start(now);
      this.noiseNode = noise;

      this.isAmbientPlaying = true;
      return true;
    } catch (e) {
      console.warn("Ambient sound failed to start:", e);
      this.isAmbientPlaying = false;
      return false;
    }
  }

  public getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }
}

export const sound = new SoundEngine();
