import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { HousingLoanRootService } from '../housing-loan-root.service';
import {
  HouseLoanDetailModel,
  HousingLoanInitMessage,
} from './housing-loan.model';

@Component({
  selector: 'app-interest-housing-loan',
  templateUrl: './interest-housing-loan.component.html',
  styleUrls: ['./interest-housing-loan.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InterestHousingLoanComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input() edit: boolean;
  housingloanForm: FormGroup;
  housingloanDetailData: HouseLoanDetailModel[] = [];
  previousHousingLoanData: HouseLoanDetailModel[] = [];
  constructor(
    public dialogRef: MatDialogRef<InterestHousingLoanComponent>,
    private houseingloanService: HousingLoanRootService,
    private formBuilder: FormBuilder,
    public messageModalService: MessageModalService
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.showInitMessage();
    this.getHousingLoanDetails();
    this.getPreviousHousingLoanDetails();
  }
  getHousingLoanDetails() {
    var sub = this.houseingloanService.getDetailsOfHousingLoan().subscribe(
      (data: HouseLoanDetailModel[]) => {
        console.log('Housing Load Details data=>', data);
        this.housingloanDetailData = data;
      },
      (error) => {
        console.error('Housing Load Details error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  getPreviousHousingLoanDetails() {
    var sub = this.houseingloanService.getPreviousDataOfHousingLoan().subscribe(
      (data: HouseLoanDetailModel[]) => {
        console.log('Previous Housing Load Details data=>', data);
        this.previousHousingLoanData = data;
        this.initFormGroup();
      },
      (error) => {
        this.initFormGroup();
        console.error('Previous Housing Load Details error=>', error);
      }
    );
    this.subscription.add(sub);
  }
  cancel() {
    console.log('cancel changes..');
    this.closeView();
  }
  closeView() {
    this.dialogRef.close();
  }
  submit() {
    console.log('submit housing loan');
    let payLoad = this.populatePayload();
    if (this.housingloanForm.invalid) {
      return;
    }
    var sub = this.houseingloanService
      .saveHousingLoanDetails(payLoad, null)
      .subscribe(
        (data) => {
          this.populateResponseMessage(data);
        },
        (error) => {
          this.messageModalService.showMessage(
            'Unexpected Error Occurred!',
            'Error',
            'warning-icon',
            'CLOSE'
          );
          console.error('Housing Loan SAVE ERROR => ', error);
        }
      );
    this.subscription.add(sub);
  }
  showInitMessage() {
    var msg = HousingLoanInitMessage;
    var status = 'Decleration';
    var icon = 'info-icon';
    this.messageModalService.showMessage(msg, status, icon, 'OK');
  }

  initFormGroup() {
    let previousHousingLoanObj = new HouseLoanDetailModel();
    if (this.previousHousingLoanData[0]) {
      previousHousingLoanObj = this.previousHousingLoanData[0];
    }
    console.log(
      'date possesion=>',
      new Date(previousHousingLoanObj.possessionDate)
    );
    console.log('date possesion=>', previousHousingLoanObj.possessionDate);
    this.housingloanForm = this.formBuilder.group({
      propertyText: [
        previousHousingLoanObj.propertyCode,
        [Validators.required],
      ], //required type
      possessionDate: [
        new Date(previousHousingLoanObj.possessionDate),
        [Validators.required],
      ], //required
      lenderText: [previousHousingLoanObj.lenderText, [Validators.required]], //required type
      lenderAddressOne: [
        previousHousingLoanObj.lenderAddressOne +
          previousHousingLoanObj.lenderAddressTwo +
          previousHousingLoanObj.lenderAddressThree,
        [Validators.required],
      ], //required
      propertyAddress: [
        previousHousingLoanObj.propertyAddress,
        [Validators.required],
      ], //required
      actualDeductionInterestUnder24: [
        previousHousingLoanObj.actualDeductionInterestUnder24,
        [Validators.required],
      ], //Interest Amount required
      lenderName: [previousHousingLoanObj.lenderName, [Validators.required]], //required
      lenderPancardNumber: [
        previousHousingLoanObj.lenderPancardNumber,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ], //required
      yearlyRentAmount: [
        previousHousingLoanObj.yearlyRentAmount,
        [Validators.required],
      ], //required
      propertyTaxPaid: [
        previousHousingLoanObj.propertyTaxPaid,
        [Validators.required],
      ], //required
      repairs: [previousHousingLoanObj.repairs], //not required
    });
  }
  getErrorMessage() {
    return 'Required Valid Input';
  }
  get form() {
    return this.housingloanForm.controls;
  }
  self = 'Self-occupied/Deemed self-occupied House Property';
  rent = 'Let Out House Property';
  populatePayload(): any {
    let formvalues = this.housingloanForm.value;
    console.log(this.housingloanForm.value);
    let payLoadObj = new HouseLoanDetailModel();
    payLoadObj.possessionDate = formvalues.possessionDate.valueOf();
    payLoadObj.propertyText =
      formvalues.propertyText == '1' ? this.self : this.rent;
    payLoadObj.propertyCode = formvalues.propertyText;
    payLoadObj.lenderText = formvalues.lenderText;
    payLoadObj.lenderAddressOne = formvalues.lenderAddressOne;
    payLoadObj.propertyAddress = formvalues.propertyAddress;
    payLoadObj.actualDeductionInterestUnder24 =
      formvalues.actualDeductionInterestUnder24;
    payLoadObj.lenderName = formvalues.lenderName;
    payLoadObj.lenderPancardNumber = formvalues.lenderPancardNumber;
    payLoadObj.yearlyRentAmount = formvalues.yearlyRentAmount;
    payLoadObj.propertyTaxPaid = formvalues.propertyTaxPaid;
    payLoadObj.repairs = formvalues.repairs;
    let arrayOfHousingLoanModelToSave: HouseLoanDetailModel[] = [];
    arrayOfHousingLoanModelToSave.push(payLoadObj);
    let finalPayload = {
      actionFlag: 'C',
      employeeRemarks: 'Test',
      approvalRemarks: 'Test Ap',
      housingLoanDetailRequest: arrayOfHousingLoanModelToSave,
    };
    return finalPayload;
  }
  populateResponseMessage(data) {
    var msg =
      data['responseStatus'] == 'SUCCESS'
        ? 'Successfully updated'
        : data['responseStatus'] == 'FAILED'
        ? data['systemErrMsg']
        : 'Request failed';
    var status = data['responseStatus'] == 'SUCCESS' ? 'Success' : 'Error';
    var icon =
      data['responseStatus'] == 'SUCCESS' ? 'success-icon' : 'warning-icon';
    this.messageModalService.showMessage(msg, status, icon, 'CLOSE', () => {
      this.dialogRef.close();
    });
  }
}
