import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-chrono2',
  templateUrl: './app-chrono2.component.html',
  styleUrls: ['./app-chrono2.component.scss']
})
export class AppChrono2Component implements OnInit {

  @Input() tpsTotal = 10;
  compteur = 0;
  showLabelFin = '';

  @Input() stopChrono?: Observable<void>;
  @Input() begin?: Observable<number>;

  @Output() endTime = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.beginTimer();
    this.begin?.subscribe(temps => {
      this.tpsTotal = temps;
      this.beginTimer();
    });

    this.stopChrono?.subscribe(_ => {
      this.stop();
    });
  }

  beginTimer(): void {
    if (this.tpsTotal !== 0) {
      this.compteur = this.tpsTotal;
      this.startCountdown();
    }
  }

  stop(): void {
    this.compteur = 0;
  }

  pathStyle(): any {
    console.log('pathStyle : ', this.tpsTotal)
    return {
      'animation' : 'load ' + this.tpsTotal.toString() + 's',
    };
  }

  startCountdown(): void {
    const interval = setInterval(() => {
      if (this.compteur === 0) {
        clearInterval(interval);
        this.endTime.emit();
      } else {
        this.compteur --;
      }
    }, 1000);
  }
}
