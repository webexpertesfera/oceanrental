import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Booking } from 'src/app/booking/models/booking.model';
import { Product } from 'src/app/product/models/product.model';

@Component({
  selector: 'app-booking-list-item',
  templateUrl: './booking-list-item.component.html',
  styleUrls: ['./booking-list-item.component.scss'],
})
export class BookingListItemComponent implements OnInit {
  @Output() deleteBooking = new EventEmitter<Booking>();
  @Output() manageBooking = new EventEmitter<Booking>();

  products: Array<Product> = [];

  private _booking: Booking | undefined;

  constructor() {}

  ngOnInit(): void {}

  @Input() set booking(booking: Booking | undefined) {
    this._booking = booking;

    this._booking?.products.forEach((p) => {
      this.products.push(p);
      p.accessories.forEach((a) => {
        this.products.push(a);
      });
    });
  }

  get booking(): Booking | undefined {
    return this._booking;
  }
}
