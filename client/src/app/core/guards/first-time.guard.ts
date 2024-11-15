import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirstTimeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isFirstLogin = localStorage.getItem('isFirstLogin');

    if (isFirstLogin === 'true') {
      return true;
    } else if (isFirstLogin === 'false') {
      this.router.navigate(['dashboard', 'home']);
      return false;
    }
    
    return true;
  }
}