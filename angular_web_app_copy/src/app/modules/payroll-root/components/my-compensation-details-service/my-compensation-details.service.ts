import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from 'src/app/components/core/config/config';

@Injectable()
export class MyCompensationDetailsService {
    private myCompensationBaseUrl = Config.baseUrl + 'my-compensation-service/' + Config.apiVersion;
    constructor(private http: HttpClient) {}

    public requestHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userId: Config.userId,
        }),
      };
      
    getSelfHistory() {
        let url = this.myCompensationBaseUrl + '/selfhistory';
        return this.http.get(url, this.requestHeader);
      }

    getTeamActionDetails() {
      let url = this.myCompensationBaseUrl + "/teamview";
      return this.http.get(url, this.requestHeader);
    }

    postReleaseLetter(requestObject) {
      let url = this.myCompensationBaseUrl + "/releaseletter";
      return this.http.post(url, JSON.stringify(requestObject), this.requestHeader);
    }

    getEmployeeList() {
      let url = this.myCompensationBaseUrl + "/employees";
      return this.http.get(url, this.requestHeader);
    }

    getTeamHistory(perNr: string) {
      let url = this.myCompensationBaseUrl + "/teamhistory?employeeId=" + perNr;
      return this.http.get(url, this.requestHeader);
    }

    getPDF(requestObject) {
      let requestHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        userId: Config.userId,
      });
      let url = this.myCompensationBaseUrl + "/print";
      return this.http.post(url, JSON.stringify(requestObject), {
        headers: requestHeader,
        responseType: "blob"
      });
    }
}