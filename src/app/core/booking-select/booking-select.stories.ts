import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NgbDropdown,
  NgbDropdownModule,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import { moduleMetadata } from '@storybook/angular';
import { Booking } from 'src/app/booking/models/booking.model';
import { BookingSelectComponent } from './booking-select.component';

export default {
  title: 'Core/Booking Select',
  decorators: [
    moduleMetadata({
      declarations: [BookingSelectComponent],
      imports: [CommonModule, RouterTestingModule, NgbDropdownModule],
      providers: [NgbDropdown, NgbDropdownToggle],
    }),
  ],
};

const booking1 = new Booking();
booking1.id = '1';
booking1.products = [];

const booking2 = new Booking();
booking2.id = '2';
booking2.products = [];

const testBookings: Array<Booking> = [booking1, booking2];

export const bookingSelect = () => ({
  component: BookingSelectComponent,
  props: {
    bookings: testBookings,
  },
});
