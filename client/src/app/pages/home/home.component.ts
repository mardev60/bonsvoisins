import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  meals: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchMeals();
  }

  fetchMeals(): void {
    console.log('Fetching meals...');

    this.apiService.get<any[]>('meals').subscribe({
      next: (data) => {
        this.meals = data;
        console.log('Meals loaded:', this.meals);
      },
      error: (error) => {
        console.error('Error fetching meals:', error);
      },
    });
  }
}
