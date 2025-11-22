import { Injectable } from '@angular/core';
import { env, pipeline } from '@huggingface/transformers';
import { modelExists } from './llm.utils';

@Injectable({ providedIn: 'root' })
export class WhisperService {
  private asr: any = null;
  private loading = false;

  async init() {
    if (this.asr || this.loading) return;
    this.loading = true;

    // pipeline options: request webgpu device else wasm
    env.allowLocalModels = true;
    env.allowRemoteModels = true;
    env.localModelPath = 'assets/models/';

    // Detect WebGPU availability
    const hasWebGPU = await this.webgpuAvailable();
    const device = hasWebGPU ? 'webgpu' : 'wasm';

    // Detect Local Whisper model else fallback to remote
    const modelId = await modelExists('whisper-small', 'oonx-community/whisper-small');

    this.asr = await pipeline('automatic-speech-recognition', modelId, {
      device: device,
      dtype: 'fp32'
    });

    this.loading = false;
    console.log('Whisper pipeline ready (device=', device, ')');
  }

  async webgpuAvailable(): Promise<boolean> {
    // Checkking if WebGPU is available
    try {
      return !!(navigator && (navigator as any).gpu);
    } catch (e) {
      return false;
    }
  }

  /**
   * Transcribe a chunk (Float32Array of 16kHz mono audio). Returns the pipeline's result object.
   */
  async transcribeChunk(float32Audio: Float32Array, options?: any) {
    if (!this.asr) throw new Error('WhisperService not initialized. Call init() first.');
    // transformers.js accepts Float32Array directly for ASR pipeline

    const cfg = {
      language: 'en',
      chunk_length_s: 1,
      stride_length_s: 0.25,
      ...(options || {})
    };
    // result typically: { text: '...', chunks: [...] }
    const result = await this.asr(float32Audio, cfg);
    return result;
  }

  isPlaceholder(text: string): boolean {
    // Common Whisper “non-speech” tokens
    const placeholders = [
      '[BLANK_AUDIO]',
      '[Inaudible]',
      '[Beep]',
      '[noise]',
      '[silence]'
    ] as string[];

    // Convert to lowercase for safety
    const t = text.toLowerCase();
    return placeholders.some(p => t.includes(p.toLowerCase()));
  }
}