import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { set } from '../store/auth.actions';
import { first, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor called'); // Add this line
  const store = inject(Store);

  let logedUser: any = localStorage.getItem('logedUser')
  const auth = JSON.parse(logedUser)

  console.log("auth", auth.token)

  const authReq = auth.token ? req.clone({
    headers: req.headers.set('Authorization', `Bearer ${auth.token}`)
  }) : req;

  return next(authReq);

  // return store.select(set).pipe(
  //   first(),
  //   switchMap((auth: any) => { 
  //     const authReq = auth.auth.token ? req.clone({
  //       headers: req.headers.set('Authorization', `Bearer ${auth.auth.token}`)
  //     }) : req;

  //     return next(authReq);
  //   })
  // );
};

