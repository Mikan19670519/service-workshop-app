import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { retryBackoff } from 'backoff-rxjs';

import { BookingsBaseService } from './bookings-base.service';
import { environment } from '../../../../environments/environment';
import { PatchOperations } from '../../../models/common/patch-operations';
import { BookingsModel, BookingSummaryModel, ApplicationError, PatchModel } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class BookingsService extends BookingsBaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public loadData(): void {
    const url =
      environment.apiConfig.apiUrl +
      environment.apiConfig.bookingsUrl;

    this.http
      .get<BookingSummaryModel[]>(url)
      .pipe(
        retryBackoff(environment.retryConfig),
        catchError(this._summariesError.bind(this))
      )
      .subscribe(result => {
        this._listIsLoading$.next(true);
        this._bookings$.next(result);
      });
  }

  loadBookingByDate(start: string, end: string): void {
    const url =
      environment.apiConfig.apiUrl +
      environment.apiConfig.bookingsUrl +
      `/${start}/${end}`;
      this._listIsLoading$.next(true);

    this.http
      .get<BookingsModel>(url)
      .pipe(
        retryBackoff(environment.retryConfig),
        catchError(this._summaryError.bind(this))
      )
      .subscribe(result => {
        this._listIsLoading$.next(true);
        this._bookings$.next(result);
      });
  }

  loadBookingById(id: string): void {
    const url =
      environment.apiConfig.apiUrl +
      environment.apiConfig.bookingsUrl +
      `/${id}`;
      this._listIsLoading$.next(true);

    this.http
      .get<BookingsModel>(url)
      .pipe(
        retryBackoff(environment.retryConfig),
        catchError(this._summaryError.bind(this))
      )
      .subscribe(result => {
        this._listIsLoading$.next(true);
        this._selectedBooking$.next(result);
      });
  }

  post(model: BookingsModel): Observable<BookingsModel> {
    const url = environment.apiConfig.apiUrl + environment.apiConfig.bookingsUrl;

    return this.http.post<BookingsModel>(url, model).pipe(
      retryBackoff(environment.retryConfig),
      tap(result => {
        if (result.errorMessage) {
          this._bookingError$.next(result.errorMessage);
        }

        this._bookingsModel$.next(result);
      }),
      catchError(this._modelError.bind(this))
    );
  }

  update(_id, _path, _value): Observable<boolean> {
    const url =
      environment.apiConfig.apiUrl +
      environment.apiConfig.bookingsUrl +
      `/${_id}`;

    const patchModel = {
      operation: PatchOperations.replace,
      path: _path,
      value: _value
    } as PatchModel;

    return this.http.patch<BookingsModel>(url, patchModel).pipe(
      retryBackoff(environment.retryConfig),
      tap(result => {
        this._bookingsModel$.next(result);
      }),
      switchMap(() => of(true)),
      catchError(this._updateError.bind(this))
    );
  }

  private _summariesError(err) {
    this._handleError(err);
    return of(null as BookingSummaryModel[]);
  }

  private _updateError(err) {
    this._handleError(err);
    return of(false);
  }

  private _summaryError(err) {
    this._handleError(err);
    return of(null as BookingSummaryModel);
  }

  private _modelError(err) {
    this._handleError(err);
    return of(null as BookingsModel);
  }

  private _error(err) {
    this._handleError(err);
    return of(null as BookingsModel);
  }

  private _handleError(err) {
    this._listIsLoading$.next(false);
    let error: ApplicationError;
    if (err && err instanceof HttpErrorResponse) {
      // A client-side or network error occurred. Handle it accordingly.
      let detailedMessage = `${err.message}`;
      if (err.statusText) {
        detailedMessage += `<br/>${err.statusText}`;
      }
      error = {
        errorMessage: 'Unfortunately a network error has occurred. This may be because you have no Internet connection or there may be a server problem. Please try again later.',
        errorNumber: err.status,
        detailedMessage
      } as ApplicationError;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      error = {
        errorMessage: 'Unfortunately a network error has occurred. This may be because you have no Internet connection or there may be a server problem. Please try again later.',
        originalError: err
      } as ApplicationError;
    }

    this._bookingsModel$.next(null);
  }
}
