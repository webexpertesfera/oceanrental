import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgAuthService } from '@appstrax/ng-auth';
import { Booking } from 'src/app/booking/models/booking.model';
import { BookingService } from 'src/app/booking/services/bookings.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  booking: Booking | undefined;
  user: any = null;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private ngAuthService: NgAuthService
  ) { }

  ngOnInit(): void {
    this.user = this.ngAuthService.getAuthenticatedUser();
    if (!this.user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.activatedRoute.paramMap.subscribe((params) => {
      const bookingId = params.get('booking_id');
      this.booking = this.bookingService.getBookingById(bookingId);
      if (!this.booking) {
        this.router.navigate(['bookings']);
        return;
      }
    });
  }
}
