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
    name: '',
    requires_wheelchair: '',
    has_infant: '',
    is_checked_in: '-1',
    page: 1,
    limit: 10
  }

  displayedColumns: string[] = ['name', 'requires_wheelchair', 'has_infant', 'seat_number', 'seat_id'];

  constructor(private gbl: GlobalService) {
    this.getPassengers()
  }

  getPassengers() {
    let obj = {

      name: this.fillter.name,
      requires_wheelchair: this.fillter.requires_wheelchair ? 1 : 0,
      has_infant: this.fillter.has_infant ? 1 : 0,
      is_checked_in: this.fillter.is_checked_in,
      page: this.fillter.page,
      limit: this.fillter.limit,

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

  readonly dialog = inject(MatDialog);

  openDialog(data: any, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      data: data,  
      width: '90vw',  // Adjust the width as needed (e.g., 80% of the viewport width)
      // height: '90vh', // Adjust the height as needed (e.g., 80% of the viewport height)
  
      enterAnimationDuration,
      exitAnimationDuration,
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


@Component({
  selector: 'passenger-detail',
  templateUrl: 'passenger-detail.component.html',
  styleUrl: 'passenger-detail.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,

    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,

    //  MatFormFieldModule,MatButtonModule, , MatDialogClose, MatDialogTitle, MatDialogContent
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {

  // readonly bookSeat:Flight = inject<Flight>(MAT_DIALOG_DATA);
  // readonly animal = model(this.bookSeat.animal);

  bookSeat: any = { name: '' };

  ancillaryServices: any = [];
  mealPreferences: any = [];
  bookedSeatDetail: any;
  bookedSeatList: any = [];


  constructor(@Inject(MAT_DIALOG_DATA) private data: Flight, private gbl: GlobalService) {
    this.bookSeat = JSON.parse(JSON.stringify(data));
    console.log("this.bookSeat", this.bookSeat)


    this.getAncillaryServices();
    this.getMealPreferences();
    this.getSeats()
  }

  row: number = 10;
  col: number = 4;


  selelectdSheet: any = -1
  selDate: any;
  // cFlight: any;
  // flights: Flight[] = []
  // bookedSeat: any = [];
  // bookedSeatDetail: any = {};


  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);

  ngOnChange() { }

  isBooked(sheetNumber: number): string {
    // console.log("----sheetNumber", sheetNumber)
    // console.log("bookedSeat", this.bookedSeat)
    // return this.bookedSeat.includes(String(sheetNumber));

    // console.log("sheetNumber == this.bookSeat.seat_number", sheetNumber, this.bookSeat.seat_number, sheetNumber == this.bookSeat.seat_number)
    if (sheetNumber == this.bookSeat.seat_number)
      return 'booked';
    else if (this.bookedSeatList.includes(String(sheetNumber)))
      return 'used-disabled'
    else
      return 'unused'
  }

  isSelected(sheetNumber: number): boolean {
    return this.selelectdSheet == sheetNumber;
  }
  selectedSheet(seatNumber: number) {

    if (confirm('Are you wand change seat ?')) {
      this.gbl.updateSeatNumber({}).subscribe(data => {
        if (data.result) {
          this.selelectdSheet = seatNumber;

          this.bookedSeatList = this.bookedSeatList.filter((data: string) => data != String(this.bookSeat.seat_number));
          this.bookSeat.seat_number = seatNumber;
          this.bookedSeatList.push(seatNumber)
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
    // if (this.selelectdSheet == seatNumber)
    //   this.selelectdSheet = -1;
    // else
    //   this.selelectdSheet = seatNumber;

  }




  getAncillaryServices() {
    let obj = {


    }

    this.gbl.getAncillaryServices(obj).subscribe((data: any) => {
      this.ancillaryServices = data.data;
      console.log("Data", data.data);
    },
      (error) => {
        this.gbl.tostError(error.message);
        this.gbl.loaderStop();

      })
  }


  getMealPreferences() {
    let obj = {

    }

    this.gbl.getMealPreferences(obj).subscribe((data: any) => {
      this.mealPreferences = data.data;
      console.log("Data11", data.data);

    },
      (error) => {
        this.gbl.tostError(error.message);
        this.gbl.loaderStop();

      })
  }

  updateSeatDetail() {
    let obj: any = {
      passengers_id: this.bookSeat.id,
      seat_id: this.bookSeat.seat_id,
      requires_wheelchair: Number(this.bookSeat.requires_wheelchair) ? Number(this.bookSeat.requires_wheelchair) : 0,
      has_infant: Number(this.bookSeat.has_infant) ? Number(this.bookSeat.has_infant) : 0,
      ancillary_services: Number(this.bookSeat.ancillary_services) ? Number(this.bookSeat.ancillary_services) : 0,
      meal_preferences: Number(this.bookSeat.meal_preferences) ? Number(this.bookSeat.meal_preferences) : 0,
      shop_requests: Number(this.bookSeat.shop_requests) ? Number(this.bookSeat.shop_requests) : 0,
    }

    this.gbl.loaderStart();
    this.gbl.updateSeatDetail(obj).subscribe(data => {
      this.gbl.loaderStop();

      if (data.result) {
        this.closeDialog(data);
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
  getSeats() {

    this.gbl.getSeats({ flight_id: this.bookSeat.flight_id }).subscribe((data: any) => {

      console.log("[[[", data)
      this.bookedSeatDetail = data.data.reduce((pre: any, next: any) => {
        pre[next.seat_number] = next;
        return pre
      }, {});
      this.bookedSeatList = Object.keys(this.bookedSeatDetail)

      console.log("bookedSeatList", this.bookedSeatList)
    })
  }
  
  closeDialog(objectSend: any): void {
    this.dialogRef.close(objectSend);
  }
}