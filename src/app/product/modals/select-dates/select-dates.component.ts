import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbActiveModal,
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BookingPeriod } from 'src/app/booking/models/booking-period.model';
import { Booking } from 'src/app/booking/models/booking.model';
import { BookingService } from 'src/app/booking/services/bookings.service';
import { AvailabilityState } from 'src/app/core/models/availability-state';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-select-dates',
  templateUrl: './select-dates.component.html',
  styleUrls: ['./select-dates.component.scss'],
})
export class SelectDatesComponent implements OnInit {
  @ViewChild('datepicker') datepicker!: NgbInputDatepicker;

  hoveredDate: NgbDate | null = null;
  minDate: NgbDate;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  booking: Booking | undefined;
  product: Product | undefined;

  loadingAvailabilityGraph = false;
  loadingAvailability = false;
  availabilityState: AvailabilityState = new AvailabilityState();

  datesAvailable: Array<{ date: NgbDate | null; available: boolean }> = [];

  constructor(
    public modal: NgbActiveModal,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private bookingService: BookingService,
    public i18n: NgbDatepickerI18n
  ) {
    this.minDate = calendar.getToday();
    this.fromDate = calendar.getNext(calendar.getToday(), 'd', 1);
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    if (this.booking) {
      this.booking.period.fromDate = this.fromDate!;
      this.booking.period.toDate = this.toDate!;
    }
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
      this.booking!.period.toDate = this.toDate;
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

  addToBooking() {
    const response = {
      fromDate: this.fromDate,
      toDate: this.toDate,
    };
    this.modal.close(response);
  }

  isDisabled(): boolean {
    if (this.loadingAvailability || this.loadingAvailabilityGraph) {
      return true;
    }

    if (
      this.availabilityState.state !== 'AVAILABLE' &&
      this.availabilityState.state !== 'AVAILABLE_BUT_DELAYED'
    ) {
      return true;
    }

    return false;
  }

  //TODO: check the general availability and figure out why it is not working in conjunction with the isDisabled function above on mobile
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
      }
    } catch (err) {
      this.availabilityState = {
        state: 'NOT_AVAILABLE',
        notes: '',
      };
    }
    this.loadingAvailability = false;
  }

  async navigate(
    current: { year: number; month: number } | null,
    next: { year: number; month: number }
  ) {
    if (!this.product) throw new Error('Product is required!');
    if (!this.booking) throw new Error('Booking is required!');

    this.checkGeneralAvailability();

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
}
