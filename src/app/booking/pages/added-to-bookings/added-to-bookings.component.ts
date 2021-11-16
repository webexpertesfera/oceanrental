import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/models/product.model';
import { environment } from 'src/environments/environment';
import { Booking } from '../../models/booking.model';

import { BookingService } from '../../services/bookings.service';

@Component({
  selector: 'app-added-to-bookings',
  templateUrl: './added-to-bookings.component.html',
  styleUrls: ['./added-to-bookings.component.scss'],
})
export class AddedToBookingsComponent implements OnInit {
  currentBooking: Booking | undefined;
  products: Array<Product> = [];
  recommendedProducts: Array<Product> = [];

  redirectUrl: string = environment.home;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      if (queryParams.has('redirect_url')) {
        this.redirectUrl = queryParams.get('redirect_url') || environment.home;
      }
    });
    
    try {
      this.currentBooking = this.bookingService.getCurrentBooking();
      if (!this.currentBooking) {
        this.router.navigate(['bookings']);
        return;
      }

      this.currentBooking.products.forEach((p) => {
        const accessories = p.accessories;

        this.products.push(p);
        this.products.push(...accessories);
      });
      this.recommendedProducts = []; // TODO: Fetch!
    } catch (err) {
      console.log(err);
    }
  }

  homepage() {
    location.href = this.redirectUrl;
  }

  viewCurrentBookingsButtonClicked() {
    if (!this.currentBooking) {
      this.router.navigate(['bookings']);
      return;
    }

    this.router.navigate(['bookings', this.currentBooking!.id]);
  }
}
