import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(private authService: AuthService,
              private router: Router,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    console.log(this.authService.userIsAuthenticated);
  }

  onLogin() {
  this.isLoading = true;
  this.loadingCtrl.create({
    keyboardClose: true,
    message: 'Logging in ...'
  }).then( loadingEl => {
    loadingEl.present();
    setTimeout(() => {
      this.router.navigateByUrl('/places/tabs/discover');
      this.isLoading = false;
      loadingEl.dismiss();
    }, 2000 );
  }
  );
  this.authService.login();
  console.log(this.authService.userIsAuthenticated);
  }
  onSubmit(ngForm: NgForm) {

    if (!ngForm.valid){
      return;
    }
    const email = ngForm.value.login;
    const password = ngForm.value.password;
    console.log(email,password);
    if (this.isLogin) {
     // send a request te security to login
    } else {
      // send a request te security to signup
    }



  }

  onRegister() {
    this.isLogin = !this.isLogin;
  }
}

