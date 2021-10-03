import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChoicepayRootService } from './choicepay-root.service';
import {
  ChoicePayComponentModel,
  ChoicePayPeriod,
  breadcrumbChoicePayJson,
} from './choicepay-root.model';
import { ChoicePayInfoComponent } from './choice-pay-info/choice-pay-info.component';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PayrollService } from '../../payroll.service';
import { LoadingSpinnerService } from 'src/app/components/shared/loading-spinner/loading-spinner.service';
import { MessageModalService } from '../../../../components/shared/services/message-modal-service';

@Component({
  selector: 'choicepay-landing',
  templateUrl: './choicepay-landing.component.html',
  styleUrls: ['./choicepay-landing.component.css'],
})
export class ChoicePayLandingComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  /**
   * Choice Pay Object Variables
   */
  choicePayComponents: ChoicePayComponentModel[];
  filteredChoicePayComponents: ChoicePayComponentModel[];
  mandatoryDebits: ChoicePayComponentModel[];
  selectedMandatoryDebits: ChoicePayComponentModel[];
  residualChoicePay: ChoicePayComponentModel;
  totalCtc: ChoicePayComponentModel;
  basicPay: ChoicePayComponentModel;
  basePay: ChoicePayComponentModel;
  choicePay: ChoicePayComponentModel;
  fuelReimursmentCar: ChoicePayComponentModel;
  fuelReimursmentTwoWheeler: ChoicePayComponentModel;
  choicePayInfo: ChoicePayPeriod;
  elementFlag: boolean = false;
  /**
   * ChoicePay Variables
   */
  effectiveDateMessage: string;
  effectiveDate: number;
  breadcrumbJson: any;
  isFormInvalid: boolean;
  constructor(
    private service: ChoicepayRootService,
    private rootService: PayrollService,
    public dialog: MatDialog,
    private spinnerService: LoadingSpinnerService,
    private modalService: MessageModalService
  ) {
    this.subscription = new Subscription();
    this.breadcrumbJson = breadcrumbChoicePayJson;
  }

  ngOnInit(): void {
    this.init();
    this.getIsChoicePayAvailableStatus();
    this.getIsFormInvalidStatus();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  init() {
    if (!this.service.choicePayInfo || this.service.isChoicePayModified) {
      var subscription = this.rootService.getChoicePayPeriod().subscribe(
        (data: any[]) => {
          if (data && data.length > 0) {
            this.service.setIsChoicePayAvailable(true);
            this.effectiveDateMessage = data
              ? data[0]['message']
                ? data[0]['message']
                : 'NO Message'
              : 'No Data';
            this.effectiveDateMessage = this.effectiveDateMessage.replace(
              'Date',
              'from'
            );
            this.service.setEffectiveDateMessage(this.effectiveDateMessage);
            this.choicePayInfo = data[0];
            this.elementFlag = this.choicePayInfo.elementFlag;
            this.service.setChoicePayInfo(this.choicePayInfo);
            this.effectiveDate = data[0].effectiveDate;
            this.service.setEffectiveDate(this.effectiveDate);
            const infoMessage = data[0].infoMessage;
            if (infoMessage && infoMessage.trim() !== '') {
              this.service.isFreez = true;
              const dialogRef = this.dialog.open(ChoicePayInfoComponent, {
                width: '600px',
              });
              dialogRef.componentInstance.infoMessage = infoMessage;
            }
            this.getPayComponents();
          } else {
            this.service.setIsChoicePayAvailable(false);
          }
        },
        (error) => {
          this.errorMessageMode();
          console.error('ERROR: choice-pay=> init()=>', error);
        },
        () => {
          console.log('Finally..');
        }
      );
      this.subscription.add(subscription);
    } else {
      this.effectiveDateMessage = this.service.getEffectiveDateMessage;
      this.choicePayInfo = this.service.getChoicePayInfo;
      this.effectiveDate = this.service.getEffectiveDate;
      this.getPayComponents();
    }
  }
  setEffectiveFromDateMessage(longMillisec) {
    let dateObj = new Date(longMillisec);
    this.effectiveDateMessage =
      'Effective from ' +
      dateObj.getDate() +
      '.' +
      dateObj.getMonth() +
      '.' +
      dateObj.getFullYear();
  }
  getPayComponents() {
    if (
      this.service.choicepayDetailList.length == 0 ||
      this.service.isChoicePayModified
    ) {
      var subscription = this.rootService
        .getChoicePayComponents(this.effectiveDate)
        .subscribe(
          (data: any[]) => {
            if (data && data.length > 0) {
              this.service.setChoicePayDetailsList(data);
              this.service.setAllChoicePayComponents();
              this.service.setIsChoicePayAvailable(true);
            } else {
              this.service.setIsChoicePayAvailable(false);
            }
          },
          (error) => {
            console.error('CHOICE-PAY: ', error);
          }
        );
      this.subscription.add(subscription);
    } else {
      console.log('already populated getPayComponent..');
    }
  }
  onSave() {
    console.log('onSave');
    this.service.isChoicePayModified = true;
    let mesg = this.service.checkIfZeroAmountComponentInList();
    if (mesg != '') {
      this.modalService.showMessage(mesg, 'Error', 'warning-icon', 'CLOSE');
    } else {
      this.service.submitChoicePay(this.service.getRequestBody).subscribe(
        (data: any) => {
          this.populateResponseMessage(data);
          this.getPayComponents();
        },
        (error) => {
          this.modalService.showMessage(
            'Unexpected Error Occurred!',
            'Error',
            'warning-icon',
            'CLOSE'
          );
          console.error('CHOICE-PAY SAVE ERROR => ', error);
        }
      );
    }
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
    this.modalService.showMessage(msg, status, icon, 'CLOSE');
  }
  getIsChoicePayAvailableStatus() {
    var sub = this.service.isChoicePayAvailableSubject.subscribe(
      (data) => {
        if (!data) {
          this.errorMessageMode();
        }
      },
      (error) => {
        this.errorMessageMode();
        console.error('error in choicePay=>', error);
      }
    );
    this.subscription.add(sub);
  }
  errorMessageMode() {
    this.modalService.showMessage(
      'Choice Pay Service is Not Available Currently!',
      'Error',
      'warning-icon',
      'CLOSE',
      () => {
        this.service.setIsChoicePayAvailable(true);
        this.service.choicepayNavigateTo(['/payroll']);
      }
    );
  }
  getIsFormInvalidStatus() {
    var sub = this.service.isFormInvalidSubject.subscribe((data: boolean) => {
      this.isFormInvalid = data;
    });
    this.subscription.add(sub);
  }
  cancel() {
    this.service.isChoicePayModified = true;
    this.service.choicepayNavigateTo(['/payroll']);
  }
}
