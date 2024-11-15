import { Injectable, signal } from '@angular/core';
import { RestService } from './rest.service';
import { BehaviorSubject, single } from 'rxjs';

import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  logedUserSignal = signal(null);

  logedUserObj = new BehaviorSubject(null);
  logedUser = this.logedUserObj.asObservable();


  constructor(private toastrService: ToastrService, 
    private rest: RestService,
  private ngxUiLoaderService: NgxUiLoaderService
  ) {
  }



  loaderStart(){ this.ngxUiLoaderService.start(); }
  loaderStop(){ this.ngxUiLoaderService.stop(); }
  
  updateSeatNumber(p:any){ return this.rest.put('update-seat-number', p)}
  updateSeatDetail(p:any){ return this.rest.put('update-seat-detail', p)}

  getMealPreferences(p: any) { return this.rest.get('get-meal-preferences', p); }
  addMealPreferences(p: any) { return this.rest.post('add-meal-preferences', p); }
  updateMealPreferences(p: any) { return this.rest.put('update-meal-preferences', p); }
  deleteMealPreferences(p: any) { return this.rest.delete('delete-meal-preferences', p); }
  
  getAncillaryServices(p: any) { return this.rest.get('get-ancillary-services', p); }
  addAncillaryServices(p: any) { return this.rest.post('add-ancillary-services', p); }
  updateAncillaryServices(p: any) { return this.rest.put('update-ancillary-services', p); }
  deleteAncillaryServices(p: any) { return this.rest.delete('delete-ancillary-services', p); }

  getPassengers(p: any) { return this.rest.get('get-passengers', p); }
  updatePassengers(p: any) { return this.rest.put('update-passengers', p); }
  checkInOut(p: any) { return this.rest.put('check-in-out', p); }
   
  getSeats(p: object) { return this.rest.get('get-seats', p) }
  addSeats(p: object) { return this.rest.post('book-seat', p) }

  redirect(url: string) {
    throw new Error('Method not implemented.');
  }
  tostError(Message: any) {
    this.toastrService.error(Message);

  }
  tostSuccess(Message: any) {
    this.toastrService.success(Message);

  }

  login(params: Object) {
    return this.rest.post('login-admin', params);
  }

  getFlights(params: Object) {
    return this.rest.get('get-flights', params);
  }
            
}
