import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { set} from '../store/auth.actions';

interface FormErrors {
  [key: string]: string | Object;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  subscriber_mentor: any = 0;
  frmLogin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public gbls: GlobalService,
    private route: Router,
    // private authService: AuthService
    private store: Store
  ) { }

  ngOnInit() {

    this.bindFrmLogin();
  }


  signOut(): void {
    // this.authService.signOut();
  }
  bindFrmLogin() {
    this.frmLogin = this.fb.group({
      email: ['admin@ltimindtree.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]]
    });
    this.frmLogin.valueChanges.subscribe((data: any) => {
      this.logValidationErrorLogin(this.frmLogin);
    });
  }
  formErrorsLogin: FormErrors = {
    email: '',
    password: ''
  };
  errorMessagesLogin: FormErrors = {
    email: { 'required': 'Enter Email.', email: "Enter valid email" },
    password: { 'required': 'Enter Password.' }
  }
  logValidationErrorLogin(group: FormGroup = this.frmLogin): void {
    Object.keys(group.controls).forEach((key: string) => {
      // group.controls.
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrorLogin(abstractControl);
      } else {
        this.formErrorsLogin[key] = '';
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {
          const messages: any = this.errorMessagesLogin[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrorsLogin[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }
  markFormTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      if (control.controls) { // control is a FormGroup
        this.markFormTouched(control);
      } else { // control is a FormControl
        control.markAsTouched();
      }
    });
  }

  loginsubscribe_mentor(p: Object) {
    this.login(p);
  }
  login(params: Object) {
    try {

      if (this.frmLogin.invalid) {
        this.markFormTouched(this.frmLogin);
        this.logValidationErrorLogin();

        return this.gbls.tostError("Invalid")
      }
      this.gbls.loaderStart()
      this.gbls.login(params).subscribe((data: any) => {
      this.gbls.loaderStop()

        var result: any = data;
        if (result.result == true) {
          // this.gbls.changetoken(result.cdata.token);
          // localStorage.setItem('sscuser1', JSON.stringify(result));
          localStorage.setItem('logedUser', JSON.stringify(result));


          this.gbls.logedUserSignal.set(result);
          this.store.dispatch(set(result));


          this.route.navigate(['/dashboard']);
        } else {
          this.gbls.tostError(data.message);
        }
      }, error => { 
      this.gbls.loaderStop()

        this.gbls.tostError(error?.error?.message || "Not Responding");
      });
    } catch (e) {
      this.gbls.loaderStop()
      this.gbls.tostError("Not Responding catch");
    }
  }

  redirect(url: string) {
    this.gbls.redirect(url);
  }
}