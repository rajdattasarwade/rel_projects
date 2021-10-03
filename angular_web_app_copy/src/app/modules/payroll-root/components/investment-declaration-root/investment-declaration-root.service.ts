import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Config } from 'src/app/components/core/config/config';
import { BehaviorSubject } from 'rxjs';
import { SectionADataModel } from './investment-declaration-root-table.model';
import { OverviewModelHouseRentDeclaration } from './investment-declaration-root.model';
import {
  Section80cViewEditModel,
  Section80CHeaderDetail,
} from './section-80c/section-80c.model';
import {
  Section80dHeaderDetail,
  Section80dViewEditModel,
} from './section80d/section80d.model';
@Injectable()
export class InvestmentDeclarationRootService {
  private useJson: boolean = false;
  private myInvestmentBaseUrl: string =
    Config.baseUrl + 'myinvestment-service/' + Config.apiVersion;
  private section80DBaseUrl: string =
    Config.baseUrl + 'section80d-service/' + Config.apiVersion;
  private section80CBaseUrl: string =
    Config.baseUrl + 'section80c-service/' + Config.apiVersion;
  private houseLoanServiceBaseUrl: string =
    Config.baseUrl + 'houseloan-service/' + Config.apiVersion;
  private houseRentDeclarationBaseUrl: string =
    Config.baseUrl + 'house-rent-declaration-service/' + Config.apiVersion;

  private previousEmploymentBaseUrl: string =
    Config.baseUrl + 'previous-employment-service/' + Config.apiVersion;
  private form12bbServiceBaseUrl: string =
    Config.baseUrl + 'form12bb-service/' + Config.apiVersion;

  public sectionADataList: SectionADataModel[] = [];
  public houseRentRecieptDataList: any = [];
  public form12bbDataList: any = [];
  private housingLoanHeaderText = 'Interest on Housing Loan';
  private section80cHeaderText = 'Section 80 C deductions';
  private section80dHeaderText = 'Section 80 D & other deductions';
  public sectionADataListSubject = new BehaviorSubject<any>(
    this.sectionADataList
  );
  public totalDeclaredInvestment: number = 0;
  public totalActualInvestment: number = 0;

  public declaredInvestmentSubject = new BehaviorSubject<number>(
    this.totalDeclaredInvestment
  );
  public actualInvestmentSubject = new BehaviorSubject<number>(
    this.totalActualInvestment
  );
  private financialYear: string = '';

  /**
   * APIs
   */

