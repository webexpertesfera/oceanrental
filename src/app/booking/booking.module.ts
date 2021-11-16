import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { BookingRoutingModule } from './booking-routing.module';

import { CoreModule } from '../core/core.module';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { CardGridComponent } from '../core/card-grid/card-grid.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { AddedToBookingsComponent } from './pages/added-to-bookings/added-to-bookings.component';
import { BookingOverviewComponent } from './pages/booking-overview/booking-overview.component';
import { CheckoutPage } from './pages/checkout/checkout.page';
import { FormsModule } from '@angular/forms';
import { AddBookingComponent } from './modals/add-booking/add-booking.component';
// import { CountriesSelectComponent } from '../core/countries-select/countries-select.component';

@NgModule({
  declarations: [
    SignInPage,
    CheckoutPage,
    CardGridComponent,
    MyBookingsComponent,
    AddedToBookingsComponent,
    BookingOverviewComponent,
    AddBookingComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    CoreModule,
    NgbModalModule,
    NgbModule
  ],
  bootstrap: [BookingOverviewComponent]
})
export class BookingModule { }
