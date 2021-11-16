import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/product/models/product.model';
import { Booking } from 'src/app/booking/models/booking.model';
import { AvailabilityState } from '../models/availability-state';
import { BookingService } from 'src/app/booking/services/bookings.service';

@Component({
  selector: 'app-recommended-product-carousel',
  templateUrl: './recommended-product-carousel.component.html',
  styleUrls: ['./recommended-product-carousel.component.scss'],
})
export class RecommendedProductCarousel implements OnInit {
  @Input() showAddToBooking: boolean = true;
  @Input() showCounter: boolean = true;
  @Input() displayCount: number = 5;

  @Output() productClick = new EventEmitter<Product>();
  @Output() recommendedProductAdded = new EventEmitter<Product>();
  @Output() isValid = new EventEmitter<Boolean>();

  loadingAvailability = false;
  availabilityChecked = false;
  loadingAvailabilityGraph = false;
  // availabilityState: AvailabilityState = new AvailabilityState();
  availabilityState: any;

  private _products: Array<Product> = [];

  constructor(
    private bookingService: BookingService) { }

  ngOnInit(): void { }

  @Input() set products(p: Array<Product>) {
    this._products = p.slice(0, this.displayCount);
  }

  get products(): Array<Product> {
    return this._products;
  }

  async addToCurrentBookingsButtonClicked(product: Product) {
    try {
      product.addedToBooking = true;
      this.recommendedProductAdded.emit(product);
      setTimeout(() => {
        product.addedToBooking = false;
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  async productQuantityChanged(product: Product, _quantity: number) {
    this.isValid.emit(false);
    const booking = this.bookingService.getCurrentBooking();
    this.availabilityChecked = false;
    if (!product) return;
    if (!booking) return;
    if (!booking.period) return;
    if (!booking.period.fromDate) return;
    if (!booking.period.toDate) return;
    if (!booking.location) return;
    if (!booking.location.collection) return;
    if (!booking.location.delivery) return;

    const miniBooking = new Booking();
    miniBooking.products = booking.products;
    miniBooking.products.forEach(p => {
      p.accessories = product.quantity ? [product]: [];
    });
    miniBooking.period.fromDate = booking.period.fromDate;
    miniBooking.period.toDate = booking.period.toDate;
    miniBooking.location.collection = booking.location.collection;
    miniBooking.location.delivery = booking.location.delivery;

    this.loadingAvailability = true;
    // this.loadingAvailabilityEvent.emit(this.loadingAvailability);
    try {
      const availabilityResponse = await this.bookingService.productsAvailability(
        miniBooking
      );

      if (
        availabilityResponse.products[0]
      ) {
        const stockDetermination = availabilityResponse.products[0].accessories;

        stockDetermination.forEach((a) => {
          this.availabilityState = {
            state: a.availabilityState,
            notes: a.note,
          };
        });
        this.availabilityChecked = true;
      }
    } catch (err) {
      // this.isValid.emit(false);
      this.availabilityState = {
        state: 'NOT_AVAILABLE',
        notes: '',
      };
    }
    this.loadingAvailability = false;
    this.availabilityChecked = true;

    if (!this.loadingAvailability && (this.availabilityState.state === 'NOT_AVAILABLE')) {
      this.isValid.emit(false);
      // alert(`Item not available; ${this.availabilityState.notes}`);
      return;
    } else if (!this.loadingAvailability && (this.availabilityState.state !== 'NOT_AVAILABLE')) {
      this.isValid.emit(true);
      this.recommendedProductAdded.emit(product);
    }
  }
}
