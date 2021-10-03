import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Config } from '../../../../../components/core/config/config';
@Injectable({
  providedIn: 'root'
})
export class RetiralsService {
  private vpfBaseUrl =Config.baseUrl + 'retiral-benefits-service/' + Config.apiVersion;

  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  constructor(private http: HttpClient) { }

  getSummary(){
    return this.http
    .get(
      this.vpfBaseUrl + '/summary',
      this.reqOptions
    )
  }
  

  getGratuityCalc(){
    return this.http
    .get(
      this.vpfBaseUrl + '/gr/calculation',
      this.reqOptions
    )
  }
  getGratuitySummary(){
    return this.http
    .get(
      this.vpfBaseUrl + '/group/summary?imMode=GR',
      this.reqOptions
    )
  }
  getProvidentSummary(){
    return this.http
    .get(
      this.vpfBaseUrl + '/group/summary?imMode=PF',
      this.reqOptions
    )
  }
  getSuperannuationSummary(){
    return this.http
    .get(
      this.vpfBaseUrl + '/group/summary?imMode=SA',
      this.reqOptions
    )
  }
  
  getProvidentYearSummary(el){
    return this.http
    .get(
      this.vpfBaseUrl + '/group/yearsummary?imMode=PF&trustId='+el.trustId+'&companyCode='+el.companyCode+'&trustCode='+el.trustCode+'&pfType='+el.pfType+'',
      this.reqOptions
    )
  }
  getSuperannuationYearSummary(el){
    return this.http
    .get(
      this.vpfBaseUrl + '/group/yearsummary?imMode=SA&trustId='+el.trustId+'&companyCode='+el.companyCode+'&trustCode='+el.trustCode+'&pfType='+el.pfType+'',
      this.reqOptions
    )
  }
  getProvidentMonthSummary(el){
    return this.http
    .get(
      this.vpfBaseUrl + '/group/monthsummary?trustId='+el.trustId+'&year='+el.year+'&trustCode='+el.trustCode+'&pfType='+el.pfType+'',
      this.reqOptions
    )
  }
  getSuperannuationMonthSummary(el){
    return this.http
    .get(
      this.vpfBaseUrl + '/retiral/superannuation/monthwise?year='+el.year+'&type&trustId='+el.trustId+'',
      this.reqOptions
    )
  }
  getProvidentBalance(el){
    return this.http
    .get(
      this.vpfBaseUrl + '/yearwise/balance?imFlag=PF&trustId='+el.trustId+'&year='+el.year+'&trustCode='+el.trustCode+'&pfType='+el.pfType+'',
      this.reqOptions
    )
  }
  getSuperannuationBalance(el){
    return this.http
    .get(
      this.vpfBaseUrl + '/yearwise/balance?imFlag=SA&trustId='+el.trustId+'&year='+el.year+'&trustCode='+el.trustCode+'&pfType='+el.pfType+'',
      this.reqOptions
    )
  }
  getPDF( year,flag) {
    var apiUrl =this.vpfBaseUrl +'/printpdf?imFlag='+flag+'&year='+year+''
      
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    });
    return this.http.get(apiUrl, {
      headers: requestHeader,
      responseType: 'blob'
    });
  }
}


