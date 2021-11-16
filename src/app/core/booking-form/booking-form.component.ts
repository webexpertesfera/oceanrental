import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepicker,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BookingPeriod } from 'src/app/booking/models/booking-period.model';
import { Booking } from 'src/app/booking/models/booking.model';
import { BookingService } from 'src/app/booking/services/bookings.service';
import { Product } from 'src/app/product/models/product.model';
import { AvailabilityState } from '../models/availability-state';
import { Location } from '../models/location.model';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent implements OnInit {
  @Input() booking: Booking | undefined;
  @Output() bookingChange = new EventEmitter<Booking | undefined>();

  @Input() bookings: Array<Booking> = [];
  @Input() locations: Array<Location> = [];
  @Input() product: Product | undefined;
  @Input() showYachtName: boolean = false;
  @Input() showBookingSelect: boolean = true;
  @Input() showTitle: boolean = true;

  @Output() manageBookingClick = new EventEmitter<Booking>();
  @Output() lovedChange = new EventEmitter<boolean>();
  @Output() addToBooking = new EventEmitter<{
    booking: Booking;
    product: Product | undefined;
  }>();
  @Output() availability = new EventEmitter<AvailabilityState>();
  @Output() loadingAvailabilityEvent = new EventEmitter<boolean>();

  @ViewChild('datepicker') datepicker!: NgbInputDatepicker;

  hoveredDate: NgbDate | null = null;
  minDate: NgbDate;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  loadingAvailability = false;
  loadingAvailabilityGraph = false;
  availabilityState: AvailabilityState = new AvailabilityState();

  datesAvailable: Array<{ date: NgbDate | null; available: boolean }> = [];

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private bookingService: BookingService
  ) {
    this.minDate = calendar.getToday();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    // If parent component passed in a new Booking
    if (this.booking && !this.booking.id) {
      this.booking!.period.fromDate = this.fromDate!;
      this.booking!.period.toDate = this.toDate!;
    }

    if (this.booking && this.booking.id) {
      this.checkGeneralAvailability();
    }

    this.bookingService.availabilityCheck.subscribe((_force: any) => {
      this.checkGeneralAvailability();
    })
  }

  newBookingCreated(booking: Booking) {
    this.booking = booking;
    this.booking!.period.fromDate = this.fromDate!;
    this.booking!.period.toDate = this.toDate!;
    this.bookingChange.emit(this.booking);
  }

  onDeliveryLocationChange() {
    this.checkGeneralAvailability();
    this.availabilityGraph();
    this.bookingChange.emit(this.booking);
  }

  onCollectionLocationChange() {
    this.checkGeneralAvailability();
    this.availabilityGraph();
    this.bookingChange.emit(this.booking);
  }

  counterChanged() {
    this.checkGeneralAvailability();
    this.availabilityGraph();
    this.bookingChange.emit(this.booking);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;

      this.booking!.period.fromDate = this.fromDate;
      this.bookingChange.emit(this.booking);
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
      this.bookingChange.emit(this.booking);
      this.checkGeneralAvailability();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
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

  markDisabled(date: NgbDate) {
    console.log(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
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

    const miniBooking = new Booking();
    miniBooking.products = [this.product!];
    miniBooking.period = this.booking.period;
    miniBooking.location = this.booking.location;

    this.loadingAvailability = true;
    this.loadingAvailabilityEvent.emit(this.loadingAvailability);
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
        this.availabilityState = {
          state: stockDetermination.availabilityState,
          notes: stockDetermination.note,
        };
        this.availability.emit(this.availabilityState);
      }
    } catch (err) {
      this.availabilityState = {
        state: 'NOT_AVAILABLE',
        notes: '',
      };
      this.availability.emit(this.availabilityState);
    }
    this.loadingAvailability = false;
    this.loadingAvailabilityEvent.emit(this.loadingAvailability);
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

    const period = new BookingPeriod();
    period.start = moment(this.booking.period.fromDate)
      .startOf('month')
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss.000+0000');
    period.end = moment(this.booking.period.toDate)
      .endOf('month')
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss.000+0000');

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

  async navigate(
    current: { year: number; month: number } | null,
    next: { year: number; month: number }
  ) {
    this.loadingAvailabilityGraph = true;

    let start = moment();
    let end = moment(next);
    if (current) start = moment(current);

    const period = new BookingPeriod();

    if (start.isBefore(end)) {
      period.start = start
        .startOf('month')
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss.000+0000');
      period.end = end
        .endOf('month')
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss.000+0000');
    } else {
      period.start = end
        .startOf('month')
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss.000+0000');
      period.end = start
        .endOf('month')
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss.000+0000');
    }

    try {
      const graph = await this.bookingService.availabilityGraph(
        this.product!,
        period,
        this.booking!.location
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

  isInvalid(): boolean {
    let invalid = false;

    if (!this.booking?.location.collection) {
      invalid = true;
    }

    if (!this.booking?.location.delivery) {
      invalid = true;
    }

    if (!this.booking?.period.start) {
      invalid = true;
    }

    if (!this.booking?.period.end) {
      invalid = true;
    }

    if (!this.product?.quantity) {
      invalid = true;
    }

    if (
      this.availabilityState.state === 'COULD_NOT_DETERMINE' ||
      this.availabilityState.state === 'NOT_AVAILABLE'
    ) {
      invalid = true;
    }

    if (this.loadingAvailability) {
      invalid = true;
    }

    return invalid;
  }

  addToBookingClick() {
    this.addToBooking.emit({ booking: this.booking!, product: this.product });
  }
}
