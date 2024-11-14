import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { catchError, map, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: Auth0Service, private apiService : ApiService) {}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({logoutParams: {returnTo: window.location.origin}});
  }

  signup(){
    this.auth.loginWithRedirect({authorizationParams: {screen_hint: 'signup'}});
  }

  checkFirstLogin(token: string): Observable<any> {
    const headers = this.createAuthHeaders(token);
    
    return this.apiService.get('auth/check-first-login', headers).pipe(
      map((response: any) => {
        return response.isFirstLogin || false;
      }),
      catchError((error) => {
        console.error('Error checking first login', error);
        throw error;
      })
    );
  }

  private createAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

}