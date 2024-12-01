import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Meal } from '../../types/db-entities.type';
import { getDateRanges } from '../../utils/date/get-date-range';
import { isSameDay } from '../../utils/date/is-same-day';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  myMeals: Meal[] = [];
  groupedMeals: { [key: string]: Meal[] } = {};

  constructor(private apiService: ApiService) { }


  /**
   * Crée un nouveau repas via une requête à l'API.
   * @param meal - Le repas à créer.
   */
  createMeal(meal: Meal): Observable<Meal> {
    return this.apiService.post<Meal>('meals', meal);
  }

  /**
   * Récupère les repas regroupés sous forme d'un tableau clé-valeur.
   * @returns { key: string; value: Meal[] }[] - Tableau des repas regroupés avec leurs catégories (e.g., 'today', 'yesterday').
   */
  getGroupedMeals(): { key: string; value: Meal[] }[] {
    console.log('groupedMeals', this.groupedMeals);
    return Object.entries(this.groupedMeals)
    .filter(([key, value]) => value.length > 0)
      .map(([key, value]) => ({ key, value }));
  }

  /**
   * Regroupe les repas de `myMeals` en différentes catégories basées sur leurs dates.
   * Les catégories incluent : aujourd'hui, hier, cette semaine, ce mois, etc.
   */
  groupMealsByDate(): void {
    const { todayDate, yesterdayDate, startOfWeek, startOfMonth, startOfYear, endOfYear } = getDateRanges();
    
    this.groupedMeals = {
      today: this.myMeals.filter(
        (meal) => meal.createdat && isSameDay(meal.createdat, todayDate)
      ),
      yesterday: this.myMeals.filter(
        (meal) => meal.createdat && isSameDay(meal.createdat, yesterdayDate)
      ),
      this_week: this.myMeals.filter(
        (meal) =>
          meal.createdat &&
          new Date(meal.createdat) >= startOfWeek &&
          new Date(meal.createdat) < yesterdayDate
      ),
      this_month: this.myMeals.filter(
        (meal) =>
          meal.createdat &&
          new Date(meal.createdat) >= startOfMonth &&
          new Date(meal.createdat) < startOfWeek
      ),
      this_year: this.myMeals.filter(
        (meal) =>
          meal.createdat &&
          new Date(meal.createdat) >= startOfYear &&
          new Date(meal.createdat) <= startOfMonth
      ),
      after_this_year: this.myMeals.filter(
        (meal) =>
          meal.createdat &&
          new Date(meal.createdat) > endOfYear
      ),
    };
  }

  /**
   * Récupère les repas de l'utilisateur actuel via une requête à l'API
   * et les regroupe ensuite par date.
   */
  fetchMealsByUser(): void {
    this.apiService.get<Meal[]>('meals/my').subscribe({
      next: (data) => {
        this.myMeals = data;
        this.groupMealsByDate();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des repas:', error);
      },
    });
  }
}
