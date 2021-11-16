import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn-love',
  templateUrl: './btn-love.component.html',
  styleUrls: ['./btn-love.component.scss'],
})
export class BtnLoveComponent implements OnInit {
  @Input() loved: boolean = false;

  @Output() lovedChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  triggerLove() {
    this.loved = !this.loved;
    this.lovedChange.emit(this.loved);
  }
}
