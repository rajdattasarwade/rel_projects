import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ReimbursementsTypeDetails,
  storeReimbursementType,
  ReimbursementsDetails,
} from '../utils/reimbursements.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Config } from '../../../components/core/config/config';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ReimbursementsService {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  private typeFlag = new BehaviorSubject<any>([]);
  ReimbTypeData = this.typeFlag.asObservable();

  public setData(data: any) {
    this.typeFlag.next(data);
  }
  private reimbursementBaseUrl =
    Config.baseUrl + 'claim-reimbursement-service/' + Config.apiVersion;
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
  fileExtensionCSV = ['.pdf'];
  fileSizeLimitInBytes = 2000000;
  constructor(private http: HttpClient) {}

  getReimbursmentsDetails(payload) {
    return this.http.get(
      this.reimbursementBaseUrl +
        '/overview?fromDate=' +
        payload.fromDate +
        '&toDate=' +
        payload.toDate +
        '&type=' +
        payload.type +
        '&status=' +
        payload.status,
      this.reqOptions
    );
  }
  //return this.http.get("assets/REIMBURSE_CLAIMED.json");
  //get details for reimbursement history table
  getReimbursmentsHistoryDetails(payload) {
    return this.http.get(
      this.reimbursementBaseUrl +
        '/overview?fromDate=' +
        payload.fromDate +
        '&toDate=' +
        payload.toDate +
        '&type=' +
        payload.type +
        '&status=' +
        payload.status +
        '&tabName=' +
        payload.tabName,
      this.reqOptions
    );
    // return this.http.get('assets/Reimbursement/HISTORY.json');
  }

  getDates() {
    return this.http.get(
      Config.baseUrl +
        'expense-report-service/' +
        Config.apiVersion +
        '/getdates',
      this.reqOptions
    );
    // return this.http.get('assets/Reimbursement/GETDATE.json');
  }

  getStatus() {
    return this.http.get(
      this.reimbursementBaseUrl + '/status',
      this.reqOptions
    );
    // return this.http.get('assets/Reimbursement/STATUS.json');
  }

  getRembTypeDetails() {
    return this.http
      .get(
        this.reimbursementBaseUrl + '/eligibility?filterFlag=false',
        this.reqOptions
      )
      .pipe(
        map((resultlist: any) => {
          return resultlist.map((item) => new ReimbursementsTypeDetails(item));
        })
      );
    // return this.http.get('assets/Reimbursement/CLAIM.json');
  }

  getAttachmentDetails(claimNo) {
    return this.http.get(
      this.reimbursementBaseUrl + '/claimdetail?claimNumber=' + claimNo,
      this.reqOptions
    );
    // return this.http.get('assets/Reimbursement/ATTACHMENT_DETAILS.json');
  }

  openAttachment(payload) {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
    return this.http.get(
      this.reimbursementBaseUrl +
        '/viewattachment/' +
        payload.sapCode +
        '/' +
        payload.claimNo +
        '/' +
        payload.lineNo,
      {
        headers: requestHeader,
        responseType: 'blob',
      }
    );
  }

  deleteClaim(claimNo) {
    return this.http.post(
      this.reimbursementBaseUrl + '/delete?claimNumber=' + claimNo,
      this.reqOptions
    );
  }

  getChoicePayPeriodDetails() {
    return this.http.get(
      Config.baseUrl +
        'choicepay-selection-service/' +
        Config.apiVersion +
        '/period',
      this.reqOptions
    );
    // return this.http.get('assets/Reimbursement/CHOICEPERIOD.json');
  }

  getChoicePay(effectiveDate) {
    return this.http.get(
      Config.baseUrl +
        'choicepay-selection-service/' +
        Config.apiVersion +
        '/detail?effectiveDate=' +
        effectiveDate,
      this.reqOptions
    );
    // return this.http.get('assets/Reimbursement/CHOICEDETAIL.json');
  }

  getReimbursementFormList(): Observable<any> {
    return this.http.get('assets/REIMBURSEMENT_FORM_TYPE_LIST.json');
  }
  getVehicleList() {
    return this.http.get('assets/REIMBURSEMENT_VEHICLE_LIST.json');
  }

  getEligibility(): Observable<any> {
    return this.http.get(
      this.reimbursementBaseUrl + '/eligibility?filterFlag=true',
      {
        headers: this.getRequestHeaders(),
      }
    );
  }
  getDropDownsForReimbursement(reimbursementType: string): Observable<any> {
    return this.http.get(
      this.reimbursementBaseUrl +
        '/dropdown?reimbursementType=' +
        reimbursementType,
      { headers: this.getRequestHeaders() }
    );
  }

  getDropdownLta() {
    return this.http.get(
      this.reimbursementBaseUrl + '/dropdown?reimbursementType=SLTA',
      {
        headers: this.getRequestHeaders(),
      }
    );
  }

  createReimbursemnets(requestObj: any, attachmentList: any[]) {
    let formData: FormData = new FormData();
    let body = JSON.stringify(requestObj);
    formData.append('jsonString', body);
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList[i] === undefined || attachmentList[i] === null) {
        formData.append('files', null);
      } else {
        attachmentList[i]['lineNumber'] = i;
        formData.append('files', attachmentList[i], attachmentList[i].name);
      }
    }
    const header = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(`${this.reimbursementBaseUrl}/create`, formData, {
      headers: header,
    });
  }

  createClaim(requestObj: any) {
    let body = JSON.stringify(requestObj);
    return this.http.post(
      `${this.reimbursementBaseUrl}/create/claim`,
      body,
      this.requestHeader
    );
  }
  public requestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };
  addAttachment(requestObj: any, attachment: any) {
    let formData: FormData = new FormData();
    let body = JSON.stringify(requestObj);
    formData.append('jsonString', body);
    formData.append('file', attachment);
    const header = new HttpHeaders({
      userId: Config.userId,
    });
    return this.http.post(
      `${this.reimbursementBaseUrl}/add/attachment`,
      formData,
      {
        headers: header,
      }
    );
  }
  deleteAttachment(requestObj: any) {
    let body = JSON.stringify(requestObj);
    return this.http.post(
      `${this.reimbursementBaseUrl}/delete/attachment`,
      body,
      this.requestHeader
    );
  }
  deleteRows(requestObj: any) {
    let body = JSON.stringify(requestObj);
    return this.http.post(
      `${this.reimbursementBaseUrl}/delete/rows`,
      body,
      this.requestHeader
    );
  }

  getClaimBills(claimNumber: string) {
    //this.setclaimNumber = claimNumber;
    // return this.http.get('assets/LTA_DETAILS.json');
    return this.http
      .get(
        this.reimbursementBaseUrl + '/claimdetail?claimNumber=' + claimNumber,
        { headers: this.getRequestHeaders() }
      )
      .pipe(
        map((resultlist: any) => {
          return resultlist.map((item) => new ReimbursementsDetails(item));
        })
      );
  }

  getClaimHeader(claimNumber) {
    // return this.http.get('assets/LTA_DETAILS_HEADER.json');
    return this.http.get(
      this.reimbursementBaseUrl + '/claimheader?claimNumber=' + claimNumber,
      { headers: this.getRequestHeaders() }
    );
  }

  getReimbursementType() {
    this.subscriptionsList.push(
      this.getRembTypeDetails().subscribe(
        (data: ReimbursementsTypeDetails[]) => {
          if (data.length > 0) {
            this.setData(data);
          }
        },
        (err) => {
          console.log(err);
        }
      )
    );
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

  checkDuplicateRowVal(formVals) {
    let tempFormVal = [];
    let lineNumberDupliVal = [];
    let i = 1;
    for (let formval of formVals) {
      if (tempFormVal.length > 0) {
        let j = 1;
        for (let checkDuplicate of tempFormVal) {
          checkDuplicate.billDate = moment(checkDuplicate.billDate).format('MM/DD/YYYY');
          formval.billDate = moment(formval.billDate).format('MM/DD/YYYY');
          if (
            checkDuplicate.billNo == formval.billNo &&
            new Date(checkDuplicate.billDate).getTime() ==
              new Date(formval.billDate).getTime() &&
            checkDuplicate.requestedAmt == formval.requestedAmt
          ) {
            let lineNumber = 'Line no ' + j + ' and Line no ' + i;
            lineNumberDupliVal.push(lineNumber);
          }
          j++;
        }
      }
      tempFormVal.push(formval);
      i++;
    }
    return lineNumberDupliVal;
  }

  checkDuplicateTypeVal(formVals) {
    let tempFormVal = [];
    let lineNumberDupliVal = [];
    let i = 1;
    for (let formval of formVals) {
      if (tempFormVal.length > 0) {
        let j = 1;
        for (let checkDuplicate of tempFormVal) {
          checkDuplicate.billDate = moment(checkDuplicate.billDate).format('MM/DD/YYYY');
          formval.billDate = moment(formval.billDate).format('MM/DD/YYYY');
          if (
            checkDuplicate.billNo == formval.billNo &&
            new Date(checkDuplicate.billDate).getTime() ==
              new Date(formval.billDate).getTime() &&
            checkDuplicate.billAmount == formval.billAmount
          ) {
            let lineNumber = 'Line no ' + j + ' and Line no ' + i;
            lineNumberDupliVal.push(lineNumber);
          }
          j++;
        }
      }
      tempFormVal.push(formval);
      i++;
    }
    return lineNumberDupliVal;
  }

  isFileSizeValid(file): boolean {
    if (
      this.fileSizeLimitInBytes !== -1 &&
      file.size >= this.fileSizeLimitInBytes
    ) {
      return false;
    }
    return true;
  }

  isFileTypeValid(file): boolean {
    const fileExtn = file.name.split('.').pop();
    if (
      this.fileExtensionCSV &&
      this.fileExtensionCSV.includes('.' + fileExtn.toLowerCase())
    ) {
      return true;
    }

    return false;
  }

  /**SOHO */
  sohoEligibility: ReimbursementsTypeDetails = null;
  sohoEligibilitySubject = new BehaviorSubject<ReimbursementsTypeDetails>(
    this.sohoEligibility
  );
  setSohoEligibility(obj: ReimbursementsTypeDetails) {
    console.log('eligibity>>>', obj);
    this.sohoEligibility = obj;
    this.sohoEligibilitySubject.next(this.sohoEligibility);
  }
  getDropdownData(reimbursementType: string) {
    return this.http.get(
      this.reimbursementBaseUrl +
        '/dropdown?reimbursementType=' +
        reimbursementType,
      { headers: this.getRequestHeaders() }
    );
  }

  getReimbursementMessage() {
    return this.http.get(this.reimbursementBaseUrl + '/messages', {
      headers: this.getRequestHeaders(),
    });
  }
}
