import { Component, signal } from '@angular/core';
import { GlobalService } from '../../services/global.service';

interface Flight {
  id: number;
  flight_number: string;
  flight_name: string;
  departure_time: string;
  arrival_time: string;
  departure_airport: string;
  arrival_airport: string;
}
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'
})
export class FlightsComponent {
  row: number = 10;
  col: number = 4;
  selelectdSheet: any = -1
  selDate: any;
  cFlight: any;
  flights: Flight[] = []
  bookedSeat: any = [];
  bookedSeatDetail: any = {};

  bookSeat: any = {
    name: '',
    email: '',
    requires_wheelchair: '',
    has_infant: ''
  }

  cflight: any = {}
  constructor(private gbl: GlobalService) { }

  getFlights() {
    console.log("this.selDate", this.selDate)
    const date = new Date(this.selDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); // Outputs: yyyy-mm-dd


    this.gbl.getFlights({ departure_time: formattedDate }).subscribe((data: any) => {
      console.log("data-->", data.data)
      this.flights = (data.data)
    })
  }


  isBooked(sheetNumber: number): boolean {
    console.log("----sheetNumber", sheetNumber)
    console.log("bookedSeat", this.bookedSeat)
    return this.bookedSeat.includes(String(sheetNumber));
  }

  isSelected(sheetNumber: number): boolean {
    return this.selelectdSheet == sheetNumber;
  }
  selectedSheet(sheetNumber: number) {
    if (this.selelectdSheet == sheetNumber)
      this.selelectdSheet = -1;
    else
      this.selelectdSheet = sheetNumber;

  }

  getSeats(cflight: any) {

    this.cflight = cflight
    this.gbl.getSeats({ flight_id: cflight.id }).subscribe((data: any) => {

      console.log("[[[", data)
      this.bookedSeatDetail = data.data.reduce((pre: any, next: any) => {
        pre[next.seat_number] = next;
        return pre
      }, {});
      this.bookedSeat = Object.keys(this.bookedSeatDetail)

      console.log("this.bookedSeatDetail", this.bookedSeatDetail)
      console.log("this.bookedSeat", this.bookedSeat)
    },
    (error) => {
      this.gbl.tostError(error.message);
      this.gbl.loaderStop();

    })
  }

  bookSeatFun() {
    let obj = {
      name: this.bookSeat.name,
      email: this.bookSeat.email,
      requires_wheelchair: this.bookSeat.requires_wheelchair ? 1 : 0,
      has_infant: this.bookSeat.has_infant ? 1 : 0,

      flight_id: this.flights[this.cFlight].id,
      seat_number: this.selelectdSheet,
      // is_checked_in: '',
      // passenger_id: '',
    }

    this.gbl.addSeats(obj).subscribe((data: any) => {
      if (data.result) {
        this.gbl.tostSuccess(data.message);
        this.getSeats(this.cflight)

        this.bookSeat = {
          name: '',
          email: '',
          requires_wheelchair: '',
          has_infant: ''
        }
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
