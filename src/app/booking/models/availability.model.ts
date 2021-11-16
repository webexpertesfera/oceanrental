import { Product } from 'src/app/product/models/product.model';

export class Availability {
  totalPrice: string = '0.00';
  totalShippingCosts: string = '0.00';
  totalRelocationFees: string = '0.00';
  totalHandlingCosts: string = '0.00';
  totalDeliveryOnBoard: string = '0.00';
  totalTransportCosts: string = '0.00';
  grandTotalPrice: string = '0.00';
  vat: string = '0.00';
  grandTotalPriceWithVat: string = '0.00';
  products: Array<Product> = [];
}
