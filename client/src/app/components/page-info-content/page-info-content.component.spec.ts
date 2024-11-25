import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInfoContentComponent } from './page-info-content.component';

describe('PageInfoContentComponent', () => {
  let component: PageInfoContentComponent;
  let fixture: ComponentFixture<PageInfoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageInfoContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageInfoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
