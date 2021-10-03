import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Config } from '../../../components/core/config/config';
import { OverviewDetails, DetailsCOV } from '../benifit-model';

@Injectable({
  providedIn: 'root',
})
export class BenefitsService {
  private myInsuranceBaseURL: string =
    Config.baseUrl + 'myinsurance-claim-service/' + Config.apiVersion;
  private myRetiralBaseURL: string =
    Config.baseUrl + 'retiral-benefits-service/' + Config.apiVersion;
  private myMdicalBaseURL: string =
    Config.baseUrl + 'medical-service/' + Config.apiVersion;
  private employeeDependentBaseURL: string =
    Config.baseUrl + 'employee-dependent-service/' + Config.apiVersion;
  private employeeRelativeBaseURL: string =
    Config.baseUrl + 'employee-relative-service/' + Config.apiVersion;

  selectedOption: string;

  private teamAdvanceServiceURL: string =
    Config.baseUrl + 'team-advances-service/' + Config.apiVersion;
  private clvBaseURL: string =
    Config.baseUrl + 'clv-service/' + Config.apiVersion;
  private rcBookDocUrl: string = this.clvBaseURL + '/rcbook';
  private insuranceDocUrl: string = this.clvBaseURL + '/insurancedoc';
  private scheduleDocUrl: string = this.clvBaseURL + '/repaymentschedule';
  private marriageLoanUrl =
    Config.baseUrl + `marriage-loan-service/` + Config.apiVersion;
  private policySetUrl =
    Config.baseUrl + `view-policy-service/` + Config.apiVersion;
  private videoUrl =
    Config.baseUrl + `guideline-documents-service/` + Config.apiVersion;
  private educationBaseUrl: string =
    Config.baseUrl + 'educational-assistance-service/' + Config.apiVersion;

  public teamServiceBaseUrl =
    Config.baseUrl + `team-advances-service/${Config.apiVersion}/`;

  public marriageLoanServiceBaseUrl =
    Config.baseUrl + `marriage-loan-service/${Config.apiVersion}/`;
  public deductionsOnReqUrl =
    Config.baseUrl +
    `deductions-on-request-service/${Config.apiVersion}/history`;

  public marriageLoanSummaryUrl =
    Config.baseUrl + `loans-and-advances-service/${Config.apiVersion}/history`;
  public teamHistoryUrl = this.teamServiceBaseUrl + 'history';
  public marriageLoansHistoryUrl = this.marriageLoanServiceBaseUrl + 'history';

  public teamAdvancesValidateUrl = this.teamServiceBaseUrl + 'validity';
  public marriageLoanValidateUrl = this.marriageLoanServiceBaseUrl + 'validity';
  public teamDetailsUrl = this.teamServiceBaseUrl + 'detail';
  public advanceTypesUrl = this.teamServiceBaseUrl + 'types';
  public recoveryMonthsUrl = this.teamServiceBaseUrl + 'recoverymonths';
  public viewDetailsMarriageUrl = this.marriageLoanServiceBaseUrl + 'view';
  public dowloadPdfUrl = this.marriageLoanServiceBaseUrl + 'download';
  private marriageHeaderBaseUrl: string =
    Config.baseUrl + 'marriage-loan-service/' + Config.apiVersion;

  public marriageLoanCreateUrl = this.marriageLoanServiceBaseUrl + 'create';
  public deleteMarrigeLoanUrl = this.marriageLoanServiceBaseUrl + 'delete';
  public teamAdvDeleteUrl = this.teamServiceBaseUrl + 'delete';
  private marriageRepayHeaderBaseUrl: string =
    Config.baseUrl + 'marriage-loan-service/' + Config.apiVersion;
  public viewAttachementUrl =
    this.marriageLoanServiceBaseUrl + 'view/attachment';

