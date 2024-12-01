import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from '../../types/db-entities.type';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
})
export class MealCardComponent {
  @Input() meal!: Meal;
  @Output() mealSelected = new EventEmitter<Meal>();

  selectMeal(meal: Meal) {
    this.mealSelected.emit(meal);
  }
}
