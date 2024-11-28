import { Component } from '@angular/core';
import { MealsService } from '../../core/services/meals.service';
import { getGroupLabel } from '../../utils/date/get-group-label';

@Component({
  selector: 'app-meal-suggestion',
  templateUrl: './meal-suggestion.component.html',
  styleUrl: './meal-suggestion.component.scss'
})
export class MealSuggestionComponent {

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    this.mealsService.fetchMealsByUser();
  }

  getGroupedMeals() {
    return this.mealsService.getGroupedMeals();
  }

  getGroupLabel(key: string): string {
    return getGroupLabel(key);
  }
}
