import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BookingsBaseService, } from './core/services/bookings/bookings-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'service-workshop-app';
  listIsLoading$: Observable<boolean>;

constructor(
  private bookingsService: BookingsBaseService
){}

  ngOnInit(): void {
    this.listIsLoading$ = this.bookingsService.listIsLoading$;
  }
}
