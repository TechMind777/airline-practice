import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AncillaryServicesComponent } from './ancillary-services.component';

const routes: Routes = [{ path: '', component: AncillaryServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AncillaryServicesRoutingModule { }
