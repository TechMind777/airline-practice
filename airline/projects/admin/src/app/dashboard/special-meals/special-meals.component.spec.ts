import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialMealsComponent } from './special-meals.component';

describe('SpecialMealsComponent', () => {
  let component: SpecialMealsComponent;
  let fixture: ComponentFixture<SpecialMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialMealsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
