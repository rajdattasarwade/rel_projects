import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/components/core/config/config';
@Component({
  selector: 'app-team-attendance-report',
  templateUrl: './team-attendance-report.component.html',
  styleUrls: ['./team-attendance-report.component.css'],
})
export class TeamAttendanceReportComponent implements OnInit {
  firstClickGlobalMonthly = false;
  isManager = Config.isManager;
  firstClickGlobalAnnual = false;
  breadcrumbJson: any = [
    {
      label: 'Leave and Attendance',
      link: '/leave-and-attendance',
    },
    {
      label: 'Team Report',
      link: '/leave-and-attendance/teamAttendanceReport',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  changeFirstClick(event) {
    if (event.index == 1) {
      this.firstClickGlobalMonthly = true;
    }
    if (event.index == 2) {
      this.firstClickGlobalAnnual = true;
    }
  }
}
