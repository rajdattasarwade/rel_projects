import { Injectable } from '@angular/core';
import { Config } from '../../../../../components/core/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PfPensionService {

  private pfPensionBaseUrl =Config.baseUrl + 'manage-retirals-pfpension-service/' + Config.apiVersion;
  
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  constructor(private http: HttpClient) { }  

  getPfPension(){
    return this.http
      .get(
        this.pfPensionBaseUrl + '/summary',
        this.reqOptions
      )
  }

  getPfPensionView(companyCode, flag,type,barCode){
    return this.http
      .get(
        this.pfPensionBaseUrl + 
        '/pf/view?companyCode='+
        companyCode
        +'&pfpensionFlagIndicator='+
        flag+
        '&transferType=' +
          type+
        '&barCodeNumber='+
        barCode,
        this.reqOptions
      )
  }

  savePfPensionData(requestObj,flag){
    let body = JSON.stringify(requestObj);
    let url = ''
    if(flag == 'C'){
      url = this.pfPensionBaseUrl + '/pf/create'
    }else{
      url = this.pfPensionBaseUrl + '/pf/edit'
    }
    return this.http
      .post(
        url,
        body,
        this.reqOptions
      )
  }

  getStateList(){
    return this.http
      .get(
        this.pfPensionBaseUrl + '/pf/statelist',
        this.reqOptions
      )
  }

  getRegionList(stateCode){
    return this.http
    .get(
      this.pfPensionBaseUrl + 
      '/pf/regionlist?stateCode='+
      stateCode,
      this.reqOptions
    )
  }

  getManagedList(){
    return this.http
    .get(
      this.pfPensionBaseUrl + 
      '/pf/managedby',
      this.reqOptions
    )
  }
  deletePfPension(payload){
    let body = JSON.stringify(payload);
    return this.http
      .post(
        this.pfPensionBaseUrl + '/pf/delete',
        body,
        this.reqOptions
      )
  }

  getPensionList(){
    return this.http
    .get(
      this.pfPensionBaseUrl + '/pension/detail',
      this.reqOptions
    )
  }

  getPfPDF(companyCode,pfpensionFlagIndicator,transferType, barCodeNumber) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
    return this.http
      .get(
        this.pfPensionBaseUrl + 
        '/pf/pdf?companyCode=' +
        companyCode +
        '&pfpensionFlagIndicator='+
         pfpensionFlagIndicator +
        '&transferType='+
         transferType + 
        '&barCodeNumber=' +
        barCodeNumber,
        {
          headers: headers,
          responseType: 'blob'
        }
      )

  }
}
