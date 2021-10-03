import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from 'src/app/components/core/config/config';

@Injectable({
  providedIn: 'root',
})
export class LeaveAndAttendanceRootService {
  colorCodeJson = [
    {
      attendanceType: 'ABS',
      attendanceColorCode: '#FF9797',
    },
    {
      attendanceType: 'LWP',
      attendanceColorCode: '#FF9797',
    },
    {
      attendanceType: 'PH',
      attendanceColorCode: '#8EF091',
    },
    {
      attendanceType: 'PL DED',
      attendanceColorCode: '#FFA54A',
    },
    {
      attendanceType: 'WO',
      attendanceColorCode: '#8EF091',
    },
    {
      attendanceType: 'PRS',
      attendanceColorCode: '#8EF091',
    },
  ];

  public pendingWithManager = {
    pendingCount: 0,
  };

  public absCountRes = {
    noOfABSPerTwoMonths: 38.0,
    noOfLeavesRegPerTwoMonths: 0.0,
    weeklyHours: null,
  };

  private baseUrl: string = Config.baseUrl;
  public reqOptions = {
    headers: new HttpHeaders({ userId: Config.userId }),
  };

  constructor(private http: HttpClient) {}

  getAbsCount(month, year) {
    // var absCount = {
    //   noOfABSPerTwoMonths: 2.0,
    //   month: '08',
    //   year: '2020',
    // };
    // return absCount;
    return this.http.get(
      Config.baseUrl +
        'attendance-service/' +
        Config.apiVersion +
        '/count/day/' +
        month +
        '/' +
        year +
        '/',
      this.reqOptions
    );
  }

  storeColorCodes() {
    return this.http.get(
      Config.baseUrl +
        'team-otcoff-leave-service/' +
        Config.apiVersion +
        '/attendance/colorcode',
      this.reqOptions
    );
  }
  getRegularizePopup(date) {
    return this.http.get(
      Config.baseUrl +
        'regularize-service/' +
        Config.apiVersion +
        '/payroll/check?leaveDate=' +
        date,
      this.reqOptions
    );
  }
  applyLeave(payload) {
    return this.http.post(
      Config.baseUrl + 'leave-apply-service/' + Config.apiVersion + '/save',
      payload,
      this.reqOptions
    );
  }
  uploadAttachment(file, leaveData) {
    let formData: FormData = new FormData();
    let body = JSON.stringify(leaveData);
    formData.append('jsonStr', body);
    formData.append('files', file, file.name);
    return this.http.post(
      Config.baseUrl +
        'leave-apply-service/' +
        Config.apiVersion +
        '/save/attachment',
      formData,
      this.reqOptions
    );
  }

  //get regularization reasons
  getReguReasons() {
    return this.http.get(
      Config.baseUrl + 'regularize-service/' + Config.apiVersion + '/reason',
      this.reqOptions
    );
  }

  //post regularization
  saveRegularization(body) {
    return this.http
      .post(
        Config.baseUrl +
          'regularize-apply-service/' +
          Config.apiVersion +
          '/save',
        body,
        this.reqOptions
      )
      .map((res: any) => res);
  }
  getShiftDetailSet(date: String) {
    return this.http.get(
      Config.baseUrl +
        'leave-service/' +
        Config.apiVersion +
        '/shiftDetailSet?date=' +
        date +
        '&userName=',
      this.reqOptions
    );
  }

  getOTSlipSubordinate() {
    return this.http.get(
      Config.baseUrl +
        'leave-ot-slip-service/' +
        Config.apiVersion +
        '/leave/otslip/subordinates'
    );
  }

  getOTSlipPdf(employeeId, beginDate, endDate) {
    return this.http.get(
      Config.baseUrl +
        'leave-ot-slip-service/' +
        Config.apiVersion +
        '/otslip/pdf' +
        '?employeeId=' +
        employeeId +
        '&beginDate=' +
        beginDate +
        '&endDate=' +
        endDate,
      { responseType: 'blob' }
    );
  }

  sendOTSlipMail(payload) {
    return this.http.post(
      Config.baseUrl +
        'leave-ot-slip-service/' +
        Config.apiVersion +
        '/otslip/pdf/email',
      payload,
      this.reqOptions
    );
  }

  getOTSlipEligibility() {
    return this.http.get(
      Config.baseUrl +
        'leave-ot-slip-service/' +
        Config.apiVersion +
        '/leave/otslip/eligibility',
      this.reqOptions
    );
  }
}
