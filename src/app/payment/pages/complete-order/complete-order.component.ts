import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgAuthService } from '@appstrax/ng-auth';
import * as moment from 'moment';
import { Booking, BillingType } from 'src/app/booking/models/booking.model';
import { BookingService } from 'src/app/booking/services/bookings.service';
import { Breadcrumb } from 'src/app/core/models/breadcrumb.model';
import { Product } from 'src/app/product/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.scss']
})
export class CompleteOrderComponent implements OnInit {

  // open1: boolean = false;
  // open2: boolean = false;
  creditCard: boolean = false;
  wireTransfer: boolean = true;
  // products: Array<Product> = [];

  booking: Booking | undefined;
  availability: any = null;
  rentalPeriod: string = '0 days';
  logisticsFee: number = 0;
  lastAvailabilityCheck: string = 'minutes ago';
  loadingAvailabilityCheck: boolean = false;
  products: Array<Product> = [];
  show: boolean = false;
  user: any = null;

  breadcrumbs: Array<Breadcrumb> = [
    { path: environment.home + '/bookings', label: 'My Booking', active: false, disabled: false },
    { path: '..', label: 'Checkout', active: false, disabled: false },
    { path: '.', label: 'Payment', active: true, disabled: false },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private ngAuthService: NgAuthService,
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
      if (this.booking && (this.booking.billingType === BillingType.creditCard)) {
        this.creditCard = true;
        this.wireTransfer = false;
      } else if (this.booking && (this.booking.billingType === BillingType.wireTransfer)) {
        this.creditCard = false;
        this.wireTransfer = true;
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
        return;
      }
      p.quantity = availableProduct.quantity;
      p.totalPrice = availableProduct.totalPrice;
      p.availabilityState = availableProduct.availabilityState;
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
          return;
        }
        a.quantity = availableAccessory.quantity;
        a.totalPrice = availableAccessory.totalPrice;
        a.availabilityState = availableAccessory.availabilityState;

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

  toggle() {
    this.show = !this.show;
  }

  // openAccordian1() {
  //   this.open1 = !this.open1;
  // }

  // openAccordian2() {
  //   this.open2 = !this.open2;
  // }

  onCompleteBookingClicked() {
    if (this.booking) {
      this.router.navigate(['payment', this.booking.id, 'summary']);
    } else {
      this.router.navigate(['bookings']);
    }
  }

}
