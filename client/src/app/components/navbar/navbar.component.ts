import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Output() logout = new EventEmitter<void>();

  constructor(private router: Router) {}

  logoutUser() {
    this.logout.emit();
  }

  isActive(link: string): boolean {
    return this.router.url === link;
  }
}
