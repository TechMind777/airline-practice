import { Component, inject } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddSpecialMealsComponent } from '../../components/add-special-meals/add-special-meals.component';

@Component({
  selector: 'app-special-meals',
  templateUrl: './special-meals.component.html',
  styleUrl: './special-meals.component.scss'
})
export class SpecialMealsComponent {

  mealsData: any;
  cSpecialMeals: any;

  constructor(private gbl: GlobalService) {
    this.getSpecialMeals();
  }

  edit(data: any) {
    this.openDialog(data, '0ms', '0ms')
  }

  getSpecialMeals() {
    this.gbl.getMealPreferences({}).subscribe((data: any) => {
      this.mealsData = data.data;
    })
  }

  readonly dialogRef = inject(MatDialogRef<AddSpecialMealsComponent>);
  readonly dialog = inject(MatDialog);

  openDialog(data: any, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms'): void {

    const dialogRef = this.dialog.open(AddSpecialMealsComponent, {
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
