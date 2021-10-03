import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Config } from 'src/app/components/core/config/config';
@Injectable()
export class HouseRentReceiptRootService {
  private useJson: boolean = false;
  housingData: any;
  private myInvestmentBaseUrl: string =
    Config.baseUrl + 'myinvestment-service/' + Config.apiVersion;
  private houseRentReceiptBaseUrl: string =
    Config.baseUrl + 'house-rent-receipt-service/' + Config.apiVersion;

  private requestHeader;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.requestHeader = new HttpHeaders({
      userId: Config.userId,
    });
  }
  getHouseRentReceiptOverview() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/houseRentReceipt/h1.house-rent-receipt-service-overview.json'
      );
    return this.httpClient.get(this.houseRentReceiptBaseUrl + '/overview', {
      headers: this.requestHeader,
    });
  }
  getMyInvestmentAttachmentList(type, requestNumber, lineNumber) {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/houseRentReceipt/h1.house-rent-receipt-service-my-investment-list.json'
      );
    return this.httpClient.get(
      this.myInvestmentBaseUrl +
        '/attachment/list?type=' +
        type +
        '&requestNumber=' +
        requestNumber +
        '&lineNumber=' +
        lineNumber,
      {
        headers: this.requestHeader,
      }
    );
  }

  saveHouseRentReceipt(requestData, file, fileName) {
    let formData: FormData = new FormData();
    let body = JSON.stringify(requestData);
    formData.append('jsonString', body);
    if (file) {
      formData.append('uploadFiles', file, fileName);
    } else {
      formData.append('uploadFiles', '');
    }
    return this.httpClient.post(
      this.houseRentReceiptBaseUrl + '/save',
      formData,
      {
        headers: this.requestHeader,
      }
    );
  }
  updateHouseRentReceipt(requestData, file, requestNumber, fileName) {
    let formData: FormData = new FormData();
    let body = JSON.stringify(requestData);
    formData.append('jsonString', body);
    if (file) {
      formData.append('uploadFiles', file, fileName);
    } else {
      formData.append('uploadFiles', '');
    }
    return this.httpClient.post(
      this.houseRentReceiptBaseUrl + '/update?requestNumber=' + requestNumber,
      formData,
      {
        headers: this.requestHeader,
      }
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
