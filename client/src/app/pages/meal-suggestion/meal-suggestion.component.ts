import { Component } from '@angular/core';
import { MealsService } from '../../core/services/meals.service';
import { getGroupLabel } from '../../utils/date/get-group-label';
import { GroupedMeals } from '../../types/db-entities.type';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setNavigationData } from '../../store/navigation.reducer';

@Component({
  selector: 'app-meal-suggestion',
  templateUrl: './meal-suggestion.component.html',
  styleUrl: './meal-suggestion.component.scss'
})
export class MealSuggestionComponent {
  mealsToSuggest: any[] = [];
  mealsToSuggestComplete: any[] = [];
  groupedMeals: GroupedMeals = {};
  isLoading = false;

  constructor(private mealsService: MealsService, private router : Router, private store: Store) {}

  ngOnInit(): void {
    this.fetchMeals();
  }

  private fetchMeals(): void {
    this.isLoading = true;
    this.mealsService.fetchMealsByUser().subscribe((res) => {
      this.isLoading = false;
      this.mealsToSuggestComplete = res;
      this.mealsToSuggest = this.mealsToSuggestComplete.map(this.mapMealData.bind(this));
      this.groupCommandsByDate();
    }
  )};

  private mapMealData(meal: any): any {
    return {
      id: meal.id,
      id_author: meal.id_author,
      collected_address: meal.collected_address,
      collect_city: meal.collect_city,
      collect_code: meal.collect_code,
      createdat: new Date(meal.createdat),
      date_end: new Date(meal.date_end),
      date_start: new Date(meal.date_start),
      description: meal.description,
      is_active: meal.is_active,
      name: meal.name,
      photo_url: meal.photo_url,
      updatedat: new Date(meal.updatedat),
      user: `${meal.user.last_name} ${meal.user.first_name}`,
      user_avatar: meal.user.avatar,
    };
  }

  private groupCommandsByDate(): void {
    const today = new Date();

    this.groupedMeals = this.mealsToSuggest.reduce(
      (groups: any, meal) => {
        console.log(meal);
        
        const key = this.getDateGroupKey(meal.createdat, today);

        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(meal);
        return groups;
      },
      {}
    );
  }

  private getDateGroupKey(mealDate: Date, today: Date): string {
    const normalizedCommandDate = new Date(mealDate.getFullYear(), mealDate.getMonth(), mealDate.getDate());
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const daysDifference = Math.floor(
      (normalizedToday.getTime() - normalizedCommandDate.getTime()) / (1000 * 3600 * 24)
    );
  
    if (daysDifference === 0) {
      return "Aujourd'hui";
    } else if (daysDifference === 1) {
      return 'Hier';
    } else {
      return `Il y a ${daysDifference} jours`;
    }
  }  
  
  getGroupedMealsKeys(): string[] {
    return Object.keys(this.groupedMeals);
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