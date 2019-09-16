import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { OffersService } from './offers.service';
import { Offer } from './offer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit, OnDestroy {
  offersList: Offer[];
  private offerSub: Subscription;

  constructor(private offerService: OffersService, private router: Router) {}

  ngOnInit() {
    this.offerSub = this.offerService.offers.subscribe(offers => {
      this.offersList = offers;
    });
  }
  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
      console.log('UNSUBSCRIBED');
    }
  }
  onEdit(offerid: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log('Option edit : ', offerid);
    this.router.navigateByUrl('/places/tabs/offers/edit/' + offerid);
  }
  onDelete(offerid: string) {
    console.log('Option drop : ', offerid);
  }
}
