import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordRtcComponent implements OnInit {

  // npm install recordrtc

  recorder?: RecordRTC;

  // @ViewChild('videoRecorded') videoRecorded?: ElementRef;

  videoRecording: any;
  videoRecorded: any;
  h1: any;

  blobs: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.h1 = document.getElementById('h1') || new HTMLElement();
    this.videoRecording = document.getElementById('videoRecording') as HTMLVideoElement;
    this.videoRecording.muted = 'muted';

    this.videoRecorded = document.getElementById('videoRecorded') as HTMLVideoElement;
  }

  startRecording(): void {
    console.log('startRecording : ', this.recorder)

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(async (stream) => {
      this.recorder = new RecordRTC(stream, {type: 'video', mimeType: 'video/webm', checkForInactiveTracks: false});

      // this.videoRecording = document.getElementById('videoRecording');
      if (this.videoRecording) {
        this.videoRecording.srcObject = stream;
      }
      this.videoRecording.captureStream = this.videoRecording.captureStream || this.videoRecording.mozCaptureStream;
      console.warn('videoRecordingElement : ', this.videoRecording)

      this.recorder = new RecordRTC(stream, {
        recorderType: RecordRTC.MediaStreamRecorder,
        mimeType: 'video/webm',
        timeSlice: 1000, // pass this parameter
        // getNativeBlob: true,
        ondataavailable: (blob: any) => {
            this.blobs.push(blob);

            let size = 0;
            this.blobs.forEach((b: any) => {
                size += b.size;
            });

            this.h1.innerText = 'Total blobs: ' + this.blobs.length;
        }
      });
      this.recorder?.startRecording();
    });
  }

  stopRecording(): void {
    console.log('stopRecording : ', this.recorder)
    this.recorder?.stopRecording(() => {
      let blob = this.recorder?.getBlob() || new Blob();
      // console.log('blobRecorded : ', blob)
      RecordRTC.invokeSaveAsDialog(blob, 'test-record-rtc');

      this.videoRecorded.src = '';
      this.videoRecorded.srcObject = null;
      this.videoRecorded.src = window.URL.createObjectURL(blob);
      this.videoRecorded.controls = true;
      this.videoRecorded.play();
    });
  }

}
