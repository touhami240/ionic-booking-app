import { Injectable } from '@angular/core';
import { Offer } from './offer.model';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private someOffers = new BehaviorSubject<Offer[]>([
    new Offer(
      'o1',
      'Tokyo',
      'Japan is great !',
      9909.99,
      new Date(),
      new Date(),
      'abc',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1071&q=80'
    ),
    new Offer(
      'o2',
      'Dubai',
      'Hot !',
      999.99,
      new Date(),
      new Date(),
      'abc',
      'https://www.arabianbusiness.com/sites/default/files/styles/full_img/public/images/2019/02/07/dubai-skyline.jpg'
    )
  ]);

  constructor(private athService: AuthService) {}

  get offers() {
    return this.someOffers.asObservable();
  }

  getOffer(id: string) {
    return this.offers.pipe(
      take(1),
      map(offers => {
        return { ...offers.find(o => o.id === id) };
      })
    );
  }

  addOffer(
    title: string,
    desc: string,
    price: number,
    availableFrom: Date,
    availableTo: Date,
    url: string
  ) {
    console.log('Offer Added ');
    const newOffer = new Offer(
      Math.random().toString(),
      title,
      desc,
      price,
      availableFrom,
      availableTo,
      this.athService.userId,
      url
    );
    return this.someOffers.pipe(
      take(1),
      delay(1000),
      tap(offers => {
        this.someOffers.next(offers.concat(newOffer));
      })
    );
  }

  editOffer(
    id: string,
    title: string,
    desc: string,
    price: number,
    availableFrom: Date,
    availableTo: Date
  ) {
    console.log(
      'Offer to be edited id : ',
      id,
      title,
      desc,
      price,
      availableFrom,
      availableTo
    );
    return this.offers.pipe(
      take(1),
      delay(1000),
      tap(offersTemp => {
        const updatedOfferIndex = offersTemp.findIndex(
          offerTemp => offerTemp.id === id
        );

        const updatedOffers = [...offersTemp];
        const oldOffer = updatedOffers[updatedOfferIndex];
        updatedOffers[updatedOfferIndex] = new Offer(
          oldOffer.id,
          title,
          desc,
          price,
          availableFrom,
          availableTo,
          oldOffer.userId,
          oldOffer.imgUrl
        );
        this.someOffers.next(updatedOffers);
      })
    );
  }
}
