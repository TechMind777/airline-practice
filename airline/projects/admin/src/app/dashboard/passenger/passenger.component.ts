// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../services/global.service';


import { ChangeDetectionStrategy, Component, Inject, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { PassengerDetailComponent } from '../../components/passenger-detail/passenger-detail.component';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrl: './passenger.component.scss'
})
export class PassengerComponent {
  passengersData: any = [];

  fillter: any = {
    flight_id: '',
    name: '',
    requires_wheelchair: '',
    has_infant: '',
    is_checked_in: '-1',
    page: 1,
    limit: 10,

    passport_mis: 0,
    address_mis: 0,
    date_of_birth_mis: 0,
  }

  displayedColumns: string[] = ['name', 'requires_wheelchair', 'has_infant', 'seat_number', 'seat_id'];
  flights: any = [];

  constructor(private gbl: GlobalService) {
    this.getPassengers()
    this.getFlights()
  }
  getFlights() {


    this.gbl.getFlights({}).subscribe((data: any) => {
      console.log("data-->", data.data)
      this.flights = (data.data)
    })
  }

  getPassengers() {
    let obj = {

      flight_id: this.fillter.flight_id,
      name: this.fillter.name,
      requires_wheelchair: this.fillter.requires_wheelchair ? 1 : 0,
      has_infant: this.fillter.has_infant ? 1 : 0,
      is_checked_in: this.fillter.is_checked_in,
      page: this.fillter.page,
      limit: this.fillter.limit,

      passport_mis: this.fillter.passport_mis? 1:0,
      address_mis: this.fillter.address_mis? 1:0,
      date_of_birth_mis: this.fillter.date_of_birth_mis? 1:0,

    }

    this.gbl.getPassengers(obj).subscribe((data: any) => {
      this.passengersData = data.data
    },
      (error) => {
        this.gbl.tostError(error.message);
        this.gbl.loaderStop();

      })
  }

  change(page: number) {
    this.fillter.page = this.fillter.page + page;
    this.getPassengers()
  }

  check(event: any, seat_id: any) {
    this.gbl.loaderStart();

    this.gbl.checkInOut({ seat_id: seat_id, is_checked_in: event ? 1 : 0 })
      .subscribe((data: any) => {
        this.gbl.loaderStop();
        if (data.result) {
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

  
  readonly dialogRef = inject(MatDialogRef<PassengerDetailComponent>);
  readonly dialog = inject(MatDialog);  

  openDialog(data: any, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(PassengerDetailComponent, {
      data: data,
      width: '100vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Received data:', result);
      // Handle the received data here
    });
  }
}


interface Flight {
  email?: string;
  has_infant?: number;
  id?: number;
  is_checked_in?: number;
  name?: string;
  requires_wheelchair?: number;
  seat_id?: number;
  seat_number?: number;

  flight_number: string;
  flight_name: string;
  departure_time: string;
  arrival_time: string;
  departure_airport: string;
  arrival_airport: string;
}

