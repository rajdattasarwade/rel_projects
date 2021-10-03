import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Config } from '../config/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable()
export class UserService {
  private baseUrl: string = Config.baseUrl;
  private encyptionKeyUrl: string =
    this.baseUrl + `covid-service/${Config.apiVersion}/covid/key`;

  private regBaseUrl: string = `regularize-service/${Config.apiVersion}`;
  private userProfileDetail: string =
    this.baseUrl + `user-info-service/${Config.apiVersion}/newUser/profile`;
  private isManagerUrl: string =
    this.baseUrl + `user-info-service/${Config.apiVersion}/isManager`;
  private reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
  public userAppServiceSubject = new Subject<any>();
  public userAppServiceObservable = this.userAppServiceSubject.asObservable();
  public servicesList = [];
  public recentlyUsedServices = [];
  public trendingServices = [];
  currentService: any;
  results: any;
  userId: string;
  appName: string;
  isHomePageActive: string = '';
  isServicesActive: string = '';
  isDashboardActive: string = '';
  isMoreActive: string = '';
  themeSubject: Subject<any> = new Subject();
  public isSearchToggleSubject = new Subject<boolean>();
  public isSearchToggleObservable = this.isSearchToggleSubject.asObservable();
  public isSideNavSubject = new Subject<boolean>();
  public isSideNavObservable = this.isSideNavSubject.asObservable();
  public isSearchHeightSubject = new Subject<number>();
  public isSearchHeightObservable = this.isSearchHeightSubject.asObservable();
  constructor(private http: HttpClient) {
    this.userId = Config.userId;
    this.setHeaders();
  }

  setHeaders() {
    this.reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
  }

  //   getUserDetails(): Observable<userProfileData> {
  //     // var reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
  //     return this.http.get(this.userProfileDetail).map((res: any) => res);
  //   }

  getUserDetails() {
    // var reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
    return this.http.get(this.userProfileDetail).map((res: any) => res);
  }

  getData(url: String) {
    return this.http.get(this.baseUrl + url).map(this.extractData);
  }

  getBUIdentifier() {
    let reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
    return this.http.get(
      this.baseUrl + `user-info-service/${Config.apiVersion}/buidentifier`,
      reqOptions
    );
  }
  postData(url: String, body: any) {
    let reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
    return this.http
      .post(this.baseUrl + url, body, reqOptions)
      .map(this.extractData);
  }

  getRegReason(url: String) {
    return (
      this.http
        .get(this.baseUrl + this.regBaseUrl + url, this.reqOptions)
        // return this.http.get('https://api.myjson.com/bins/hn8sz')
        .map((res: any) => res)
        .toPromise()
    );
  }

  getRetailAllHoliday() {
    return this.http
      .get(
        `http://hrkuberlb.azs.ril.com/api/retail/retail-holiday-service/details`
      )
      .map((res: any) => res);
  }

  getAllHoliday(year, skipLoader = false) {
    let custom_params = skipLoader ? new CustomHttpParams(true) : null;
    return this.http
      .get(
        this.baseUrl + `holiday-service/${Config.apiVersion}/details/${year}`,
        { params: custom_params }
      )
      .map((res: any) => res);
  }

  getAllFeedbackCategory() {
    return this.http
      .get(this.baseUrl + `feedback-service/${Config.apiVersion}/category`)
      .map((res: any) => res);
  }

  getRateData(name) {
    return this.http
      .get(this.baseUrl + `feedback-service/${Config.apiVersion}/rate/${name}`)
      .map((res: any) => res);
  }
  getEncyptionKey() {
    var reqOptions = {
      headers: new HttpHeaders({ userId: Config.userId }),
      responseType: 'text' as 'text',
    };
    return this.http.get(this.encyptionKeyUrl, reqOptions);
  }

  getAttendanceData(url: String, month: String, year: String): Observable<any> {
    return (
      this.http
        .get(
          this.baseUrl +
            `attendance-service/${Config.apiVersion}/details/${month}/${year}`,
          this.reqOptions
        )
        //return this.http.get('https://api.myjson.com/bins/w8r3l')
        .map((res: any) => res)
    );
  }

  getAttendanceDataDayWise(
    url: String,
    month: String,
    year: String
  ): Observable<any> {
    return this.http
      .get(
        this.baseUrl +
          `attendance-service/${Config.apiVersion}/details/day/${month}/${year}`,
        this.reqOptions
      )
      .map((res: any) => res);
  }

