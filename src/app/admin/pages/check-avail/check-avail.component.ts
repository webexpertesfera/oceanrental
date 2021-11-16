import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDropdown,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import Fuse from 'fuse.js';
import { Product } from 'src/app/product/models/product.model';
import { Location } from 'src/app/core/models/location.model';
import { Booking } from 'src/app/booking/models/booking.model';
import { BookingLocation } from 'src/app/booking/models/booking-location.model';
import { BookingPeriod } from 'src/app/booking/models/booking-period.model';
import { Availability } from 'src/app/booking/models/availability.model';
import { ProductService } from 'src/app/product/services/product.service';
import { LocationService } from 'src/app/core/services/location.service';
import { BookingService } from 'src/app/booking/services/bookings.service';

@Component({
  selector: 'app-check-avail',
  templateUrl: './check-avail.component.html',
  styleUrls: ['./check-avail.component.scss'],
})
export class CheckAvailComponent implements OnInit {
  loadingAvailability = false;
  loadingAvailabilityGraph = false;

  @ViewChild('locationSelect') productSelect!: NgbDropdown;
  @ViewChild('locationSearchInput') productSearchInput!: ElementRef;
  isTyping = false;

  @ViewChild('datepicker') datepicker!: NgbInputDatepicker;

  products?: Array<Product> = [];
  filteredProducts?: Array<Product> = [];
  productSearch = '';
  fuse?: any;

  product?: Product;

  locations: Array<Location> = [];

  booking: Booking = {
    period: new BookingPeriod(),
    products: [],
    availability: new Availability(),
    checkingAvailability: false,
    checkedAvailabilityOn: undefined,
    isCompany: false,
    paid: false,
    securityDepositConsent: false,
    termsAndConditionsConsent: false,
    isActive: false,
    location: new BookingLocation(),
  };
  modalBooking: Booking = new Booking();
  popularMediterraneanPorts: Array<Location> = [];
  popularCaribbeanPorts: Array<Location> = [];

