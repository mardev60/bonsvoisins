import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealSuggestionComponent } from './meal-suggestion.component';

describe('MealSuggestionComponent', () => {
  let component: MealSuggestionComponent;
  let fixture: ComponentFixture<MealSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealSuggestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
