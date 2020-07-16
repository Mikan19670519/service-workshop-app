import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { BookingsBaseService } from './core/services/bookings/bookings-base.service'
import { BookingsService } from './core/services/bookings/bookings.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingsComponent } from './bookings/bookings.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { BookingComponentComponent } from './booking-component/booking-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingsComponent,
    TopBarComponent,
    BookingsListComponent,
    BookingComponentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    {
      provide: BookingsBaseService,
      useClass: BookingsService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
