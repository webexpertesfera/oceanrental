import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() counter: number = 0;
  @Input() disabled: boolean = false;
  @Input() grey: boolean = false;
  @Output() counterChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  minus() {
    if (this.counter === 0) return;

    this.counter = this.counter - 1;
    this.counterChange.emit(this.counter);
  }

  plus() {
    this.counter = this.counter + 1;
    this.counterChange.emit(this.counter);
  }
}
