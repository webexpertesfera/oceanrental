import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService } from '@appstrax/ng-auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from 'src/app/core/models/location.model';
import { LocationService } from 'src/app/core/services/location.service';
import { Product } from 'src/app/product/models/product.model';
import { AddBookingComponent } from '../../modals/add-booking/add-booking.component';
import { Availability } from '../../models/availability.model';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/bookings.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  bookings: Array<Booking> = [];

  booking: Booking | undefined;

  locations: Array<Location> = [];

  user: any = null;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private modalService: NgbModal,
    private locationService: LocationService,
    private ngAuthService: NgAuthService
  ) { }

  async ngOnInit(): Promise<void> {
    this.user = this.ngAuthService.getAuthenticatedUser();
    if (!this.user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.bookings = this.bookingService.getBookings();

    this.bookings.forEach((b) => {
      b.checkingAvailability = true;
      this.bookingService
        .productsAvailability(b)
        .then((a) => {
          b.checkingAvailability = false;
        })
        .catch((err) => {
          b.checkingAvailability = false;
        });
    });

    this.bookings = this.bookings.filter(b => {
      if (b.paid) {
        return null;
      } else {
        return b;
      }
    });

    this.locations = await this.locationService.getLocations();
  }

  openCreateBookingModal() {
    const modal = this.modalService.open(AddBookingComponent, {
      size: 'xl',
      scrollable: true,
    });
    modal.componentInstance.locations = this.locations;

    modal.dismissed.subscribe((reason: 'back' | null) => {
      if (!reason) return;
    });

    modal.result
      .then((response: { booking: Booking; product: Product | undefined }) => {
        this.bookingService.createBooking(response.booking);
        this.ngOnInit();
      })
      .catch((err) => {
        console.log('add booking error: ', err);
      });
  }

  deleteBooking(booking: Booking) {
    this.bookings = this.bookingService.deleteBooking(booking);
  }

  manageBooking(booking: Booking) {
    this.router.navigate(['bookings', booking.id]);
  }
}
