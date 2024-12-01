import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-meal-group',
  templateUrl: './meal-group.component.html',
})
export class MealGroupComponent {

  @Input() groupName!: string;
  @Input() meals!: any[];
  @Output() mealSelected: EventEmitter<any> = new EventEmitter<any>();

  onCommandClick(meal: any): void {
    this.mealSelected.emit(meal);
  }
}
