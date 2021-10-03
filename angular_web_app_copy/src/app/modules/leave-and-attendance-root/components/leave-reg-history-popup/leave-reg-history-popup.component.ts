import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-leave-reg-history-popup',
  templateUrl: './leave-reg-history-popup.component.html',
  styleUrls: ['./leave-reg-history-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeaveRegHistoryPopupComponent implements OnInit {

  breadcrumbJson: any = [
    {
      label: 'Leave and Attendance',
      link: '/leave-and-attendance'
    },
    {
      label: 'Leave and Regularization History',
      link: '/leave-and-attendance/leaveRegularizationHistory'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
