import { Component, Input } from '@angular/core';
import { Meal } from '../types/types';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
})
export class MealCardComponent {
  @Input() meal!: Meal;
}
