import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposerUnPlatComponent } from './proposer-un-plat.component';

describe('ProposerUnPlatComponent', () => {
  let component: ProposerUnPlatComponent;
  let fixture: ComponentFixture<ProposerUnPlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProposerUnPlatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProposerUnPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
