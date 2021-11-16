import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';

import { Product } from 'src/app/product/models/product.model';
import { AvailabilityGraph } from '../models/availability-graph.model';
import { Availability } from '../models/availability.model';
import { BookingLocation } from '../models/booking-location.model';
import { BookingPeriod } from '../models/booking-period.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  bookings: Array<Booking> = [];
  bookingsChanged = new Subject();
  currentBooking: Booking | undefined;

  availabilityCheck = new Subject();

  apiBaseUrl: string =
    'https://zu6wjlgc49.execute-api.eu-west-1.amazonaws.com/staging/api/v1/products';

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.load();
    }
  }

  async addToBooking(booking: Booking, product: Product): Promise<Booking> {
    if (booking.id) {
      const bookingExists = this.bookings.find((b) => b.id === booking.id);
      if (!bookingExists) {
        this.createBooking(booking);
      }

      const exists = booking.products.find((p) => p.id === product.id);
      if (exists) {
        exists.quantity = exists.quantity + product.quantity;
      } else {
        booking.products.push(product);
      }

      this.bookingsChanged.next();
    } else {
      booking.id = this.uniqueId(2);
      booking.products.push(product);
      this.bookings.push(booking);
      this.bookingsChanged.next();
    }

    this.save();

    return booking;
  }

  createBooking(booking: Booking): Booking {
    this.bookings.push(booking);
    this.save();
    return booking;
  }

  async removeProduct(
    booking: Booking,
    product: Product
  ): Promise<Booking | undefined> {
    if (!booking) throw new Error('Booking required.');

    booking.products = booking.products.filter((p) => p.id !== product.id);
    if (booking.products.length === 0) {
      this.deleteBooking(booking);
      return undefined;
    }

    this.save();
    return booking;
  }

  async removeAccessory(
    booking: Booking,
    accessory: Product
  ): Promise<Booking> {
    if (!booking) throw new Error('Booking required.');
    booking.products.forEach((p) => {
      p.accessories = p.accessories.filter((a) => a.id !== accessory.id);
    });
    this.save();
    return booking;
  }

  async addAccessories(
    pBooking: Booking,
    pProduct: Product,
    accessories: Array<Product>
  ): Promise<Booking> {
    const booking = this.bookings.find((b) => b.id === pBooking.id);
    if (!booking) throw new Error('Booking not found');

    const product = booking.products.find((p) => p.id === pProduct.id);
    if (!product) throw new Error('Product not found');

    product.accessories = accessories;
    this.bookingsChanged.next();

    this.save();

    return booking;
  }

  async changeProductQuantity(
    booking: Booking,
    product: Product,
    quantity: number
  ): Promise<Booking | undefined> {
    if (quantity === 0) {
      return this.removeProduct(booking, product);
    }

    const prod = booking.products.find((p) => p.id === product.id);
    if (!prod) throw new Error('Product not found');

    prod.quantity = quantity;

    this.save();

    return booking;
  }

  async changeAccessoryQuantity(
    booking: Booking,
    accessory: Product,
    quantity: number
  ): Promise<Booking> {
    if (quantity === 0) {
      return this.removeAccessory(booking, accessory);
    }

    booking.products.forEach((p) => {
      const acc = p.accessories.find((a) => a.id === accessory.id);
      if (!acc) throw new Error('Accessory not found');

      acc.quantity = quantity;
    });

    this.save();

    return booking;
  }

  getBookings() {
    return [...this.bookings.filter((b) => !b.paid)];
  }

  getBookingById(bookingId: string | null) {
    return this.bookings.find((b) => b.id == bookingId);
  }

  deleteBooking(booking: Booking): Array<Booking> {
    this.bookings = this.bookings.filter((b) => b.id !== booking.id);
    this.save();
    this.bookings = this.bookings.filter((b) => b.paid === false);
    this.bookingsChanged.next();
    return this.bookings;
  }

  getCurrentBooking(): Booking | undefined {
    return this.currentBooking;
  }

  setCurrentBooking(booking: Booking) {
    this.currentBooking = booking;
    this.bookingsChanged.next();
  }

  async productsAvailability(booking: Booking): Promise<Availability> {
    const request: Array<any> = [];
    if (!booking) {
      return new Availability();
    }

    booking.products.map((product) => {
      request.push({
        id: product.id,
        quantity: product.quantity,
        location: booking.location,
        period: {
          start: booking.period.start,

          /*moment(booking.period.fromDate)
            .utc()
            .endOf('day')
            .format('YYYY-MM-DDTHH:mm:ss.000Z')*/ end:
            booking.period.end,
          /*moment(booking.period.toDate)
            .utc()
            .endOf('day')
            .format('YYYY-MM-DDTHH:mm:ss.000Z')*/
        },
        accessories: product.accessories,
      });
    });

    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>(`${this.apiBaseUrl}/availability`, request)
        .subscribe(
          (res) => {
            // TODO: pick up availability state
            booking.availability = res.data as Availability;
            booking.checkedAvailabilityOn = new Date();
            this.save();
            resolve(res.data as Availability);
          },
          (err) => reject(err)
        );
    });
  }

  async availabilityGraph(
    product: Product,
    period: BookingPeriod,
    location: BookingLocation
  ): Promise<AvailabilityGraph> {
    if (!product) throw new Error('Product required');
    if (!period) throw new Error('Period required');
    if (!location) throw new Error('Location required');

    const request = {
      id: product.id,
      quantity: product.quantity,
      location,
      period,
    };

    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>(`${this.apiBaseUrl}/availability-graph`, request)
        .subscribe(
          (res) => {
            resolve(res.data as AvailabilityGraph);
          },
          (err) => reject(err)
        );
    });
  }

  // https://stackoverflow.com/questions/52836247/how-to-generate-uuid-in-angular
  private uniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

  save() {
    localStorage.setItem('BOOKINGS', JSON.stringify(this.bookings));
  }

  private load() {
    this.bookings = [];

    try {
      const jsonBookings = JSON.parse(
        localStorage.getItem('BOOKINGS') || '[]'
      ) as Array<any>;

      jsonBookings.forEach((jsonBooking) => {
        const booking = Booking.fromJson(jsonBooking);
        this.bookings.push(booking);
      });
    } catch (err) {
      console.log('Failed to parse Bookings from Local Storage', err);
    }
  }

  forceAvailabilityCheck() {
    this.availabilityCheck.next(true);
  }
}
