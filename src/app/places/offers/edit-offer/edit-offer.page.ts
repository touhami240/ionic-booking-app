import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OffersService } from '../offers.service';
import { Offer } from '../offer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit, OnDestroy {
  form: FormGroup;
  selectedOffer: Offer;
  private offerSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private offerService: OffersService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnDestroy() {
    if (this.offerSub) {
      this.offerSub.unsubscribe();
      console.log('UNSUBSCRIBED');
    }
  }
  ngOnInit() {
    this.offerSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('offerId')) {
        this.navCtrl.pop();
        return;
      }

      this.offerSub = this.offerService
        .getOffer(paramMap.get('offerId'))
        .subscribe(offer => {
          this.selectedOffer = offer;
          this.form = new FormGroup({
            title: new FormControl(this.selectedOffer.title, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            description: new FormControl(this.selectedOffer.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(50)]
            }),
            price: new FormControl(this.selectedOffer.price, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(1)]
            }),
            dateFrom: new FormControl(
              this.selectedOffer.dateFrom.toISOString(),
              {
                updateOn: 'blur',
                validators: [Validators.required]
              }
            ),
            dateTo: new FormControl(this.selectedOffer.dateTo.toISOString(), {
              updateOn: 'blur',
              validators: [Validators.required]
            })
          });
        });
    });
  }
  onUpdateOffer() {
    console.log(this.form);
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl
      .create({
        message: 'Editing Offer...'
      })
      .then(ldElmt => {
        ldElmt.present();
        this.offerService
          .editOffer(
            this.selectedOffer.id,
            this.form.value.title,
            this.form.value.description,
            +this.form.value.price,
            new Date(this.form.value.dateFrom),
            new Date(this.form.value.dateTo)
          )
          .subscribe(() => {
            ldElmt.dismiss();
            this.form.reset();
            this.navCtrl.navigateBack('places/tabs/offers');
          });
      });
  }
}
