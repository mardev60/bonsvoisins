import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: Auth0Service) {}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({logoutParams: {returnTo: window.location.origin}});
  }

  signup(){
    this.auth.loginWithRedirect({authorizationParams: {screen_hint: 'signup'}});
  }
}