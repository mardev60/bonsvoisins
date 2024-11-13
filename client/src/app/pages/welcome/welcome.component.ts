import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})

export class WelcomeComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  isLoading: boolean = true;
  private authSubscription!: Subscription;

  constructor(public authService: AuthService, private router : Router) {}
  
  ngOnInit() {
    this.authService.auth.isAuthenticated$.subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        this.isLoading = false;
        if(isAuthenticated) {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
