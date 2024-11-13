import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.auth.isAuthenticated$.pipe(
      map((authenticated) => {
        if (authenticated) {
          if (state.url === '/') {
            this.router.navigate(['/accueil']);
            return false;
          }
          return true;
        } else {
          if (state.url !== '/') {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        }
      })
    );
  }
}
