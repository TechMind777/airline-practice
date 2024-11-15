import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: "flights", pathMatch: 'prefix' },
      { path: 'flights', loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule) },
      { path: 'passenger', loadChildren: () => import('./passenger/passenger.module').then(m => m.PassengerModule) },
      { path: '*', redirectTo: "flights", pathMatch: 'prefix' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
