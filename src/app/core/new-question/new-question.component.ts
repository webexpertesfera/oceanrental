import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StringMappingType } from 'typescript';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent implements OnInit {
  question?: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('bookings')) {
      this.question = 'Renting';
    }
    if(url.includes('product')) {
      this.question = 'Renting';
    }
    if(url.includes('bookings/my-bookings')) {
      this.question = 'Booking';
    }
  }
}
