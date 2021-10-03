import { EventEmitter, Injectable } from '@angular/core';
import { Config } from '../../../../../components/core/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GratuityService {

  private gratuityBaseUrl =Config.baseUrl + 'manage-retirals-gratuity-service/' + Config.apiVersion;
  public closeAllModal = new EventEmitter<boolean>()
  
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  constructor(private http: HttpClient) { }  


  getList(){
    return this.http
      .get(
        this.gratuityBaseUrl + '/list',
        this.reqOptions
      )
  }

  getDeclaration(flag){    
    return this.http
    .get(
      this.gratuityBaseUrl + 
      '/declaration/list?filterValue='+
      flag,
      this.reqOptions
    )
  }

  saveGratuityDeclaratiom(requestObj){
    let body = JSON.stringify(requestObj);
    return this.http
      .post(
        this.gratuityBaseUrl + '/declaration/create',
        body,
        this.reqOptions
      )
  }

deleteGratuityDeclaratiom(requestObj){
    let body = JSON.stringify(requestObj);
    return this.http
      .post(
        this.gratuityBaseUrl + '/declaration/delete',
        body,
        this.reqOptions
      )
  }

  getGratuityPDF(pdfStream){
    let headers =  new HttpHeaders({
        'Content-Type': 'application/json',
        userId: Config.userId
      })
    return this.http
      .get(
        this.gratuityBaseUrl + 
        '/declaration/pdf?pdfStream='+
        pdfStream,
        {
          headers: headers,
          responseType: 'blob'
        }
        )
  }


  createPayload(data,flag){
    let declarationList = []

    data.forEach(obj=>{
      let element = Object.assign({},obj)
      let saveObj =  {
        "serialNo": element.serialNo,
        "flag": element.flag,
        "previousEmployer": element.previousEmployer,
        "amount": element.amount,
        "deleteFlag": element.deleteFlag,
        "pdfStream": element.pdfStream,
        "fromDate": moment(element.fromDate,'DD-MM-YYYY').valueOf(),
        "toDate": moment(element.toDate,'DD-MM-YYYY').valueOf(),
        "leaveEncashmentAmount": element.leaveEncashmentAmount,
        "date": null
      }
      declarationList.push(saveObj)
    })

    let payload = {
      flagValue: flag,
      gratuityDeclarationList: declarationList,
      pdfStream: ""
    }

    return payload
  }
}
