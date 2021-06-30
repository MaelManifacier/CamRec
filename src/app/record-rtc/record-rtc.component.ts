import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.scss']
})
export class RecordRtcComponent implements OnInit {

  @Input() startRecord?: Observable<void>;
  @Input() stopRecord?: Observable<void>;
  @Input() reinitRecord?: Observable<void>;

  @Input() canStopRecording = true;

  @Output() cameraError = new EventEmitter();

  recorder?: RecordRTC;
  videoRecording: any;
  videoRecorded: any;

  blobs: any = [];

  isVideoRegistered = false;
  isRecording = false;

  // constantes
  VIDEO_FORMAT = 'video/mp4'; // 'video/webm'

  constructor() { }

  ngOnInit(): void {
    this.startRecord?.subscribe(_ => {
      this.startRecording();
    });
    this.stopRecord?.subscribe(_ => {
      this.stopRecording();
    });
    this.reinitRecord?.subscribe(_ => {
      this.reinitialisationRecording();
    });
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit')
    this.videoRecording = document.getElementById('videoRecording') as HTMLVideoElement;
    this.videoRecording.muted = 'muted';
    this.videoRecorded = document.getElementById('videoRecorded') as HTMLVideoElement;
  }

  startRecording(): void {
    this.isVideoRegistered = false;

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(async (stream) => {
      this.recorder = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
        checkForInactiveTracks: false
      });

      this.isRecording = true;

      if (this.videoRecording == null) {
        this.videoRecording = document.getElementById('videoRecording') as HTMLVideoElement;
        this.videoRecording.muted = 'muted';
      }
      if (this.videoRecording) {
        this.videoRecording.srcObject = stream;
      }
      this.videoRecording.captureStream = this.videoRecording.captureStream || this.videoRecording.mozCaptureStream;

      this.recorder = new RecordRTC(stream, {
        recorderType: RecordRTC.MediaStreamRecorder,
        mimeType: 'video/webm',
        timeSlice: 1000,
        ondataavailable: (blob: any) => {
          this.blobs.push(blob);
        }
      });
      this.recorder?.startRecording();
    }).catch(error => {
      this.cameraError.emit('CameraNotFound');
    });
  }

  reinitialisationRecording(): void {
    this.recorder?.destroy();
    this.videoRecorded.src = '';
    this.videoRecorded.srcObject = null;
    this.isVideoRegistered = false;
    this.isRecording = false;
  }

  stopRecording(): void {
    console.log('stopRecording')
    this.recorder?.stopRecording(() => {
      this.isRecording = false;
      let blob = this.recorder?.getBlob() || new Blob();
      // console.log('blobRecorded : ', blob)
      // Sauvegarde du fichier :
      // RecordRTC.invokeSaveAsDialog(blob, 'test-record-rtc');

      this.isVideoRegistered = true;

      if (this.videoRecorded == null) {
        this.videoRecorded = document.getElementById('videoRecorded') as HTMLVideoElement;
        console.warn('this.videoRecorded : ', this.videoRecorded)
      }
      this.videoRecorded.src = '';
      this.videoRecorded.srcObject = null;
      this.videoRecorded.src = window.URL.createObjectURL(blob);
      this.videoRecorded.controls = true;
      this.videoRecorded.play();
    });
  }

}
