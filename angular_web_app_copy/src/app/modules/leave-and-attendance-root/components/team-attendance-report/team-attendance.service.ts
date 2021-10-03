import { Injectable } from '@angular/core';
import { Config } from '../../../../components/core/config/config';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TeamAttendanceReport ,AttendanceMonthlyCount, SubordinateMothlyAttemdance , TeamAttendanceReportNew} from './team-attendance-report.model';

@Injectable()
export class TeamAttendanceService {
  public baseUrl: string = Config.baseUrl;
  private dailyAttendanceUrl =
    Config.baseUrl + 'team-punch-shift-service/' + Config.apiVersion;
  private teamOtCoffUrl: string =
    this.baseUrl + 'team-otcoff-leave-service/' + Config.apiVersion;
    private teamAttendanceUrl = 
    this.baseUrl + 'team-attendance-service/' + Config.apiVersion;
  private userId: string = '';
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };

  constructor(private http: HttpClient) {}
  public requestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };

  getLeaveDetails(year, subEmployeeNumber) {
    return this.http.get(
      this.teamOtCoffUrl +
        '/leave/details?year=' +
        year +
        '&subEmployeeNumber=' +
        subEmployeeNumber,
      this.requestHeader
    );
  }

  getLeaveCount(year, subEmployeeNumber) {
    return this.http.get(
      this.teamOtCoffUrl +
        '/leave/count?year=' +
        year +
        '&subEmployeeNumber=' +
        subEmployeeNumber,
      this.requestHeader
    );
  }
  getsubordinate(year) {
    return this.http.get(
      this.teamOtCoffUrl + '/subordinate/att/count?year=' + year,
      this.requestHeader
    );
  }

  getDailyAttendanceData(date, orgUnit) {
    return this.http.get(
      this.dailyAttendanceUrl +
        '/peer/punch/details?punchDate=' +
        date +
        '&organizationUnit=' +
        orgUnit +
        '&shiftCode=ZALL'
    );
  }

  getOrgUnit(date) {
    return this.http.get(
      this.dailyAttendanceUrl + '/punch/organization/unit?punchDate=' + date,
      this.reqOptions
    );
  }
  
  getAttStatusCount(month,year){
    return this.http.get(this.teamAttendanceUrl+"/team/"+month+"/"+year)
    .pipe(map((resultlist: any) => {
      return resultlist.map(item => new AttendanceMonthlyCount(item))
    }
    ));
  }

  getMonthlySubDetail(year,month,empNo){
    return this.http.get(
      this.teamOtCoffUrl + "/attendance/details?year="+year+"&month="+month+"&employeeNumber="+empNo,this.requestHeader)
      .pipe(map((resultlist: any) => {
        return resultlist.map(item => new SubordinateMothlyAttemdance(item))
      }
      ));
  }
  getColorCodeDetail(){
    return this.http.get(
      this.teamOtCoffUrl + '/attendance/colorcode',
      this.requestHeader
    );
  }

  getDetailsNew(month,year){
    return this.http.get(
        this.teamOtCoffUrl + '/monthly/attendance?month='+month+"&year="+year,this.requestHeader)
        .pipe(map((resultlist: any) => {
            return resultlist.map(item => new TeamAttendanceReportNew(item))
          }
      ));
  }

}
