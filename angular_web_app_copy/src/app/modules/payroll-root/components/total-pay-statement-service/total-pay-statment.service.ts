import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from 'src/app/components/core/config/config';
import { Observable } from 'rxjs';

@Injectable()
export class TotalPayStatmentService {
    private utilityServiceUrl =
    Config.baseUrl + `financial-utility-service/${Config.apiVersion}/`;

constructor(private http: HttpClient){}
public requestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };

getTotalPayStatmentPDF(): Observable<any> {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
    return this.http.get(this.utilityServiceUrl+'ctc', {
      headers: requestHeader,
      responseType: 'blob',
    });
  }

  sendEmailDetail(emailId, docType): Observable<any> {
    return this.http.post(this.utilityServiceUrl+'sendmail' + "?emailId=" + emailId + "&docType=" + docType, {}, this.requestHeader);
  }
}