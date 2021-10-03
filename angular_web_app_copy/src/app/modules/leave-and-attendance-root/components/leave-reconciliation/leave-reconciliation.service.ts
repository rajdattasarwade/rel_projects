import { Injectable } from '@angular/core';
import { Config } from '../../../../components/core/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveReconciliationService {
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
  
  getRecList() {
    return this.http.get(
      Config.baseUrl +'leave-reconciliation-service/'+ Config.apiVersion +'/new/list',
      this.requestHeader
    );
  }
  getDetailLeave(code,qouta) {
    return this.http.get(
      Config.baseUrl +'leave-reconciliation-service/'+ Config.apiVersion +'/details/'+code+'/'+qouta,
      this.requestHeader
    );
  }
  getLeaveSubDetails(idData) {
    return this.http.get(
      Config.baseUrl +'leave-reconciliation-service/'+ Config.apiVersion +'/usage/'+idData,
      this.requestHeader
    );
  }
}
