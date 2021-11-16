import { Component, Input, OnInit } from '@angular/core';
import { FAQ } from '../models/faqs.model';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {
  @Input() title: string = 'Questions about Booking';
  @Input() faqs: Array<FAQ> = [];

  @Input() faq: FAQ | undefined;

  constructor() {}

  ngOnInit(): void {}
}
