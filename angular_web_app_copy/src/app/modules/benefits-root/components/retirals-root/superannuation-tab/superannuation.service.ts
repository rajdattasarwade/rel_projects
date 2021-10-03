import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../../../../components/core/config/config';

@Injectable({
  providedIn: 'root'
})
export class SuperannuationService {

  private superannuationBaseUrl =Config.baseUrl + 'superannuation-service/' + Config.apiVersion;
  private manageMyRetiralsBaseUrl = Config.baseUrl + 'manage-retirals-internaltransfer-service/' + Config.apiVersion;
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  constructor(private http: HttpClient) { }

  getSuperannuationContribution(){
    return this.http
      .get(
        this.superannuationBaseUrl + '/contributiondetails',
        this.reqOptions
      )
  }

  getValidation(){
    return this.http
      .get(
        this.superannuationBaseUrl + '/validation',
        this.reqOptions
      )
  }

  saveDeduction(requestObj){
    let body = JSON.stringify(requestObj);
    return this.http
      .post(
        this.superannuationBaseUrl + '/deduction',
        body,
        this.reqOptions
      )
  }

  getTransferList(){
    return this.http
      .get(
        this.manageMyRetiralsBaseUrl + '/superannuation/list',
        this.reqOptions
      )
  }

  getTransferPDF(dateOfLeaving){
    let headers =  new HttpHeaders({
        'Content-Type': 'application/json',
        userId: Config.userId
      })
    return this.http
      .get(
        this.manageMyRetiralsBaseUrl + '/superannuation/pdf?dateOfLeaving='+dateOfLeaving,
        {
          headers: headers,
          responseType: 'blob'
        }
        )
  }

  createSuperTransfer(payload){
    let body = JSON.stringify(payload);
    return this.http
      .post(
        this.manageMyRetiralsBaseUrl + '/superannuation/create',
        body,
        this.reqOptions
      )
  }

  editSuperTransfer(payload){
    let body = JSON.stringify(payload);
    return this.http
      .post(
        this.manageMyRetiralsBaseUrl + '/superannuation/edit',
        body,
        this.reqOptions
      )
  }

  deleteSuperTransfer(payload){
    let body = JSON.stringify(payload);
    return this.http
      .post(
        this.manageMyRetiralsBaseUrl + '/superannuation/delete',
        body,
        this.reqOptions
      )
  }

  getDetail(trustId,seqNo){
    return this.http
      .get(
        this.manageMyRetiralsBaseUrl + '/superannuation/detail?trustId='+trustId+'&seqNo='+seqNo,
        this.reqOptions
        )
  }
}
