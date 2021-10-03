import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from '../../../services/benefits.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../loan-and-advances.component';

@Component({
  selector: 'app-advances-modal',
  templateUrl: './advances-modal.component.html',
  styleUrls: ['./advances-modal.component.css'],
})
export class AdvancesModalComponent implements OnInit {
  subscriptionList: Subscription[] = [];
  advanceType: any = [];
  public advanceLoan: FormGroup;
  saveDataObj: any = null;
  viewMode: any = 'Edit';
  dataObj: any;
  valueChange: boolean = false;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    public benefitsService: BenefitsService,
    private messageService: MessageModalService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.getAdvanceLoanType();
    this.viewMode = this.data ? this.data.editObj.actionType : '';
    this.dataObj = this.data ? this.data.editObj.data : '';
    if (this.viewMode == 'edit' || this.viewMode == 'view') {
      this.editFormSet(this.dataObj);
    } else {
      this.initForm();
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  getAdvanceLoanType() {
    let sub = this.benefitsService.getAdvanceLoanType().subscribe(
      (data: any) => {
        data.forEach((element) => {
          if (element.advanceTypeValue != '') {
            this.advanceType.push(element);
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
    this.subscriptionList.push(sub);
  }

  advanceTypeChange(event) {
    console.log(event);
  }

  initForm() {
    this.advanceLoan = new FormGroup({
      advanceType: new FormControl('', [Validators.required]),
    });
    return this.advanceLoan;
  }

  ngOnDestroy(): void {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }

  getChildformData(data) {
    if (data == null) {
      this.saveDataObj = null;
    } else {
      this.saveDataObj = data;
    }
  }
  onsubmit() {
    let subSave;
    if (this.advanceLoan?.value['advanceType'] == '01') {
      let obj = this.saveDataObj;
      obj.eventDate = new Date(obj.eventDate).getTime();
      subSave = this.benefitsService.saveTeamBuildLoan(obj).subscribe(
        (data: any) => {
          if (data.responseStatus == 'FAILED') {
            this.messageService.showMessage(
              data.systemErrMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          } else {
            let msg = JSON.parse(data.responseData);
            this.valueChange = true;
            this.messageService.showMessage(
              msg.d.Message,
              'Success',
              'success-icon',
              'CLOSE',
              () => this.dialogRef.close(this.valueChange)
            );
            // this.dialogRef.close('success');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      let obj = this.saveDataObj;
      subSave = this.benefitsService.saveMedImmprestLoan(obj).subscribe(
        (data: any) => {
          if (data.responseStatus == 'FAILED') {
            this.messageService.showMessage(
              data.systemErrMsg,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          } else {
            let msg = JSON.parse(data.responseData);
            this.valueChange = true;
            this.messageService.showMessage(
              msg.d.Message,
              'Success',
              'success-icon',
              'CLOSE',
              () => this.dialogRef.close(this.valueChange)
            );
            //  this.dialogRef.close('success');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }

    this.subscriptionList.push(subSave);
  }

  editFormSet(data) {
    this.advanceLoan = new FormGroup({
      advanceType: new FormControl(
        {
          value: data.advanceCode,
          disabled: this.viewMode == 'edit' || this.viewMode == 'view',
        },
        [Validators.required]
      ),
    });
    return this.advanceLoan;
  }
}
