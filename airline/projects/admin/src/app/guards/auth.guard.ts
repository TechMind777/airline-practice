import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { set } from '../store/auth.actions';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const store = inject(Store);
  try {


    const isAuthenticated$: Observable<any> = store.select(set);

    return isAuthenticated$.pipe(
      map(isAuthenticated => {
        // console.log("isAuthenticated", isAuthenticated)
        if (isAuthenticated.auth && Object.keys(isAuthenticated.auth).length) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      })
    );

  } catch (error) {
    console.error("Auth Error", error)
    router.navigate(['/login']);
    return false
  }
};
