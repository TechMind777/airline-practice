import { Component, inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddAncillaryServicesComponent } from '../../components/add-ancillary-services/add-ancillary-services.component';

@Component({
  selector: 'app-ancillary-services',
  templateUrl: './ancillary-services.component.html',
  styleUrl: './ancillary-services.component.scss'
})
export class AncillaryServicesComponent {
  ancillaryData: any;
  cAncillaryServices: any;

  constructor(private gbl: GlobalService) {
    this.getAncillaryServices();
  }

  edit(data: any) {

    console.log("edit-", data)
    // this.cAncillaryServices = data;
    this.openDialog(data, '0ms', '0ms')
  }

  getAncillaryServices() {
    this.gbl.getAncillaryServices({}).subscribe((data: any) => {
      this.ancillaryData = data.data;
    })
  }

  readonly dialogRef = inject(MatDialogRef<AddAncillaryServicesComponent>);
  readonly dialog = inject(MatDialog);

  openDialog(data: any, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms'): void {

    const dialogRef = this.dialog.open(AddAncillaryServicesComponent, {
      data: data,
      width: '1000px',
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
