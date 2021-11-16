import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgAuthService } from '@appstrax/ng-auth';
import { NgbAccordion, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Breadcrumb } from 'src/app/core/models/breadcrumb.model';
import { Booking } from '../../models/booking.model';
import { Country } from '../../models/countries.model';
import { BookingService } from '../../services/bookings.service';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @ViewChild('accordion') accordion!: NgbAccordion;

  breadcrumbs: Array<Breadcrumb> = [
    { path: '..', label: 'My Booking', active: false, disabled: false },
    { path: '.', label: 'Checkout', active: true, disabled: false },
    { path: '', label: 'Payment', active: false, disabled: true },
  ];
  activeIds: Array<string> = [];
  booking: Booking | undefined;
  noInfo: boolean = false;
  mobile: boolean = false;
  saved: boolean = false;
  countries: Array<Country> = [];
  user: any = null;
  // cities: Array<City> = [];
  // dropOffCities: Array<City> = [];
  // billingCities: Array<City> = [];

  roles: Array<any> = [
    { key: 'CAPTAIN_OR_CREW', value: 'Captain' },
    { key: 'CHARTER_BROKER_OR_MANAGER', value: 'Manager' },
    { key: 'CHARTER_BROKER_OR_MANAGER', value: 'Charter broker' },
    { key: 'OTHER', value: 'Other' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private countryService: CountryService,
    private ngAuthService: NgAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.ngAuthService.getAuthenticatedUser();
    if (!this.user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.onResize();
    this.fetchCountries();
    this.activatedRoute.paramMap.subscribe((params) => {
      const bookingId = params.get('booking_id');
      if (!bookingId) throw new Error('Something went wrong');

      this.booking = this.bookingService.getBookingById(bookingId);
      if (!this.booking) throw new Error('Something went wrong');

      if (this.ngAuthService.isAuthenticated()) {
        const user = this.ngAuthService.getAuthenticatedUser();
        if (!this.booking.name) {
          this.booking.name = `${user.firstName} ${user.lastName}`;
        }

        if (!this.booking.email) {
          this.booking.email = user.email;
        }

        if (!this.booking.billingName) {
          this.booking.billingName = `${user.firstName} ${user.lastName}`;
        }
      }

      // TODO: Show the most recent editing panel
      if (!this.isBillingDetailsValid()) {
        this.activeIds = ['billing-details'];
      }

      if (!this.isDropOffDetailsValid()) {
        this.activeIds = ['drop-off-details'];
      }

      if (!this.isPickUpDetailsValid()) {
        this.activeIds = ['pick-up-details'];
      }

      if (!this.isYachtInformationValid()) {
        this.activeIds = ['yacht-information'];
      }

      if (!this.isContactInformationValid()) {
        this.activeIds = ['contact-information'];
      }

      if (this.activeIds.length === 0) {
        this.activeIds = ['contact-information'];
      }
    });
  }

  setActive(id: string) {
    this.activeIds = [id];
  }

  onResize(event?: any) {
    if (event?.target.innerWidth < 768) {
      this.mobile = true;
    } else if (event?.target.innerWidth > 768) {
      this.mobile = false;
    } else if (window.screen.width < 768) {
      this.mobile = true;
    } else if (window.screen.width > 768) {
      this.mobile = false;
    }
  }

  async fetchCountries() {
    this.countries = await this.countryService.getAllCountries();
  }

  onCountryChange() {
    // if (this.booking?.pickUpCountry) {
    //   this.fetchCities(this.booking.pickUpCountry.isoCode);
    // }
  }

  // async fetchCities(code: string) {
  //   this.cities = await this.countryService.getCitiesOfCountry(code);
  // }

  onDropOffCountryChange() {
    //   if (this.booking?.dropOffCountry) {
    //     this.fetchDropOffCities(this.booking.dropOffCountry.isoCode);
    //   }
  }

  // async fetchDropOffCities(code: string) {
  //   this.dropOffCities = await this.countryService.getCitiesOfCountry(code);
  // }

  onBillingCountryChange() {
    //   if (this.booking?.billingCountry) {
    //     this.fetchBillingCities(this.booking.billingCountry.isoCode);
    //   }
  }

  // async fetchBillingCities(code: string) {
  //   this.billingCities = await this.countryService.getCitiesOfCountry(code);
  // }

  shouldShow(id: string) {
    if (!this.activeIds.includes(id) && this.mobile) {
      return false;
    }
    return true;
  }

  // back(target: any) {
  //   console.log('We are here', target);
  //   if (target === 'pick-up-details') {
  //     if (this.booking?.pickUpCountry) {
  //       this.fetchCities(this.booking.pickUpCountry?.isoCode);
  //     }
  //   }
  //   if (target === 'drop-off-details') {
  //     if (this.booking?.dropOffCountry) {
  //       this.fetchDropOffCities(this.booking.dropOffCountry?.isoCode);
  //     }
  //   }
  // }

  sameAsContactInformation() {
    if (!this.booking) throw new Error('Something went wrong');

    if (!this.booking.yachtContactName) {
      this.booking.yachtContactName = this.booking.name;
    }

    if (!this.booking.yachtEmail) {
      this.booking.yachtEmail = this.booking.email;
    }

    if (!this.booking.yachtRole) {
      this.booking.yachtRole = this.booking.role;
    }

    if (!this.booking.yachtPhone) {
      this.booking.yachtPhone = this.booking.phone;
    }
  }

  useShippingAddress() {
    if (!this.booking) throw new Error('Something went wrong');
    // console.log('use shipping add', this.booking);

    if (!this.booking.billingCountry) {
      this.booking.billingCountry = this.booking.pickUpCountry;
    }

    if (!this.booking.billingCity) {
      // if (this.booking?.pickUpCountry) {
      //   this.fetchBillingCities(this.booking.pickUpCountry?.isoCode);
      // }
      this.booking.billingCity = this.booking.pickUpCity;
    }

    if (!this.booking.billingZipCode) {
      this.booking.billingZipCode = this.booking.pickUpZipCode;
    }

    if (!this.booking.billingAddress) {
      this.booking.billingAddress = this.booking.pickUpAddress;
    }
  }

  termsAndConditionsCheck() {
    this.booking!.termsAndConditionsConsent = !(this.booking?.termsAndConditionsConsent);
  }

  securityDepositCheck() {
    this.booking!.securityDepositConsent = !(this.booking?.securityDepositConsent);
  }

  public beforeChange($event: NgbPanelChangeEvent) { }

  // Contact Information
  isContactInformationValid(): boolean {
    if (!this.booking) return false;

    return !!(
      this.booking.name &&
      this.booking.email &&
      this.booking.phone &&
      this.booking.role &&
      this.booking.role !== 'Role'
    );
  }

  submitContactInformation() {
    this.bookingService.save();
    this.accordion.toggle('contact-information');
    this.activeIds = ['yacht-information'];
    this.accordion.toggle('yacht-information');
  }

  // Yacht Information
  showYachtInformationToggle(): boolean {
    return this.isContactInformationValid();
  }

  isYachtInformationValid(): boolean {
    if (!this.booking) return false;

    if (this.noInfo) return true;

    return !!(
      this.booking.yachtEmail &&
      this.booking.yachtPhone &&
      this.booking.yachtRole &&
      this.booking.yachtRole != 'Role' &&
      this.booking.yachtContactName
    );
  }

  noInfoYet() {
    this.noInfo = true;
  }

  isYachtInformationDisabled(): boolean {
    return !this.isContactInformationValid();
  }

  submitYachtInformation() {
    this.bookingService.save();
    this.accordion.toggle('yacht-information');
    this.activeIds = ['pick-up-details'];
    this.accordion.toggle('pick-up-details');
  }

  // Pick Up Details
  showPickUpDetailsToggle(): boolean {
    return this.isContactInformationValid() && this.isYachtInformationValid();
  }

  isPickUpDetailsValid(): boolean {
    if (!this.booking) return false;

    return !!(
      this.booking.pickUpCountry &&
      this.booking.pickUpCity &&
      this.booking.pickUpZipCode &&
      this.booking.pickUpAddress &&
      this.booking.yachtName
    );
  }

  isPickUpDetailsDisabled(): boolean {
    return !this.isContactInformationValid() && !this.isYachtInformationValid();
  }

  submitPickUpDetails() {
    this.bookingService.save();
    this.accordion.toggle('pick-up-details');
    this.activeIds = ['drop-off-details'];
    this.accordion.toggle('drop-off-details');
  }

  // Drop Off Details
  showDropOffDetailsToggle(): boolean {
    return (
      this.isContactInformationValid() &&
      this.isYachtInformationValid() &&
      this.isPickUpDetailsValid()
    );
  }

  isDropOffDetailsValid(): boolean {
    if (!this.booking) return false;

    return !!(
      this.booking.dropOffCountry &&
      this.booking.dropOffCity &&
      this.booking.dropOffAddress
    );
  }

  isDropOffDetailsDisabled(): boolean {
    return (
      !this.isContactInformationValid() &&
      !this.isYachtInformationValid() &&
      !this.isPickUpDetailsValid()
    );
  }

  submitDropOffDetails() {
    this.bookingService.save();
    this.accordion.toggle('drop-off-details');
    this.activeIds = ['billing-details'];
    this.accordion.toggle('billing-details');
  }

  // Billing Details
  showBillingDetailsToggle(): boolean {
    return (
      this.isContactInformationValid() &&
      this.isYachtInformationValid() &&
      this.isPickUpDetailsValid() &&
      this.isDropOffDetailsValid()
    );
  }

  isBillingDetailsValid(): boolean {
    if (!this.booking) return false;

    if (this.booking.isCompany) {
      return !!(
        this.booking.companyName &&
        this.booking.vatNumber &&
        this.booking.billingName &&
        this.booking.billingCountry &&
        this.booking.billingCity &&
        this.booking.billingZipCode &&
        this.booking.billingAddress &&
        this.booking.termsAndConditionsConsent &&
        this.booking.securityDepositConsent
      );
    } else {
      return !!(
        this.booking.billingName &&
        this.booking.billingCountry &&
        this.booking.billingCity &&
        this.booking.billingZipCode &&
        this.booking.billingAddress &&
        this.booking.securityDepositConsent &&
        this.booking.termsAndConditionsConsent
      );
    }
  }

  isBillingDetailsDisabled(): boolean {
    return (
      !this.isContactInformationValid() &&
      !this.isYachtInformationValid() &&
      !this.isPickUpDetailsValid() &&
      !this.isDropOffDetailsValid() &&
      !this.isBillingDetailsValid()
    );
  }

  saveBooking() {
    if (!this.booking) {
      throw new Error('Something went wrong');
    } else {
      this.bookingService.save();
      this.saved = true;
      setTimeout(() => {
        this.saved = false;
      }, 3000);
    }
  }

  submitBillingDetails() {
    if (!this.booking) throw new Error('Something went wrong');

    this.bookingService.save();
    this.accordion.toggle('billing-details');

    this.router.navigate(['payment', this.booking.id, 'pay']);
  }
}
