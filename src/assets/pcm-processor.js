class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = [];
    this.sampleCount = 0;
    this.bufferSize = 16000 * 1; // 1 second buffer at 16kHz
  }

  process(inputs) {
    const input = inputs[0][0]; // mono channel
    if (!input) return true;

    // Copy current frame
    const frame = new Float32Array(input.length);
    frame.set(input);
    this.buffer.push(frame);
    this.sampleCount += frame.length;

    // If buffer has enough samples, merge and send
    if (this.sampleCount >= this.bufferSize) {
      const merged = new Float32Array(this.sampleCount);
      let offset = 0;
      for (const f of this.buffer) {
        merged.set(f, offset);
        offset += f.length;
      }

      // Send merged chunk to main thread
      this.port.postMessage(merged);

      // Reset buffer
      this.buffer = [];
      this.sampleCount = 0;
    }

    return true;
  }

}

registerProcessor('pcm-processor', PCMProcessor);