import { Component, Input } from '@angular/core';
import { Meal } from '../types/db-entities.type';
import { formatDateTime } from '../utils/date/format-date-time';

@Component({
  selector: 'app-meal-mobile-card',
  templateUrl: './meal-mobile-card.component.html',
})
export class MealMobileCardComponent {
  @Input() meal!: Meal;

  formatMealDateTime = formatDateTime;
}
