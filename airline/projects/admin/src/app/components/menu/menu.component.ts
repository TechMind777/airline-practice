import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { set } from '../../store/auth.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(
    // private fb: FormBuilder,
    public gbls: GlobalService,
    private route: Router,
    // private authService: AuthService
    private store: Store
  ) { }
  logOut(){
    localStorage.removeItem('logedUser' );


    this.gbls.logedUserSignal.set(null);
    this.store.dispatch(set({}));


    this.route.navigate(['/login']);
  }
}
