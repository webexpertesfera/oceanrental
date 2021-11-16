import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NgbDate,
  NgbDatepickerModule,
  NgbDropdown,
  NgbDropdownModule,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import { moduleMetadata } from '@storybook/angular';
import { BookingLocation } from 'src/app/booking/models/booking-location.model';
import { BookingPeriod } from 'src/app/booking/models/booking-period.model';
import { Booking } from 'src/app/booking/models/booking.model';
import { Product } from 'src/app/product/models/product.model';
import { BookingSelectComponent } from '../booking-select/booking-select.component';
import { BtnLoveComponent } from '../btn-love/btn-love.component';
import { CounterComponent } from '../counter/counter.component';
import { FloatingInputComponent } from '../floating-input/floating-input.component';
import { LocationSelectComponent } from '../location-select/location-select.component';
import { Location } from '../models/location.model';
import { BookingFormComponent } from './booking-form.component';

export default {
  title: 'Core/Booking Form',
  decorators: [
    moduleMetadata({
      declarations: [
        BtnLoveComponent,
        CounterComponent,
        BookingFormComponent,
        BookingSelectComponent,
        LocationSelectComponent,
        FloatingInputComponent,
      ],
      imports: [
        CommonModule,
        RouterTestingModule,
        NgbDropdownModule,
        NgbDatepickerModule,
      ],
      providers: [NgbDropdown, NgbDropdownToggle],
    }),
  ],
};

// Product
const product = new Product();
product.id = 1;
product.name = 'Jetski';
product.quantity = 1;

// Locations
const location = new Location();
location.id = 1;
location.name = 'Location 1';

const locations = [location];

// Bookings
const booking1 = new Booking();
booking1.id = '1';

booking1.location = new BookingLocation();
booking1.location.collection = location;
booking1.location.delivery = location;

booking1.period = new BookingPeriod();
booking1.period.fromDate = new NgbDate(2021, 5, 1);
booking1.period.toDate = new NgbDate(2021, 6, 1);

booking1.yachtName = 'Test ship';

booking1.products = [product];

const booking2 = new Booking();
booking2.id = '2';

booking2.location = new BookingLocation();
booking2.location.collection = location;
booking2.location.delivery = location;

booking2.period = new BookingPeriod();
booking2.period.fromDate = new NgbDate(2021, 5, 1);
booking2.period.toDate = new NgbDate(2021, 6, 1);

booking2.yachtName = 'Test ship';

booking2.products = [product];

const bookings: Array<Booking> = [booking1, booking2];

export const noBookings = () => ({
  component: BookingFormComponent,
  props: {
    bookings: [],
    locations,
    product,
  },
});

export const existingBookingg = () => ({
  component: BookingFormComponent,
  props: {
    booking: booking1,
    bookings,
    locations,
    product,
  },
});
