import { Component, signal } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  flights = signal([])

  constructor(private gbl: GlobalService) {
    // this.getFlights();
   }

  

  getFlights() {
    this.gbl.getFlights({}).subscribe((data: any) => {
      this.flights.set(data)
    })
  }

  
}
