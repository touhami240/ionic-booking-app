import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private somePlaces = new BehaviorSubject<Place[]>([
    new Place(
      '1',
      'Marrakech Menara',
      'Great monument !',
      'https://ddhtdmd3j7ft5.cloudfront.net/eyJidWNrZXQiOiJpbWFnZS1taW1jaXR5Iiwia2V5IjoiMTI3MzY4MTM4M1wvNDI5LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6Ijg1MCIsImhlaWdodCI6NTY2LCJmaXQiOiJjb3ZlciJ9fX0=',
      249.99,
      new Date('2019-10-01'),
      new Date('2020-12-25'),
      'abc'
    ),
    new Place(
      '2',
      'Sultan Ahmet',
      'Istanbul otherwise',
      'https://cache-graphicslib.viator.com/graphicslib/page-images/742x525/331250_Viator_Shutterstock_145981.jpg',
      299.99,
      new Date('2019-10-01'),
      new Date('2020-12-25'),
      'abc'
    ),
    new Place(
      '3',
      'Manhattan',
      'City that never sleeps !',
      'https://image.cnbcfm.com/api/v1/image/105065537-GettyImages-599766748.jpg?v=1558538614&w=1400&h=950',
      199.99,
      new Date('2019-10-01'),
      new Date('2020-12-25'),
      'abc'
    ),
    new Place(
      '4',
      'London',
      'Foggy city !',
      'https://upload.wikimedia.org/wikipedia/commons/4/44/Tower_Bridge_London_Feb_2006.jpg',
      399.99,
      new Date('2019-10-01'),
      new Date('2020-12-25'),
      'zzz'
    )
  ]);

  constructor(private athService: AuthService) {}
  get places() {
    return this.somePlaces.asObservable();
  }
  getPlace(id: string) {
    return this.somePlaces.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    desc: string,
    imgUrl: string,
    price: number,
    availableFrom: Date,
    availableTo: Date
  ) {
    console.log('Added ');
    const newPlace = new Place(
      Math.random().toString(),
      title,
      desc,
      imgUrl,
      price,
      availableFrom,
      availableTo,
      this.athService.userId
    );

    this.somePlaces.pipe(take(1)).subscribe(offers => {
      this.somePlaces.next(offers.concat(newPlace));
    });
  }
}
