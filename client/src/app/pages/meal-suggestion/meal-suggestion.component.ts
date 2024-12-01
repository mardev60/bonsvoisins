import { Component } from '@angular/core';
import { MealsService } from '../../core/services/meals.service';
import { getGroupLabel } from '../../utils/date/get-group-label';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setNavigationData } from '../../store/navigation.reducer';

@Component({
  selector: 'app-meal-suggestion',
  templateUrl: './meal-suggestion.component.html',
  styleUrl: './meal-suggestion.component.scss'
})
export class MealSuggestionComponent {

  constructor(private mealsService: MealsService, private router : Router, private store: Store) {}

  ngOnInit(): void {
    this.mealsService.fetchMealsByUser();
  }

  getGroupedMeals() {
    return this.mealsService.getGroupedMeals();
  }

  getGroupLabel(key: string): string {
    return getGroupLabel(key);
  }

  selectMeal(meal: any) {
    let infoPage = {...meal, from: 'suggestion'};
    this.store.dispatch(setNavigationData({data: infoPage}));
    this.router.navigate(['/dashboard/info']);
    console.log('Meal selected', meal);
  }
}