import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { IconsModel } from '../../../../components/common/common-models';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EligibilityComponent } from '../../components/eligibility/eligibility.component';
import { Subscription } from 'rxjs';
import { ReimbursementsService } from '../../services/reimbursements.service';
import { storeReimbursementType } from '../../utils/reimbursements.model';
import { ReimbursementsTypeDetails } from '../../utils/reimbursements.model';
import { takeWhile } from 'rxjs/operators';
import { ReimbursementsConstants } from '../../utils/reimbursements.constants';
import { LtaComponent } from '../../components/reimbursements-forms/lta/lta.component';
@Component({
  selector: 'app-reimbursement-landing',
  templateUrl: './reimbursement-landing.component.html',
  styleUrls: ['./reimbursement-landing.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReimbursementLandingComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  claimList: any = [];
  icons: any;
  icons2: any;
  toggleClaimList: boolean = false;
  isAlive = true;
  setOperation = 'claim';
  totalPendingClaim: any; //store total pending claim to be displayed in card
  startDate: any; //from setDate Api to be passed in history tab
  endDate: any; //from setDate Api to be passed in history tab
  totalPendingClaimAmt: number = 0; //sum of pending claim amt
  choicePayDetails: any = [];
  totalAmtChoicePay: number = 0.0;
  totalClaimedChoicePay: number = 0.0;
  totalBalanceChoicePay: number = 0.0;
  successFlag: boolean;

  constructor(
    public dialog: MatDialog,
    private reimbursmentService: ReimbursementsService
  ) {
    this.icons = [];
    this.icons.push(
      new IconsModel('', '', 'header-ico download_pdf_ico', 'download_pdf')
    );

    this.icons2 = [];
    this.icons2.push(
      new IconsModel('', '', 'header-ico total-pay-summary-ico', 'choice_pay')
    );
  }

  ngOnInit(): void {
    this.setDates();
    this.reimbursmentService.getReimbursementType();
    this.reimbursmentService.ReimbTypeData.pipe(
      takeWhile(() => this.isAlive)
    ).subscribe((res) => {
      if (!!res) {
        this.claimList = [];
        storeReimbursementType.typeObj = res;
        for (let selectedRembType of ReimbursementsConstants.REIMBURSEMENTS_TYPE) {
          storeReimbursementType.typeObj.forEach((type) => {
            if (selectedRembType.sapCode == type.reimbursementType.sapCode) {
              var objToSend = {
                selectedRembType: selectedRembType,
                type: type,
              };
              if (selectedRembType.sapCode == 'ZSOH') {
                this.reimbursmentService.setSohoEligibility(type);
              }
              this.claimList.push(objToSend);
            }
          });
        }
      }
    });
    this.getChoicePayPeriod();
  }

  openClaimsList() {
    this.toggleClaimList = !this.toggleClaimList;
  }

  Eligibility() {
    const dialogRef = this.dialog.open(EligibilityComponent, {
      width: '683px',
    });
  }

  setFunctionality(opr) {
    this.setOperation = opr;
  }

  setDates() {
    this.subscriptionsList.push(
      this.reimbursmentService.getDates().subscribe(
        (res) => {
          if (res) {
            this.startDate = new Date(res['startDate']);
            this.endDate = new Date(res['maxDate']);
            this.callRembDetails();
          }
        },
        (error) => {}
      )
    );
  }

  getSuccessFlagValue(event) {
    this.successFlag = event;
  }

  callRembDetails() {
    var payload = {
      fromDate: this.startDate.getTime(),
      toDate: this.endDate.getTime(),
      type: '',
      status: '',
      tabName: 'P',
    };
    this.subscriptionsList.push(
      this.reimbursmentService
        .getReimbursmentsHistoryDetails(payload)
        .subscribe(
          (data) => {
            if (data) {
              this.totalPendingClaim = Object.values(data).length;
              Object.values(data).forEach((pendingDetail) => {
                this.totalPendingClaimAmt =
                  this.totalPendingClaimAmt +
                  parseFloat(pendingDetail[0].requiredAmount);
              });
            }
          },
          (error) => {
            console.log();
          }
        )
    );
  }

  getChoicePayPeriod() {
    this.subscriptionsList.push(
      this.reimbursmentService.getChoicePayPeriodDetails().subscribe(
        (data) => {
          if (data) {
            console.log('Choice pay');
            console.log(data);
            this.subscriptionsList.push(
              this.reimbursmentService
                .getChoicePay(data[0].effectiveDate)
                .subscribe(
                  (res) => {
                    if (res) {
                      this.choicePayDetails = res;
                      this.choicePayDetails.forEach((choicePay) => {
                        if (
                          choicePay.component == 'CEA' ||
                          choicePay.component == 'FUMT' ||
                          choicePay.component == 'FMTW' ||
                          choicePay.component == 'LTA' ||
                          choicePay.component == 'CHA' ||
                          // choicePay.component == 'HRA' ||
                          choicePay.component == 'MEDC'
                        )
                          this.totalAmtChoicePay =
                            this.totalAmtChoicePay + choicePay.amount;
                        this.totalClaimedChoicePay =
                          this.totalClaimedChoicePay + choicePay.claimedAmount;
                        this.totalBalanceChoicePay =
                          this.totalBalanceChoicePay + choicePay.balanceAmount;
                      });
                      for (let choicePayDetail in res) {
                      }
                    }
                  },
                  (error) => {
                    console.log();
                  }
                )
            );
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }

  ngOnDestroy() {
    this.isAlive = false;
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
