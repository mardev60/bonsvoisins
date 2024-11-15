import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Meal } from '../../types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  meals: Meal[] = [];
  myMeals: Meal[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchMeals();
    this.fetchMyMeals();
  }

  fetchMeals(): void {
    console.log('Fetching meals...');

    this.apiService.get<Meal[]>('meals').subscribe({
      next: (data) => {
        this.meals = data;
        console.log('Meals loaded:', this.meals);
      },
      error: (error) => {
        console.error('Error fetching meals:', error);
      },
    });
  }

  fetchMyMeals(): void {
    console.log('Fetching my meals...');

    this.apiService.get<Meal[]>('meals/my-meals').subscribe({
      next: (data) => {
        this.myMeals = data;
        console.log('My meals loaded:', this.myMeals);
      },
      error: (error) => {
        console.error('Error fetching my meals:', error);
      },
    });
  }
}
