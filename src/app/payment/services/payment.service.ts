import { Injectable } from '@angular/core';
import { Booking } from 'src/app/booking/models/booking.model';
import { HttpService } from 'src/app/core/services/http.service';
import OrderRequest from '../models/order-request';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpService: HttpService) { }

  createPaymentIntent(booking: Booking) {
    const order = new OrderRequest(booking);

    return this.httpService.post(
      `https://zu6wjlgc49.execute-api.eu-west-1.amazonaws.com/staging/api/v1/products/orders/create-payment-intent`,
      order.toRequest()
    );
  }

  createOrder(booking: Booking) {
    const order = new OrderRequest(booking, "BANK_TRANSFER");

    return this.httpService.post(
      `https://zu6wjlgc49.execute-api.eu-west-1.amazonaws.com/staging/api/v1/products/orders`,
      order.toRequest()
    );
  }
}
