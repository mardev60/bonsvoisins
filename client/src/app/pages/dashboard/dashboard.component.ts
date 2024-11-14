import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  isLoading = true;
  user = {
    firstName: '',
    lastName: '',
    phone: '',
  };

  constructor(public authService: AuthService, private apiService : ApiService, private router : Router) {
    this.checkFirstTimeLogin();
  }

  checkFirstTimeLogin() {
    this.apiService.post('users/check-first-time', {}).subscribe((isFirstTime) => {
      this.isLoading = false;
      if (isFirstTime) {
        console.log(isFirstTime);
        this.router.navigate(['dashboard', 'welcome']);
      } else {
        this.router.navigate(['dashboard', 'home']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
