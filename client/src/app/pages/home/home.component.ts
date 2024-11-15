import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Meal } from '../../types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  meals: Meal[] = [];
  userMeals: Meal[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchMeals();
    this.fetchMealsByUser();
  }

  fetchMeals(): void {
    console.log('Récupération des repas "actifs" ...');

    this.apiService.get<Meal[]>('meals/active').subscribe({
      next: (data) => {
        this.meals = data;
        console.log('Repas actifs:', this.meals);
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des repas actifs:',
          error
        );
      },
    });
  }

  fetchMealsByUser(): void {
    console.log(
      "Récupération des repas de l'utilisateur avec l'id 2 (en dur pour tester)..."
    );

    this.apiService.get<Meal[]>('meals/user/2').subscribe({
      next: (data) => {
        this.userMeals = data;
        console.log("Repas de l'utilisateur:", this.userMeals);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des repas:', error);
      },
    });
  }
}
