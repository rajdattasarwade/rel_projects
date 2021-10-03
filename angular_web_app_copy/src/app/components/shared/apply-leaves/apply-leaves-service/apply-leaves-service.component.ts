import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApplyLeaveService } from '../apply-leave.service';
import { MatDialog } from '@angular/material/dialog';
import { LeaveModalComponent } from 'src/app/modules/leave-and-attendance-root/components/leave-modal/leave-modal.component';
import { ApplyLeaveConstants } from '../../apply-leaves/apply-leave.constants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-apply-leaves-service',
  templateUrl: './apply-leaves-service.component.html',
  styleUrls: ['./apply-leaves-service.component.css'],
})
export class ApplyLeavesServiceComponent implements OnInit {
  leaveBalance: any = [];
  subscription: Subscription[] = [];
  breadcrumbJson: any = [
    {
      label: 'Leave and Attendance',
      link: '/leave-and-attendance',
    },
    {
      label: 'Leave Planner',
      link: '/leave-and-attendance/leave-planner',
    },
  ];

  constructor(
    private leavesService: ApplyLeaveService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLeaveBalance();
  }

  getLeaveBalance() {
    this.subscription.push(
      this.leavesService.getLeavesBalance().subscribe((response) => {
        if (response) {
          for (let d in response) {
            this.leaveBalance.push(response[d]);

            this.leaveBalance.forEach((element) => {
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
        }
      })
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

  close() {
    this.router.navigate(['/leave-and-attendance']);
  }
}
