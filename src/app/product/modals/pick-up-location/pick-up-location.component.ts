import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/booking/models/booking.model';
import { Location } from 'src/app/core/models/location.model';

@Component({
  selector: 'app-pick-up-location',
  templateUrl: './pick-up-location.component.html',
  styleUrls: ['./pick-up-location.component.scss'],
})
export class PickUpLocationComponent implements OnInit {
  locations: Array<Location> = [];
  pickUpLocation: Location | undefined;
  popularMediterraneanPorts: Array<Location> = [];
  popularCaribbeanPorts: Array<Location> = [];

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  bookingClick(booking: Booking) {
    this.modal.close(booking);
  }
}
