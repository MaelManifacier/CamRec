import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebcamModule } from 'ngx-webcam';
import { WebCamModule as WebCamModule2 } from 'ack-angular-webcam';
import { AppCamera6Component } from './app-camera6/app-camera6.component';

import { NgxChronometerModule } from 'ngx-chronometer';
import { KnobModule } from 'primeng/knob';

import { AppChrono2Component } from './app-chrono2/app-chrono2.component';
import { CountdownModule } from 'ngx-countdown';
import { RecordRtcComponent } from './record-rtc/record-rtc.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AppCamera6Component,
    AppChrono2Component,
    RecordRtcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WebcamModule,     // Composant importé
    WebCamModule2,    // Composant importé
    NgxChronometerModule,    // Composant importé
    KnobModule,
    CountdownModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})    // Composant importe
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
