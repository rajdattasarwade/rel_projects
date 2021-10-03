import { Injectable } from '@angular/core';
import { Config } from '../../../../../components/core/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GpaClaimService {

  private gpaBaseUrl = Config.baseUrl + 'claim-gpa-service/' + Config.apiVersion;
  private insuranceClaimBaseUrl = Config.baseUrl + 'myinsurance-claim-service/' + Config.apiVersion;

  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };

  constructor(private http: HttpClient) { }

  getHistory() {
    return this.http
      .get(
        this.gpaBaseUrl + '/history',
        this.reqOptions
      )
  }


  printGpa(claimNo) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
    return this.http
      .get(
        this.insuranceClaimBaseUrl +
        `/printview/${claimNo}`,
        {
          headers: headers,
          responseType: 'blob'
        }
      )
  }

  saveClaimInitimation(requestObj){
    let body = JSON.stringify(requestObj);
    return this.http
      .post(
        this.gpaBaseUrl + '/save',
        body,
        this.reqOptions
      )
  }

  getEditClaim(claimNo){
    return this.http
      .get(
        this.gpaBaseUrl + 
        '/detail?claimNo=' +
        claimNo,
        this.reqOptions
      )
  }


  updateClaim(payload){
    let body = JSON.stringify(payload);
    return this.http
      .post(
        this.gpaBaseUrl + '/update',
        body,
        this.reqOptions
      )
  }
}
