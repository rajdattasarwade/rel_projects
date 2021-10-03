import { Injectable } from '@angular/core';
import { Config } from '../../../../../components/core/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GhpClaimService {

  private ghpBaseUrl = Config.baseUrl + 'claim-ghp-service/' + Config.apiVersion;

  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };

  constructor(private http: HttpClient) { }

  getGhpHistory(){
    return this.http
      .get(
        this.ghpBaseUrl + '/history',
        this.reqOptions
      )
  }

  getDependants(){
    return this.http
      .get(
        this.ghpBaseUrl + '/dependents',
        this.reqOptions
      )
  }

  printGhp(claimNo) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
    return this.http
      .get(
        this.ghpBaseUrl +
        `/printview/${claimNo}`,
        {
          headers: headers,
          responseType: 'blob'
        }
      )
  }

  getDisplayData(claimNo){
    return this.http
    .get(
      this.ghpBaseUrl + 
      '/detail?claimNo=' +
      claimNo,
      this.reqOptions
    )
  }

  getEnclosingDocsList(){
    return this.http
    .get(
      this.ghpBaseUrl + 
      '/enclosingdocs',
      this.reqOptions
    )
  }

  saveClaim(payload,endpoint){
    let body = JSON.stringify(payload);
    return this.http
      .post(
        this.ghpBaseUrl + 
        '/' +
        endpoint,
        body,
        this.reqOptions
      )

  }

}
