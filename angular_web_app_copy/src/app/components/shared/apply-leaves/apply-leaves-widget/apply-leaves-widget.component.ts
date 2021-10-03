import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplyLeaveService } from '../apply-leave.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequestModalComponent } from 'src/app/modules/leave-and-attendance-root/components/leave-request-modal/leave-request-modal.component';
import { Router } from '@angular/router';
import { LeaveModalComponent } from 'src/app/modules/leave-and-attendance-root/components/leave-modal/leave-modal.component';
import { ApplyLeaveConstants } from '../../apply-leaves/apply-leave.constants';
@Component({
  selector: 'app-apply-leaves-widget',
  templateUrl: './apply-leaves-widget.component.html',
  styleUrls: ['./apply-leaves-widget.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplyLeavesWidgetComponent implements OnInit {
  leave_balance: any = [];
  leaveResponse: any;
  subscription: Subscription[] = [];
  constructor(
    private leavesService: ApplyLeaveService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // var Data = this.leavesService.leave_balance;
    this.subscription.push(
      this.leavesService.getLeavesBalance().subscribe((response) => {
        var Data = response;
        for (let d in Data) {
            this.leave_balance.push(Data[d]);
            this.leave_balance.forEach((element) => {
              element.dispalyBal = element.balance;
              if (
                ApplyLeaveConstants.dontShowLeftLeaveCodeArray.includes(
                  element.leaveCode
                )
              ) {
                element.dispalyBal = 0;
              }
            });
        }
      })
      //   this.leaveResponse = response;
      //   for (let key in this.leaveResponse)
      //     this.leave_balance.push(this.leaveResponse[key][0]);
      // })
    );
  }
  ngOnDestroy() {
    if (this.subscription.length > 0) {
      this.subscription.forEach((s) => s.unsubscribe());
    }
  }

  openApplyLeave(leaveData) {
    const dialogRef = this.dialog.open(LeaveModalComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.leaveData = leaveData;
  }

  seeAll() {
    this.router.navigate(['/leave-and-attendance/leave-planner']);
  }
}
