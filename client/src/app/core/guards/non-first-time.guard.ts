import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NonFirstTimeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isFirstLogin = localStorage.getItem('isFirstLogin');

    if (isFirstLogin === 'true') {
      this.router.navigate(['dashboard', 'welcome']);
      return false;
    }

    return true;
  }
}