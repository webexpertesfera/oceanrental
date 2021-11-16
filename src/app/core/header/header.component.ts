import { Component, OnInit } from '@angular/core';
import { NgAuthService } from '@appstrax/ng-auth';
import { BookingService } from 'src/app/booking/services/bookings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartSize: number = 0;

  constructor(private bookingService: BookingService,
    private ngAuthService: NgAuthService
  ) { }

  ngOnInit(): void {
    this.cartSize = this.bookingService.getBookings().length;
    this.bookingService.bookingsChanged.subscribe(() => {
      this.cartSize = this.bookingService
        .getBookings()
        .filter((b) => !b.paid).length;
    });
  }

  logout() {
    this.ngAuthService.logout();
  }

  isLoggedIn(): boolean {
    const user = this.ngAuthService.getAuthenticatedUser();
    if (user) { return false; } else { return true; }
  }
}
