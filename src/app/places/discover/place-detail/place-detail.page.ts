import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NavController,
  ModalController,
  ActionSheetController
} from '@ionic/angular';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  private offerSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}
  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
      console.log('Destroyed');
    }
  }
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.pop();
        return;
      }
      this.offerSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe(p => {
          this.place = p;
        });
    });
  }

  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // pour le mobile utilise POP
    // this.navCtrl.pop();
    this.actionSheetCtrl
      .create({
        header: 'Actions',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'destructive'
          }
        ]
      })
      .then(actionSheetElt => {
        actionSheetElt.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);

    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        id: 'bookingModal',
        componentProps: { selectedPlace: this.place, selectedMode: mode }
      })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'book') {
          console.log('booked !');
        } else if (resultData.role === 'cancel') {
          console.log('Cancelled !');
        }
      });
  }
}
