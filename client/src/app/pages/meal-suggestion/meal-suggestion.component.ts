import { Component } from '@angular/core';
import { Meal } from '../../types/db-entities.type';
import { ApiService } from '../../core/services/api.service';
import { formatDateTime } from '../../utils/format-date-time';
import { getDateRanges } from '../../utils/get-date-range';

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


  groupMealsByDate(): void {
    const { todayDate, yesterdayDate, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } = getDateRanges();

    console.log(startOfWeek, " startOfWeek");
    
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

  isSameDay(date1: string | Date, date2: Date): boolean {
    const d1 = new Date(date1);
    return (
      d1.getFullYear() === date2.getFullYear() &&
      d1.getMonth() === date2.getMonth() &&
      d1.getDate() === date2.getDate()
    );
  }
}
