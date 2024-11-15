import { Actions, createEffect, ofType } from '@ngrx/effects'; 
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';

import {  set } from './auth.actions';
// import { selectCount } from './counter.selectors';

@Injectable()
export class AuthEffects {
  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(set),
      switchMap(() => {
        const storedAuth = localStorage.getItem('logedUser');
        if (storedAuth) {
          return of(set( storedAuth ));
        }
        return of(set({}));
      })
    )
  );
 
  
  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(set),
        withLatestFrom(this.store.select(set)),
        tap(([action, logedUser]) => {
          console.log(action);
          localStorage.setItem('logedUser', JSON.stringify(logedUser) );
        })
      ),
    { dispatch: false }
  );
 
  constructor(
    private actions$: Actions,
    private store: Store<Object>
  ) {}
}
