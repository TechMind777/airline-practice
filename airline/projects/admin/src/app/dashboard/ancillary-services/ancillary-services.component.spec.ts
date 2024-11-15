import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AncillaryServicesComponent } from './ancillary-services.component';

describe('AncillaryServicesComponent', () => {
  let component: AncillaryServicesComponent;
  let fixture: ComponentFixture<AncillaryServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AncillaryServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AncillaryServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
