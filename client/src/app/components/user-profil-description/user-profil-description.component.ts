import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-description',
  templateUrl: './user-profil-description.component.html',
})
export class UserProfilDescriptionComponent {

  @Input() totalMeals: number = 0;
  @Input() userPhone: string = '';
  isEditing: boolean = false;

  constructor() {}

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }
}
