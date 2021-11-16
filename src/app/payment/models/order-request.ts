import { Booking } from 'src/app/booking/models/booking.model';

export default class OrderRequest {
  booking: Booking;
  paymentMethod: string = 'CARD';

  constructor(booking: Booking, paymentMethod: any = 'CARD') {
    this.booking = booking;
    this.paymentMethod = paymentMethod;
  }

  toRequest() {
    const products = this.booking.products.map((product) => {
      return {
        id: product.id,
        accessories: product.accessories,
        quantity: product.quantity,
        location: this.booking.location,
        period: this.booking.period,
      };
    });

    const nameParts = this.booking.name!.split(' ');

    const obj = {
      paymentMethod: this.paymentMethod,
      products: products,
      yachtName: this.booking.yachtName,
      securityDepositConsent: this.booking.securityDepositConsent,
      termsAndConditionsConsent: this.booking.termsAndConditionsConsent,
      excludeVat: true,
      contactDetails: {
        firstName: nameParts[0],
        surName: nameParts[1] || '',
        emailAddress: this.booking.email,
        phoneNumber: `${this.booking.phone}`,
        type: this.booking.role,
        pickupAddress: {
          streetName: this.booking.pickUpAddress,
          streetNumber: '',
          postalCode: this.booking.pickUpZipCode,
          countryDto: {
            name: this.booking.pickUpCountry?.name,
            alpha2Code: this.booking.pickUpCountry?.isoCode,
            callingCode: this.booking.pickUpCountry?.phonecode,
          },
          city: this.booking.pickUpCity,
        },
        dropoffAddress: {
          streetName: this.booking.dropOffAddress,
          streetNumber: '',
          postalCode: this.booking.dropOffZipCode,
          countryDto: {
            name: this.booking.dropOffCountry?.name,
            alpha2Code: this.booking.dropOffCountry?.isoCode,
            callingCode: this.booking.dropOffCountry?.phonecode,
          },
          city: this.booking.dropOffCity,
        },
      },
      contractorDetails: {
        firstName: this.booking.yachtContactName,
        surName: this.booking.yachtName,
        emailAddress: this.booking.yachtEmail,
        billing: {
          companyName: this.booking.companyName || '',
          vatNumber: this.booking.vatNumber || '',
          address: {
            streetName: this.booking.billingAddress,
            streetNumber: '',
            postalCode: this.booking.billingZipCode,
            countryDto: {
              name: this.booking.billingCountry?.name,
              alpha2Code: this.booking.billingCountry?.isoCode,
              callingCode: this.booking.billingCountry?.phonecode,
            },
            city: this.booking.billingCity,
          },
        },
      },
      message: 'N/A',
    };

    return obj;
  }
}
