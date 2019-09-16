import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { PlacesService } from '../places/places.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingArrays: Booking[] = [
    {
      id: '123',
      placeId: '1',
      guestNumber: 10,
      placeTitle: 'Marrakech Menara',
      userId: 'telyoussoufi'
    },
    {
      id: '111',
      placeId: '2',
      guestNumber: 2,
      placeTitle: 'Turkey',
      userId: 'telyoussoufi'
    }
  ];

  constructor(private placeService: PlacesService) {}

  get bookings() {
    return [...this.bookingArrays];
  }
}
