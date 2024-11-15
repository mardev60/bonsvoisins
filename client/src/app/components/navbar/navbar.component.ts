import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Output() logout = new EventEmitter<void>();

  constructor(private apiService : ApiService) {}

  logoutUser() {
    this.logout.emit();
  }

  async fetchUser() {
    const user = await this.apiService.get<any>('').subscribe(user => {console.log(user)});
  }
}
