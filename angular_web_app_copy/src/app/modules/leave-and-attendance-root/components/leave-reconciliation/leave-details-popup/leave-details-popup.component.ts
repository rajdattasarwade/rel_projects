import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LeaveAvailedPopupComponent } from '../leave-availed-popup/leave-availed-popup.component';
import { LeaveCreditedPopupComponent } from '../leave-credited-popup/leave-credited-popup.component';
import { LeaveReconciliationService } from '../leave-reconciliation.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-leave-details-popup',
  templateUrl: './leave-details-popup.component.html',
  styleUrls: ['./leave-details-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeaveDetailsPopupComponent implements OnInit {

  displayedColumns = ['year','opening','credited','availed','balance'];
  dataSource = [];
  dataDetail=[]
 public subscriptionsList: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<LeaveDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private LeaveCon:LeaveReconciliationService
  ) { }

  ngOnInit(): void {
    this.getDetaillist(this.data) 
  }
  openAvalied(dataid){
    this.getAvaliedlist(dataid);
    //this.openAvailedPopup(dataid) 
  }
getAvaliedlist(listID){
  this.subscriptionsList.push(
    this.LeaveCon.getLeaveSubDetails(listID).subscribe(
      (data: any) => {
        if (data) {
          this.openAvailedPopup(data);
        }
      },
      (error) => {
        console.log();
      }
    )
  );
}
getDetaillist(data){
  this.subscriptionsList.push(
    this.LeaveCon.getDetailLeave(data.leaveCode,data.leavequota).subscribe(
      (data: any) => {
        if (data) {
          this.dataDetail=data;
        }
      },
      (error) => {
        console.log();
      }
    )
  );
}
openCredit(dataid){
  this.getCriedtlist(dataid) 
}
getCriedtlist(listID){
  this.subscriptionsList.push(
    this.LeaveCon.getLeaveSubDetails(listID).subscribe(
      (data: any) => {
        if (data) {
          this.openCreditedPopup(data);
        }
      },
      (error) => {
        console.log();
      }
    )
  );
}
  closeModal() {
    this.dialogRef.close();
  }

  openAvailedPopup(AvaliedData) {
    this.dialog.open(LeaveCreditedPopupComponent, {
      width: '683px',
      data:AvaliedData 
    });
  }

  openCreditedPopup(CrediData) {
    this.dialog.open(LeaveAvailedPopupComponent, {
      width: '683px',
      data: CrediData
    });
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
  

}
