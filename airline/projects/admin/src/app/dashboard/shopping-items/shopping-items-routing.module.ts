import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingItemsComponent } from './shopping-items.component';

const routes: Routes = [{ path: '', component: ShoppingItemsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingItemsRoutingModule { }
