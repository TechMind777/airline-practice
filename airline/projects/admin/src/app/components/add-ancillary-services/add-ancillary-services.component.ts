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
  selector: 'app-add-ancillary-services',
  templateUrl: './add-ancillary-services.component.html',
  styleUrl: './add-ancillary-services.component.scss',
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
export class AddAncillaryServicesComponent {
  // @Input() 
  ancillaryData: any;
  frmAncillary: any;

  constructor(
    private fb: FormBuilder,
    public gbl: GlobalService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) private incoming_data: any,
    private dialogRef: MatDialogRef<AddAncillaryServicesComponent>

  ) {
    console.log("this.ancillaryData constructor", this.incoming_data)

    this.ancillaryData = JSON.parse(JSON.stringify(incoming_data));
    console.log("this.ancillaryData constructor", this.ancillaryData)


    // this.bindFrmLogin();
  }

  ngOnInit(): void {
    this.bindFrmLogin();


  }
  // ngOnChanges(changes: SimpleChanges): void {

  //   console.log("ancillaryData-", this.ancillaryData)

  //   if (changes['ancillaryData'] && this.ancillaryData) {
  //     this.frmAncillary.patchValue(this.ancillaryData);
  //   }
  // }

  bindFrmLogin() {
    this.frmAncillary = this.fb.group({
      service_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });

    console.log("this.ancillaryData", this.ancillaryData)
    if (this.ancillaryData) {
      this.frmAncillary.patchValue(this.ancillaryData);
    }
    this.frmAncillary.valueChanges.subscribe((data: any) => {
      this.logValidationErrorAncillary(this.frmAncillary);
    });
  }
  formErrorsAncillary: FormErrors = {
    service_name: '',
    description: '',
    price: ''
  };
  errorMessagesAncillary: FormErrors = {
    service_name: { 'required': 'Enter service_name.', },
    description: { 'required': 'Enter description.' },
    price: { 'required': 'Enter price.' }
  }
  logValidationErrorAncillary(group: FormGroup = this.frmAncillary): void {
    Object.keys(group.controls).forEach((key: string) => {
      // group.controls.
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrorAncillary(abstractControl);
      } else {
        this.formErrorsAncillary[key] = '';
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {
          const messages: any = this.errorMessagesAncillary[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrorsAncillary[key] += messages[errorKey] + ' ';
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

    if (this.ancillaryData) {
      this.updateAncillaryServices(val)
    } else {
      this.addAncillaryServices(val)

    }
  }

  addAncillaryServices(values: any) {
    let obj: any = {}

    this.gbl.loaderStart();
    this.gbl.addAncillaryServices(values).subscribe((data: any) => {
      this.gbl.loaderStop();

      if (data.result) {
        this.frmAncillary.reset();
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
  updateAncillaryServices(values: any) {
    let obj: any = { ...values, id: this.ancillaryData.id }

    this.gbl.loaderStart();
    this.gbl.updateAncillaryServices(obj).subscribe((data: any) => {
      this.gbl.loaderStop();
      if (data.result) {
        this.frmAncillary.reset();
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
    this.dialogRef.close(objectSend);
  }
}
