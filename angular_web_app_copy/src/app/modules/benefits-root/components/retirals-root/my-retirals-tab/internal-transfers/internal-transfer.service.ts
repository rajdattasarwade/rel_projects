import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from 'src/app/components/core/config/config';

@Injectable({
  providedIn: 'root'
})
export class InternalTransferService {

  private itBaseUrl =Config.baseUrl + 'manage-retirals-internaltransfer-service/' + Config.apiVersion;
  
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  constructor(private http: HttpClient) { } 

  getITList(){
    return this.http
      .get(
        this.itBaseUrl + '/list',
        this.reqOptions
      )
  }

  getPDF(dateOfLeaving, transferStatus,transferTypeFLag){
    let headers =  new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
    //  //superannuation/pdf?dateOfLeaving=1143849600000&transferStatus=&transferTypeFlag=

  return this.http
    .get(
      this.itBaseUrl + 
      '/pdf?dateOfLeaving='+
      dateOfLeaving +
      '&transferStatus='+
      transferStatus
      +
      '&transferTypeFlag='+
      transferTypeFLag,
      {
        headers: headers,
        responseType: 'blob'
      }
      )
  }
}
