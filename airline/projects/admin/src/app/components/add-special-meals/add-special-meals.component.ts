import { Component, Inject, Input, input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';


interface FormErrors {
  [key: string]: string | Object;
}

@Component({
  standalone: true,
  selector: 'app-add-special-meals',
  templateUrl: './add-special-meals.component.html',
  styleUrl: './add-special-meals.component.scss',
  imports: [
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule,
    MatDatepickerModule,
    MatButtonModule, MatGridListModule, MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,


    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule],
  providers: [

    // { provide: MAT_DIALOG_DATA, useValue: {} },
    // { provide: MatDialogRef, useValue: {} }
  ]
})
// @Component({
// })
export class AddSpecialMealsComponent {

  // @Input() 
  specialMealsData: any;
  frmSpecialMeals: any;

  constructor(
    private fb: FormBuilder,
    public gbl: GlobalService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) private incoming_data: any,
    private dialogRef: MatDialogRef<AddSpecialMealsComponent>

  ) {
    console.log("this.specialMealsData constructor", this.incoming_data)

    this.specialMealsData = JSON.parse(JSON.stringify(incoming_data));
    console.log("this.specialMealsData constructor", this.specialMealsData)


    // this.bindFrmLogin();
  }

  ngOnInit(): void {
    this.bindFrmSpecialMeals();


  }
  // ngOnChanges(changes: SimpleChanges): void {

  //   console.log("specialMealsData-", this.specialMealsData)

  //   if (changes['specialMealsData'] && this.specialMealsData) {
  //     this.frmSpecialMeals.patchValue(this.specialMealsData);
  //   }
  // }

  bindFrmSpecialMeals() {
    this.frmSpecialMeals = this.fb.group({
      meal_type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });

    console.log("this.specialMealsData", this.specialMealsData)
    if (this.specialMealsData) {
      this.frmSpecialMeals.patchValue(this.specialMealsData);
    }
    this.frmSpecialMeals.valueChanges.subscribe((data: any) => {
      this.logValidationErrorSpecialMeals(this.frmSpecialMeals);
    });
  }
  formErrorsSpecialMeals: FormErrors = {
    meal_type: '',
    description: '',
    price: ''
  };
  errorMessagesSpecialMeals: FormErrors = {
    meal_type: { 'required': 'Enter meal_type.', },
    description: { 'required': 'Enter description.' },
    price: { 'required': 'Enter price.' }
  }
  logValidationErrorSpecialMeals(group: FormGroup = this.frmSpecialMeals): void {
    Object.keys(group.controls).forEach((key: string) => {
      // group.controls.
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrorSpecialMeals(abstractControl);
      } else {
        this.formErrorsSpecialMeals[key] = '';
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {
          const messages: any = this.errorMessagesSpecialMeals[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrorsSpecialMeals[key] += messages[errorKey] + ' ';
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

  AddUpdate(val: any) {

    if (this.specialMealsData) {
      this.updateSpecialMeals(val)
    } else {
      this.addSpecialMeals(val)

    }
  }

  addSpecialMeals(values: any) {
    let obj: any = {}

    this.gbl.loaderStart();
    this.gbl.addMealPreferences(values).subscribe((data: any) => {
      this.gbl.loaderStop();

      if (data.result) {
        this.frmSpecialMeals.reset();
        this.closeDialog({ ...data, action: 'add' })

        this.gbl.tostSuccess(data.message);
      } else {
        this.gbl.tostError(data.message);
      }

    },
      (error) => {
        this.gbl.tostError(error.message);
        this.gbl.loaderStop();
      })
  }
  updateSpecialMeals(values: any) {
    let obj: any = { ...values, id: this.specialMealsData.id }

    this.gbl.loaderStart();
    this.gbl.updateMealPreferences(obj).subscribe((data: any) => {
      this.gbl.loaderStop();
      if (data.result) {
        this.frmSpecialMeals.reset();
        this.closeDialog({ ...data, action: 'update' })
        this.gbl.tostSuccess(data.message);
      } else {
        this.gbl.tostError(data.message);
      }

    },
      (error) => {
        this.gbl.tostError(error.message);
        this.gbl.loaderStop();
      })
  }

  closeDialog(objectSend: any): void {
    console.log("closeDialog")
    this.dialogRef.close(objectSend);
  }
}
