import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-floating-input',
  templateUrl: './floating-input.component.html',
  styleUrls: ['./floating-input.component.scss'],
})
export class FloatingInputComponent implements OnInit {
  @Input() label: string = 'Label';
  @Input() placeholder: string = 'Placeholder';

  @Input() value: string | undefined;
  @Output() valueChange = new EventEmitter<string>();

  inputFocused: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  focus(_e: Event) {
    this.inputFocused = true;
  }

  focusOut(_e: Event) {
    this.inputFocused = false;
  }
}
