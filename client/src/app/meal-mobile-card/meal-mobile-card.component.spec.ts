import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealMobileCardComponent } from './meal-mobile-card.component';

describe('MealMobileCardComponent', () => {
  let component: MealMobileCardComponent;
  let fixture: ComponentFixture<MealMobileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealMobileCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealMobileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
