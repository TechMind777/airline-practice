import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialMealsComponent } from './add-special-meals.component';

describe('AddSpecialMealsComponent', () => {
  let component: AddSpecialMealsComponent;
  let fixture: ComponentFixture<AddSpecialMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSpecialMealsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpecialMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
