import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Location } from 'src/app/core/models/location.model';
import { Product } from 'src/app/product/models/product.model';
import { Availability } from './availability.model';
import { BookingLocation } from './booking-location.model';
import { BookingPeriod } from './booking-period.model';
import { City, Country } from './countries.model';

export class Booking {
  id?: string;
  period: BookingPeriod = new BookingPeriod();
  location: BookingLocation = new BookingLocation();
  products: Array<Product> = [];
  availability: Availability = new Availability();
  checkingAvailability: boolean = false;
  checkedAvailabilityOn: Date | undefined;

  // Contact information
  name?: string;
  email?: string;
  phone?: string;
  role?: string;

  // Yacht Information
  yachtName?: string;
  yachtContactName?: string;
  yachtRole?: string;
  yachtEmail?: string;
  yachtPhone?: string;

  // Pick-Up Details
  pickUpCountry?: Country;
  // pickUpCity?: City;
  pickUpCity?: string;
  pickUpZipCode?: string;
  pickUpAddress?: string;

  // Drop-Off Details
  dropOffCountry?: Country;
  // dropOffCity?: City;
  dropOffCity?: string;
  dropOffZipCode?: string;
  dropOffAddress?: string;

  // Billing Details
  isCompany: boolean = false;
  companyName?: string;
  vatNumber?: string;
  billingName?: string;
  billingCountry?: Country;
  // billingCity?: City;
  billingCity?: string;
  billingZipCode?: string;
  billingAddress?: string;
  billingType?: BillingType;

  orderId?: string;
  paid: boolean = false;

  securityDepositConsent: boolean = false;
  termsAndConditionsConsent: boolean = false;

  isActive: boolean = false;

  static fromJson(jsonBooking: any): Booking {
    let booking = new Booking();

    booking = { ...jsonBooking };

    booking.id = jsonBooking.id;

    booking.period = new BookingPeriod();
    // booking.period.end = jsonBooking.period.end;
    // booking.period.start = jsonBooking.period.start;

    // booking.period.start = moment(jsonBooking.period.start)
    //   .endOf('day')
    //   .utc()
    //   .format('YYYY-MM-DDTHH:mm:ss.000Z');
    // booking.period.end = moment(jsonBooking.period.end)
    //   .endOf('day')
    //   .utc()
    //   .format('YYYY-MM-DDTHH:mm:ss.000Z');

    if (!jsonBooking.period._fromDate) {
      const parts = (jsonBooking.period.start as string).split('-');
      const year = Number(parts[0]); //moment(jsonBooking.period.start, 'YYYY-MM-DDTHH:mm:ss.000Z').year();
      const month = Number(parts[1]); //moment(jsonBooking.period.start, 'YYYY-MM-DDTHH:mm:ss.000Z').month();
      const day = Number(parts[2].split("T")[0]); // moment(jsonBooking.period.start, 'YYYY-MM-DDTHH:mm:ss.000Z').day();
      booking.period.fromDate = new NgbDate(year, month, day);
    } else {
      // We store the NgbDate as a private variable on _fromDate and _toDate
      // so that the api can use the formatted fromDate and toDate
      booking.period.fromDate = jsonBooking.period._fromDate;
    }

    if (!jsonBooking.period._toDate) {
      const parts = (jsonBooking.period.end as string).split('-');
      const year = Number(parts[0]); // moment(jsonBooking.period.end, 'YYYY-MM-DDTHH:mm:ss.000Z').year();
      const month = Number(parts[1]); // moment(jsonBooking.period.end, 'YYYY-MM-DDTHH:mm:ss.000Z').month();
      const day = Number(parts[2].split("T")[0]); // moment(jsonBooking.period.end, 'YYYY-MM-DDTHH:mm:ss.000Z').day();
      booking.period.toDate = new NgbDate(year, month, day);
    } else {
      // We store the NgbDate as a private variable on _fromDate and _toDate
      // so that the api can use the formatted fromDate and toDate
      booking.period.toDate = jsonBooking.period._toDate;
    }

    booking.location = new BookingLocation();
    booking.location.collection = new Location();
    booking.location.collection = jsonBooking.location.collection;

    booking.location.delivery = new Location();
    booking.location.delivery = jsonBooking.location.delivery;

    booking.products = jsonBooking.products as Array<Product>;
    booking.yachtName = jsonBooking.yachtName;

    return booking;
  }
}

export enum BillingType {
  creditCard = 'credit-card',
  wireTransfer = 'wire-transfer',
}