  constructor(private httpClient: HttpClient, private router: Router) {
    this.sectionADataList = [];
  }
  public requestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };
  getMyInvestmentFinancialYear() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/a1.myinvestment-service-financialyear.json'
      );
    return this.httpClient.get(
      this.myInvestmentBaseUrl + '/financialyear',
      this.requestHeader
    );
  }
  getMyInvestmentValidation() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/a2.myinvestment-service-validation.json'
      );
    return this.httpClient.get(
      this.myInvestmentBaseUrl + '/validation',
      this.requestHeader
    );
  }
  getMyInvestmentShowdeclaration() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/a3.myinvestment-service-showdeclaration.json'
      );
    return this.httpClient.get(
      this.myInvestmentBaseUrl + '/showdeclaration',
      this.requestHeader
    );
  }
  getForm12BBDetails() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/b1.form12bb-service-details.json'
      );
    return this.httpClient.get(
      this.form12bbServiceBaseUrl + '/detail',
      this.requestHeader
    );
  }
  getForm12bbPdf() {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
    let url = this.useJson
      ? 'assets/files/investment-decleration/fom12bb.pdf'
      : this.form12bbServiceBaseUrl + '/letter';
    return this.httpClient.get(url, {
      headers: requestHeader,
      responseType: 'blob' as 'json',
    });
  }
  certifyForm12bb(postCerity) {
    let postApi = this.form12bbServiceBaseUrl + '/save';
    var body = JSON.stringify(postCerity);
    return this.httpClient.post(postApi, body, this.requestHeader);
  }
  sendForm12BBViaEmail(emailId) {
    // change this to send email API
    let url = this.form12bbServiceBaseUrl + '/send?emailId=' + emailId;
    return this.httpClient.get(url, this.requestHeader);
  }
  getSection80cOverview() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/c1.section80c-service-overview.json'
      );
    return this.httpClient.get(
      this.section80CBaseUrl + '/overview',
      this.requestHeader
    );
  }
  getSection80dOverview() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/d1.section80d-service-overview.json'
      );
    return this.httpClient.get(
      this.section80DBaseUrl + '/overview',
      this.requestHeader
    );
  }
  getHouseloanOverview() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/housingloan/e1.houseloan-service-overview.json'
      );
    return this.httpClient.get(
      this.houseLoanServiceBaseUrl + '/overview',
      this.requestHeader
    );
  }
  getHouseRentDeclarationOverview() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/f1.house-rent-declaration-service-overview.json'
      );
    return this.httpClient.get(
      this.houseRentDeclarationBaseUrl + '/overview',
      this.requestHeader
    );
  }
  getPreviousEmploymentTaxdetails() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/g1.previous-employment-service-taxdetails.json'
      );
    return this.httpClient.get(
      this.previousEmploymentBaseUrl + '/taxDetails',
      this.requestHeader
    );
  }
  get80cDeductionViewEdit(refNo, create) {
    let referenceNumber = create ? '' : refNo;
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/id-80C-decduction-edit.json'
      );
    return this.httpClient.get(
      this.section80CBaseUrl + '/details?referenceNumber=' + referenceNumber,
      this.requestHeader
    );
  }
  save80C(requestData, files: any[]) {
    console.log('file to save=>', files);
    console.log('requestData=>', requestData);
    let requestHeader = new HttpHeaders({
      userId: Config.userId,
    });
    const servicePath = this.section80CBaseUrl + '/save';
    let formData: FormData = new FormData();
    let body = JSON.stringify(requestData);
    formData.append('jsonString', body);

    for (let i = 0; i < files.length; i++) {
      files[i] && formData.append('uploadFiles', files[i], files[i].name);
    }
    return this.httpClient.post(servicePath, formData, {
      headers: requestHeader,
    });
  }
  save80D(requestData, files: any[]) {
    console.log('file to save=>', files);
    console.log('requestData=>', requestData);
    let requestHeader = new HttpHeaders({
      userId: Config.userId,
    });
    const servicePath = this.section80DBaseUrl + '/save';
    let formData: FormData = new FormData();
    let body = JSON.stringify(requestData);
    formData.append('jsonString', body);

    for (let i = 0; i < files.length; i++) {
      files[i] && formData.append('uploadFiles', files[i], files[i].name);
    }
    return this.httpClient.post(servicePath, formData, {
      headers: requestHeader,
    });
  }
  get80dDeductionViewEdit(refNo, create) {
    let requestNumber = create ? '' : refNo;
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/id-80DandOther-deductions-edit.json'
      );
    return this.httpClient.get(
      this.section80DBaseUrl + '/details?requestNumber=' + requestNumber,
      this.requestHeader
    );
  }
  getHRAandHousingLoan() {
    if (this.useJson)
      return this.httpClient.get(
        'assets/files/investment-decleration/id-HRA and Housing Loan.json'
      );
    return this.httpClient.get(
      this.houseRentDeclarationBaseUrl + '/validatehra',
      this.requestHeader
    );
  }

  getHouseRentDeclarationValidation() {}
  goToExternalUrl(url) {
    window.open(url);
  }
  inNavigateTo(path) {
    this.router.navigate(path);
  }
  goBackToHome() {
    this.router.navigate(['/payroll']);
  }
  goToTop() {
    document.querySelector('#matDrawerContent').scrollTop = 0;
  }
  /**
   *
   * getters
   */
  get getSectionADataList() {
    return this.sectionADataList;
  }
  resetSectionADataList() {
    this.sectionADataList = [];
  }
  addToSectionADataList(item: any, type: string) {
    this.sectionADataList.push(
      this.getSectionADataModelFromAnyObject(item, type)
    );
    console.log('emiited sectionA data=>', this.sectionADataList);
    this.sectionADataListSubject.next(this.sectionADataList);
  }
  getSectionADataModelFromAnyObject(
    item: any,
    type: string
  ): SectionADataModel {
    let obj = new SectionADataModel();
    console.log('typeOf=>', type);
    if (type == 'section80c') {
      obj.deductionName = this.section80cHeaderText;
      obj.proposedAmount = item.totalProposedAmount;
      obj.actualAmount = item.totalActualAmount;
      obj.actualAmountVerified = item.totalVerifiedAmount;
      obj.status = item.status;
      obj.statusText = item.statusText;
      obj.icons = '';
      obj.createFlag = item.createFlag;
      obj.editFlag = item.editFlag;
      obj.printFlag = item.printFlag;
      obj.referenceNumber = item.referenceNumber;
    } else if (type == 'section80d') {
      obj.deductionName = this.section80dHeaderText;
      obj.proposedAmount = item.totalProposedAmount;
      obj.actualAmount = item.totalActualAmount;
      obj.actualAmountVerified = item.totalVerifiedAmount;
      obj.status = item.statusCode;
      obj.statusText = item.statusText;
      obj.icons = '';
      obj.createFlag = item.createFlag;
      obj.editFlag = item.editFlag;
      obj.printFlag = item.printFlag;
      obj.referenceNumber = item.referenceNumber;
    } else if (type == 'housingloan') {
      obj.deductionName = this.housingLoanHeaderText;
      obj.proposedAmount = item.proposedAmount;
      obj.actualAmount = item.actualAmount;
      obj.actualAmountVerified = item.approvedAmount;
      obj.status = item.statusCode;
      obj.statusText = item.statusText;
      obj.icons = '';
      obj.createFlag = item.createFlag;
      obj.editFlag = item.editFlag;
      obj.printFlag = item.printFlag;
      obj.referenceNumber = null;
    }
    this.totalActualInvestment += obj.actualAmount;
    this.totalDeclaredInvestment += obj.proposedAmount;
    console.log('obj=>', obj);
    console.log('item=>', item);
    console.log('service actualInvestment=>', this.totalActualInvestment);
    console.log('service declaredInvestment=>', this.totalDeclaredInvestment);
    this.actualInvestmentSubject.next(this.totalActualInvestment);
    this.declaredInvestmentSubject.next(this.totalDeclaredInvestment);
    return obj;
  }

  addHRADeclaraionToTotalInvestment(item: OverviewModelHouseRentDeclaration) {
    this.totalDeclaredInvestment += item.actualRentAmount;
    this.totalActualInvestment += item.approxAmount;
    this.actualInvestmentSubject.next(this.totalActualInvestment);
    this.declaredInvestmentSubject.next(this.totalDeclaredInvestment);
  }

  setFinancialYear(year: string) {
    this.financialYear = year;
  }
  get getFinancialYear(): string {
    return this.financialYear;
  } /**
  Section 80 C
  */
  attacmentMap80c: any = new Map();
  attachFileMap80C: any = new Map();
  attachmentMap80cSubject = new BehaviorSubject<any>(this.attacmentMap80c);
  attachFileMap80CSubject = new BehaviorSubject<any>(this.attachFileMap80C);
  addtoAttachmentMap80c(item, lineNumber) {
    this.attacmentMap80c.set(lineNumber, {
      docId: item.documentId,
      fileName: item.fileName,
      deleteFlag: false,
    });
    this.attachmentMap80cSubject.next(this.attacmentMap80c);
  }
  addToAttachFileMap80C(element: Section80CHeaderDetail, file: any) {
    console.log('C attach to section80c');
    this.attachFileMap80C.set(element.lineNumber, file);
    let requiredItem = this.editView80cDataList[0].section80CHeaderDetail.find(
      (obj1) => {
        return obj1.name == element.name;
      }
    );
    console.log('service add =>', requiredItem);
    requiredItem.attachmentProofDetail.employeeNumber = Config.userId;
    requiredItem.attachmentProofDetail.fileData = file;
    requiredItem.attachmentProofDetail.fileName = file.name;
    requiredItem.attachmentProofDetail.fileType = 'pdf';
    requiredItem.hasAttachment = true;
    requiredItem.attachFlag = true;
    requiredItem.deleteAttachment = false;
    console.log('after attachment=> ', this.editView80cDataList);
    this.attachFileMap80CSubject.next(this.attachFileMap80C);
  }
  removeFromAttachFileMap80C(element: Section80dHeaderDetail) {
    console.log('C remove from attachment to section80c');
    this.attachFileMap80C.set(element.lineNumber, null);
    let requiredItem = this.editView80cDataList[0].section80CHeaderDetail.find(
      (obj1) => {
        return obj1.name == element.name;
      }
    );
    console.log('service remove acctachment section 80c =>', requiredItem);
    requiredItem.deleteAttachment = true;
    console.log('after remove attachment C=> ', this.editView80cDataList);
    this.attachFileMap80CSubject.next(this.attachFileMap80C);
  }
  private editView80cDataList: Section80cViewEditModel[] = [];
  get getEditView80cDataList(): Section80cViewEditModel[] {
    return this.editView80cDataList;
  }
  setEditView80cDataList(dataList: Section80cViewEditModel[]) {
    this.editView80cDataList = [];
    this.editView80cDataList.push(...dataList);
    this.editView80cDataListSubject.next(this.editView80cDataList);
  }
  editView80cDataListSubject = new BehaviorSubject<Section80cViewEditModel[]>(
    this.editView80cDataList
  );
  fileCounter: number = 1;
  /**80 d
   *
   */
  /**
  Section 80 D
  */
  attacmentMap80d: any = new Map();
  attachFileMap80d: any = new Map();
  attachmentMap80dSubject = new BehaviorSubject<any>(this.attacmentMap80d);
  attachFileMap80dSubject = new BehaviorSubject<any>(this.attachFileMap80d);
  addtoAttachmentMap80d(item, lineNumber) {
    this.attacmentMap80d.set(lineNumber, {
      docId: item.documentId,
      fileName: item.fileName,
      deleteFlag: false,
    });
    this.attachmentMap80dSubject.next(this.attacmentMap80d);
  }
  addToAttachFileMap80D(element: Section80dHeaderDetail, file: any) {
    console.log('D attach to section80D');
    this.attachFileMap80d.set(element.lineNumber, file);
    let requiredItem = this.editView80dDataList[0].section80dHeaderDetail.find(
      (obj1) => {
        return obj1.name == element.name;
      }
    );
    console.log('service add section 80d =>', requiredItem);
    requiredItem.attachmentProofDetail.employeeNumber = Config.userId;
    requiredItem.attachmentProofDetail.fileData = file;
    requiredItem.attachmentProofDetail.fileName = file.name;
    requiredItem.attachmentProofDetail.fileType = 'pdf';
    requiredItem.hasAttachment = true;
    requiredItem.attachFlag = true;
    requiredItem.deleteAttachment = false;
    console.log('after attachment=> ', this.editView80dDataList);
    this.attachFileMap80dSubject.next(this.attachFileMap80d);
  }
  removeFromAttachFileMap80D(element: Section80dHeaderDetail) {
    console.log('D remove from attachment to section80D');
    this.attachFileMap80d.set(element.lineNumber, null);
    let requiredItem = this.editView80dDataList[0].section80dHeaderDetail.find(
      (obj1) => {
        return obj1.name == element.name;
      }
    );
    console.log('service remove acctachment section 80d =>', requiredItem);
    requiredItem.deleteAttachment = true;
    console.log('after remove attachment=> ', this.editView80dDataList);
    this.attachFileMap80dSubject.next(this.attachFileMap80d);
  }
  private editView80dDataList: Section80dViewEditModel[] = [];
  get getEditView80dDataList(): Section80dViewEditModel[] {
    return this.editView80dDataList;
  }
  setEditView80dDataList(dataList: Section80dViewEditModel[]) {
    this.editView80dDataList = [];
    this.editView80dDataList.push(...dataList);
    this.editView80dDataListSubject.next(this.editView80dDataList);
  }
  editView80dDataListSubject = new BehaviorSubject<Section80dViewEditModel[]>(
    this.editView80dDataList
  );
  fileCounterD: number = 1;

  /**
   * Error Handling
   */
  listOFInvalidItems: any = [];
  isFormInvalid: boolean = false;
  isFormInvalidSubject = new BehaviorSubject<boolean>(this.isFormInvalid);
  addToListOFInvalidItems(item: any) {
    console.log('INVALID added to list');
    if (!this.listOFInvalidItems.includes(item)) {
      item.errorMessage = 'You have exceeded maximum limit';
      this.listOFInvalidItems.push(item);
    }
    this.isFormInvalidSubject.next(this.listOFInvalidItems.length > 0);
  }
  removeFromListOFInvalidItems(item) {
    console.log('VALID removed from list');
    item.errorMessage = '';
    const removeFromIndex = this.listOFInvalidItems.indexOf(item);
    if (removeFromIndex > -1) {
      this.listOFInvalidItems.splice(removeFromIndex, 1);
    }
    this.isFormInvalidSubject.next(this.listOFInvalidItems.length > 0);
  }

  getPdfview(type, docId) {
    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    });
    return this.httpClient.get(
      this.myInvestmentBaseUrl +
        '/attachment/view?type=' +
        type +
        '&documentId=' +
        docId,
      {
        headers: requestHeader,
        responseType: 'blob' as 'json',
      }
    );
  }

  /**
   * Payload
   */

  /**
   *
   * getters ends
   */
  /**common service */
  statusClass(value: string) {
    if (value) {
      switch (value.trim().toLowerCase()) {
        case 'proposed amount considered':
          return 'success-text';
        case 'verification pending':
          return 'primary-text';
        case 'verified':
          return 'success-text';
        case 'verified and complete':
          return 'success-text';
        case 'verified and completed':
          return 'success-text';
        case 'rejected':
          return 'error-text';
        case 'deleted':
          return 'error-text';
        case 'form submitted':
          return 'success-text';
        default:
          return 'unknown-status-text';
      }
    }
  }

  formBBEdit: boolean = false;
}
