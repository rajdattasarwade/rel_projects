import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeaveDetailsPopupComponent } from './leave-details-popup/leave-details-popup.component';
import { LeaveReconciliationService } from './leave-reconciliation.service';
import { Subscription } from 'rxjs';
import { CompOffLeaveDetailsComponent } from './comp-off-leave-details/comp-off-leave-details.component';
//import * as moment from 'moment';

@Component({
  selector: 'app-leave-reconciliation',
  templateUrl: './leave-reconciliation.component.html',
  styleUrls: ['./leave-reconciliation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeaveReconciliationComponent implements OnInit {

  breadcrumbJson: any = [
    {
      label: 'Leave and Attendance',
      link: '/leave-and-attendance'
    },
    {
      label: 'Leave Reconciliation',
      link: '/leave-and-attendance/leaveReconciliation'
    }
  ];
  displayedColumns = ['leave_type','total_earned','total_availed','approved_to_avail','balance','pending_approval','icon'];
  dataSource = [];
  data={}
 public subscriptionsList: Subscription[] = [];
  constructor(
    public dialog: MatDialog,
    private LeaveCon:LeaveReconciliationService
  ) { }

  ngOnInit(): void {
    //this.dataSource=this.dataFormatFun(this.data);
    this.getLeaveHistoryData();
  }
  getLeaveHistoryData() {
    this.subscriptionsList.push(
      this.LeaveCon.getRecList().subscribe(
        (data: any) => {
          if (data) {
            //data=this.dataFormatFun(data);
            this.dataSource=data;
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }
  dataFormatFun(data){
    var finalarry=[];
    for (const property in data) {
    
    for (var i=0;i<data[property].length;i++){
      
      finalarry.push(data[property][i])
    }
  }
  console.log(finalarry);
  return finalarry
  }
  openLeaveDetails(data) {
    if(data.flagCredited==""){
     
        this.dialog.open(LeaveDetailsPopupComponent, {
          width: '683px',
          data: { 
            leaveType: data.leaveText,
            leaveCode:data.leaveCode,
            leavequota:data.quotaType,
  
          },
        });
     
    }else{
      this.dialog.open(CompOffLeaveDetailsComponent, {
        width: '683px',
        data: { 
          leaveType: data.leaveText,
          leaveCode:data.leaveCode,
          leavequota:data.quotaType,
          flagCredited:data.flagCredited
        },
      });
    }
    
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }

}
