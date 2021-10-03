import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-maternity-modal',
  templateUrl: './maternity-modal.component.html',
  styleUrls: ['./maternity-modal.component.css']
})
export class MaternityModalComponent implements OnInit {
  dismissCallback:any = [];
  dissmissActions = HrssEmailActions;
  edd: any;
  fromdate: any;
  week: any;
  constructor(public activeModal: MatDialog,
    public dialogRef: MatDialogRef<MaternityModalComponent>,
    private messageModalService: MessageModalService,) { }

  ngOnInit(): void {
  }
  addEvent(date) {
    var Difference_In_Time = date.toDate().getTime() - this.fromdate.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    this.week = Difference_In_Days / 7
    if (this.week > 8) {
      this.edd=""
      this.messageModalService.showMessage(
        'Maternity Leave not allowed before 8 weeks from Expected Date of Delivery',
        'Error',
        'warning-icon',
        'CLOSE'
      );   
    }
    else {
      this.messageModalService.showMessage(
        `If you wish to join the 'New Mother's Group' please send a mail to dni.connect @ril.com with subject line as 'Joining New Mother Group'.<br>
         Also provide your Employee Code, Employee Name and corporate mobile number for registration`,
        'Information',
        '',
        'CLOSE'
      );   
    }
  }
  onDismissAction(dismissBtn: HrssEmailActions, edd) {
    if (this.dismissCallback) {
      this.dismissCallback(dismissBtn, edd,this.week);
    }
    this.dialogRef.close();
  }
}
export enum HrssEmailActions {
  OK = "OK",
}