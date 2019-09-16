import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Offer } from '../offer.model';
import { OffersService } from '../offers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss']
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  selectedOffer: Offer;
  private offerSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private offerService: OffersService
  ) {}
  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
      console.log('UNSUBSCRIBED');
    }
  }
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('offerId')) {
        this.navCtrl.pop();
        return;
      }
      this.offerSub = this.offerService
        .getOffer(paramMap.get('offerId'))
        .subscribe(offer => {
          this.selectedOffer = offer;
        });
    });
  }
}
