import { Component, inject, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WhisperService } from '../../pipelines/whisper.service';

@Component({
  selector: 'mom-speech-to-text-button',
  imports: [
    MatIconModule
  ],
  templateUrl: './speech-to-text-button.component.html',
  styleUrl: './speech-to-text-button.component.scss'
})
export class SpeechToTextButtonComponent {
  private whisperService = inject(WhisperService);

  private audioCtx?: AudioContext;
  private stream?: MediaStream;
  private workletNode?: AudioWorkletNode;

  transcript = output<string>();
  isListening = false;

  constructor() {
    this.whisperService.init();
    this.setupRecognition();
  }

  private async setupRecognition() {
    
  }

  toggleSpeech() {
    if (this.isListening) this.stopRecording();
    else this.startRecording();

    this.isListening = !this.isListening;
  }

  async startRecording() {
    if (this.isListening) return;

    // Get microphone
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Create AudioContext with 16kHz sample rate
    this.audioCtx = new AudioContext({ sampleRate: 16000 });
    // Load AudioWorklet
    await this.audioCtx.audioWorklet.addModule('assets/pcm-processor.js');
    // Create source + worklet node
    const source = this.audioCtx.createMediaStreamSource(this.stream);
    this.workletNode = new AudioWorkletNode(this.audioCtx, 'pcm-processor');
    // Receive PCM chunks
    this.workletNode.port.onmessage = async (ev) => {
      // Transcribe chunk
      const floatChunk = ev.data as Float32Array;
      const res = await this.whisperService.transcribeChunk(floatChunk);
      const text = res?.text;
      if (text && !this.whisperService.isPlaceholder(text)) {
        this.transcript.emit(res.text);
      }
    };
    // Connect graph
    source.connect(this.workletNode);
    this.workletNode.connect(this.audioCtx.destination);
    this.isListening = true;
  }

  stopRecording() {
    if (!this.isListening) return;
    this.workletNode?.disconnect();
    this.audioCtx?.close();
    this.stream?.getTracks().forEach(t => t.stop());
    this.isListening = false;
  }

  
}
