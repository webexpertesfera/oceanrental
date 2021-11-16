import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/booking/models/booking.model';
import { Location } from 'src/app/core/models/location.model';

@Component({
  selector: 'app-drop-off-location',
  templateUrl: './drop-off-location.component.html',
  styleUrls: ['./drop-off-location.component.scss'],
})
export class DropOffLocationComponent implements OnInit {
  locations: Array<Location> = [];
  dropOffLocation: Location | undefined;
  popularMediterraneanPorts: Array<Location> = [];
  popularCaribbeanPorts: Array<Location> = [];
  pickUpLocation: Location | undefined;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  sameAsPickUp() {
    this.modal.close(this.pickUpLocation);
  }
}
