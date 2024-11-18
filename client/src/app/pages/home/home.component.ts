import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
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
    //this.fetchMealsByUser();
  }

  formatMealTime(dateStart: string | null, dateEnd: string | null): string {
    if (!dateStart || !dateEnd) {
      return 'Date non disponible';
    }
    
    const optionsDate: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
  
    const formattedDate = start.toLocaleDateString('fr-FR', optionsDate);
    const startTime = start.toLocaleTimeString('fr-FR', optionsTime);
    const endTime = end.toLocaleTimeString('fr-FR', optionsTime);
  
    return `À récupérer le ${formattedDate} entre ${startTime} et ${endTime}`;
  }
  

  fetchMeals(): void {
    this.apiService.get<Meal[]>('meals/active').subscribe({
      next: (data) => {
        this.meals = data;
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

  createMeal(): void {
    const now = new Date();

    // Utilisation de la date actuelle pour que le repas soit actif
    const date_start = new Date(now.getTime() - 60 * 60 * 1000); // Retrait d'une heure
    const date_end = new Date(date_start.getTime() + 3 * 60 * 60 * 1000); // Ajout de 2 heures

    const randomCode = Math.random().toString(36).substring(2, 8);

    const mealData = {
      name: 'Repas test ' + randomCode,
      date_start,
      date_end,
      description: 'Description du repas test',
    };

    console.log('Données envoyées pour créer un repas :', mealData);

    this.apiService.post<Meal>('meals', mealData).subscribe({
      next: (data) => {
        console.log('Repas créé avec succès :', data);
        this.fetchMeals();
      },
      error: (error) => {
        console.error('Erreur lors de la création du repas :', error);
      },
    });
  }

  updateMeal(id: number): void {
    const randomCode = Math.random().toString(36).substring(2, 8);

    const mealData = {
      name: 'Repas test 2 (modifié) ' + randomCode,
      description: 'Description du repas test (modifiée)',
    };

    this.apiService.put<Meal>(`meals/${id}`, mealData).subscribe({
      next: (data) => {
        console.log('Repas mis à jour avec succès :', data);
        this.fetchMeals();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du repas :', error);
      },
    });
  }

  deleteMeal(id: number): void {
    this.apiService.delete(`meals/${id}`).subscribe({
      next: () => {
        console.log('Repas supprimé avec succès');
        this.fetchMeals();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du repas :', error);
      },
    });
  }

  onLocationChange(location: string): void {
    console.log('Nouvelle localisation sélectionnée :', location);
  }
}
