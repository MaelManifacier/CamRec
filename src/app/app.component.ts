import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CamRec';

  // lancement caméra
  startRecord: Subject<void> = new Subject<void>();
  stopRecord: Subject<void> = new Subject<void>();
  // réinitialisation
  reinitRecord: Subject<void> = new Subject<void>();
  // erreurs avec le composant caméra
  isPbCamera = false;
  cameraErrMsg = '';

  // chronomètre
  tpsTotalChrono = 0;
  // arrêt chronomètre
  stopChrono: Subject<void> = new Subject<void>();
  // début chronomètre
  beginChrono: Subject<number> = new Subject<number>();

  lancementCamera(): void {
    this.beginChrono.next(10);
    this.startRecord.next();
  }

  beginWith(tps: number) {
    this.startRecord.next();
    this.beginChrono.next(tps);
  }

  onCameraError(msg: string): void {
    this.isPbCamera = true;
    this.cameraErrMsg = msg;
    this.stopRecord.next();
    this.stopChrono.next();
  }

  endChrono(): void {
    this.tpsTotalChrono = 0;
    this.stopRecord.next();
  }

  recommencer(): void {
    this.stopChrono.next();
    this.reinitRecord.next();
  }

}
