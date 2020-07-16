import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { BookingsModel, BookingSummaryModel, } from '../models';
import { BookingsBaseService, } from '../core/services/bookings/bookings-base.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  @Input() listIsLoading: boolean;
  @Input() value: any;

  @Output() searchClick = new EventEmitter<{start: string, end: string}>();

  bookingsList$: Observable<BookingSummaryModel[]>;

  constructor(
    private bookingsService: BookingsBaseService
  ) { }

  ngOnInit(): void {
      this.bookingsService.loadData();
      this.bookingsList$ = this.bookingsService.bookings$;     
  }

  onSearchClick(startDate: string, endDate: string): void {
    this.bookingsService.loadBookingByDate(startDate, endDate);
  }

}