  getSubOrdinates(): Observable<any> {
    return this.http
      .get(
        this.baseUrl + `user-info-service/${Config.apiVersion}/subordinate`,
        this.reqOptions
      )
      .map((res: any) => res);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getAttData(url: string) {
    return this.http.get(url).map((res: any) => res);
  }

  starRatePost(starData) {
    let reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
    return this.http
      .post(
        this.baseUrl + `feedback-service/${Config.apiVersion}/save`,
        starData,
        reqOptions
      )
      .map((res: any) => {
        return res;
      }); //.catch(this.handleError);
  }

  getStarRating(appName) {
    let reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
    return this.http
      .get(
        this.baseUrl +
          `feedback-service/${Config.apiVersion}/details/${appName}`,
        reqOptions
      )
      .map((res: any) => res);
  }

  getFavourites(userId) {
    return this.http
      .get(
        this.baseUrl + `bookmark-service/${Config.apiVersion}/details`,
        this.reqOptions
      )
      .map((res: any) => res);
  }

  postFavourites(data) {
    console.log('bookmark service called, this is the payload and headers ');
    console.log(data);
    console.log(this.reqOptions);
    console.log(Config.userId);
    var reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
    return this.http
      .post(
        this.baseUrl + `bookmark-service/${Config.apiVersion}/save`,
        data,
        reqOptions
      )
      .map((res: any) => res);
  }

  getCategoryServices() {
    // return this.http.get(this.baseUrl+`feedback-service/feedback/findAll`).map(res => res.json());
    //   let reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
    //   return this.http
    //     .get(this.baseUrl + `app-service/${Config.apiVersion}/detailsMap`, reqOptions)
    //     .map((res: any) => res);
    // }
    let reqOptions = {
      headers: new HttpHeaders({
        userId: Config.userId,
        buIdentifier: Config.bUnit,
      }),
    };
    return this.http
      .get(
        this.baseUrl + `app-service/${Config.apiVersion}/detailsMap`,
        reqOptions
      )
      .map((res: any) => res);
  }
  getServicesList() {
    // return this.http.get(this.baseUrl+`feedback-service/feedback/findAll`).map(res => res.json());
    var reqOptions = { headers: new HttpHeaders({ userId: Config.userId }) };
    return this.http
      .get(
        this.baseUrl + `app-service/${Config.apiVersion}/details`,
        reqOptions
      )
      .map((res: any) => res);
  }

  getRecentlyUsedServices() {
    var reqOptions = {
      headers: new HttpHeaders({
        userId: Config.userId,
        buIdentifier: Config.bUnit,
      }),
    };
    return this.http
      .get(
        this.baseUrl +
          `app-history-service/${Config.apiVersion}/details/${Config.limit}`,
        reqOptions
      )
      .map((res: any) => res);
  }

  getTrendingServices() {
    var reqOptions = {
      headers: new HttpHeaders({
        userId: Config.userId,
        buIdentifier: Config.bUnit,
      }),
    };
    return this.http
      .get(
        this.baseUrl +
          `app-history-service/${Config.apiVersion}/trending/${Config.days}/${Config.limit}?enablePriorityApp=true`,
        reqOptions
      )
      .map((res: any) => res);
  }

  postAppHistory(data) {
    let loadCounter = new CustomHttpParams(true);
    var reqOptions = {
      headers: new HttpHeaders({ userID: Config.userId }),
      params: loadCounter,
    };
    return this.http
      .post(
        this.baseUrl + `app-history-service/${Config.apiVersion}/save`,
        data,
        reqOptions
      )
      .map((res: any) => res);
  }
  applyTheme(themeId: string) {
    var reqOptions = {
      headers: new HttpHeaders({
        userID: Config.userId,
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(
      this.baseUrl +
        `theme-service/${Config.apiVersion}/apply?themeId=` +
        themeId,
      {},
      reqOptions
    );
  }
  getUserTheme(): Observable<any> {
    var reqOptions = { headers: new HttpHeaders({ userID: Config.userId }) };
    return this.http.get(
      this.baseUrl + `theme-service/${Config.apiVersion}/detail`,
      reqOptions
    );
  }

  isUserManager() {
    return this.http
      .get(this.isManagerUrl, this.reqOptions)
      .map((res: any) => res);
  }

  isFavService(appName) {
    var reqOptions = { headers: new HttpHeaders({ userID: Config.userId }) };
    return this.http
      .get(
        this.baseUrl +
          `bookmark-service/${Config.apiVersion}/details/info/${appName}`,
        reqOptions
      )
      .map((res: any) => res);
  }

  postGamificationRequest(data) {
    return this.http
      .post(Config.gamification_url + `registration`, data)
      .map((res) => res);
  }

  getUserAppData() {
    var reqOptions = { headers: new HttpHeaders({ userID: Config.userId }) };
    return this.http
      .get(
        this.baseUrl + `user-app-service/${Config.apiVersion}/details`,
        reqOptions
      )
      .map((res) => res);
  }

  postUserAppData(data) {
    var reqOptions = { headers: new HttpHeaders({ userID: Config.userId }) };
    return this.http
      .post(
        this.baseUrl + `user-app-service/${Config.apiVersion}/save`,
        data,
        reqOptions
      )
      .map((res) => res);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
  getHOTRecruitmentAccessibility(serviceName) {
    var reqOptions = { headers: new HttpHeaders({ userID: Config.userId }) };
    return this.http.get(
      this.baseUrl +
        `hrbp-access-service/${Config.apiVersion}/hot/recruitment/validation?serviceName=` +
        serviceName,
      reqOptions
    );
  }
  getQuickPollQuestion() {
    var reqOptions = { headers: new HttpHeaders({ userID: Config.userId }) };
    return this.http.get(
      this.baseUrl + 'quick-poll-service/' + Config.apiVersion + '/details',
      reqOptions
    );
  }
  getHRBPServiceAccessibility(serviceName, appId, isHrbpService) {
    const reqOptions = { headers: new HttpHeaders({ userID: Config.userId }) };
    const isUserHRBPURL =
      Config.baseUrl +
      'hrbp-access-service/' +
      Config.apiVersion +
      '/other/service/validation';
    const url =
      isUserHRBPURL +
      '?serviceName=' +
      serviceName +
      '&appId=' +
      appId +
      '&isHrbpService=' +
      isHrbpService;
    return this.http.get(url, reqOptions);
  }
  getAssignmentProfile() {
    let reqOptions = {
      headers: new HttpHeaders({ userId: Config.userId.substring(1) }),
    };
    return this.http.get(
      this.baseUrl +
        `search-learning-content-service/${Config.apiVersion}/assignments/profiles`,
      reqOptions
    );
  }
}

export class CustomHttpParams extends HttpParams {
  constructor(public skipLoader: boolean) {
    super();
  }
}
