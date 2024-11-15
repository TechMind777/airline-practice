import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { set } from '../store/auth.actions';
import { first, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const store = inject(Store);

  return store.select(set).pipe(
    first(),
    switchMap((auth: any) => {
      const authReq = auth.token ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${auth.token}`)
      }) : req;

      return next(authReq);
    })
  );
};
