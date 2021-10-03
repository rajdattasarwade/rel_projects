import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Config } from '../../../../../components/core/config/config';

@Injectable({
  providedIn: 'root'
})
export class VpfService {
  
  private typeFlag = new BehaviorSubject<any>([]);
  private vpfBaseUrl =Config.baseUrl + 'vpf-service/' + Config.apiVersion;
 

  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  constructor(private http: HttpClient) { }

  getVPFOverview(){
    return this.http
      .get(
        this.vpfBaseUrl + '/vpfsummary?deductionType=D',
        this.reqOptions
      )
  }

  getVPFTypeDetail(flag){
    return this.http
    .get(
      this.vpfBaseUrl + '/vpfsummary?deductionType='+flag,
      this.reqOptions
    )
  }
  postVPF(requestObj:any){
    let body = JSON.stringify(requestObj);
    return this.http
      .post(
        this.vpfBaseUrl + '/deduction',
        body,
        this.reqOptions
      )
  }

}
