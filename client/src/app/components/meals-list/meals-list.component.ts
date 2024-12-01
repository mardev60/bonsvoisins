import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from '../../types/db-entities.type';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss']
})
export class MealsListComponent {
  @Input() meals: Meal[] = [];
  @Input() title: string = 'Mes derniers repas';
  @Output() mealSelected = new EventEmitter<Meal>();

  selectMeal(meal: Meal) {
    this.mealSelected.emit(meal);
  }
}


