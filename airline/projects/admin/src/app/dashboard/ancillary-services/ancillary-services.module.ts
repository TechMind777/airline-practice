import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AncillaryServicesRoutingModule } from './ancillary-services-routing.module';
import { AncillaryServicesComponent } from './ancillary-services.component';
import { AddAncillaryServicesComponent } from '../../components/add-ancillary-services/add-ancillary-services.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AncillaryServicesComponent
  ],
  imports: [
    CommonModule,
    AncillaryServicesRoutingModule,
    AddAncillaryServicesComponent,
    MatDialogModule,
    MatButtonModule
  ],
  providers:[
    
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class AncillaryServicesModule { }
