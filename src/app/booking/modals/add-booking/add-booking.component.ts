import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from 'src/app/core/models/location.model';
import { Product } from 'src/app/product/models/product.model';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss'],
})
export class AddBookingComponent implements OnInit {
  @Input() locations: Array<Location> = [];

  booking: Booking | undefined = new Booking();

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  async addToBooking(bookingAndProduct: {
    booking: Booking;
    product: Product | undefined;
  }) {
    this.modal.close(bookingAndProduct);
  }
}
