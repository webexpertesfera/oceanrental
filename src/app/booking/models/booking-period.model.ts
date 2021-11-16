import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class BookingPeriod {
  start?: string;
  end?: string;

  private _fromDate?: NgbDate;
  private _toDate?: NgbDate;

  set fromDate(fromDate: NgbDate) {
    this._fromDate = fromDate;

    let month = `${this._fromDate.month}`;
    if (this._fromDate.month < 10) {
      month = `0${month}`;
    }

    let day = `${this._fromDate!.day}`;
    if (this._fromDate!.day < 10) {
      day = `0${day}`;
    }

    this.start = `${this._fromDate!.year}-${month}-${day}T12:00:00.000Z`;
  }

  get fromDate(): NgbDate {
    return this._fromDate!;
  }

  set toDate(toDate: NgbDate) {
    this._toDate = toDate;

    let month = `${this._toDate.month}`;
    if (this._toDate.month < 10) {
      month = `0${month}`;
    }

    let day = `${this._toDate!.day}`;
    if (this._toDate!.day < 10) {
      day = `0${day}`;
    }

    this.end = `${this._toDate!.year}-${month}-${day}T12:00:00.000Z`;
  }

  get toDate(): NgbDate {
    return this._toDate!;
  }
}
