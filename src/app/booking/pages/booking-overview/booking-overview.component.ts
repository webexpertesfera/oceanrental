import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgAuthService } from '@appstrax/ng-auth';
import * as moment from 'moment';
import { Product } from 'src/app/product/models/product.model';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/bookings.service';

@Component({
  selector: 'app-booking-overview',
  templateUrl: './booking-overview.component.html',
  styleUrls: ['./booking-overview.component.scss'],
})
export class BookingOverviewComponent implements OnInit {
  booking: Booking | undefined;
  availability: any = null;
  rentalPeriod: string = '0 days';
  logisticsFee: number = 0;
  lastAvailabilityCheck: string = 'minutes ago';
  loadingAvailabilityCheck: boolean = false;
  products: Array<Product> = [];
  show: boolean = false;
  user: any = null;
  isAvailable: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router,
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

      this.recheckAvailability(true);
    });
  }

  async recheckAvailability(force: boolean) {
    if (!this.booking) return;

    const daysOfPeriod = moment(this.booking.period.toDate).diff(
      moment(this.booking.period.fromDate),
      'days'
    );
    this.rentalPeriod = `${daysOfPeriod} days`;

    if (!force && this.booking.availability && this.booking.checkedAvailabilityOn) {
      const minutesAgoChecked = moment(this.booking.checkedAvailabilityOn).diff(
        moment(),
        'minutes'
      );
      if (minutesAgoChecked < 10) {
        this.availability = this.booking.availability;
      } else {
        this.loadingAvailabilityCheck = true;
        this.availability = await this.bookingService.productsAvailability(
          this.booking
        );
        this.lastAvailabilityCheck = moment(
          this.booking.checkedAvailabilityOn
        ).fromNow();
        this.loadingAvailabilityCheck = false;
      }
    } else {
      this.loadingAvailabilityCheck = true;
      this.availability = await this.bookingService.productsAvailability(
        this.booking
      );
      this.lastAvailabilityCheck = moment(
        this.booking.checkedAvailabilityOn
      ).fromNow();
      this.loadingAvailabilityCheck = false;
    }

    this.products = [];
    this.booking?.products.forEach((p) => {
      const availableProduct = this.availability.products.find(
        (ap: any) => ap.id === p.id
      );
      if (!availableProduct) {
        console.log('Available product not found');
        return;
      }
      p.quantity = availableProduct.quantity;
      p.totalPrice = availableProduct.totalPrice;
      p.availabilityState = availableProduct.availabilityState;

      if ((p.availabilityState === "NOT_AVAILABLE") || !this.isAvailable) {
        this.isAvailable = false;
      } else {
        this.isAvailable = true;
      }

      p.note = availableProduct.note;

      // TODO: Temp, remove if changing API
      p.price =
        Number(p.totalPrice) / Number(daysOfPeriod) / Number(p.quantity);

      this.products.push(p);
      p.accessories.forEach((a) => {
        const availableAccessory = availableProduct.accessories.find(
          (ac: any) => ac.id === a.id
        );
        if (!availableAccessory) {
          console.log('Available accessory not found');
          return;
        }
        a.quantity = availableAccessory.quantity;
        a.totalPrice = availableAccessory.totalPrice;
        a.availabilityState = availableAccessory.availabilityState;

        if ((a.availabilityState === "NOT_AVAILABLE") || !this.isAvailable) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
        }

        // TODO: Temp, remove if changing API
        p.totalPrice = Number(p.totalPrice) - Number(a.totalPrice);
        p.price =
          Number(p.totalPrice) / Number(daysOfPeriod) / Number(p.quantity);
        a.price =
          Number(a.totalPrice) / Number(daysOfPeriod) / Number(a.quantity);

        this.products.push(a);
      });
    });

    this.logisticsFee =
      Number(this.availability.totalDeliveryOnBoard) +
      Number(this.availability.totalHandlingCosts) +
      Number(this.availability.totalRelocationFees) +
      Number(this.availability.totalShippingCosts);
  }

  isValid(): boolean {
    return this.isAvailable;
  }

  async removeProductFromBooking(product: Product) {
    this.products = [];

    if (product.type === 'Product') {
      const b = await this.bookingService.removeProduct(this.booking!, product);
      if (!b) {
        this.router.navigate(['bookings']);
        return;
      }
    } else {
      this.bookingService.removeAccessory(this.booking!, product);
    }

    await this.recheckAvailability(true);
  }

  quantityChanged(product: Product, quantity: number) {
    this.products = [];

    if (product.type === 'Product') {
      const b = this.bookingService.changeProductQuantity(
        this.booking!,
        product,
        quantity
      );
      if (!b) {
        this.router.navigate(['bookings']);
        return;
      }
    } else {
      this.bookingService.changeAccessoryQuantity(
        this.booking!,
        product,
        quantity
      );
    }

    this.recheckAvailability(true);
  }

  toggle() {
    this.show = !this.show;
  }
}
