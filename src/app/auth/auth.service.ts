import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthenticated = true;
  private localUserId = 'abc';

  constructor() { }

  get userIsAuthenticated() {
    return this.userAuthenticated;
  }
  get userId() {
    return this.localUserId;
  }

  login() {
    this.userAuthenticated = true;
  }
  logout() {
    this.userAuthenticated = false;
  }
}
