import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveReconciliationService } from '../leave-reconciliation.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-comp-off-leave-details',
  templateUrl: './comp-off-leave-details.component.html',
  styleUrls: ['./comp-off-leave-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompOffLeaveDetailsComponent implements OnInit {

  displayedColumns = ['leave_type','creation_date','expiraion_date','days'];
  dataDetails=[]
  public subscriptionsList: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<CompOffLeaveDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private LeaveCon:LeaveReconciliationService
  ) { }

  ngOnInit(): void {
    this.dataDetails=this.dataFormatFun([
      {
         "availed":"",
         "leaveText":"Privilege Leave",
         "fromDate":1577836800000,
         "toDate":253402214400000,
         "noOfDays":8.0
      }
    ])
    this.getCompofflist(this.data.flagCredited);
  }
  dataFormatFun(data){
     for (var i=0;i<data.length;i++){
       data[i].fromDate=moment(data[i].fromDate).format('DD/MM/YYYY');
       data[i].toDate=moment(data[i].toDate).format('DD/MM/YYYY');
       }
       return data
 }
 getCompofflist(listID){
  this.subscriptionsList.push(
    this.LeaveCon.getLeaveSubDetails(listID).subscribe(
      (data: any) => {
        if (data) {
          this.dataDetails=this.dataFormatFun(data);
        }
      },
      (error) => {
        console.log();
      }
    )
  );
}
ngOnDestroy() {
  if (this.subscriptionsList.length > 0) {
    this.subscriptionsList.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
  closeModal() {
    this.dialogRef.close();
  }

}
