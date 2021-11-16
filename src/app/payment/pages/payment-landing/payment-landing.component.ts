import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgAuthService } from '@appstrax/ng-auth';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { Booking, BillingType } from 'src/app/booking/models/booking.model';
import { BookingService } from 'src/app/booking/services/bookings.service';
import { Breadcrumb } from 'src/app/core/models/breadcrumb.model';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-landing',
  templateUrl: './payment-landing.component.html',
  styleUrls: ['./payment-landing.component.scss'],
})
export class PaymentLandingComponent implements OnInit {
  @ViewChild(StripeCardNumberComponent) card?: StripeCardNumberComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: 'AvenirLTStd-Book, "Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  stripe: FormGroup;

  breadcrumbs: Array<Breadcrumb> = [
    { path: '', label: 'My Booking', active: false, disabled: false },
    { path: '', label: 'Checkout', active: false, disabled: false },
    { path: '.', label: 'Payment', active: true, disabled: false },
  ];

  public creditCardSelected: boolean = true;
  public wireTransferSelected: boolean = false;

  booking?: Booking;

  completedPayment = false;
  paying = false;

  user: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private stripeService: StripeService,
    private ngAuthService: NgAuthService
  ) {
    this.stripe = this.fb.group({
      // name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.user = this.ngAuthService.getAuthenticatedUser();
    if (!this.user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.activatedRoute.paramMap.subscribe((params) => {
      const bookingId = params.get('booking_id');
      if (!bookingId) {
        this.router.navigate(['bookings']);
        return;
      }

      this.booking = this.bookingService.getBookingById(bookingId);
      if (!this.booking) {
        this.router.navigate(['bookings']);
        return;
      }

      this.breadcrumbs = [
        {
          path: `/bookings/${bookingId}`,
          label: 'My Booking',
          active: false,
          disabled: false,
        },
        {
          path: `/bookings/${bookingId}/checkout`,
          label: 'Checkout',
          active: false,
          disabled: false,
        },
        { path: '.', label: 'Payment', active: true, disabled: false },
      ];
    });

    if (this.booking) {
      this.booking.billingType = BillingType.creditCard;
    }
  }

  toggleCreditCard() {
    if (this.booking) {
      this.booking.billingType = BillingType.creditCard;
    }
    this.creditCardSelected = true;
    this.wireTransferSelected = false;
  }

  toggleWiretransfer() {
    if (this.booking) {
      this.booking.billingType = BillingType.wireTransfer;
    }
    this.creditCardSelected = false;
    this.wireTransferSelected = true;
  }

  async onReviewAndPayClicked() {
    this.paying = true;
    // this.bookingService.save();
    if (this.wireTransferSelected) {
      try {
        const res = await this.paymentService.createOrder(this.booking!);
        console.log(res);
        this.booking!.orderId = res.data.orderId;
        this.completedPayment = true;
        if (this.booking) {
          this.booking.paid = true;
          this.bookingService.save();
          this.router.navigate(['payment', this.booking.id, 'complete']);
        }
      } catch (err) {
        console.log('Failed to place order');
        console.log(err);
      }
    } else {
      try {
        const res = await this.paymentService.createPaymentIntent(
          this.booking!
        );
        console.log(res);
        this.stripeService
          .confirmCardPayment(res.data.clientSecret, {
            payment_method: {
              card: this.card?.element!,
              billing_details: {
                address: {
                  country: this.booking?.billingCountry?.isoCode,
                  line1: this.booking?.billingAddress,
                  postal_code: this.booking?.billingZipCode,
                },
                email: this.booking?.email,
                name: this.booking?.name,
                phone: this.booking?.phone,
              },
            },
          })
          .subscribe((res) => {
            console.log(res);
            if (res.error) {
              alert(res.error.message);
              return;
            } else {
              this.completedPayment = true;
              //this.bookingService.deleteBooking(this.booking!);
              if (this.booking) {
                this.booking.paid = true;
                this.bookingService.save();
                this.router.navigate(['payment', this.booking.id, 'complete']);
              }
            }
          });
      } catch (err) {
        console.log('Failed to create payment intent');
        console.log(err);
      }
    }
    this.paying = false;
  }
}
