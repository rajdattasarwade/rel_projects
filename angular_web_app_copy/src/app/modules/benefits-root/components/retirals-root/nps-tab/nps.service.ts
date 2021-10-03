import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Config } from '../../../../../components/core/config/config';

@Injectable({
  providedIn: 'root'
})
export class NpsService {
  private npsBaseUrl =Config.baseUrl + 'national-pension-scheme-service/' + Config.apiVersion;
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  constructor(private http: HttpClient) { }
  
  getNPSOverview(){
    return this.http
    .get(
      this.npsBaseUrl + '/summary',
      this.reqOptions
    )
  }
  getPRANDetails(){
    return this.http
    .get(
      this.npsBaseUrl + '/prandetails',
      this.reqOptions
    )
  }
  editNPS(requestObj:any){
    let body = JSON.stringify(requestObj);
    return this.http
      .post(
        this.npsBaseUrl + '/edit',
        body,
        this.reqOptions
      )
  }
  savePRAN(requestObj:any){
    let body = JSON.stringify(requestObj);
    return this.http
      .post(
        this.npsBaseUrl + '/registerpran',
        body,
        this.reqOptions
      )
  }
}
