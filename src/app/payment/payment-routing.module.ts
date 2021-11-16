import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicLayoutComponent } from '../core/basic-layout/basic-layout.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { CompleteOrderComponent } from './pages/complete-order/complete-order.component';
import { PaymentOptionsComponent } from './pages/payment-landing/payment-options/payment-options.component';
import { PaymentLandingComponent } from './pages/payment-landing/payment-landing.component';

const routes: Routes = [
  {
    path: '',
    component: BasicLayoutComponent,
    children: [
      {
        path: ':booking_id/pay',
        component: PaymentLandingComponent,
      },
      {
        path: ':booking_id/complete',
        component: CompleteOrderComponent,
      },
      {
        path: ':booking_id/summary',
        component: OrderSummaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
