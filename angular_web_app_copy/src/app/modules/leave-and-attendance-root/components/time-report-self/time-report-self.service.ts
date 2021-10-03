import { Injectable } from '@angular/core';
import { Config } from '../../../../components/core/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TimeReportSelfService {
  public baseUrl: string = Config.baseUrl;
  private CoffUrl =
    Config.baseUrl + 'time-report-self-service/' + Config.apiVersion;
    private MonthattUrl =
    Config.baseUrl + 'time-report-self-service/' + Config.apiVersion;
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };
  constructor(private http: HttpClient) {}
  public requestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };
  getCoffDetails(month,year) {
    return this.http.get(
      this.CoffUrl +
        '/compoff/availed?month=' +
         month+
        '&year=' +
        year,
      this.requestHeader
    );
  }
  formatInTime(inTime) {
    inTime = inTime + Config.timezoneOffset;
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
  getOTStatus(month,year) {
    return this.http.get(
      this.MonthattUrl +
      '/compoff/status?month=' +
      month+
     '&year=' +
     year,
      this.requestHeader
    );
  }
}
