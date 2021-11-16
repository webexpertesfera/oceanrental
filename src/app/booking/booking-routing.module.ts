import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from '../core/basic-layout/basic-layout.component';
import { CheckoutPage } from './pages/checkout/checkout.page';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { AddedToBookingsComponent } from './pages/added-to-bookings/added-to-bookings.component';
import { BookingOverviewComponent } from './pages/booking-overview/booking-overview.component';

const routes: Routes = [
  {
    path: '',
    component: BasicLayoutComponent,
    children: [
      {
        path: 'recently-added',
        component: AddedToBookingsComponent,
      },
      {
        path: '',
        component: MyBookingsComponent,
      },
      {
        path: ':booking_id',
        component: BookingOverviewComponent,
      },
      { path: 'sign-in', component: SignInPage },
      { path: ':booking_id/checkout', component: CheckoutPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
