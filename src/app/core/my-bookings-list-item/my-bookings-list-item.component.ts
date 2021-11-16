import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/booking/models/booking.model';
import { Product } from 'src/app/product/models/product.model';

@Component({
  selector: 'app-my-bookings-list-item',
  templateUrl: './my-bookings-list-item.component.html',
  styleUrls: ['./my-bookings-list-item.component.scss'],
})
export class MyBookingsListItemComponent implements OnInit {
  @Input() booking: Booking | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  manageButtonClicked() {
    this.router.navigate(['bookings', this.booking!.id!]);
  }
}
