import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialMealsRoutingModule } from './special-meals-routing.module';
import { SpecialMealsComponent } from './special-meals.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddSpecialMealsComponent } from '../../components/add-special-meals/add-special-meals.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    SpecialMealsComponent
  ],
  imports: [
    CommonModule,
    SpecialMealsRoutingModule,
    MatDialogModule,
    AddSpecialMealsComponent,
    MatButtonModule
  ],
  providers:[
    
    
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class SpecialMealsModule { }
