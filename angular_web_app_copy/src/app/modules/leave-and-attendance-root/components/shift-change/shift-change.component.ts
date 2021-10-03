import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/components/core/config/config';

@Component({
  selector: 'app-shift-change',
  templateUrl: './shift-change.component.html',
  styleUrls: ['./shift-change.component.css'],
})
export class ShiftChangeComponent implements OnInit {
  isManager = Config.isManager;
  breadcrumbJson: any = [
    {
      label: 'Leave and Attendance',
      link: '/leave-and-attendance',
    },
    {
      label: 'My Shift',
      link: '/leave-and-attendance/shiftPlanning',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
