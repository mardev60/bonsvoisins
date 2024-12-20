import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Meal } from '../../types/db-entities.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  meals: Meal[] = [];
  userMeals: Meal[] = [];

  constructor(private apiService: ApiService) { }

  /**
   * Récupère les repas actifs depuis l'API.
   * Renvoie un Observable contenant un tableau de repas.
   */
  fetchMeals(): Observable<any> {
    return this.apiService.get('meals/active');
  }

  /**
   * Récupère les repas associés à un utilisateur spécifique (ID 2 dans cet exemple).
   * Met à jour la propriété `userMeals` avec les données reçues.
   */
  fetchMealsByUser(): void {
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

  /**
   * Crée un nouveau repas avec des données générées dynamiquement.
   * Utilise la date actuelle pour définir une plage horaire active pour le repas.
   * Appelle ensuite `fetchMeals` pour rafraîchir la liste des repas.
   */
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

  /**
   * Met à jour un repas existant avec des données modifiées.
   * Utilise un ID pour identifier le repas à modifier.
   * Appelle ensuite `fetchMeals` pour rafraîchir la liste des repas.
   */
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
  
 /**
   * Supprime un repas existant en utilisant son ID.
   * Appelle ensuite `fetchMeals` pour rafraîchir la liste des repas.
   */
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
}
