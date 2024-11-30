import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { dateRangeValidator } from '../../utils/validators/date-range-validator';
import { MealsService } from '../../core/services/meals.service';
import { Meal } from '../../types/db-entities.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrl: './create-meal.component.scss',
})
export class CreateMealComponent {
  isLoading = false;

  constructor(private mealsService: MealsService, private router: Router) {}

  fields = [
    {
      name: 'name',
      label: 'Nom du repas',
      type: 'text',
      validators: [Validators.required, Validators.minLength(3)],
      errorMessage: 'Veuillez entrer un nom de repas valide',
    },

    {
      name: 'description',
      label: 'Description courte',
      type: 'text',
      validators: [Validators.required, Validators.minLength(3)],
      errorMessage: 'Veuillez entrer une description valide',
    },

    {
      name: 'collect_city',
      label: 'Ville de collecte',
      type: 'text',
      validators: [Validators.required, Validators.minLength(3)],
      errorMessage: 'Veuillez entrer une ville de collecte valide',
    },

    {
      name: 'collect_address',
      label: 'Adresse de collecte',
      type: 'text',
      validators: [Validators.required, Validators.minLength(3)],
      errorMessage: 'Veuillez entrer une adresse de collecte valide',
    },
    {
      name: 'date_start',
      label: 'Début de la collecte',
      type: 'datetime-local',
      validators: [Validators.required],
      errorMessage: 'Veuillez entrer une date de début valide',
    },
    {
      name: 'date_end',
      label: 'Fin de la collecte',
      type: 'datetime-local',
      validators: [Validators.required],
      errorMessage: 'Veuillez entrer une date de fin valide',
    },
    {
      name: 'photo_url',
      label: 'Photo',
      type: 'text',
      validators: [Validators.required],
      errorMessage: 'Veuillez ajouter une photo du repas',
    },
  ];

  groupValidators = dateRangeValidator();

  goBack(): void {
    this.router.navigate(['/dashboard/proposer']);
  }

  onSubmit(formData: Meal) {
    if (formData.name) {
      this.isLoading = true;
      formData.date_start = new Date(formData.date_start).toISOString();
      formData.date_end = new Date(formData.date_end).toISOString();
      this.mealsService.createMeal(formData).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard/proposer']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erreur lors de la création du repas:', error);
        },
      });
    }
  }
}
