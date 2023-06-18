import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class RealRatesService {

  private _url = "https://open.er-api.com/v6/latest/USD"
  constructor(private http: HttpClient) { }

  getRatesForUsd():Observable<any>{
    return this.http.get(this._url)
  }
}
