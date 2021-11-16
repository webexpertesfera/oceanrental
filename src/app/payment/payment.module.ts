import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PaymentRoutingModule } from './payment-routing.module';

import { CoreModule } from '../core/core.module';

import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { CompleteOrderComponent } from './pages/complete-order/complete-order.component';
import { PaymentOptionsComponent } from './pages/payment-landing/payment-options/payment-options.component';
import { PaymentLandingComponent } from './pages/payment-landing/payment-landing.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    OrderSummaryComponent,
    CompleteOrderComponent,
    PaymentOptionsComponent,
    PaymentLandingComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    NgbAccordionModule,
    NgxStripeModule.forRoot(environment.stripeApiKey),
    NgbModule,
  ],
})
export class PaymentModule { }
