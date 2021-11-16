import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-yacht-name',
  templateUrl: './yacht-name.component.html',
  styleUrls: ['./yacht-name.component.scss'],
})
export class YachtNameComponent implements OnInit {
  yachtName: string = '';

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
