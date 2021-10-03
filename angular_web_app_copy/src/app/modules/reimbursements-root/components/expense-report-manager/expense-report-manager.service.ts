import {Injectable} from '@angular/core';
import { Config } from 'src/app/components/core/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ExpenseReportManagerService {

    private expenseReportManagerBaseUrl = Config.baseUrl + 'reimbursement-dashboard-service/' + Config.apiVersion;
    private datesData = new Subject<any>();
    private claimsReimbursement = new Subject<any>();
    constructor(private http: HttpClient){}

    public requestHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userId: Config.userId,
        }),
      };

    setClaimsReimbursement(data: any) {
        this.claimsReimbursement.next(data);
    }

    getClaimsReimbursement(): Observable<any> {
        return this.claimsReimbursement.asObservable();
    }

    setDatesData(dates: any) {
        this.datesData.next(dates);
    }

    getDatesData(): Observable<any> {
        return this.datesData.asObservable();
    }


    public getYears(): Observable<any> {
        let url = this.expenseReportManagerBaseUrl + '/years';
        return this.http.get(url, this.requestHeader);
    }

    public getdashboardbyYear(type, year): Observable<any> {
        let url = this.expenseReportManagerBaseUrl + '/dashboard/travel/summary?requestNumber='+''+'&type='+ type +'&value=REP&year='+ year;
        return this.http.get(url, this.requestHeader);
    }
    public getdashboardClaims(type, year, reqNumber): Observable<any> {
        let url = this.expenseReportManagerBaseUrl + '/dashboard/reimbursement/type?requestNumber='+ reqNumber +'&type='+ type +'&value=EXPTY&year='+ year;
        return this.http.get(url, this.requestHeader);
    }

    public getClaimsList(type, year, reqNumber, value): Observable<any> {
        let url = this.expenseReportManagerBaseUrl + '/dashboard/reimbursement/claim?requestNumber='+ reqNumber +'&type='+ type+'&value='+ value +'&year='+ year;
        return this.http.get(url, this.requestHeader);
    }

    public getPdfList(type, refNo): Observable<any> {
        let url = this.expenseReportManagerBaseUrl + '/dashboard/reimbursement/attech?refNo='+ refNo +'&type='+ type;
        return this.http.get(url, this.requestHeader);
    }
    public getPdfViewReimbursement(type, refNo, requestNumber, liNum): Observable<any> {
        let requestHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            userId: Config.userId,
          });
        let url = this.expenseReportManagerBaseUrl + '/dashboard/reimbursement/rpdf?requestNumber='+requestNumber+'&type='+type+'&refNo='+refNo+'&liNum='+liNum;
        return this.http.get(url, {
            headers: requestHeader,
            responseType: "blob"
        });
    }

    public getPdfViewtravel(type, tripNo, requestNumber, liNum): Observable<any> {
        let requestHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            userId: Config.userId,
          });
        let url = this.expenseReportManagerBaseUrl + '/dashboard/reimbursement/tpdf?requestNumber='+ requestNumber +'&type=HOTR&tripNo='+ tripNo +'&liNum='+ liNum;
        return this.http.get(url, {
            headers: requestHeader,
            responseType: "blob"
        });
    }
    
}