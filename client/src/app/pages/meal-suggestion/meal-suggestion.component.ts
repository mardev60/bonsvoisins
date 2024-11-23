import { Component } from '@angular/core';
import { Meal } from '../../types/types';
import { ApiService } from '../../core/services/api.service';
import { formatDateTime } from '../../utils/format-date-time';

@Component({
  selector: 'app-meal-suggestion',
  templateUrl: './meal-suggestion.component.html',
  styleUrl: './meal-suggestion.component.scss'
})
export class MealSuggestionComponent {
  myMeals: Meal[] = [];
  groupedMeals: { [key: string]: Meal[] } = {};
  formatMealDateTime = formatDateTime;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchMealsByUser();
  }

  getGroupedMeals(): { key: string; value: Meal[] }[] {
  return Object.entries(this.groupedMeals)
  .filter(([key, value]) => value.length > 0)
    .map(([key, value]) => ({ key, value }));
}

  getGroupLabel(key: string): string {
    const labels: { [key: string]: string } = {
      today: "Aujourd'hui",
      yesterday: "Hier",
      this_week: "Cette semaine",
      this_month: "Ce mois-ci",
      this_year: "Cette année",
      after_this_year: "Futurs plats",
    };
    return labels[key] || 'Autres';
  }

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

  groupMealsByDate(): void {
    const todayDate = new Date();
  
    const yesterdayDate = new Date();
    yesterdayDate.setDate(todayDate.getDate() - 1);
  
    // Start of the Week (sans inclure aujourd'hui ni hier)
    const startOfWeek = new Date(todayDate);
    startOfWeek.setDate(todayDate.getDate() - todayDate.getDay()); // Lundi de la semaine
  
    const endOfWeek = new Date(todayDate);
    endOfWeek.setDate(todayDate.getDate() + (6 - todayDate.getDay()));  // Dimanche de la semaine
  
    // Month - Premier jour du mois et dernier jour du mois
    const startOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1); // 1er jour du mois
    const endOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0); // Dernier jour du mois
  
    // Year - Premier jour de l'année et dernier jour de l'année
    const startOfYear = new Date(todayDate.getFullYear(), 0, 1); // 1er jour de l'année
    const endOfYear = new Date(todayDate.getFullYear(), 11, 31); // 31 décembre de l'année
  
    this.groupedMeals = {
      today: this.myMeals.filter(
        (meal) => meal.createdat && this.isSameDay(meal.createdat, todayDate)
      ),
      yesterday: this.myMeals.filter(
        (meal) => meal.createdat && this.isSameDay(meal.createdat, yesterdayDate)
      ),
      this_week: this.myMeals.filter(
        (meal) =>
          meal.createdat &&
          new Date(meal.createdat) >= startOfWeek &&  // Repas après le début de la semaine
          new Date(meal.createdat) <= endOfWeek &&    // Repas avant la fin de la semaine
          !this.isSameDay(meal.createdat, todayDate) && // Exclure aujourd'hui
          !this.isSameDay(meal.createdat, yesterdayDate) // Exclure hier
      ),
      this_month: this.myMeals.filter(
        (meal) =>
          meal.createdat &&
          new Date(meal.createdat) >= startOfMonth &&
          new Date(meal.createdat) <= startOfWeek
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
  
    console.log(this.groupedMeals);
  }
  

  isSameDay(date1: string | Date, date2: Date): boolean {
    const d1 = new Date(date1);
    return (
      d1.getFullYear() === date2.getFullYear() &&
      d1.getMonth() === date2.getMonth() &&
      d1.getDate() === date2.getDate()
    );
  }
}
