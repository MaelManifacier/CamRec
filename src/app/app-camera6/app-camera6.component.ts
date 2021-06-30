import { Component, OnInit, ViewChild } from '@angular/core';
import { Stream } from 'stream';

@Component({
  selector: 'app-app-camera6',
  templateUrl: './app-camera6.component.html',
  styleUrls: ['./app-camera6.component.scss']
})
export class AppCamera6Component implements OnInit {

  name:String = "Camera 6";

  // mediaRecorder:any;
  // recordedBlobs:BlobPart[];

  // gumVideo!:any;
  // recordedVideo!:HTMLVideoElement;

  // startButton!:HTMLButtonElement;
  // recordingButton!:HTMLButtonElement;
  // playButton!:HTMLButtonElement;
  // downloadButton!:HTMLButtonElement;

  // codecPreferences!:HTMLSelectElement;
  // echoCancellation!:HTMLInputElement;

  /* - - - Test media recorder - - - */
  // recorder
  mediaRecorder?: MediaRecorder;

  // source that is played
  mediaSource?: MediaSource;

  constructor() {
    // this.recordedBlobs = [];
   }

  ngOnInit(): void {
    let options = {mimeType: 'video/webm; codecs=vp9'};

    navigator.getUserMedia({ audio: true }, (stream) => {
      this.mediaRecorder = new MediaRecorder(stream, options);

      this.mediaRecorder.ondataavailable = this.handleDataAvailable;
      this.mediaRecorder.start();

      console.log('mediaRecorder.stream : ', this.mediaRecorder.stream);

    }, (error) => {
      console.log('navigator.getUserMedia error : ', error);
    });
  }

  handleDataAvailable(event: any): void {
    if (event.data.size > 0) {
      console.log('handleDataAvailable : ', event);
    }
  }

  // ngAfterViewInit(): void {
  //   this.gumVideo = document.getElementById("gumVideo");
  //   this.gumVideo.muted = "muted";
  //   this.recordedVideo = document.getElementById("recordedVideo") as HTMLVideoElement;

  //   this.startButton = document.getElementById("startButton") as HTMLButtonElement;
  //   this.recordingButton = document.getElementById("recordingButton") as HTMLButtonElement;
  //   this.playButton = document.getElementById("playButton") as HTMLButtonElement;
  //   this.downloadButton = document.getElementById("downloadButton") as HTMLButtonElement;

  //   this.codecPreferences = document.getElementById("codecPreferences") as HTMLSelectElement;
  //   this.echoCancellation = document.getElementById("echoCancellation") as HTMLInputElement;


  //   this.recordingButton.addEventListener('click', () => {
  //     if (this.recordingButton.textContent === 'Start Recording') {
  //       this.startRecording();
  //     } else {
  //       this.stopRecording();
  //       this.recordingButton.textContent = 'Start Recording';
  //       this.playButton.disabled = false;
  //       this.downloadButton.disabled = false;
  //       this.codecPreferences.disabled = false;
  //     }
  //   });

  //   this.playButton.addEventListener('click', () => {
  //     const mimeType = this.codecPreferences.options[this.codecPreferences.selectedIndex].value.split(';', 1)[0];
  //     const superBuffer = new Blob(this.recordedBlobs, {type: mimeType});
  //     this.recordedVideo.src = "";
  //     this.recordedVideo.srcObject = null;
  //     this.recordedVideo.src = window.URL.createObjectURL(superBuffer);
  //     this.recordedVideo.controls = true;
  //     this.recordedVideo.play();
  //   });

  //   this.downloadButton.addEventListener('click', () => {
  //     const blob = new Blob(this.recordedBlobs, {type: 'video/webm'});
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.style.display = 'none';
  //     a.href = url;
  //     a.download = 'test.webm';
  //     document.body.appendChild(a);
  //     a.click();
  //     setTimeout(() => {
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(url);
  //     }, 100);
  //   });

  //   this.startButton.addEventListener('click', () => {
  //     navigator.mediaDevices.getUserMedia({
  //       audio: {
  //         echoCancellation: {exact: this.echoCancellation.checked}
  //       },
  //       video: {
  //         width: 1280, height: 720
  //       }
  //     }).then(stream => {
  //       this.handleSuccess(stream);
  //       this.gumVideo.srcObject = stream;
  //       this.gumVideo.captureStream = this.gumVideo.captureStream || this.gumVideo.mozCaptureStream;
  //       return new Promise(resolve => this.gumVideo.onplaying = resolve);
  //     })

  //     this.startButton.disabled = true;
  //   });
  // }

  // handleDataAvailable(event:any) {
  //   this.recordedBlobs = [];

  //   console.log('handleDataAvailable', event);
  //   if (event.data && event.data.size > 0) {
  //     this.recordedBlobs.push(event.data);
  //   }
  // }

  // getSupportedMimeTypes() {
  //   const possibleTypes = [
  //     'video/webm;codecs=vp9,opus',
  //     'video/webm;codecs=vp8,opus',
  //     'video/webm;codecs=h264,opus',
  //     'video/mp4;codecs=h264,aac',
  //   ];
  //   return possibleTypes.filter(mimeType => {
  //     return MediaRecorder.isTypeSupported(mimeType);
  //   });
  // }

  // startRecording() {
  //   this.recordedBlobs = [];
  //   const mimeType = this.codecPreferences.options[this.codecPreferences.selectedIndex].value;
  //   const options = {mimeType};

  //   try {
  //     this.mediaRecorder = new MediaRecorder(this.gumVideo.captureStream(), options);
  //   } catch (e) {
  //     console.error('Exception while creating MediaRecorder:', e.toString());
  //     return;
  //   }

  //   console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
  //   this.recordingButton.textContent = 'Stop Recording';
  //   this.playButton.disabled = true;
  //   this.downloadButton.disabled = true;
  //   this.codecPreferences.disabled = true;
  //   this.mediaRecorder.onstop = (event:any) => {
  //     console.log('Recorder stopped: ', event);
  //     console.log('Recorded Blobs: ', this.recordedBlobs);
  //   };
  //   this.mediaRecorder.ondataavailable = (event:any) => {
  //     this.handleDataAvailable(event);
  //   };
  //   this.mediaRecorder.start();
  //   console.log('MediaRecorder started', this.mediaRecorder);
  // }

  // stopRecording() {
  //   this.mediaRecorder.stop();
  // }

  // handleSuccess(stream:MediaStream) {
  //   this.recordingButton.disabled = false;
  //   console.log('getUserMedia() got stream:', stream);
  //   this.gumVideo.src = stream;


  //   this.gumVideo.srcObject = stream;

  //   this.getSupportedMimeTypes().forEach(mimeType => {
  //     const option = document.createElement('option');
  //     option.value = mimeType;
  //     option.innerText = option.value;
  //     this.codecPreferences.appendChild(option);
  //   });
  //   this.codecPreferences.disabled = false;
  // }

}
