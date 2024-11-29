import { Component, Input } from '@angular/core';
import { Meal } from '../types/db-entities.type';

@Component({
  selector: 'app-meal-mobile-card',
  templateUrl: './meal-mobile-card.component.html',
})
export class MealMobileCardComponent {
  @Input() meal!: Meal;
}
