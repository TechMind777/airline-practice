import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAncillaryServicesComponent } from './add-ancillary-services.component';

describe('AddAncillaryServicesComponent', () => {
  let component: AddAncillaryServicesComponent;
  let fixture: ComponentFixture<AddAncillaryServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAncillaryServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAncillaryServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
