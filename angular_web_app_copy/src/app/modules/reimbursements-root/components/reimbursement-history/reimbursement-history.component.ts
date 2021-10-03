import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { ReimbursementsService } from '../../services/reimbursements.service';
import {
  storeReimbursementType,
  storeStatus,
} from '../../utils/reimbursements.model';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { formatDate } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MultiAttachListComponent } from '../../../../components/shared/multi-attach-list/multi-attach-list.component';
import { takeWhile } from 'rxjs/operators';
import { ReimbursementsConstants } from '../../utils/reimbursements.constants';
import { LtaComponent } from '../reimbursements-forms/lta/lta.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-reimbursement-history',
  templateUrl: './reimbursement-history.component.html',
  styleUrls: ['./reimbursement-history.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class ReimbursementHistoryComponent implements OnInit {
  @Input() setOperation: any;
  rembHistList: any = []; //datasource for reimbursement history table
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  storeHistoryPayLoadArray: any = [];
  @Input() startDate: any;
  @Input() endDate: any;
  @Input() successFlag: any;
  statusObj: any = [];
  reimbTypeObj: any = [];
  typeSelect: 'Select All';
  statusSelect = 'All';
  isAlive = true;
  displayedColumns: string[] = [
    'Type',
    'ClaimDate',
    'ClaimAmt',
    'PassedAmt',
    'ClaimStatus',
    'ClaimNo',
    'Attachments',
    'Action',
  ];

  constructor(
    private reimbursmentService: ReimbursementsService,
    public dialog: MatDialog,
    private messageService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.statusSelect = 'All';
    this.typeSelect = 'Select All';
    // this.reimbursmentService.getReimbursementType();
    this.reimbursmentService.ReimbTypeData.pipe(
      takeWhile(() => this.isAlive)
    ).subscribe((res) => {
      if (!!res) {
        this.reimbTypeObj = [];
        res.forEach((type) => {
          if (type.reimbursementText != '') {
            if (type.reimbursementText == 'Select All') {
              this.typeSelect = type.reimbursementText;
            }
            var typeList = {
              reimbursementList: type.reimbursementText,
              sapCode: type.reimbursementType.sapCode,
            };
            this.reimbTypeObj.push(typeList);
          }
        });
      }
    });
  }

  ngOnChanges() {
    if (this.startDate != undefined || this.endDate != undefined) {
      this.getStatus();
    }
    this.statusSelect = 'All';
    this.typeSelect = 'Select All';

    if (this.successFlag) {
      this.callRembDetails();
    }
  }

  callRembDetails() {
    this.storeHistoryPayLoadArray = [];
    this.rembHistList = [];
    var status, type, tabName;
    if (this.setOperation == 'claim') {
      tabName = '';
      if (this.statusSelect == 'All' || this.statusSelect == 'Select All') {
        status = '';
      } else {
        status = this.statusSelect;
      }
    } else if (this.setOperation == 'pendingClaim') {
      tabName = 'P';
      if (this.statusSelect == 'All' || this.statusSelect == 'Select All') {
        // status = 'P';
        status = ''; //changed to blank
      } else {
        status = this.statusSelect;
      }
    }
    var payload = {
      fromDate: this.startDate.getTime(),
      toDate: this.endDate.getTime(),
      type: this.typeSelect == 'Select All' ? '' : this.typeSelect,
      status: status,
      tabName: tabName,
    };
    console.log(payload);
    this.subscriptionsList.push(
      this.reimbursmentService
        .getReimbursmentsHistoryDetails(payload)
        .subscribe(
          (data) => {
            if (data) {
              this.createReimbursementHistoryPayload(Object.values(data));
            }
          },
          (error) => {
            console.log();
          }
        )
    );
  }

  createReimbursementHistoryPayload(historyValues) {
    historyValues.forEach((mainHistoryArray) => {
      mainHistoryArray.forEach((subHistoryArray) => {
        for (let selectedRembType of ReimbursementsConstants.REIMBURSEMENTS_TYPE) {
          var componentName;
          if (
            subHistoryArray.reimbursementTypeKey.sapCode ==
            selectedRembType.sapCode
          ) {
            componentName = selectedRembType.componentName;
          }
        }
        var hisDetPayLoad = {
          type: subHistoryArray.reimbursementTypeKey.value,
          sapCode: subHistoryArray.reimbursementTypeKey.sapCode,
          claimDate: subHistoryArray.claimDate,
          claimAmt: subHistoryArray.requiredAmount,
          passedAmt: subHistoryArray.appilicableAmount,
          claimStatus: subHistoryArray.statusText,
          claimNumber: subHistoryArray.claimNumber,
          attachment: subHistoryArray.attachmentCount,
          attachmentFlag: subHistoryArray.attachmentFlag,
          deleteFlag: subHistoryArray.deleteFlag,
          editFlag: subHistoryArray.editFlag,
          printFlag: subHistoryArray.printFlag,
          objForAction: subHistoryArray,
          componentName: componentName,
        };
        this.storeHistoryPayLoadArray.push(hisDetPayLoad);
      });
    });
    var sortedData = this.storeHistoryPayLoadArray.sort(
      (obj1, obj2) => obj2.claimNumber - obj1.claimNumber
    );
    this.rembHistList = sortedData;
    // this.rembHistList = this.storeHistoryPayLoadArray;
  }

  getStatus() {
    this.subscriptionsList.push(
      this.reimbursmentService.getStatus().subscribe(
        (res) => {
          if (res) {
            this.statusObj = res;
            storeStatus.statusObj = this.statusObj;
            this.callRembDetails();
          }
        },
        (error) => {}
      )
    );
  }

  performAction(opr, obj, componentName) {
    var payloadToSend = {
      typeDetails: obj,
      setOperation: 'Edit',
      viewMode: opr == 'view' ? true : false,
    };
    let width: string = '';
    if (opr == 'edit' || opr == 'view') {
      if (obj.reimbursementTypeKey.sapCode == 'SLTA') {
        width = '1055px';
      } else {
        width = '683px';
      }
      const dialogRef = this.dialog.open(componentName, {
        width: width,
        data: { payLoad: payloadToSend },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'success') {
          this.callRembDetails();
        }
      });
    } else if (opr == 'delete') {
      this.messageService.showConfirmation(
        'Do you want to delete this reimbursement entry?',
        'Confirmation',
        'confirmation-icon',
        (reason) => {
          if (reason === 'YES') {
            this.subscriptionsList.push(
              this.reimbursmentService.deleteClaim(obj.claimNumber).subscribe(
                (res) => {
                  if (res) {
                    this.callRembDetails();
                  }
                },
                (error) => {}
              )
            );
          }
        }
      );
    } else {
      this.multiAttachList(obj.claimNumber, 'print');
    }

    console.log(payloadToSend);
  }

  multiAttachList(claimNo, opr) {
    this.subscriptionsList.push(
      this.reimbursmentService.getAttachmentDetails(claimNo).subscribe(
        (res) => {
          if (res) {
            const dialogRef = this.dialog.open(MultiAttachListComponent, {
              width: '683px',
            });
            dialogRef.componentInstance.attachmentDet = res;
            dialogRef.componentInstance.opr = opr;
          }
        },
        (error) => {}
      )
    );
  }
}
