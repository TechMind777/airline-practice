import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: "passenger", pathMatch: 'prefix' },

      { path: 'ancillary_services', loadChildren: () => import('./ancillary-services/ancillary-services.module').then(m => m.AncillaryServicesModule) },
      { path: 'special_meals', loadChildren: () => import('./special-meals/special-meals.module').then(m => m.SpecialMealsModule) },
      { path: 'shopping_items', loadChildren: () => import('./shopping-items/shopping-items.module').then(m => m.ShoppingItemsModule) },

      { path: 'flights', loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule) },
      { path: 'passenger', loadChildren: () => import('./passenger/passenger.module').then(m => m.PassengerModule) },
      { path: '*', redirectTo: "passenger", pathMatch: 'prefix' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
