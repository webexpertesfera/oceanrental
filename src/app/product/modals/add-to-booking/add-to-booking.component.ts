import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/booking/models/booking.model';

@Component({
  selector: 'app-add-to-booking',
  templateUrl: './add-to-booking.component.html',
  styleUrls: ['./add-to-booking.component.scss'],
})
export class AddToBookingComponent implements OnInit {
  bookings: Array<Booking> = [];

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  bookingClick(booking: Booking) {
    this.modal.close(booking);
  }
}
