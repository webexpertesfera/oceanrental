import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/booking/models/booking.model';

@Component({
  selector: 'app-booking-select',
  templateUrl: './booking-select.component.html',
  styleUrls: ['./booking-select.component.scss'],
  providers: [NgbDropdownConfig],
})
export class BookingSelectComponent implements OnInit {
  @Input() booking: Booking | undefined;
  @Output() bookingChange = new EventEmitter<Booking | undefined>();

  @Input() bookings: Array<Booking> = [];

  @Output() newBooking = new EventEmitter<Booking>();
  @Output() manageBookingClick = new EventEmitter<Booking>();

  blankBooking = undefined; // For selects ngValue to register null

  constructor(config: NgbDropdownConfig) {
    config.container = null;
  }

  ngOnInit(): void {}

  // Greece - Capri, dd/mm/YYYY - dd/mm/YYYY
  getBookingTitle() {
    if (this.booking === this.blankBooking) return 'Get Started';

    let title = 'New Booking';

    if (!this.booking.location) return title;
    if (!this.booking.location.delivery) return title;
    if (!this.booking.location.collection) return title;

    title = `${this.booking.location.collection?.name} - ${this.booking.location.delivery?.name}`;

    if (!this.booking.period) return title;
    if (!this.booking.period.start) return title;
    if (!this.booking.period.end) return title;

    title = `${this.booking.location.collection?.name} - ${this.booking.location.delivery?.name}, ${this.booking.period?.fromDate.day}/${this.booking.period?.fromDate.month}/${this.booking.period?.fromDate.year} - ${this.booking.period.toDate.day}/${this.booking.period.toDate.month}/${this.booking.period.toDate.year}`;

    return title;
  }

  newBookingClick() {
    this.booking = new Booking();
    this.newBooking.emit(this.booking);
  }

  bookingClick(booking: Booking) {
    this.booking = booking;
    this.bookingChange.emit(this.booking);
  }

  manageBooking(booking: Booking) {
    this.manageBookingClick.emit(booking);
  }
}
