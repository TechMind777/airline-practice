import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { GlobalService } from '../services/global.service';
import { from } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login Component', () => {
    expect(component).toBeTruthy();
  });



  it('Login API', () => {
    let fixture = TestBed.createComponent(LoginComponent);
    let app = fixture.debugElement.componentInstance;

    let globalService = fixture.debugElement.injector.get(GlobalService);
    let spy = spyOn(globalService, 'login')
      .and.returnValue(from(Promise.resolve(new HttpResponse({ body: { result: true, message: "success" } }))));

    fixture.detectChanges();
    // console.log("app.data", app.data)
    expect(app.data.result).toBe(true);
    // expect(app.data.result).toBe(true);


  })
});
