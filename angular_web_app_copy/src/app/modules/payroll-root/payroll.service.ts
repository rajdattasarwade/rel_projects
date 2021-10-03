import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../components/core/config/config';
import { Observable } from 'rxjs';

@Injectable()
export class PayrollService {
  private commonUrl = Config.baseUrl + `view-payslip-service/1.0`;
  getPdfUrl: string = Config.baseUrl + `view-payslip-service/1.0/view`;
  sendPdfToMail: string = Config.baseUrl + `view-payslip-service/1.0/sendmail?`;
  variablePayurl: string =
    Config.baseUrl + `financial-utility-service/1.0/paydetail`;
  taxSummaryUrl: string =
    Config.baseUrl +
    `view-payslip-service/${Config.apiVersion}/fetch/tax/summary`;
  loansUrl: string =
    Config.baseUrl + `view-payslip-service/${Config.apiVersion}/fetch/loans`;

  //total pay statment url
  private getPayStatmentPdfUrl =
    Config.baseUrl + `financial-utility-service/${Config.apiVersion}/ctc`;
  private choicePayBaseURL =
    Config.baseUrl + 'choicepay-selection-service/' + Config.apiVersion;
  private salaryDeductBaseURL =
    Config.baseUrl +
    `salary-deduction-service/${Config.apiVersion}/salary/deducted`;

  emailUrl = Config.baseUrl + `form16-service/${Config.apiVersion}/sendmail/`;
  viewDetailsList: string =
    Config.baseUrl + `form16-service/${Config.apiVersion}/detail`;
  // viewPayslip: string =Config.baseUrl + `view-payslip-service/${Config.apiVersion}/summary`;
  bankDetailsUrl: string =
    Config.baseUrl + `bank-detail-service/1.0/employeedetail`;
  yearListUrl: string =
    Config.baseUrl + `form16-service/${Config.apiVersion}/yearList`;
  viewFormPdf: string =
    Config.baseUrl + `form16-service/${Config.apiVersion}/view/detail`;
  public requestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  attenDanceData: any;
  choicePay: { payData: []; payDetail: [] };
  constructor(private http: HttpClient) {}
  getPDFbyYear(year, month) {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    });
    let url = this.getPdfUrl + '?year=' + year + '&month=' + month;
    return this.http.get(url, { headers: requestHeader, responseType: 'blob' });
  }
  getVariablePay(): Observable<any> {
    return this.http.get(this.variablePayurl, this.requestHeader);
  }

  getpayslipData(year, month) {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = this.commonUrl + '/summary?year=' + year + '&month=' + month;
    return this.http.get(url, { headers: requestHeader });
  }
  getTaxSummaryDetails(): Observable<any> {
    return this.http.get(this.taxSummaryUrl, this.requestHeader);
  }

  getLoansDetails(): Observable<any> {
    return this.http.get(this.loansUrl, this.requestHeader);
  }

  getTaxProjectionPDF(month, year) {
    var apiUrl =
      Config.baseUrl +
      `financial-utility-service/${Config.apiVersion}/tax/${month}/${year}`;
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    });
    return this.http.get(apiUrl, {
      headers: requestHeader,
      responseType: 'blob'
    });
  }

  //get pdf for total pay statment
  getTotalPayStatmentPDF(): Observable<any> {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    });
    return this.http.get(this.getPayStatmentPdfUrl, {
      headers: requestHeader,
      responseType: 'blob'
    });
  }

  //get effective date for choice pay data
  getChoicePayPeriod(): Observable<any> {
    // return this.http.get('assets/files/choicepay/choicepay_effectivedate.json');
    return this.http.get(this.choicePayBaseURL + '/period', this.requestHeader);
  }

  //get choice pay data for total pay statment page
  getChoicePayComponents(effectiveDate: number): Observable<any> {
    // return this.http.get('assets/files/choicepay/choicepay_details.json');
    return this.http.get(
      this.choicePayBaseURL + '/detail?effectiveDate=' + effectiveDate,
      this.requestHeader
    );
  }
  //to cache attendance data
  getCachedAttendance(data) {
    this.attenDanceData = data;
  }

  //to get salarydeductData
  getSalaryDeductData(date): Observable<any> {
    return this.http.get(
      this.salaryDeductBaseURL + '/dates?datetime=' + date,
      this.requestHeader
    );
  }
  getBankDetails(): Observable<any> {
    return this.http.get(this.bankDetailsUrl, this.requestHeader);
  }
  getYearList(): Observable<any> {
    return this.http.get(this.yearListUrl, this.requestHeader);
  }

  getDetailsLlist(year): Observable<any> {
    let url = this.viewDetailsList + '?year=' + year;
    return this.http.get(url, this.requestHeader);
  }

  getForm(form16DateTime, financialYear, permanentNo, dataId): Observable<any> {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    });
    let url =
      this.viewFormPdf +
      '?form16DateTime=' +
      form16DateTime +
      '&financialYear=' +
      financialYear +
      '&permanentNo=' +
      permanentNo +
      '&dataId=' +
      dataId;
    return this.http.get(url, {
      headers: requestHeader,
      responseType: 'blob' as 'json'
    });
  }
  sendEmailWithPDF(year: string, emailId: string) {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    });
    let url = this.emailUrl + year + '?emailId=' + emailId;
    return this.http.get(url, { headers: requestHeader });
  }
  sendEmail(emailAdd: string, year, month) {
    return this.http.post(
      this.sendPdfToMail +
        'emailId=' +
        emailAdd +
        '&year=' +
        year +
        '&month=' +
        month,
      {},
      this.requestHeader
    );
  }
  sendTaxProjectionMail(emailId, month, year) {
    let url =
      Config.baseUrl +
      `financial-utility-service/${Config.apiVersion}/sendmail?emailId=` +
      emailId +
      `&docType=TAX&year=` +
      year +
      `&month=` +
      month;
    return this.http.post(url, {}, this.requestHeader);
  }
  private date1: any;
  get getDates() {
    return this.date1;
  }
  set setDates(obj: any) {
    this.date1 = obj;
  }
  setchoicePayData(data): void {
    this.choicePay = data;
  }
  getChoicePayData(): any {
    return this.choicePay;
  }
}
