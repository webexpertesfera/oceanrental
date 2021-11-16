import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { Breadcrumb } from 'src/app/core/models/breadcrumb.model';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss'],
})
export class PaymentOptionsComponent implements OnInit {
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
    { path: '', label: 'Payment', active: true, disabled: false },
  ];

  public creditCardSelected: boolean = true;
  public wireTransferSelected: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {
    this.stripe = this.fb.group({
      // name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onImageClicked() {
    this.creditCardSelected = !this.creditCardSelected;
    this.wireTransferSelected = !this.wireTransferSelected;
  }

  onReviewAndPayClicked() {
    this.router.navigate(['payment/1']);
  }
}
