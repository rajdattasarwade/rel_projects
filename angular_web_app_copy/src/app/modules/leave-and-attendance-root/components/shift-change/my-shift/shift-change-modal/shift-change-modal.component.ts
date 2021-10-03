import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ShiftService } from '../../manage_shift.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../../../calendar/attendance-calendar/attendance-calendar.component';
import * as moment from 'moment';
import { MessageModalService } from '../../../../../../components/shared/services/message-modal-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shift-change-modal',
  templateUrl: './shift-change-modal.component.html',
  styleUrls: ['./shift-change-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShiftChangeModalComponent implements OnInit {
  shiftList: any; //list all shift
  mutualShiftList: any = [];
  dateHeader: any;
  selectedShift: any;
  displayDate: any;
  displayShiftType: any;
  selectedMutalShift: any;
  cacheMutualShift: any = [];
  modalMessage: any;
  valueChange: boolean = false;
  shiftManager: Subscription = new Subscription();

  constructor(
    private shiftService: ShiftService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public activeModal: MatDialog,
    private modalService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.generateShiftList();
    this.generateMutualList();
    this.dateHeader = this.data.dateClicked;
    this.displayDate = moment(this.dateHeader.mDate).format('DD/MM/YYYY');
    this.displayShiftType = this.dateHeader.shiftType;
  }

  //to generate mutual List dynamically (method definition)
  private generateMutualList(): void {
    //caching of api responses, if already present then no need to hit api rather take data from response, else hit Api

    if (this.shiftService.cachedDetail.length > 0) {
      if (this.shiftService.cachedDetail != undefined) {
        this.mutualShiftList = this.shiftService.cachedDetail;
      } else {
        this.getMutualList();
      }
    } else {
      this.getMutualList();
    }
  }

  //to generate shift List dynamically (method definition)
  private generateShiftList(): void {
    //caching of api responses, if already present then no need to hit api rather take data from response, else hit Api

    if (this.shiftService.cachedIndividualDetail.length > 0) {
      if (this.shiftService.cachedIndividualDetail != undefined) {
        this.shiftList = this.shiftService.cachedIndividualDetail;
      } else {
        this.getShiftList();
      }
    } else {
      this.getShiftList();
    }
  }
  getShiftList() {
    let dateTime = new Date().getTime();
    let shiftList = this.shiftService
      .getShiftList(dateTime.toString())
      .subscribe(
        (data) => {
          this.shiftList = data;
          this.shiftService.cacheIndividualList(data);
        },
        (error) => {}
      );
    this.shiftManager.add(shiftList);
  }

  getMutualList() {
    let dateTime = new Date().getTime();

    let mutualList = this.shiftService
      .getMutualList(dateTime.toString())
      .subscribe(
        (data) => {
          this.mutualShiftList = data;
          this.shiftService.cacheMutualList(data);

          this.mutualShiftList.forEach((item) => {
            const shiftItems = item.shiftDDText.split('--');
            item.startTime = shiftItems[1];
            item.endTime = shiftItems[2];
            item.subName = shiftItems[4];
          });
        },
        (error) => {}
      );

    this.shiftManager.add(mutualList);
  }

  requestChangeIndividual() {
    let payload = this.getPayload();
    let changeIndividual = this.shiftService
      .postIndividualSave(payload)
      .subscribe(
        (data: any) => {
          if (data.flag == true) {
            this.valueChange = true;
            this.modalService.showMessage(
              'Data has been submitted successfully',
              'Success',
              'success-icon',
              'CLOSE',
              () => this.dialogRef.close(this.valueChange)
            );
          }
          if (data['responseStatus'] == 'FAILED') {
            this.modalMessage = data['systemErrMsg'];
            this.modalService.showMessage(
              this.modalMessage,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          }
        },
        (error) => {}
      );
    this.shiftManager.add(changeIndividual);
  }
  selectShift(item) {
    this.selectedShift = item;
  }

  selectMutualShift(item) {
    this.selectedMutalShift = item;
  }
  getPayload() {
    let reqPayload = {};
    reqPayload['date'] = moment(this.dateHeader.mDate).format('YYYY-MM-DD');
    reqPayload['empShift'] = this.dateHeader.shiftType;
    reqPayload['reqShift'] = this.selectedShift['shiftCode'];
    reqPayload['message'] = '';
    reqPayload['flag'] = '';
    return reqPayload;
  }
  getMutualPayload() {
    let reqPayload = {};
    reqPayload['date'] = moment(this.dateHeader.mDate).format('YYYY-MM-DD');
    reqPayload['sheduleShift'] = this.dateHeader.shiftType;
    reqPayload['subEmployee'] = this.selectedMutalShift['employeeId'];
    reqPayload['subShift'] = this.selectedMutalShift['shiftCode'];
    reqPayload['message'] = '';
    reqPayload['flag'] = '';
    return reqPayload;
  }
  onClose() {
    this.dialogRef.close();
  }

  requestChangeMutual() {
    let payload = this.getMutualPayload();
    let changeMutual = this.shiftService
      .postMutualSave(payload)
      .subscribe((data: any) => {
        if (data.flag) {
          this.valueChange = true;
          this.modalService.showMessage(
            'Data has been submitted successfully',
            'Success',
            'success-icon',
            'CLOSE',
            () => this.dialogRef.close(this.valueChange)
          );

          //this.showSuccessModal("successfully updated");
        }
        if (data['responseStatus'] == 'FAILED') {
          this.modalMessage = data['systemErrMsg'];
          this.modalService.showMessage(
            this.modalMessage,
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      });
    this.shiftManager.add(changeMutual);
  }

  ngOnDestroy() {
    this.shiftManager.unsubscribe();
  }
}
