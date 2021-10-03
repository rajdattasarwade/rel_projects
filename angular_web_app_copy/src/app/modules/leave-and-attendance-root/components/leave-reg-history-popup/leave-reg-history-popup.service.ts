import { Injectable } from '@angular/core';
import { Config } from '../../../../components/core/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LeaveRegHistoryPopupService {
  public baseUrl: string = Config.baseUrl;
  private LeaveHUrl =
    Config.baseUrl + 'leave-history-service/' + Config.apiVersion;
    private ReguHUrl =
    Config.baseUrl + 'regularize-history-service/' + Config.apiVersion;
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };
  constructor(private http: HttpClient) { }
  public requestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };
  getLeaveHistory(year) {
    return this.http.get(
      this.LeaveHUrl +'/details/' +
         year,
      this.requestHeader
    );
  }
  CancelLeave(payload) {
    return this.http.post(
      Config.baseUrl + 'leave-cancel-service/' + Config.apiVersion + '/delete',
      payload,
      this.reqOptions
    );
  }
  getPDFbyLeave(DocId) {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
    let url = Config.baseUrl+ 'leave-attachment-service/'+ Config.apiVersion + '/fetch/'+DocId;
    return this.http.get(url, { headers: requestHeader, responseType: 'blob' });
  }
  getRegHistory() {
    return this.http.get(
      this.ReguHUrl +'/emp/history?skipRecords=0&fetchNoOfRecords=100',
      this.requestHeader
    );
  }
  CancelReg(payload) {
    return this.http.post(
      Config.baseUrl + 'regularize-history-service/' + Config.apiVersion + '/emp/history/delete?counter='+payload,[],
      this.reqOptions
    );
  }
  formatInTime(inTime) {
    inTime = inTime ;
    inTime = new Date(inTime);
    return (
      this.mintwodigits(new Date(inTime).getHours()) +
      ':' +
      this.mintwodigits(new Date(inTime).getMinutes())
    );
  }
  mintwodigits(n) {
    if (!isNaN(n)) {
      return (n < 10 ? '0' : '') + n;
    } else {
      return '00';
    }
  }
}

