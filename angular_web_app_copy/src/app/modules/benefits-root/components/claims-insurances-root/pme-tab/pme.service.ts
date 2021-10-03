import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Config } from '../../../../../components/core/config/config';

@Injectable({
  providedIn: 'root'
})
export class PmeService {
  private pmeDetailsUrl =Config.baseUrl + 'medical-service/' + Config.apiVersion;
  private pmeReportsUrl=Config.baseUrl + 'medical-report-service/' + Config.apiVersion;
  private pmeSchedulePmeUrl=Config.baseUrl + 'schedule-pme-service/' + Config.apiVersion;
  private bookMedicalUrl=Config.baseUrl + 'book-medical-service/' + Config.apiVersion;
  

 

  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  constructor(private http: HttpClient) { }
  getPmeCheck(){
    return this.http
    .get(
      this.pmeDetailsUrl + '/pme/checkset',
      this.reqOptions
    )
  }
  getPMEOverview(){
    return this.http
      .get(
        this.pmeDetailsUrl + '/details',
        this.reqOptions
      )
  }
  getCentresState(){
    return this.http
      .get(
        this.pmeSchedulePmeUrl + '/state',
        this.reqOptions
      )
  }
  getCentresCities(stateCode){
    return this.http
      .get(
        this.pmeSchedulePmeUrl + '/city?stateCode='+stateCode+'',
        this.reqOptions
      )
  }
  getCentresHospital(stateCode,cityCode){
    let headers =  new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
    return this.http
      .get(
        this.pmeSchedulePmeUrl + '/hospital?stateCode='+stateCode+'&cityCode='+cityCode+'',
        {
          headers: headers,
          responseType: 'blob'
        }
      )
  }
  getPMEReports(regNo){
    let headers =  new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
      regnNo:regNo
    })
    return this.http
      .get(
        this.pmeReportsUrl + '/details',
        {
          headers: headers,
          responseType: 'text'
        }
      )
  }
  getPMEReportsList(){
    
    return this.http
      .get(
        this.pmeReportsUrl + '/list',
        this.reqOptions
      )
  }
  getAppointmentDates(){
    
    return this.http
      .get(
        this.pmeDetailsUrl + '/appointment',
        this.reqOptions
      )
  }
  getPMEPDF(body){
    const string=JSON.stringify(body)
    let headers =  new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
    return this.http
      .post(
        this.pmeSchedulePmeUrl + '/pmepdf',string,
        {
          headers: headers,
          responseType: 'blob'
        }
      )
    
  }
  bookPME(requestBody){
    const string=JSON.stringify(requestBody)
    return this.http
      .post(
        this.bookMedicalUrl + '/save',
        string,
        this.reqOptions
      )

  }
}
