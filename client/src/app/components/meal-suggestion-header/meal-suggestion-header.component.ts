import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-suggestion-header',
  templateUrl: './meal-suggestion-header.component.html',
})
export class MealSuggestionHeaderComponent {
  constructor(private router : Router) {}

  goToCreateMeal() {
    this.router.navigate(['/dashboard/nouveau-repas']);
  }

}
