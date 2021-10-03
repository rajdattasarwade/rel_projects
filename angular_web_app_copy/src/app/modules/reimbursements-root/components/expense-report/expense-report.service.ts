import { Injectable } from '@angular/core';
import { Config } from 'src/app/components/core/config/config';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable()
export class ExpenseReportService {

    private reimbursementBaseUrl = Config.baseUrl + 'expense-report-service/' + Config.apiVersion;
    private datesData = new Subject<any>();
    private empList = new Subject<any[]>();

    constructor(private http: HttpClient){}

    public requestHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userId: Config.userId,
        }),
      };

    setDatesData(dates: string) {
        this.datesData.next(dates);
    }

    getDatesData(): Observable<any> {
        return this.datesData.asObservable();
    }

    setEmployee(emps: any[]) {
      this.empList.next(emps);
    }

    getEmployee(): Observable<any> {
        return this.empList.asObservable();
    }

    getDates(): Observable<any> {
        let url = this.reimbursementBaseUrl + '/getdates';
        return this.http.get(url, this.requestHeader);
    }

    getEmployees(): Observable<any> {
      let url = this.reimbursementBaseUrl + '/employees';
      return this.http.get(url, this.requestHeader);
    }
      
    getReimbursementSummery(fromDate, toDate): Observable<any> {
        let url = this.reimbursementBaseUrl + '/reimbursementsummary?fromDateLong='+ fromDate+'&toDateLong='+ toDate;
        return this.http.get(url, this.requestHeader);
    }

    getReimbursementEmployee(fromDate, toDate): Observable<any> {
        let url = this.reimbursementBaseUrl + '/reimbursementemployee/all?fromDateLong='+ fromDate+'&toDateLong='+ toDate;
        return this.http.get(url, this.requestHeader);
    }

    getTravelSummery(fromDate, toDate): Observable<any> {
      let url = this.reimbursementBaseUrl + '/travelsummary?fromDateLong='+ fromDate+'&toDateLong='+ toDate;
      return this.http.get(url, this.requestHeader);
    }

    getTravelEmployee(fromDate, toDate): Observable<any> {
        let url = this.reimbursementBaseUrl + '/travelemployee/all?fromDateLong='+ fromDate+'&toDateLong='+ toDate;
        return this.http.get(url, this.requestHeader);
    }

    getEmployeeSearch(fromDate, toDate, empNo): Observable<any> {
      let requestHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        userId: Config.userId,
        empNo: empNo
      });
      let url = this.reimbursementBaseUrl + '/reimbursementemployee?fromDateLong='+ fromDate+'&toDateLong='+ toDate;
      return this.http.get(url, {headers: requestHeader});
    }
    getEmployeeTravelSearch(fromDate, toDate, empNo): Observable<any> {
      let requestHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        userId: Config.userId,
        empNo: empNo
      });
      let url = this.reimbursementBaseUrl + '/travelemployee?fromDateLong='+ fromDate+'&toDateLong='+ toDate;
      return this.http.get(url, {headers: requestHeader});
    }
    getTripDetails(tripNo): Observable<any> {
      let url = this.reimbursementBaseUrl + '/tripdetails?tripNo='+tripNo;
      return this.http.get(url, this.requestHeader);
    }
}