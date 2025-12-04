// A singleton approach to manage the AudioContext
class AudioEngine {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  private getContext(): AudioContext {
    if (!this.context) {
      // Use standard AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.context = new AudioContextClass();
      
      this.masterGain = this.context.createGain();
      this.masterGain.gain.value = 0.6; // Slightly lower master to prevent clipping with chords

      // Add a compressor to smooth out the sound when multiple keys are pressed
      this.compressor = this.context.createDynamicsCompressor();
      this.compressor.threshold.value = -24;
      this.compressor.knee.value = 30;
      this.compressor.ratio.value = 12;
      this.compressor.attack.value = 0.003;
      this.compressor.release.value = 0.25;

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.context.destination);
    }
    return this.context;
  }

  public async resume() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  }

  public playTone(frequency: number) {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // --- Sound Synthesis Strategy ---
    // A "clear" piano sound needs bright harmonics at the start (attack) 
    // that quickly dampen to a smoother tone (decay).
    
    // 1. Oscillators
    // We use a Triangle wave for the main body (softer than saw, brighter than sine)
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(frequency, now);

    // A slightly detuned triangle wave to add "chorus" and richness (simulation of multiple strings per key)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(frequency, now);
    osc2.detune.value = 5; // Detune by 5 cents

    // A sine wave for the fundamental "thump"
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(frequency, now);

    // 2. Filter (The key to "clear" sound)
    // Lowpass filter that opens up on attack and closes on decay
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 0.5; // Low resonance for natural sound
    
    // Filter Envelope: Start bright, then darken
    filter.frequency.setValueAtTime(frequency * 8, now); // Start with high harmonics
    filter.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + 0.4); // Decay to near fundamental

    // 3. Amplitude Envelope (VCA)
    const gainNode = ctx.createGain();
    
    // Routing
    osc1.connect(filter);
    osc2.connect(filter);
    // Sine wave often bypasses the heavy filtering or has its own path, 
    // but putting it through the gain ensures it follows the envelope.
    // For a cleaner sound, we'll route everything through the filter/gain chain.
    osc3.connect(gainNode); 
    filter.connect(gainNode);

    if (this.masterGain) {
      gainNode.connect(this.masterGain);
    }

    // ADSR Envelope
    gainNode.gain.setValueAtTime(0, now);
    
    // Attack: Very fast, almost instant (percussive)
    gainNode.gain.linearRampToValueAtTime(1.0, now + 0.015);
    
    // Decay: Quick drop to a sustain level
    gainNode.gain.exponentialRampToValueAtTime(0.6, now + 0.2);
    
    // Sustain/Release: Long natural fade
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    // Start Oscillators
    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    // Stop Oscillators
    const duration = 2.5; 
    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
    
    // Garbage Collection
    setTimeout(() => {
      osc1.disconnect();
      osc2.disconnect();
      osc3.disconnect();
      filter.disconnect();
      gainNode.disconnect();
    }, duration * 1000 + 100);
  }
}

export const audioEngine = new AudioEngine();