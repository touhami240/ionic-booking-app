import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding } from '@ionic/angular';
import { PlacesService } from '../places/places.service';
import { Subscription } from 'rxjs';
import { stringify } from 'querystring';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit, OnDestroy {
  booikingToShow: Booking[];
  private offerSub: Subscription;

  constructor(
    private bookingService: BookingService,
    private placesService: PlacesService
  ) {}
  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
    }
  }
  ngOnInit() {
    this.booikingToShow = this.bookingService.bookings;
  }

  onCancelBooking(bookingId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log('Booking cancelled ', bookingId);
  }

  findImgForPlace(placeId: string) {
    let result: string;
    this.offerSub = this.placesService.getPlace(placeId).subscribe(p => {
      result = p.imgUrl;
    });
    return result;
  }
}
