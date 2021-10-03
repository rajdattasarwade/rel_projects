import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../core/config/config';

@Injectable({
  providedIn: 'root',
})
export class ApplyLeaveService {
  // getData from leave-reconciliation-service/1.0/list api
  // Sample json ********************************************
  // leave_balance = [
  //   {
  //     leaveCode: '0300',
  //     leaveDesc: 'Casual Leave',
  //     halfDayFlag: true,
  //     attachFlag: false,
  //     balance: 8.0,
  //     singleDayFlag: false,
  //   },
  //   {
  //     leaveCode: '0402',
  //     leaveDesc: 'Optional Holiday',
  //     halfDayFlag: false,
  //     attachFlag: false,
  //     balance: 3.0,
  //     singleDayFlag: false,
  //   },
  //   {
  //     leaveCode: '0100',
  //     leaveDesc: 'Privilege Leave',
  //     halfDayFlag: false,
  //     attachFlag: false,
  //     balance: 9.0,
  //     singleDayFlag: false,
  //   },
  //   {
  //     leaveCode: '0105',
  //     leaveDesc: 'Advance PL',
  //     halfDayFlag: false,
  //     attachFlag: false,
  //     balance: 24.0,
  //     singleDayFlag: false,
  //   },
  //   {
  //     leaveCode: '0205',
  //     leaveDesc: 'Advance SL',
  //     halfDayFlag: true,
  //     attachFlag: true,
  //     balance: 24.0,
  //     singleDayFlag: false,
  //   },
  //   {
  //     leaveCode: '0150',
  //     leaveDesc: 'Leave Without Pay(LWP)',
  //     halfDayFlag: false,
  //     attachFlag: false,
  //     balance: 2000.0,
  //     singleDayFlag: false,
  //   },
  //   {
  //     leaveCode: '0450',
  //     leaveDesc: 'Outdoor Duty',
  //     halfDayFlag: false,
  //     attachFlag: false,
  //     balance: 2000.0,
  //     singleDayFlag: false,
  //   },
  //   {
  //     leaveCode: '0570',
  //     leaveDesc: 'PH Leave',
  //     halfDayFlag: false,
  //     attachFlag: false,
  //     balance: 24.0,
  //     singleDayFlag: true,
  //   },
  //   {
  //     leaveCode: '0455',
  //     leaveDesc: 'Work From Home (WFH)',
  //     halfDayFlag: false,
  //     attachFlag: false,
  //     balance: 2000.0,
  //     singleDayFlag: false,
  //   },
  // ];
  // Sample json ********************************************
  baseUrl: string;
  reqOptions = {
    headers: new HttpHeaders({
      userId: Config.userId,
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  getLeavesBalance() {
    return this.http.get(
      Config.baseUrl + 'leave-service/1.0/balance',
      this.reqOptions
    );
  }
}
