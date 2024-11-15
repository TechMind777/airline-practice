import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingItemsRoutingModule } from './shopping-items-routing.module';
import { ShoppingItemsComponent } from './shopping-items.component';


@NgModule({
  declarations: [
    ShoppingItemsComponent
  ],
  imports: [
    CommonModule,
    ShoppingItemsRoutingModule
  ]
})
export class ShoppingItemsModule { }