  private getRequestHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
  }

  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };

  constructor(private http: HttpClient) {}

  getCoverageOverview() {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(this.myInsuranceBaseURL + '/coverageoverview', {
      headers: httpHeader,
    });
  }

  getCVOverview() {
    const httpHeader = this.getRequestHeaders();
    return this.http
      .get(this.clvBaseURL + '/overview', { headers: httpHeader })
      .pipe(
        map((resultlist: any) => {
          return resultlist.map((item) => new OverviewDetails(item));
        })
      );
  }
  getUndertaking(requestId: string, isClv: boolean) {
    return this.http.get(
      this.clvBaseURL +
        '/undertakingform?requestId=' +
        requestId +
        '&isClv=' +
        isClv,
      { headers: this.getRequestHeaders(), responseType: 'blob' }
    );
  }

  getClvCovDetails(id: string, isCov: boolean) {
    if (isCov) {
      return this.http.get(this.clvBaseURL + '/covdetail?covId=' + id, {
        headers: this.getRequestHeaders(),
      });
    } else {
      return this.http.get(this.clvBaseURL + '/detail?clvId=' + id, {
        headers: this.getRequestHeaders(),
      });
    }
  }

  getRcBookDoc(clvRequstId) {
    return this.http.get(this.rcBookDocUrl + '/' + clvRequstId, {
      headers: this.getRequestHeaders(),
      responseType: 'blob',
    });
  }

  getInsuranceDoc(clvRequstId) {
    return this.http.get(this.insuranceDocUrl + '/' + clvRequstId, {
      headers: this.getRequestHeaders(),
      responseType: 'blob',
    });
  }

  getScheduleDoc(clvRequstId) {
    return this.http.get(this.scheduleDocUrl + '/' + clvRequstId, {
      headers: this.getRequestHeaders(),
      responseType: 'blob',
    });
  }

  getLookUpData() {
    return this.http.get(this.clvBaseURL + '/lookup', {
      headers: this.getRequestHeaders(),
    });
  }

  submitClvRequest(dataObj: any) {
    const body = JSON.stringify(dataObj);
    return this.http.post(this.clvBaseURL + '/save', body, {
      headers: this.getRequestHeaders(),
    });
  }

  removeSpaceAtFirstPosition(event) {
    const pattern = /^[a-zA-Z ]*$/;
    if (
      event.target.value.charAt(0) === ' ' ||
      !pattern.test(event.target.value)
    ) {
      return true;
    }
  }

  setNumeric(inputVal) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(inputVal)) {
      return true;
    }
  }

  setAlphaNumeric(inputVal, allowSpace) {
    const regex = allowSpace ? /^[A-Za-z0-9- ]+$/g : /^[A-Za-z0-9-]+$/g;
    if (regex.test(inputVal)) {
      return false;
    } else {
      return true;
    }
  }

  spacevalidation(event) {
    if (event.target.value.charAt(0) === ' ') {
      return true;
    }
  }

  setAlphabetOnly(inputVal, allowSpace) {
    const regex = allowSpace ? /^[a-zA-Z ]+$/g : /^[a-zA-Z]+$/g;
    if (regex.test(inputVal)) {
      return false;
    } else {
      return true;
    }
  }

  getRetiralInfo() {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(this.myRetiralBaseURL + '/summary', {
      headers: httpHeader,
    });
  }

  getRetiralDeduction(year, month) {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      this.myRetiralBaseURL + '/month/summary?year=' + year + '&month=' + month,
      {
        headers: httpHeader,
      }
    );
  }
  getPMELetter(pmeFor, ageValue, amountValue) {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
      pmeFor: pmeFor,
      age: ageValue,
      amount: amountValue,
    });
    return this.http.get(this.myMdicalBaseURL + '/letter', {
      headers: requestHeader,
      responseType: 'blob',
    });
  }
  getmedicalCenters() {
    return this.http.get(
      Config.baseUrl +
        'myinsurance-claim-service/' +
        Config.apiVersion +
        '/claim/desk/address?type=HELT',
      this.reqOptions
    );
  }
  getHealthWellnessInfo() {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(this.myMdicalBaseURL + '/details', {
      headers: httpHeader,
    });
  }
  /***
   *
   * Maternity/Paternity details
   */
  getTeamAddress() {
    return this.http.get(
      Config.baseUrl +
        'myinsurance-claim-service/' +
        Config.apiVersion +
        '/claim/desk/address?type=PATR',
      this.reqOptions
    );
  }
  viewPolicyAttachment(documentId) {
    return this.http.get(
      Config.baseUrl +
        'view-policy-service/' +
        Config.apiVersion +
        '/attachment/view?documentId=' +
        documentId,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userId: Config.userId,
        }),
        responseType: 'blob',
      }
    );
  }
  downloadRequestForm() {
    return this.http.get(
      Config.baseUrl +
        'view-policy-service/' +
        Config.apiVersion +
        '/benefits/policy?key=MATD',
      this.reqOptions
    );
  }
  /***
   *
   * END Maternity/Paternity loan details
   */
  // Advance Loan API Start
  getAdvanceLoanType() {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(this.teamAdvanceServiceURL + '/types', {
      headers: httpHeader,
    });
  }

  getRecoveryMonth() {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(this.teamAdvanceServiceURL + '/recoverymonths', {
      headers: httpHeader,
    });
  }

  saveTeamBuildLoan(obj) {
    let body = JSON.stringify(obj);
    return this.http.post(
      `${this.teamAdvanceServiceURL}/create`,
      body,
      this.reqOptions
    );
  }
  // Advance Loan API End
  /***
   *
   * Marriage loan details
   */
  getLoanStatus() {
    return this.http.get(
      this.marriageLoanUrl + '/history?skip=0&top=100&inlineCount=allpages',
      this.reqOptions
    );
  }
  getPolicyset(key) {
    return this.http.get(
      this.policySetUrl + '/benefits/policy?key=' + key,
      this.reqOptions
    );
  }

  getEducationOverview() {
    return this.http.get(this.educationBaseUrl + '/overview', this.reqOptions);
  }

  editEducationRequest(requestNo) {
    return this.http.get(
      this.educationBaseUrl + '/detail?requestNo=' + requestNo,
      this.reqOptions
    );
  }

  deleteEducationRequest(requestObj) {
    let headers = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(this.educationBaseUrl + '/delete', requestObj, {
      headers: headers,
    });
  }

  getReqDocuments(requestNo) {
    return this.http.get(
      this.educationBaseUrl + '/attachmentlist?reqNo=' + requestNo,
      this.reqOptions
    );
  }

  getEducationDropdown(type) {
    return this.http.get(
      this.educationBaseUrl + '/dropdown?type=' + type,
      this.reqOptions
    );
  }

  getRequestValidation() {
    return this.http.get(
      this.educationBaseUrl + '/validation',
      this.reqOptions
    );
  }

  downloadPolicyDoc(requestNo) {
    let headers = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.get(
      this.educationBaseUrl +
        '/download?documentNumber=A' +
        '&requestType=' +
        requestNo,
      {
        headers: headers,
        responseType: 'blob',
      }
    );
  }

  viewAttachments(documentNumber) {
    let headers = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.get(
      this.educationBaseUrl +
        '/download?documentNumber=' +
        documentNumber +
        '&requestType=AA',
      {
        headers: headers,
        responseType: 'blob',
      }
    );
  }

  createEducationRequest(editFlag, form, files) {
    let updateOrCreate = editFlag ? '/update' : '/create';
    let formData: FormData = new FormData();
    let body = JSON.stringify(form);
    formData.append('jsonString', body);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    const header = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(this.educationBaseUrl + updateOrCreate, formData, {
      headers: header,
    });
  }

  generateVideo(id: String) {
    let httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
    return this.http.get(this.videoUrl + '/guideline/doc/view?docId=' + id, {
      headers: httpHeader,
      responseType: 'blob',
    });
  }
  /***
   *
   * END Marriage loan details
   */

  /**
   * Claim Insurance View Edit
   */
  private planId: string;
  private coverageId: string;
  private useJson: boolean = false;
  private lookupdata: any;
  get getLookupdata(): any {
    return this.lookupdata;
  }
  setLookupdata(lookupdata) {
    this.lookupdata = lookupdata;
  }
  get getPlanId(): string {
    return this.planId;
  }
  setPlainId(planId: string) {
    this.planId = planId;
  }
  get getCoverageId(): string {
    return this.coverageId;
  }
  setCoverageId(coverageId: string) {
    this.coverageId = coverageId;
  }
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
  getViewbeneficiariesApi(planId: string) {
    if (this.useJson)
      return this.http.get('assets/files/benefits/viewbeneficiaries.json');
    return this.http.get(
      this.myInsuranceBaseURL + '/viewbeneficiaries?planId=' + planId,
      this.reqOptions
    );
  }

  getLookupDataApi() {
    return this.http.get(
      this.employeeDependentBaseURL + '/lookup',
      this.reqOptions
    );
  }

  getEmployeeDependentServiceAPI() {
    return this.http.get(
      this.employeeDependentBaseURL + '/dependents',
      this.reqOptions
    );
  }
  getNoReasonAPI() {
    return this.http.get(
      this.employeeRelativeBaseURL + '/relationset?reasonFlag=Y',
      this.reqOptions
    );
  }
  getRelativeDropdownAPI() {
    return this.http.get(
      this.employeeRelativeBaseURL + '/relationset',
      this.reqOptions
    );
  }
  getRelativeDetailsOverviewAPI() {
    return this.http.get(
      this.employeeRelativeBaseURL + '/overview',
      this.reqOptions
    );
  }
  searchRelativeAPI(firstName: string, mail: string, mobile: string) {
    return this.http.get(
      this.employeeRelativeBaseURL +
        '/search?firstName=' +
        firstName +
        '&mail=' +
        mail +
        '&mobile=' +
        mobile,
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
  /***
   *
   * END Claim Insurance View Edit
   */
  /**
   *
   * PRMB and ESIC
   */
  private esicBaseURL: string =
    Config.baseUrl + 'claim-esic-service/' + Config.apiVersion;
  private getDocBaseUrl: String =
    Config.baseUrl + 'rilnews-and-spotlight-service/' + Config.apiVersion;
  private prmbBaseURL: String =
    Config.baseUrl + 'prmb-service/' + Config.apiVersion;

  getEsicEligibilityAPI() {
    return this.http.get('assets/files/benefits/esicEligibility.json');
    return this.http.get(this.esicBaseURL + '/esic/eligibility');
  }
  getEsicDetailAPI() {
    return this.http.get('assets/files/benefits/esicDetails.json');
    return this.http.get(this.esicBaseURL + '/esic/detail');
  }
  getDocument(docId) {
    const httpHeader = this.getRequestHeaders();
    let url = this.getDocBaseUrl + '/news/image' + '?docId=' + docId;
    return this.http.get(url, {
      headers: httpHeader,
      responseType: 'blob' as 'json',
    });
  }
  ///

  getPrmbDependentDetailsApi() {
    return this.http.get('assets/files/benefits/prmbDependentDetails.json');
    return this.http.get(
      this.prmbBaseURL + '/dependent/details',
      this.reqOptions
    );
  }
  getPrmbEligibilityAPI() {
    return this.http.get('assets/files/benefits/prmbEligibility.json');
    return this.http.get(this.prmbBaseURL + '/eligibilty', this.reqOptions);
  }
  /**
   *
   * END
   */
  getViewPolicies(key: string) {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      Config.baseUrl +
        'view-policy-service/' +
        Config.apiVersion +
        '/benefits/policy?key=' +
        key,
      {
        headers: httpHeader,
      }
    );
  }

  // loan and advances dashboard
  getTeamAdvanceHistory(
    skipCount: number = 0,
    topCount: number = 100,
    inlineCount: string = 'allpages'
  ) {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      this.teamHistoryUrl +
        '?skip=' +
        skipCount +
        '&top=' +
        topCount +
        '&inlineCount=' +
        inlineCount,
      {
        headers: httpHeader,
      }
    );
  }

  getdeductionsOnReq(
    skipCount: number = 0,
    topCount: number = 100,
    inlineCount: string = 'allpages'
  ) {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      this.deductionsOnReqUrl +
        '?skip=' +
        skipCount +
        '&top=' +
        topCount +
        '&inlineCount=' +
        inlineCount,

      {
        headers: httpHeader,
      }
    );
  }

  getMarriageLoanSummary(
    skipCount: number = 0,
    topCount: number = 100,
    inlineCount: string = 'allpages'
  ) {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      this.marriageLoanSummaryUrl +
        '?skip=' +
        skipCount +
        '&top=' +
        topCount +
        '&inlineCount=' +
        inlineCount,
      {
        headers: httpHeader,
      }
    );
  }

  checkValidityTeamAdvances() {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(this.teamAdvancesValidateUrl + '?imuser=X', {
      headers: httpHeader,
    });
  }

  // Advance Loan API Start
  getTeamBuildView(advanceCode, sequenceNumber) {
    let employcode = Config.userId.match(/\d+/)[0];
    console.log(employcode);
    return this.http.get(
      this.teamAdvanceServiceURL +
        '/detail?advanceCode=' +
        advanceCode +
        '&employeeNumber=' +
        employcode +
        '&sequenceNumber=' +
        sequenceNumber,
      this.reqOptions
    );
  }
  // Advance Loan API End
  checkValidityCreateMarriage() {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(this.marriageLoanValidateUrl, {
      headers: httpHeader,
    });
  }

  getMarriageLoansHistory(
    skipCount: number = 0,
    topCount: number = 100,
    inlineCount: string = 'allpages'
  ) {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      this.marriageLoansHistoryUrl +
        '?skip=' +
        skipCount +
        '&top=' +
        topCount +
        '&inlineCount=' +
        inlineCount,
      {
        headers: httpHeader,
      }
    );
  }

  viewTeamAdvance(advanceCode, empnumber, sequencenumber) {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      this.teamDetailsUrl +
        '?advanceCode=' +
        advanceCode +
        '&employeeNumber=' +
        empnumber +
        '&sequenceNumber=' +
        sequencenumber,
      {
        headers: httpHeader,
      }
    );
  }

  getAdvanceTypes() {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(this.advanceTypesUrl, {
      headers: httpHeader,
    });
  }

  getRecoveryMonths() {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(this.recoveryMonthsUrl, {
      headers: httpHeader,
    });
  }
  getViewMarriageDetails(requestType, action, referenceNumber?) {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      this.viewDetailsMarriageUrl +
        '?requestType=' +
        requestType +
        '&action=' +
        action +
        '&referenceNumber=' +
        referenceNumber,
      {
        headers: httpHeader,
      }
    );
  }
  getCOVBuyback(overViewObj) {
    let requestNumber = overViewObj.requestNumber;
    let vehicleNumber = overViewObj.vehicleModelNumber.split('/')[1].trim();
    // return this.http.get("http://localhost:3000/getBuyback");
    return this.http
      .get(
        this.clvBaseURL +
          '/buyback?requestId=' +
          requestNumber +
          '&vehicleNo=' +
          vehicleNumber,
        this.reqOptions
      )
      .pipe(
        map((resultlist: any) => {
          return new DetailsCOV(resultlist);
        })
      );
  }

  saveCOVBuyback(requestObj) {
    let body = JSON.stringify(requestObj);
    return this.http.post(
      `${this.clvBaseURL}/buyback/save`,
      body,
      this.reqOptions
    );
  }

  setForcloseClv(payloadObj) {
    const payload = JSON.stringify(payloadObj);
    return this.http.post(
      this.clvBaseURL +
        '/foreclose?requestId=' +
        payloadObj.requestNumber +
        '&imvType=' +
        payloadObj.vehicleType,
      payload,
      {
        headers: this.getRequestHeaders(),
      }
    );
  }

  downloadMarriageLoan(referencenumber) {
    let requestHeader = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.get(
      this.dowloadPdfUrl + '?referencenumber=' + referencenumber,
      { headers: requestHeader, responseType: 'blob' as 'json' }
    );
  }
  getMarriageHeader(reqType, reqAction, refNo) {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      this.marriageHeaderBaseUrl +
        '/view?requestType=' +
        reqType +
        '&action=' +
        reqAction +
        '&referenceNumber=' +
        refNo,
      {
        headers: httpHeader,
      }
    );
  }

  //Post Marriage Loan
  createMarriageLoan(requestObj, attachmentList, lineNumber) {
    let formData: FormData = new FormData();
    let body = JSON.stringify(requestObj);
    formData.append('jsonString', body);
    for (let i = 0; i < attachmentList.length; i++) {
      formData.append('files', attachmentList[i], attachmentList[i].name);
    }
    const header = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(
      this.marriageLoanCreateUrl + '?lineNumbers=' + lineNumber,
      formData,
      { headers: header }
    );
  }

  deleteMarriageLoan(referencenumber) {
    const httpHeader = this.getRequestHeaders();
    return this.http.post(this.deleteMarrigeLoanUrl, referencenumber, {
      headers: httpHeader,
    });
  }

  deleteTeamAdvance(data, requenceNo) {
    const httpHeader = this.getRequestHeaders();
    var body = JSON.stringify(data);
    return this.http.post(
      this.teamAdvDeleteUrl + '?sequenceNumber=' + requenceNo,
      body,
      {
        headers: httpHeader,
      }
    );
  }

  getMarriageRepayHeader(reqType, reqAction, refNo) {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      this.marriageRepayHeaderBaseUrl +
        '/view?requestType=' +
        reqType +
        '&action=' +
        reqAction +
        '&referenceNumber=' +
        refNo,
      {
        headers: httpHeader,
      }
    );
  }
  getGuidelines(appId) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
    let params = new HttpParams().set('appId', appId);
    return this.http.get(this.videoUrl + '/guideline/doc/list', {
      headers,
      params,
    });
  }
  openGuidelinesPdf(docid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
    let params = new HttpParams().set('docId', docid);
    return this.http.get(this.videoUrl + '/guideline/doc/view', {
      headers,
      params,
      responseType: 'blob',
    });
  }
  checkHandsetEligibilty() {
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      Config.baseUrl +
        'availmobileconnection-service/' +
        Config.apiVersion +
        '/check/handset/eligibility',
      {
        headers: httpHeader,
      }
    );
  }

  addAttachment(attachment: any) {
    let formData: FormData = new FormData();
    //let body = JSON.stringify(requestObj);
    //formData.append('jsonString', body);
    formData.append('file', attachment);
    const header = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(`${this.clvBaseURL}/upload`, formData, {
      headers: header,
    });
  }

  deleteAttachmentAdvanceLoan(data) {
    const httpHeader = this.getRequestHeaders();
    var body = JSON.stringify(data);
    return this.http.post(
      this.teamAdvanceServiceURL + '/delete/attachment',
      body,
      {
        headers: httpHeader,
      }
    );
  }

  getpdf(requestType, action, referencenumber, lineNumber) {
    let requestHeader = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.get(
      this.viewAttachementUrl +
        '?requestType=' +
        requestType +
        '&action=' +
        action +
        '&referenceNumber=' +
        referencenumber +
        '&lineNumber=' +
        lineNumber,
      { headers: requestHeader, responseType: 'blob' as 'json' }
    );
  }

  saveMedImmprestLoan(obj) {
    let body = JSON.stringify(obj);
    return this.http.post(
      `${this.teamAdvanceServiceURL}/create/advance`,
      body,
      this.reqOptions
    );
  }

  viewAttachmentAdvanceLoan(lineNumber: String) {
    let headers = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.get(
      this.teamAdvanceServiceURL + '/view/attachment?lineNumber=' + lineNumber,
      {
        headers: headers,
        responseType: 'blob',
      }
    );
  }

  //view attachment
  openAttachment(attachFilName) {
    let fileName = JSON.stringify(attachFilName);
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
    return this.http.get(
      this.clvBaseURL + '/clv/view/pdf?filePath=' + fileName,
      {
        headers: requestHeader,
        responseType: 'blob',
      }
    );
  }

  //Guideline vedio for CLV / COV
  openGuidelinesVedio(data) {
    let appId = 'H0081';
    let appSrNo = data.appName;
    const httpHeader = this.getRequestHeaders();
    return this.http.get(
      this.clvBaseURL + '/video/link?appId=' + appId + '&appSrNo=' + appSrNo,
      {
        headers: httpHeader,
      }
    );
  }
  addAttachmentAdvanceLoan(attachmentList) {
    let formData: FormData = new FormData();
    formData.append('files', attachmentList[0], attachmentList[0].name);
    const header = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(
      this.teamAdvanceServiceURL + '/attachment/save',
      formData,
      {
        headers: header,
      }
    );
  }
}
