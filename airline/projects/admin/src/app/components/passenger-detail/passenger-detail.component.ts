import { Component, Inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  standalone:true,
  selector: 'app-passenger-detail',
  templateUrl: './passenger-detail.component.html',
  styleUrl: './passenger-detail.component.scss',
  imports:[
    CommonModule,
    FormsModule,ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,

    MatInputModule,
    MatDatepickerModule,

    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule,
    
  ],
  providers:[
    provideNativeDateAdapter()
  ]
})
export class PassengerDetailComponent {

  passengerData: any;

  constructor(
    // private fb: FormBuilder,
    public gbl: GlobalService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) private incoming_data: any,
    private dialogRef: MatDialogRef<PassengerDetailComponent>

  ) {

    this.passengerData = JSON.parse(JSON.stringify(incoming_data));


  }

  updateSeatDetail() {
    let obj: any = {
      id: this.passengerData.id,
      name: this.passengerData.name,
      email: this.passengerData.email,
      requires_wheelchair: this.passengerData.requires_wheelchair,
      has_infant: this.passengerData.has_infant,
      passport: this.passengerData.passport,
      address: this.passengerData.address,
      date_of_birth: this.passengerData.date_of_birth,
      // passengers_id: this.bookSeat.id,
      // seat_id: this.bookSeat.seat_id,
      // requires_wheelchair: Number(this.bookSeat.requires_wheelchair) ? Number(this.bookSeat.requires_wheelchair) : 0,
      // has_infant: Number(this.bookSeat.has_infant) ? Number(this.bookSeat.has_infant) : 0,
      // ancillary_services: Number(this.bookSeat.ancillary_services) ? Number(this.bookSeat.ancillary_services) : 0,
      // meal_preferences: Number(this.bookSeat.meal_preferences) ? Number(this.bookSeat.meal_preferences) : 0,
      // shop_requests: Number(this.bookSeat.shop_requests) ? Number(this.bookSeat.shop_requests) : 0,
    }

    this.gbl.loaderStart();
    this.gbl.updatePassengers(obj).subscribe(data => {
      this.gbl.loaderStop();

      if (data.result) {
        // this.closeDialog(data);
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
}
