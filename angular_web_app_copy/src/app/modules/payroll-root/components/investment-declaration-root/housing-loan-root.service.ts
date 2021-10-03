import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Config } from 'src/app/components/core/config/config';
@Injectable()
export class HousingLoanRootService {
  private useJson: boolean = false;
  housingData: any;
  private myInvestmentBaseUrl: string =
    Config.baseUrl + 'myinvestment-service/' + Config.apiVersion;
  private houseLoanServiceBaseUrl: string =
    Config.baseUrl + 'houseloan-service/' + Config.apiVersion;
  private requestHeader;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.requestHeader = new HttpHeaders({
      userId: Config.userId,
    });
  }

  getDetailsOfHousingLoan() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/housingloan/e1.houseloan-service-details.json'
      );
    return this.httpClient.get(this.houseLoanServiceBaseUrl + '/detail', {
      headers: this.requestHeader,
    });
  }
  getPreviousDataOfHousingLoan() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/housingloan/e1.houseloan-service-previousdetails.json'
      );
    return this.httpClient.get(
      this.houseLoanServiceBaseUrl + '/previousdetails',
      {
        headers: this.requestHeader,
      }
    );
  }
  getLenderstypeOfHousingLoan() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/housingloan/e1.houseloan-service-lenderstype.json'
      );
    return this.httpClient.get(this.houseLoanServiceBaseUrl + '/lenderstype', {
      headers: this.requestHeader,
    });
  }
  getOverviewDataOfHousingLoan() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/housingloan/e1.houseloan-service-overview.json'
      );
    return this.httpClient.get(this.houseLoanServiceBaseUrl + '/overview', {
      headers: this.requestHeader,
    });
  }
  saveHousingLoanDetails(requestData, files) {
    let formData: FormData = new FormData();
    let body = JSON.stringify(requestData);
    formData.append('jsonString', body);
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        files[i] && formData.append('uploadFiles', files[i], files[i].name);
      }
    } else {
      formData.append('uploadFiles', '');
    }
    return this.httpClient.post(
      this.houseLoanServiceBaseUrl + '/save',
      formData,
      {
        headers: this.requestHeader,
      }
    );
  }
  validatePan(panId) {
    return this.httpClient.get(
      this.houseLoanServiceBaseUrl + '/validatePan?lenderPan=' + panId,
      { headers: this.requestHeader }
    );
  }
  attachmentView(reqNo, lineNum) {
    return this.httpClient.get(
      this.myInvestmentBaseUrl +
        '/attachment/list?type=HOUSING_LOAN&requestNumber=' +
        reqNo +
        '&lineNumber=' +
        lineNum,
      { headers: this.requestHeader }
    );
  }
  getPdfview(type, docId) {
    return this.httpClient.get(
      this.myInvestmentBaseUrl +
        '/attachment/view?type=' +
        type +
        '&documentId=' +
        docId,
      { headers: this.requestHeader, responseType: 'blob' }
    );
  }
}
