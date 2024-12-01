import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html'
})
export class ProfilComponent {
  @Input() userName = '';
  @Input() userImage = '';
  @Input() userPhone = '';
  @Input() totalMeals = 0;
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  profileForm!: FormGroup;
  isEditing = false;
  isLoading = false;

  constructor(private userService: UserService, private location: Location, private fb: FormBuilder) {}

  fields = [
    {
      name: 'lastName',
      label: 'Nom',
      type: 'text',
      validators: [Validators.minLength(3)],
      errorMessage: 'Veuillez entrer un nom valide',
    },
    {
      name: 'firstName',
      label: 'Prénom',
      type: 'text',
      validators: [Validators.minLength(3)],
      errorMessage: 'Veuillez entrer un prénom valide',
    },
    {
      name: 'phone',
      label: 'Numéro de téléphone',
      type: 'text',
      validators: [Validators.minLength(10)],
      errorMessage: 'Veuillez entrer un numéro de téléphone valide',
    },
    {
      name: 'photo',
      label: 'Photo de profil',
      type: 'text',
      errorMessage: 'Veuillez ajouter une photo du repas',
    },
  ];

  ngOnInit(): void {
    this.fetchUserData();
  }

  back(): void {
    this.location.back();
  }

  fetchUserData(): void {
    this.userService.getMe().subscribe({
      next: (user) => {
        this.userName = user.first_name + ' ' + user.last_name;
        this.userImage = user.avatar;
        this.userPhone = user.phone;
        this.totalMeals = user.meal.length;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données utilisateur :', err);
      },
    });
  }

  toggleEditForm(): void {
    this.isEditing = !this.isEditing;
  }

  onSubmit(formData: any): void {
    this.userService.updateUserInfos(formData).subscribe({
      next: (data) => {
        console.log('Données utilisateur mises à jour :', data);
        this.isEditing = false;
        this.fetchUserData();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour des données utilisateur :', err);
      },
    });
  }
}
