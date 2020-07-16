import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

import { SelectListItem } from '../models';

@Component({
  selector: 'app-booking-component',
  templateUrl: './booking-component.component.html',
  styleUrls: ['./booking-component.component.scss']
})
export class BookingComponentComponent implements OnInit {

  @Input() controlId: string;
  @Input() notes: string;
  @Input() bookingDate: string;
  @Input() booking: SelectListItem[];
  @Input() validationMessage: string;

  @Output() valueChange = new EventEmitter<string>();
  @Output() lostFocus = new EventEmitter();

  constructor(private renderer: Renderer2) { }

  onChange: (arg0: string) => void;
  onTouched: () => void;

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onFocus(): void {
    this.onTouched();
  }

  onBlur(): void {
    this.lostFocus.emit(this);
  }

}
