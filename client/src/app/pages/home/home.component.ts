import { Component, OnInit } from '@angular/core';
import { Meal } from '../../types/db-entities.type';
import { HomeService } from '../../core/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  meals: Meal[] = [];
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.fetchMeals().subscribe({
      next: (data) => {
        this.meals = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des repas :', error);
      },
    });
  }

  onLocationChange(location: string): void {
    console.log('Nouvelle localisation sélectionnée :', location);
  }
}
