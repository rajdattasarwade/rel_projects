import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-time-report-self',
  templateUrl: './time-report-self.component.html',
  styleUrls: ['./time-report-self.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TimeReportSelfComponent implements OnInit {
  breadcrumbJson: any = [
    {
      label: 'Leave and Attendance',
      link: '/leave-and-attendance'
    },
    {
      label: 'Time Report Self',
      link: '/leave-and-attendance/teamReportSelf'
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
