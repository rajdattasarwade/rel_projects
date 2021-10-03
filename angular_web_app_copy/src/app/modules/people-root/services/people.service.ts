import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Config } from '../../../components/core/config/config';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private peopleDataUrl =
    Config.baseUrl + 'employee-directory-service/' + Config.apiVersion;
  private orgStructureDataUrl =
    Config.baseUrl + 'organization-service/' + Config.apiVersion;
  private searchEmpUrl: string =
    Config.baseUrl + 'employee-directory-service/' + Config.apiVersion;
  private guidelinesUrl: string =
    Config.baseUrl + 'guideline-documents-service/' + Config.apiVersion;
  private reqOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };
  userData: any;
  cacheOrgRelData: any;
  cacheReporteesObj: any;
  constructor(private http: HttpClient) { }

  getSelfReportees(userId) {
    return this.http.get(
      this.peopleDataUrl + '/hierarchy?managerId=' + userId,
      this.reqOptions
    );
  }

  getSelfPeers(userId) {
    return this.http.get(
      this.peopleDataUrl + '/hierarchy?managerId=' + userId,
      this.reqOptions
    );
  }
  searchEmployeeInfo(searchString) {
    return this.http.get(
      this.searchEmpUrl + '/details?searchKey=' + searchString,
      this.reqOptions
    );
  }
  getOrgRelationship() {
    return this.http.get(
      this.orgStructureDataUrl + '/hierarchy',
      this.reqOptions
    );
  }
  getReportees() {
    return this.http.get(
      this.orgStructureDataUrl + '/reportee',
      this.reqOptions
    );
  }
  cacheLogData(data) {
  this.userData=data
  }
  cacheOrgRelationship(data) {
    this.cacheOrgRelData=data
  }
  cacheReportees(data) {
    this.cacheReporteesObj=data
  }
  getGuidelines(appId) {
    let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    })
    let params = new HttpParams().set("appId",appId)
    return this.http.get(
      this.guidelinesUrl + '/guideline/doc/list',
      {
        headers,
        params
      }
     
    );
  }
  openGuidelinesPdf(docid) {
    let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    })
    let params = new HttpParams().set("docId",docid)
    return this.http.get(
      this.guidelinesUrl + '/guideline/doc/view',
      {
        headers,
        params,
        responseType: 'blob'
      }
     
    );
}
}
