import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { WhisperService } from '../../pipelines/whisper.service';

@Component({
  selector: 'mom-live-caption',
  imports: [],
  templateUrl: './live-caption.component.html',
  styleUrl: './live-caption.component.scss'
})
export class LiveCaptionComponent implements OnInit, OnDestroy {
  private whisperService = inject(WhisperService);

  captions = signal<string>('');
  private audioCtx?: AudioContext;
  private stream?: MediaStream;
  private workletNode?: AudioWorkletNode;
  public isRecording = false;

  async ngOnInit() {
    await this.whisperService.init();
  }

  ngOnDestroy() {
    this.stopRecording();
  }


  async startRecording() {
    if (this.isRecording) return;

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
        this.captions.set(this.captions() + res.text);
      }
    };
    // Connect graph
    source.connect(this.workletNode);
    this.workletNode.connect(this.audioCtx.destination);
    this.isRecording = true;
  }

  stopRecording() {
    if (!this.isRecording) return;
    this.workletNode?.disconnect();
    this.audioCtx?.close();
    this.stream?.getTracks().forEach(t => t.stop());
    this.isRecording = false;
  }
}