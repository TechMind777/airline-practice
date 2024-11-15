import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerComponent } from './passenger.component';
import { FormsModule } from '@angular/forms';
import { SwitchButtonComponent } from '../../components/switch-button/switch-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
// import { SeatDetailComponent } from '../../components/seat-detail/seat-detail.component';
 

@NgModule({
  declarations: [
    PassengerComponent,
    // SeatDetailComponent
    
  ],
  imports: [
    CommonModule,
    PassengerRoutingModule,
    FormsModule,
    SwitchButtonComponent,
    // SeatDetailComponent,

    
    MatFormFieldModule, MatInputModule,
     MatDatepickerModule,
     MatButtonModule, MatGridListModule,MatCardModule,
     MatCheckboxModule,
     MatRadioModule,
     MatTableModule,
  ]

  
})
export class PassengerModule { }
