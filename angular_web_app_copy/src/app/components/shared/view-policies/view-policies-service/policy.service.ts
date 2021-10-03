import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from 'src/app/components/core/config/config';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  searchTerm: string;
  public policyData: any = [];
  searchResults: any[] = [];
  activePolicy: any;
  private httpHeader: HttpHeaders;
  private url = Config.baseUrl + 'view-policy-service/' + Config.apiVersion;

  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
  }
  getTiles() {
    return this.http.get('assets/view-policy/policy-tiles.json');
  }
  getPolicyDetails() {
    return this.http.get(this.url + '/details', { headers: this.httpHeader });
  }
  getSearchPolicyDetails() {
    return this.http.get(this.url + '/search', { headers: this.httpHeader });
  }
  generatePDFService(documentId: String) {
    return this.http.get(
      this.url + '/attachment/view?documentId=' + documentId,
      { headers: this.httpHeader, responseType: 'blob' }
    );
  }
  sendEmail(emailId, documentName, documentId) {
    let body = `Dear ${Config.userId} </br> Please find the attached Policy. </br> Regards, </br> HR Team`;
    return this.http.post(
      this.url +
        '/sendmail?emailId=' +
        emailId +
        '&documentName=' +
        documentName +
        '&documentId=' +
        documentId,
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userId: Config.userId,
        }),
      }
    );
  }
}
