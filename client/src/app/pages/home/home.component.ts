import { Component, OnInit } from '@angular/core';
import { Meal } from '../../types/db-entities.type';
import { HomeService } from '../../core/services/home.service';
import { CommandsService } from '../../core/services/commands.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  meals: Meal[] = [];
  selectedMeal!: any;
  isLoading = false;

  constructor(private homeService: HomeService, private commandService: CommandsService, private router : Router) {}

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

  onMealSelected(meal: Meal): void {
    this.selectedMeal = meal;
  }

  closeModal(): void {
    this.selectedMeal = null; 
  }

  confirmMealSelection(): void {
    if(this.selectedMeal.id) {
    this.isLoading = true;
    this.commandService.createNewCommand(this.selectedMeal.id).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard/collecter']);
        this.closeModal();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erreur lors de la création de la commande :', error);
      },
    })
    }
  }
}

