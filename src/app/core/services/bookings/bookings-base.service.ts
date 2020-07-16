import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingsModel, BookingSummaryModel } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export abstract class BookingsBaseService {
  protected _bookingsModel$: BehaviorSubject<BookingsModel>;
  get bookingsModel$(): Observable<BookingsModel> {
    return this._bookingsModel$;
  }

  protected _selectedBooking$: BehaviorSubject<BookingSummaryModel>;
  get selectedBooking$(): Observable<BookingSummaryModel> {
    return this._selectedBooking$;
  }

  protected _bookings$: BehaviorSubject<BookingSummaryModel[]>;
  get bookings$(): Observable<BookingSummaryModel[]> {
    return this._bookings$;
  }

  protected _bookingError$: BehaviorSubject<string>;
  get bookingError$(): Observable<string> {
    return this._bookingError$;
  }

  protected _listIsLoading$: BehaviorSubject<boolean>;
  get listIsLoading$(): Observable<boolean> {
    return this._listIsLoading$;
  }

  constructor() {
    this._bookingsModel$ = new BehaviorSubject<BookingsModel>(null);
    this._bookings$ = new BehaviorSubject<BookingSummaryModel[]>(null);
    this._selectedBooking$ = new BehaviorSubject<BookingSummaryModel>(null);
    this._bookingError$ = new BehaviorSubject<string>(null);
    this._listIsLoading$ = new BehaviorSubject<boolean>(false);
  }

  abstract loadData(): void;
  abstract loadBookingByDate(start: string, end: string): void;
  abstract loadBookingById(id: string): void;
  abstract post(model: BookingsModel): Observable<BookingsModel>;
  abstract update(id: string, path: string, value: string): Observable<boolean>;

  selectBooking(bookingId: string): void {
    const summaries = this._bookings$.value;
    if (summaries && summaries.length) {
      const summary = summaries.find(
        s => s.bookingId === bookingId
      );
      if (summary) {
        this._selectedBooking$.next(summary);
      }
    }
  }
}
