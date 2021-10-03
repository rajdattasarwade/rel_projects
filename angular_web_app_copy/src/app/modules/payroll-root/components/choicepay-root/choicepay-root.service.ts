import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Config } from 'src/app/components/core/config/config';
import {
  ChoicePayComponentModel,
  ChoicePayPeriod,
} from './choicepay-root.model';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ChoicepayRootService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  /**
   * APIs
   */
  private choicePayBaseURL =
    Config.baseUrl + 'choicepay-selection-service/' + Config.apiVersion;

  public requestHeaderForChoicepay = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId,
    }),
  };
  submitChoicePay(data) {
    var body = JSON.stringify(data);
    // return this.httpClient.get('assets/files/choicepay/choicepay_save_success.json');
    return this.httpClient.post(
      this.choicePayBaseURL + '/save',
      data,
      this.requestHeaderForChoicepay
    );
  }
  goToExternalUrl(url) {
    window.open(url);
  }
  choicepayNavigateTo(path) {
    this.router.navigate(path);
  }
  goBackToHome() {
    this.router.navigate(['/payroll']);
  }
  goToTop() {
    document.querySelector('#matDrawerContent').scrollTop = 0;
  }
  //####################################### SEPERATE IN DIFFErENT FILE###############################
  showInformationLandingPopUp: boolean = true;
  effectiveDate: any;
  effectiveDateMessage: any;
  choicepayDetailList: any = [];
  choicepayPeriodDetails: any = [];
  isChoicePayModified: boolean = false;
  isChoicePayAvailable: boolean = true;
  isChoicePayAvailableSubject = new BehaviorSubject<boolean>(
    this.isChoicePayAvailable
  );
  isFreez: boolean = false;
  choicePayInfo: ChoicePayPeriod;
  isHraSelected: boolean = false;
  isHraSelectedSubject = new BehaviorSubject<boolean>(this.isHraSelected);
  isFuelSelected: boolean = false;
  isFuelSelectedSubject = new BehaviorSubject<boolean>(this.isFuelSelected);
  listOFInvalidItems: ChoicePayComponentModel[] = [];
  isFormInvalid: boolean = false;
  isFormInvalidSubject = new BehaviorSubject<boolean>(this.isFormInvalid);
  isFreezSubject = new BehaviorSubject<boolean>(this.isFreez);
  /** SETTERS */
  setIsFreez(flag: boolean) {
    this.isFreez = flag;
    this.isFormInvalidSubject.next(this.isFreez);
  }
  setIsChoicePayAvailable(value) {
    this.isChoicePayAvailable = value;
    this.isChoicePayAvailableSubject.next(this.isChoicePayAvailable);
  }
  setIsHRASelected(value) {
    this.isHraSelected = value;
    this.isHraSelectedSubject.next(this.isHraSelected);
  }
  setIsFuelSelected(value) {
    this.isFuelSelected = value;
    this.isFuelSelectedSubject.next(this.isFuelSelected);
  }
  setEffectiveDateMessage(message: string) {
    this.effectiveDateMessage = message;
  }
  get getEffectiveDateMessage(): string {
    return this.effectiveDateMessage;
  }
  setChoicePayInfo(value: ChoicePayPeriod) {
    this.choicePayInfo = value;
  }

  get getChoicePayInfo(): ChoicePayPeriod {
    return this.choicePayInfo;
  }

  setEffectiveDate(value: number) {
    this.effectiveDate = value;
  }
  get getEffectiveDate(): number {
    return this.effectiveDate;
  }
  setChoicePayDetailsList(data: ChoicePayComponentModel[]) {
    console.log('setChoicePayDetailsList=>', data);
    this.choicepayDetailList = data;
  }
  get getChoicePayDetailsList(): ChoicePayComponentModel[] {
    console.log('getChoicePayDetailsList=>', this.choicepayDetailList);
    return this.choicepayDetailList;
  }
  /**
   * Choice Pay Components Variables
   */
  mandatoryDebits: ChoicePayComponentModel[] = [];
  selectedMandatoryDebits: ChoicePayComponentModel[];
  residualChoicePay: ChoicePayComponentModel = null;
  ogResidualChoicePayAmount: number;
  //main
  totalCtc: ChoicePayComponentModel = null;
  basicPay: ChoicePayComponentModel = null;
  basePay: ChoicePayComponentModel = null;
  choicePay: ChoicePayComponentModel = null;
  fuelReimursmentCar: ChoicePayComponentModel = null;
  fuelReimursmentTwoWheeler: ChoicePayComponentModel = null;
  //new
  choicePayAllNewAvailableComponents: ChoicePayComponentModel[] = [];
  choicePaySelectedNonMandateComponents: ChoicePayComponentModel[] = [];
  choicePaySelectedMandateComponents: ChoicePayComponentModel[] = [];
  unmodifiedMainComponentsList: ChoicePayComponentModel[] = [];

  choicePayAllNewAvailableComponentsSubject = new BehaviorSubject<
    ChoicePayComponentModel[]
  >(this.choicePayAllNewAvailableComponents);
  choicePaySelectedMandateComponentsSubject = new BehaviorSubject<
    ChoicePayComponentModel[]
  >(this.choicePaySelectedMandateComponents);
  choicePaySelectedNonMandateComponentsSubject = new BehaviorSubject<
    ChoicePayComponentModel[]
  >(this.choicePaySelectedNonMandateComponents);
  mandatoryDebitsSubject = new BehaviorSubject<ChoicePayComponentModel[]>(
    this.mandatoryDebits
  );
  residualChoicePaySubject = new BehaviorSubject<ChoicePayComponentModel>(
    this.residualChoicePay
  );
  totalCtcSubject = new BehaviorSubject<ChoicePayComponentModel>(this.totalCtc);
  basicPaySubject = new BehaviorSubject<ChoicePayComponentModel>(this.basicPay);
  basePaySubject = new BehaviorSubject<ChoicePayComponentModel>(this.basePay);
  choicePaySubject = new BehaviorSubject<ChoicePayComponentModel>(
    this.choicePay
  );

  /**
   * ChoicePay Component Setters
   */
  setChoicePayAllNewAvailableComponets(data: ChoicePayComponentModel[]) {
    console.log('setChoicePayAllNewAvailableComponets', data);
    this.choicePayAllNewAvailableComponents = data.filter(
      (choicePayComponent) =>
        choicePayComponent.isDeleted && !choicePayComponent.hasSelected
    );
    this.choicePayAllNewAvailableComponentsSubject.next(
      this.choicePayAllNewAvailableComponents
    );
  }
  setChoicePaySelectedNonMandateComponents(data: ChoicePayComponentModel[]) {
    this.choicePaySelectedNonMandateComponents = data.filter(
      (choicePayComponent) =>
        !choicePayComponent.isMandatory && choicePayComponent.hasSelected
    );
    this.choicePaySelectedNonMandateComponentsSubject.next(
      this.choicePaySelectedNonMandateComponents
    );
  }
  setChoicePayMandatoryComponents(data: ChoicePayComponentModel[]) {
    this.mandatoryDebits = data.filter(
      (choicePayComponent) => choicePayComponent.isMandatory
    );
    this.mandatoryDebitsSubject.next(this.mandatoryDebits);
    this.choicePaySelectedMandateComponents = JSON.parse(
      JSON.stringify(
        this.mandatoryDebits.filter(
          (choicePayComponet) => choicePayComponet.hasSelected === true
        )
      )
    );
    this.choicePaySelectedMandateComponentsSubject.next(
      this.choicePaySelectedMandateComponents
    );
  }

  setAndRemoveChoicePayMainComponents(
    data: ChoicePayComponentModel[],
    componentCode: string
  ): ChoicePayComponentModel {
    let mainComponent = data.find((obj) => {
      return obj.component === componentCode;
    });
    const mainComponentIndex = this.mandatoryDebits.indexOf(mainComponent);
    const choicePaySelectedMandateComponentsIndex = this.choicePaySelectedMandateComponents.indexOf(
      mainComponent
    );
    if (mainComponentIndex > -1) {
      this.mandatoryDebits.splice(mainComponentIndex, 1);
      this.choicePaySelectedMandateComponents.splice(
        choicePaySelectedMandateComponentsIndex,
        1
      );
      this.unmodifiedMainComponentsList.push(mainComponent);
    }
    return mainComponent;
  }

  setChoicePayMainComponents(data: ChoicePayComponentModel[]) {
    this.residualChoicePay = this.setAndRemoveChoicePayMainComponents(
      data,
      'SPA'
    );
    this.totalCtc = this.setAndRemoveChoicePayMainComponents(data, 'TCTC');
    this.basicPay = this.setAndRemoveChoicePayMainComponents(data, 'BASE');
    this.choicePay = this.setAndRemoveChoicePayMainComponents(data, 'TCHP');
    if (!this.choicePay) {
      this.choicePay = this.setAndRemoveChoicePayMainComponents(data, 'TSPA');
    }
    this.basePay = this.setAndRemoveChoicePayMainComponents(data, 'BPAY');
    this.fuelReimursmentCar = this.setAndRemoveChoicePayMainComponents(
      data,
      'FUMT'
    );
    this.fuelReimursmentTwoWheeler = this.setAndRemoveChoicePayMainComponents(
      data,
      'FMTW'
    );
    this.ogResidualChoicePayAmount =
      this.residualChoicePay.amount + this.firstTimeCalculateResidual();
    this.totalCtcSubject.next(this.totalCtc);
    this.basicPaySubject.next(this.basicPay);
    this.choicePaySubject.next(this.choicePay);
    this.basePaySubject.next(this.basePay);
    this.residualChoicePaySubject.next(this.residualChoicePay);
  }
  firstTimeCalculateResidual(): number {
    let sum = 0;
    this.choicePaySelectedNonMandateComponents.forEach((x) => {
      sum = sum + x.amount;
    });

    console.log('firstTimeSum=>', sum);
    return sum;
  }

  setAllChoicePayComponents() {
    this.isChoicePayModified = false;
    let data = this.getChoicePayDetailsList;
    console.log(data);
    this.setChoicePaySelectedNonMandateComponents(data);
    console.log(
      'choicePaySelectedNonMandateComponents',
      this.choicePaySelectedNonMandateComponents
    );
    this.setChoicePayAllNewAvailableComponets(data);
    console.log(
      'choicePayAllNewAvailableComponets',
      this.choicePayAllNewAvailableComponents
    );
    this.setChoicePayMandatoryComponents(data);
    console.log('mandatoryDebits', this.mandatoryDebits);
    console.log(
      'choicePaySelectedMandateComponents',
      this.choicePaySelectedMandateComponents
    );
    this.setChoicePayMainComponents(data);
    console.log('mandatoryDebits', this.mandatoryDebits);
    console.log(
      'choicePaySelectedMandateComponents',
      this.choicePaySelectedMandateComponents
    );
  }
  /**
   * ENDS SETTERS
   */

  /**
   * Modifications of component lists
   */
  removeFromMedatoryDebit(componentCode) {
    let removeComponent = this.mandatoryDebits.find((obj) => {
      return obj.component === componentCode;
    });
    const removeFromIndex = this.mandatoryDebits.indexOf(removeComponent);
    if (removeFromIndex > -1) {
      this.mandatoryDebits.splice(removeFromIndex, 1);
    }
    this.mandatoryDebitsSubject.next(this.mandatoryDebits);
  }

  removeFromChoicePayComponents(componentCode) {
    let removeComponent = this.choicePaySelectedNonMandateComponents.find(
      (obj) => {
        return obj.component === componentCode;
      }
    );
    this.setExclusicveComponentStatus(removeComponent, false);

    const removeFromIndex = this.choicePaySelectedNonMandateComponents.indexOf(
      removeComponent
    );
    if (removeFromIndex > -1) {
      this.choicePaySelectedNonMandateComponents.splice(removeFromIndex, 1);
    }
    this.addToChoicePayAllNewAvailableComponents(removeComponent);
    this.choicePaySelectedNonMandateComponentsSubject.next(
      this.choicePaySelectedNonMandateComponents
    );
    this.updateResidualChoicePay();
  }
  updateResidualChoicePay() {
    let amount = this.residualChoicePay.amount;
    let totalSelectedAmount: number = 0;
    console.log('...residual choice pay amount=>', amount);
    for (let item of this.choicePaySelectedNonMandateComponents) {
      totalSelectedAmount += item.amount;
    }
    this.residualChoicePay.amount =
      this.ogResidualChoicePayAmount - totalSelectedAmount;
    this.residualChoicePaySubject.next(this.residualChoicePay);
  }
  addToChoicePayAllNewAvailableComponents(item: ChoicePayComponentModel) {
    item.hasSelected = false;
    this.choicePayAllNewAvailableComponents.push(item);
    this.choicePayAllNewAvailableComponentsSubject.next(
      this.choicePayAllNewAvailableComponents
    );
  }
  setExclusicveComponentStatus(item, flag) {
    if (item.component == 'HRA') {
      this.setIsHRASelected(flag);
    }
    if (['FUMT', 'FMTW'].includes(item.component)) {
      this.setIsFuelSelected(flag);
    }
  }
  removeFromChoicePayAllNewAvailableComponents(componentCode) {
    let removeComponent = this.choicePayAllNewAvailableComponents.find(
      (obj) => {
        return obj.component === componentCode;
      }
    );
    const removeFromIndex = this.choicePayAllNewAvailableComponents.indexOf(
      removeComponent
    );
    if (removeFromIndex > -1) {
      this.choicePayAllNewAvailableComponents.splice(removeFromIndex, 1);
    }
    this.choicePayAllNewAvailableComponentsSubject.next(
      this.choicePayAllNewAvailableComponents
    );
  }
  isZeroAmountFlagAdded: boolean = false;
  isZeroAmountFlagAddedSubject = new BehaviorSubject<boolean>(
    this.isZeroAmountFlagAdded
  );
  checkIfZeroAmountComponentInList(): string {
    let mesg: string = '';
    this.choicePaySelectedNonMandateComponents.forEach((item) => {
      if (item.amount == 0) {
        item.message =
          'Invalid amount, Min Amount : ' +
          item.minAmount +
          ' and Max Amount : ' +
          item.maxAmount;
        mesg =
          item.componentText +
          ' amount is invalid. Min Amount : ' +
          item.minAmount +
          ' and Max Amount : ' +
          item.maxAmount;
        return mesg;
      }
    });
    return mesg;
  }
  addChoicePayComponents(listOfComponentsToAdd: ChoicePayComponentModel[]) {
    console.log('listOFcomponentsToAdd=>', listOfComponentsToAdd);
    let count = 0;
    for (let item of listOfComponentsToAdd) {
      count++;
      if (item.amount == 0) {
        this.isZeroAmountFlagAdded = true;
        // item.message =
        //   'Invalid amount, Min Amount : ' +
        //   item.minAmount +
        //   ' and Max Amount : ' +
        //   item.maxAmount;
      }
      if (item.isMandatory) {
        console.log('add to madantory list');
        this.addToMandatoryDebits(item);
      } else {
        console.log('add to Non madantory list');
        this.addToChoicePaySelectedNonMandateComponentsSubject(item);
      }
      this.setExclusicveComponentStatus(item, true);
      this.removeFromChoicePayAllNewAvailableComponents(item.component);
    }
    this.isZeroAmountFlagAddedSubject.next(this.isZeroAmountFlagAdded);
  }

  addToMandatoryDebits(item: ChoicePayComponentModel) {
    if (!this.mandatoryDebits.includes(item)) {
      this.mandatoryDebits.push(item);
    } else {
      console.log('CAN NOT ADD DUPLICATE ITEMS...MANDATORY');
    }
    this.mandatoryDebitsSubject.next(this.mandatoryDebits);
  }
  addToChoicePaySelectedNonMandateComponentsSubject(
    item: ChoicePayComponentModel
  ) {
    if (!this.choicePaySelectedNonMandateComponents.includes(item)) {
      this.choicePaySelectedNonMandateComponents.push(item);
      this.updateResidualChoicePay();
    } else {
      console.log('CAN NOT ADD DUPLICATE ITEMS...NON MANDATORY');
    }
    this.choicePaySelectedNonMandateComponentsSubject.next(
      this.choicePaySelectedNonMandateComponents
    );
  }

  addToListOFInvalidItems(item: ChoicePayComponentModel) {
    console.log('Invalid Item=>', item);
    item.message =
      'Invalid amount, Min Amount : ' +
      item.minAmount +
      ' and Max Amount : ' +
      item.maxAmount;
    if (!this.listOFInvalidItems.includes(item)) {
      this.listOFInvalidItems.push(item);
    }
    this.isFormInvalidSubject.next(this.listOFInvalidItems.length > 0);
  }
  removeFromListOFInvalidItems(item) {
    item.message = '';
    const removeFromIndex = this.listOFInvalidItems.indexOf(item);
    if (removeFromIndex > -1) {
      this.listOFInvalidItems.splice(removeFromIndex, 1);
    }
    this.isFormInvalidSubject.next(this.listOFInvalidItems.length > 0);
  }

  finalListOfComponentsToSave: ChoicePayComponentModel[] = [];

  populateFinalListOfComponentsToSave() {
    console.log(
      'final=>choicePaySelectedNonMandateComponentsSubject=>',
      this.choicePaySelectedNonMandateComponents
    );
    console.log('final=>mandatoryDebits=>', this.mandatoryDebits);
    this.updateResidualChoicePay();
    this.finalListOfComponentsToSave = [];
    this.finalListOfComponentsToSave.push(...this.unmodifiedMainComponentsList);
    this.finalListOfComponentsToSave.push(
      ...this.choicePaySelectedNonMandateComponents
    );
    this.finalListOfComponentsToSave.push(...this.mandatoryDebits);
    console.log('finalListToSave=>', this.finalListOfComponentsToSave);
  }

  populateRequestBody() {
    let requestBody = {};
    let choicePayPayload = JSON.parse(
      JSON.stringify(
        this.finalListOfComponentsToSave.filter(
          (element) => element.hasSelected == true
        )
      )
    );
    console.log('payload to save=>', choicePayPayload);
    requestBody['key'] = this.finalListOfComponentsToSave[0].key;
    requestBody['component'] = 'ALL';
    requestBody['okCode'] = 'OK';
    for (let item of choicePayPayload) {
      delete item['effectiveDate'];
      delete item['userName'];
      delete item['type'];
      delete item['message'];
      delete item['key'];
      delete item['claimedAmount'];
      delete item['balanceAmount'];
    }
    choicePayPayload.sort((a, b) => {
      return Number(a.indexNumber) - Number(b.indexNumber);
    });
    requestBody['choicePayItemList'] = choicePayPayload;
    if (!this.effectiveDate) {
      this.effectiveDate = new Date().getTime();
    }
    requestBody['effectiveDate'] = this.effectiveDate;
    console.log('requestBody=>', requestBody);
    return requestBody;
  }

  get getRequestBody() {
    this.populateFinalListOfComponentsToSave();
    return this.populateRequestBody();
  }
}
