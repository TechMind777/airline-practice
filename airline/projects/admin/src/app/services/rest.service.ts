import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  token: any = '';
  PrimaryUrl: string = "http://localhost:8000/api";
  imgURL: string = "http://localhost:8000/api";

  constructor(public http: HttpClient) {
  }
  readJSON(param: string) {
    return this.http.get<any>('./assets/' + param);
  }

  GetMethod(param: string) { return this.http.get<any>(param); }

  get(endPointg: string, params?: any) {
    let options_: any = {
      responseType: "json",
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    };

    let p = []; let newParam;
    if (params) { for (let k in params) { let str = k + '=' + params[k]; p.push(str); } newParam = p.join('&'); }
    return this.http.get<any>(this.PrimaryUrl + '/' + endPointg + '?' + newParam, options_).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }))
  }

  post(endPointg: string, params?: any)  {
    // if (!optn) { optn = { params: new HttpParams() }; };
    let options_: any = {
      responseType: "json",
      headers: new HttpHeaders({
        "Authorization": `Bearer ` + this.token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    };

    return this.http.post<any>(this.PrimaryUrl + '/' + endPointg, params, options_).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  put(endPointg: string, params?: any, optn: any = "PrimaryUrl") {
    if (!optn) { optn = { params: new HttpParams() }; };
    return this.http.put<any>(this.PrimaryUrl + '/' + endPointg, params).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }));
  }
  // GetMethod1(param: string) { return this.http.get<any>(param); }
  delete(endPointg: string, params?: any, optn: any = 'PrimaryUrl') {
    let p = []; let newParam;
    if (params) { for (let k in params) { let str = k + '=' + params[k]; p.push(str); } newParam = p.join('&'); }
    return this.http.delete<any>(this.PrimaryUrl + '/' + endPointg + '?' + newParam).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }));
  }
  webSocket(domain: string, param?: any) {
    var fws = new WebSocket(domain); fws.onopen = function () { fws.send(param); /* Send the message 'Ping' to the server*/ }; return fws;
  }
}