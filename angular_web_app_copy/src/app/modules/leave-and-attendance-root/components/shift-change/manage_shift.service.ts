import { Injectable } from '@angular/core';
import { Config } from '../../../../components/core/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class ShiftService {
  private ManageShiftHistoryBaseUrl =
    Config.baseUrl + 'manage-shift-history-service/' + Config.apiVersion;
  private ManageShiftBaseUrl =
    Config.baseUrl + 'manage-shift-service/' + Config.apiVersion;
  private ManageShiftChangeBaseUrl =
    Config.baseUrl + 'manage-shift-change-service/' + Config.apiVersion;
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };

  private requestHeader;
  cachedDetail: any = [];
  cachedIndividualDetail: any = [];

  constructor(private http: HttpClient) {
    this.requestHeader = new HttpHeaders({
      userId: Config.userId,
    });
  }

  getIndividualHistory() {
    return this.http.get(this.ManageShiftHistoryBaseUrl + '/history', {
      headers: this.requestHeader,
    });
  }

  getMutualHistory() {
    return this.http.get(this.ManageShiftHistoryBaseUrl + '/mutual/history', {
      headers: this.requestHeader,
    });
  }
  getShiftList(dateInMilli: string) {
    return this.http.get(
      this.ManageShiftBaseUrl + '/individual/list?date=' + dateInMilli,
      { headers: this.requestHeader }
    );
  }

  getMutualList(dateInMilli: string) {
    return this.http.get(
      this.ManageShiftBaseUrl + '/mutual/list?date=' + dateInMilli,
      { headers: this.requestHeader }
    );
  }

  postIndividualSave(payload) {
    return this.http.post(
      this.ManageShiftChangeBaseUrl + '/individual/save',
      payload,
      { headers: this.requestHeader }
    );
  }

  postMutualSave(payload) {
    return this.http.post(
      this.ManageShiftChangeBaseUrl + '/peers/save',
      payload,
      { headers: this.requestHeader }
    );
  }

  cacheIndividualList(individualData) {
    this.cachedIndividualDetail = individualData;
  }

  cacheMutualList(mutualdata) {
    this.cachedDetail = mutualdata;
  }

  getManagerEmployees(fromDate, toDate) {
    return this.http.get(
      this.ManageShiftChangeBaseUrl +
        '/schedule/detail?fromDate=' +
        fromDate +
        '&toDate=' +
        toDate,
      { headers: this.requestHeader }
    );
  }

  postShiftPlanning(requestPayload) {
    return this.http.post(
      this.ManageShiftChangeBaseUrl + '/schedule/save',
      requestPayload,
      { headers: this.requestHeader }
    );
  }

  getOrgData(date) {
    return this.http.get(
      this.ManageShiftBaseUrl + '/organisation/list?date=' + date,
      this.reqOptions
    );
  }

  getShiftTimeData(date) {
    return this.http.get(
      this.ManageShiftBaseUrl + '/individual/list?date=' + date,
      this.reqOptions
    );
  }

  downloadTemplate() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/vnd.ms-excel',
      userId: Config.userId,
    });
    return this.http.get(this.ManageShiftChangeBaseUrl + '/download', {
      headers: headers,
      responseType: 'blob',
    });
  }

  uploadTemplate(file: File[]) {
    let headers = new HttpHeaders({
      userId: Config.userId,
    });
    const formData = new FormData();
    formData.append('file', file[0]);
    return this.http.post(this.ManageShiftChangeBaseUrl + '/upload', formData, {
      headers: headers,
    });
  }

  submitShiftChanges(payload) {
    return this.http.post(
      this.ManageShiftChangeBaseUrl + '/manager/save',
      payload,
      this.reqOptions
    );
  }

  getShiftData(fromDate, toDate, OrgUnit) {
    return this.http.get(
      this.ManageShiftBaseUrl +
        '/employee/plan?fromDate=' +
        fromDate +
        '&toDate=' +
        toDate +
        '&orgCode=' +
        OrgUnit,
      this.reqOptions
    );
  }
}
