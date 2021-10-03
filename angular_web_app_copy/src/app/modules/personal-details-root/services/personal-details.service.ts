import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Config } from '../../../components/core/config/config';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {

  private requestHeader;
  private myManagerBaseUrl =
    Config.baseUrl + "mymanager-service/" + Config.apiVersion;
  private empsearchUrl =
    Config.baseUrl + `employee-directory-service/${Config.apiVersion}/`;
  private subordinatesBaseUrl =
    Config.baseUrl + "subordinate-service/" + Config.apiVersion;
    private myInsuranceBaseURL: string =
    Config.baseUrl + 'myinsurance-claim-service/' + Config.apiVersion;
    private employeeRelativeBaseURL: string =
    Config.baseUrl + 'employee-relative-service/' + Config.apiVersion;
    private employeeDependentBaseURL: string =
    Config.baseUrl + 'employee-dependent-service/' + Config.apiVersion;

  constructor(private http: HttpClient) {
    this.requestHeader = new HttpHeaders({
      userId: Config.userId
    });
  }

  getRequestHeaders() {
    return new HttpHeaders({
      userId: Config.userId,
      "Content-Type": "application/json"
    });
  }

  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };

  // My Manager/Subordinate service start
  getCurrentManager() {
    return this.http.get(this.myManagerBaseUrl + "/landing", {
      headers: this.requestHeader
    });
  }

  searchManager(searchQuery: string = "", searchWithEmpId: boolean = true) {
    if (searchWithEmpId) {
      return this.http.get(
        this.myManagerBaseUrl + "/search?permanentNumber=" + searchQuery,
        { headers: this.requestHeader }
      );
    } else {
      return this.http.get(
        this.myManagerBaseUrl + "/search?mail=" + searchQuery,
        { headers: this.requestHeader }
      );
    }
  }

  saveManager(requestPayload: any) {
    return this.http.post(this.myManagerBaseUrl + "/save", requestPayload, {
      headers: this.requestHeader
    });
  }

  serachEmpData(searchData) {
    return this.http
      .get(this.empsearchUrl + "details?searchKey=" + searchData, {headers: this.getRequestHeaders()});
  }

  getSubordinates() {
    return this.http.get(this.subordinatesBaseUrl + "/details", {
      headers: this.requestHeader
    });
  }

  saveSubordinates(requestPayload: any) {
    return this.http.post(
      this.subordinatesBaseUrl + "/save",
      requestPayload,
      { headers: this.requestHeader }
    );
  }

  // My Manager/Subordinate service end

  //Falimy details / Dependant service
  getEnrolleddependentsApi(planId: string, coverageId: string) {
    return this.http.get(
      this.myInsuranceBaseURL +
        '/enrolleddependents?planId=' +
        planId +
        '&coverageId=' +
        coverageId,
      this.reqOptions
    );
  }

  getRelativeDetailsOverviewAPI() {
    return this.http.get(
      this.employeeRelativeBaseURL + '/overview',
      this.reqOptions
    );
  }

  getEmployeeDependentServiceAPI() {
    return this.http.get(
      this.employeeDependentBaseURL + '/dependents',
      this.reqOptions
    );
  }

  saveRelativePostAPI(requestObj: any) {
    let body = JSON.stringify(requestObj);
    const header = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(
      `${this.employeeRelativeBaseURL}/save`,
      body,
      this.reqOptions
    );
  }

  //Getter and setter lookupdata for family details.
  private getAttachmentFromDocIdBaseUrl: String =
    Config.baseUrl + 'important-dates-service/' + Config.apiVersion;
  private lookupdata: any;
  get getLookupdata(): any {
    return this.lookupdata;
  }
  setLookupdata(lookupdata) {
    this.lookupdata = lookupdata;
  }

  getLookupDataApi() {
    return this.http.get(
      this.employeeDependentBaseURL + '/lookup',
      this.reqOptions
    );
  }

  getNoReasonAPI() {
    return this.http.get(
      this.employeeRelativeBaseURL + '/relationset?reasonFlag=Y',
      this.reqOptions
    );
  }

  saveDependentApi(requestObj: any, attachment: any) {
    let formData: FormData = new FormData();
    let body = JSON.stringify(requestObj);
    formData.append('jsonString', body);
    if (attachment === undefined || attachment === null) {
      formData.append('files', null);
    } else {
      formData.append('files', attachment, attachment.name);
    }
    const header = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(`${this.employeeDependentBaseURL}/save`, formData, {
      headers: header,
    });
  }

  editDependentUpdateApi(requestObj: any, attachment: any) {
    let formData: FormData = new FormData();
    let body = JSON.stringify(requestObj);
    formData.append('jsonString', body);
    if (attachment === undefined || attachment === null) {
      formData.append('files', null);
    } else {
      formData.append('files', attachment, attachment.name);
    }
    const header = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(`${this.employeeDependentBaseURL}/update`, formData, {
      headers: header,
    });
  }
  getDependentAttachment(docId) {
    const httpHeader = this.getRequestHeaders();
    let url =
      this.getAttachmentFromDocIdBaseUrl +
      '/viewattachment' +
      '?documentId=' +
      docId;
    return this.http.get(url, {
      headers: httpHeader,
      responseType: 'blob' as 'json',
    });
  }
  
  removeRelativePostAPI(requestObj: any) {
    let body = JSON.stringify(requestObj);
    const header = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(
      `${this.employeeRelativeBaseURL}/remove`,
      body,
      this.reqOptions
    );
  }
}
