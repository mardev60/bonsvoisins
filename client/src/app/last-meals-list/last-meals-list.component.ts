import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../types/types';

@Component({
  selector: 'app-last-meals-list',
  templateUrl: './last-meals-list.component.html',
})
export class LastMealsListComponent {
  @Input() meals: Meal[] = [];
}