  hoveredDate: NgbDate | null = null;
  minDate: NgbDate;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  ColumnMode = ColumnMode;
  datesAvailable: Array<{ date: NgbDate | null; available: boolean }> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private productService: ProductService,
    private locationService: LocationService,
    private bookingService: BookingService
  ) {
    this.minDate = calendar.getToday();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.booking!.period.fromDate = this.fromDate;
    this.booking!.period.toDate = this.toDate;
  }

  async ngOnInit() {
    // this.activatedRoute.paramMap.subscribe((params) => {
    //   if (!params.has('product_slug')) {
    //     console.log('Product not found');
    //     return;
    //   }
    //   // TODO: Get product_group_slug and product_slug
    //   const productGroupSlug = params.get('product_group_slug')!;
    //   const productSlug = params.get('product_slug')!;
    //   this.findProductBySlug(productGroupSlug, productSlug);
    // });
    this.getAllProducts();
    this.getLocations();
  }

  private async getAllProducts() {
    try {
      const products = await this.productService.getAllProducts();
      this.products = products;
      this.filteredProducts = products;
      this.fuse = new Fuse(this.products!, {
        keys: ['name'],
      });
    } catch (err) {
      console.log(err);
    }
  }

  // private async findProductBySlug(
  //   productGroupSlug: string,
  //   productSlug: string
  // ): Promise<void> {
  //   try {
  //     const productAndAccessories = await this.productService.getProductBySlug(
  //       productGroupSlug,
  //       productSlug
  //     );
  //     this.product = productAndAccessories.product;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async getLocations() {
    this.locations = await this.locationService.getLocations();
    this.locations.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    // this.popularMediterraneanPorts = await this.locationService.getPopularMediterraneanPorts(
    //   this.locations
    // );
    // this.popularCaribbeanPorts = await this.locationService.getPopularCaribbeanPorts(
    //   this.locations
    // );
  }

  openLocationSelect() {
    if (!this.productSelect) return;

    this.isTyping = true;
    setTimeout(() => {
      if (this.productSearchInput) {
        this.productSearchInput.nativeElement.focus();
      }
      this.productSelect.open();
    }, 0);
  }

  productSearchChange() {
    if (!this.productSearch) {
      this.filteredProducts = this.products;
      return;
    }

    const result = this.fuse.search(this.productSearch);
    this.filteredProducts = result.map((res: any) => res.item);
  }

  productClick(product: Product) {
    this.product = product;
    setTimeout(() => {
      this.isTyping = false;
      this.productSelect.close();
      this.productSearch = '';
    }, 0);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.booking!.period.fromDate = this.fromDate;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
      this.booking!.period.fromDate = this.fromDate;
      this.booking!.period.toDate = this.toDate;
      this.datepicker.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  async navigate(
    current: { year: number; month: number } | null,
    next: { year: number; month: number }
  ) {
    // this.loadingAvailabilityGraph = true;

    let start = moment();
    let end = moment(next);
    if (current) start = moment(current);

    // const period = new BookingPeriod();

    // if (start.isBefore(end)) {
    //   period.start = start
    //     .startOf('month')
    //     .utc()
    //     .format('YYYY-MM-DDTHH:mm:ss.000+0000');
    //   period.end = end
    //     .endOf('month')
    //     .utc()
    //     .format('YYYY-MM-DDTHH:mm:ss.000+0000');
    // } else {
    //   period.start = end
    //     .startOf('month')
    //     .utc()
    //     .format('YYYY-MM-DDTHH:mm:ss.000+0000');
    //   period.end = start
    //     .endOf('month')
    //     .utc()
    //     .format('YYYY-MM-DDTHH:mm:ss.000+0000');
    // }

    // try {
    //   const graph = await this.bookingService.availabilityGraph(
    //     this.product!,
    //     period,
    //     this.booking!.location
    //   );

    //   this.datesAvailable = graph.availabilityGraph.map((ag) => {
    //     return {
    //       date: NgbDate.from(this.formatter.parse(ag.date!)),
    //       available: ag.available!,
    //     };
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    // this.loadingAvailabilityGraph = false;
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  isFirst(date: NgbDate) {
    return (
      date.year === this.fromDate?.year &&
      date.month === this.fromDate?.month &&
      date.day === this.fromDate?.day
    );
  }

  isLast(date: NgbDate) {
    return (
      date.year === this.toDate?.year &&
      date.month === this.toDate?.month &&
      date.day === this.toDate?.day
    );
  }

  isUnavailable(date: NgbDate) {
    const found = this.datesAvailable.find(
      (d) =>
        d.date?.year === date.year &&
        d.date.month === date.month &&
        d.date.day === date.day
    );
    if (!found) return false;

    return !found.available;
  }

  async checkGeneralAvailability() {
    if (!this.product) return;
    if (!this.booking) return;
    if (!this.booking.period) return;
    if (!this.booking.period.fromDate) return;
    if (!this.booking.period.toDate) return;
    if (!this.booking.location) return;
    if (!this.booking.location.collection) return;
    if (!this.booking.location.delivery) return;

    this.product.quantity = 1;
    this.product.accessories = [];
    const miniBooking = new Booking();
    miniBooking.products = [this.product!];
    miniBooking.period = this.booking.period;
    miniBooking.location = this.booking.location;

    this.loadingAvailability = true;
    try {
      const availabilityResponse = await this.bookingService.productsAvailability(
        miniBooking
      );
      if (
        availabilityResponse.products[0] &&
        availabilityResponse.products[0].id === this.product.id
      ) {
        const stockDetermination = (availabilityResponse.products[0] as any)
          .stockDetermination;
        // this.availabilityState = {
        //   state: stockDetermination.availabilityState,
        //   notes: stockDetermination.note,
        // };
        // this.availability.emit(this.availabilityState);
      }
    } catch (err) {
      // this.availabilityState = {
      //   state: 'NOT_AVAILABLE',
      //   notes: '',
      // };
      // this.availability.emit(this.availabilityState);
    }
    this.loadingAvailability = false;
  }

  async availabilityGraph() {
    if (!this.product) return;
    if (!this.booking) return;
    if (!this.booking.period) return;
    if (!this.booking.period.fromDate) return;
    if (!this.booking.period.toDate) return;
    if (!this.booking.location) return;
    if (!this.booking.location.collection) return;
    if (!this.booking.location.delivery) return;

    this.product.quantity = 1;
    const period = new BookingPeriod();
    period.start = this.booking.period.start;
    // moment(this.booking.period.fromDate)
    //   .startOf('month')
    //   .utc()
    //   .format('YYYY-MM-DDTHH:mm:ss.000+0000');
    period.end = this.booking.period.end;
    // moment(this.booking.period.toDate)
    //   .endOf('month')
    //   .utc()
    //   .format('YYYY-MM-DDTHH:mm:ss.000+0000');

    this.loadingAvailabilityGraph = true;
    try {
      const graph = await this.bookingService.availabilityGraph(
        this.product,
        period,
        this.booking.location
      );
      this.datesAvailable = graph.availabilityGraph.map((ag) => {
        return {
          date: NgbDate.from(this.formatter.parse(ag.date!)),
          available: ag.available!,
        };
      });
    } catch (err) {
      console.log(err);
    }
    this.loadingAvailabilityGraph = false;
  }
}
