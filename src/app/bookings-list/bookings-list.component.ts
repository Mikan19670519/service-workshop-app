import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

import { BookingsModel, BookingSummaryModel, } from '../models';
import { BookingsBaseService, } from '../core/services/bookings/bookings-base.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {

  modelStart: NgbDateStruct;
  modelEnd: NgbDateStruct;
  startdate: { year: number, month: number };
  enddate: { year: number, month: number };
  @ViewChild('dp1') dp1: NgbDatepicker;
  @ViewChild('dp2') dp2: NgbDatepicker;

  headers = ["ID", "Booking Date", "Client", "Vehilce", "Notes", ""];
  @Input() bookingsList: BookingSummaryModel[];

  @Output() searchClick = new EventEmitter<{start: string, end: string}>();
  @Output() lostFocus = new EventEmitter();
  
  constructor(
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
  }

  navigateStartEvent(event) {
    this.startdate = event.next;
  }

  navigateEndEvent(event) {
    this.enddate = event.next;
  }

  onBlur(): void {
    this.lostFocus.emit(this);
  }

  onSearchClick(startDate: string, endDate: string): void {
    this.searchClick.emit({start: startDate, end: endDate});
  }

}
