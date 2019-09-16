import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  private offerSub: Subscription;
  loadedPlaces: Place[];
  relavantPlaces: Place[];

  constructor(
    private placesService: PlacesService,
    private authService: AuthService
  ) {}

  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
      console.log('Destroyed');
    }
  }
  ngOnInit() {
    this.offerSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relavantPlaces = this.loadedPlaces;
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log('Hamza', event.detail);
    if (event.detail.value === 'all') {
      this.relavantPlaces = this.loadedPlaces;
    } else {
      this.relavantPlaces = this.loadedPlaces.filter(
        place => place.userId !== this.authService.userId
      );
    }
  }
}
