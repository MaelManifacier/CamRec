import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-chrono2',
  templateUrl: './app-chrono2.component.html',
  styleUrls: ['./app-chrono2.component.scss']
})
export class AppChrono2Component implements OnInit {

  @Input() tpsTotal = 10;
  compteur = 0;
  showLabelFin = '';

  @Output() endTime = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.tpsTotal)
    this.beginTimer();
  }

  beginTimer(): void {
    if (this.tpsTotal !== 0) {
      this.compteur = this.tpsTotal;
      this.startCountdown();
    }
  }

  ngOnChanges(): void {
    this.beginTimer();
  }

  startCountdown(): void {
    const interval = setInterval(() => {
      if (this.compteur === 0) {
        clearInterval(interval);
        this.endTime.emit('');
      } else {
        this.compteur --;
      }
    }, 1000);
  }
}
