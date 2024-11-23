import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../../types/db-entities.type';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss']
})
export class MealsListComponent {
  @Input() meals: Meal[] = [];
  @Input() title: string = 'Mes derniers repas';
}


