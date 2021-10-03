import { Injectable } from '@angular/core';
import { Config } from '../../../../components/core/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LeaveEncashmentService {
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };
  constructor(private http: HttpClient) { }

  getLeaveSummary() {
    return this.http.get(
      Config.baseUrl +'leave-encashment-service/'+ Config.apiVersion +'/categories',
      this.reqOptions
    );
  }
  enCashSave(payload) {
    return this.http.post(
      Config.baseUrl +'leave-encashment-service/'+ Config.apiVersion +'/save',payload,
      this.reqOptions
    );
  }
}
