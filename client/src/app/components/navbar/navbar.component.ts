import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() logout = new EventEmitter<void>();

  constructor(private router: Router) {}

  logoutUser() {
    this.logout.emit();
  }

  navigateToHome() {
    this.router.navigate(['/accueil']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
}
