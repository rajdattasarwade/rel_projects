import { Injectable } from '@angular/core';
import { Config } from '../../../../components/core/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NationalHolidayService {
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };
  constructor(private http: HttpClient) { }

  getNationalHolidaySummary(year) {
    return this.http.get(
      Config.baseUrl +'holiday-service/'+ Config.apiVersion +'/national/holiday/list?year='+year,
      this.reqOptions
    );
  }
  onSaveHoliday(payload) {
    return this.http.post(
      Config.baseUrl +'holiday-service/'+ Config.apiVersion +'/national/holiday/save',payload,
      this.reqOptions
    );
  }
}
