import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { TeamAttendanceFilterModalComponent } from '../team-attendance-filter-modal/team-attendance-filter-modal.component';
import { MatDialog } from '@angular/material/dialog';

import { MatTable } from '@angular/material/table';
import { TeamAttendanceService } from '../team-attendance.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-daily-attendance',
  templateUrl: './daily-attendance.component.html',
  styleUrls: ['./daily-attendance.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DailyAttendanceComponent implements OnInit, OnDestroy {
  attendanceData: any = [];
  availableStatus: any;
  availableShift: any;
  filterName: any = '';
  displayTable: boolean = false;
  filterShift: any = 'All Shifts';
  filterStatus: any = 'Show All';
  filterOrder: any = 'asc';
  dataForm: FormGroup;
  subManager: Subscription = new Subscription();
  orgUnitData: any;
  // @ViewChild('attendanceTable') matTable: MatTable<any>;
  @ViewChild('orgUnit') matSelect: MatSelect;
  displayedColumns = [
    'Name',
    'EmployeeId',
    'Shift',
    'Status',
    'PunchIn1',
    'PunchOut1',
    'PunchIn2',
    'PunchOut2',
  ];
  filterDataAval: boolean = true;
  alteredAttendanceData: any[];
  ogAttendanceData: Object;
  constructor(
    public dialog: MatDialog,
    private attendanceService: TeamAttendanceService
  ) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      orgUnit: new FormControl(''),
      selectedDate: new FormControl(moment()),
    });
    this.populateOrgUnit();
  }

  populateOrgUnit() {
    let orgUnitSub = this.attendanceService
      .getOrgUnit(this.dataForm.value.selectedDate.valueOf())
      .subscribe((data) => {
        this.orgUnitData = data;
        this.matSelect.value = this.orgUnitData[0].organizationUnitText;
        this.dataForm.controls['orgUnit'].setValue(
          this.orgUnitData[0].organizationUnitCode
        );
        this.populateTotalData();
      });
    this.subManager.add(orgUnitSub);
  }

  populateTotalData() {
    let dailyDataSub = this.attendanceService
      .getDailyAttendanceData(
        this.dataForm.value.selectedDate.valueOf(),
        this.dataForm.value.orgUnit
      )
      .subscribe((data) => {
        this.attendanceData = data;
        this.ogAttendanceData = data;
        if (this.attendanceData.length != 0) {
          this.filterDataAval = true;
        }
        this.alterData();
        this.sortInitialData();
        this.filterName = '';
        this.filterOrder = 'asc';
        this.filterStatus = 'Show All';
        this.filterShift = 'All Shifts';
        // this.matTable.renderRows();
      });
    this.subManager.add(dailyDataSub);
  }

  alterData() {
    this.alteredAttendanceData = [];
    this.attendanceData.forEach((userItem) => {
      let timeIn1Hour =
        moment(userItem.punchInOne).hours() < 10
          ? '0' + moment(userItem.punchInOne).hours()
          : moment(userItem.punchInOne).hours();
      let timeIn1Minutes =
        moment(userItem.punchInOne).minutes() < 10
          ? '0' + moment(userItem.punchInOne).minutes()
          : moment(userItem.punchInOne).minutes();
      let timeIn1Seconds =
        moment(userItem.punchInOne).seconds() < 10
          ? '0' + moment(userItem.punchInOne).seconds()
          : moment(userItem.punchInOne).seconds();
      let timeOut1Hour =
        moment(userItem.punchOutOne).hours() < 10
          ? '0' + moment(userItem.punchOutOne).hours()
          : moment(userItem.punchOutOne).hours();
      let timeOut1Minutes =
        moment(userItem.punchOutOne).minutes() < 10
          ? '0' + moment(userItem.punchOutOne).minutes()
          : moment(userItem.punchOutOne).minutes();
      let timeOut1Seconds =
        moment(userItem.punchOutOne).seconds() < 10
          ? '0' + moment(userItem.punchOutOne).seconds()
          : moment(userItem.punchOutOne).seconds();
      let timeIn2Hour =
        moment(userItem.punchInTwo).hours() < 10
          ? '0' + moment(userItem.punchInTwo).hours()
          : moment(userItem.punchInTwo).hours();
      let timeIn2Minutes =
        moment(userItem.punchInTwo).minutes() < 10
          ? '0' + moment(userItem.punchInTwo).minutes()
          : moment(userItem.punchInTwo).minutes();
      let timeIn2Seconds =
        moment(userItem.punchInTwo).seconds() < 10
          ? '0' + moment(userItem.punchInTwo).seconds()
          : moment(userItem.punchInTwo).seconds();
      let timeOut2Hour =
        moment(userItem.punchOutTwo).hours() < 10
          ? '0' + moment(userItem.punchOutTwo).hours()
          : moment(userItem.punchOutTwo).hours();
      let timeOut2Minutes =
        moment(userItem.punchOutTwo).minutes() < 10
          ? '0' + moment(userItem.punchOutTwo).minutes()
          : moment(userItem.punchOutTwo).minutes();
      let timeOut2Seconds =
        moment(userItem.punchOutTwo).seconds() < 10
          ? '0' + moment(userItem.punchOutTwo).seconds()
          : moment(userItem.punchOutTwo).seconds();
      let timeIn3Hour =
        moment(userItem.punchInThree).hours() < 10
          ? '0' + moment(userItem.punchInThree).hours()
          : moment(userItem.punchInThree).hours();
      let timeIn3Minutes =
        moment(userItem.punchInThree).minutes() < 10
          ? '0' + moment(userItem.punchInThree).minutes()
          : moment(userItem.punchInThree).minutes();
      let timeIn3Seconds =
        moment(userItem.punchInThree).seconds() < 10
          ? '0' + moment(userItem.punchInThree).seconds()
          : moment(userItem.punchInThree).seconds();
      let timeOut3Hour =
        moment(userItem.punchOutThree).hours() < 10
          ? '0' + moment(userItem.punchOutThree).hours()
          : moment(userItem.punchOutThree).hours();
      let timeOut3Minutes =
        moment(userItem.punchOutThree).minutes() < 10
          ? '0' + moment(userItem.punchOutThree).minutes()
          : moment(userItem.punchOutThree).minutes();
      let timeOut3Seconds =
        moment(userItem.punchOutThree).seconds() < 10
          ? '0' + moment(userItem.punchOutThree).seconds()
          : moment(userItem.punchOutThree).seconds();
      let attendanceObj = {
        date: userItem.date,
        organizationUnit: userItem.organizationUnit,
        shiftCode: userItem.shiftCode,
        employeeCode: userItem.employeeCode,
        employeeName: userItem.employeeName,
        designation: userItem.designation,
        employeeShiftCode: userItem.employeeShiftCode,
        punchInOne: timeIn1Hour + ':' + timeIn1Minutes + ':' + timeIn1Seconds,
        punchOutOne:
          timeOut1Hour + ':' + timeOut1Minutes + ':' + timeOut1Seconds,
        punchInTwo: timeIn2Hour + ':' + timeIn2Minutes + ':' + timeIn2Seconds,
        punchOutTwo:
          timeOut2Hour + ':' + timeOut2Minutes + ':' + timeOut2Seconds,
        punchInThree: timeIn3Hour + ':' + timeIn3Minutes + ':' + timeIn3Seconds,
        punchOutThree:
          timeOut3Hour + ':' + timeOut3Minutes + ':' + timeOut3Seconds,
        status: userItem.status,
      };
      this.alteredAttendanceData.push(attendanceObj);
    });
  }

  sortInitialData() {
    let regex = /^(\w+\.\s*)+|,[\s\w]*$/;
    this.alteredAttendanceData.sort((firstItem, secondItem) => {
      let firstItemTrim = firstItem.employeeName.replace(regex, '');
      let secondItemTrim = secondItem.employeeName.replace(regex, '');
      if (firstItemTrim > secondItemTrim) {
        return 1;
      }
      if (secondItemTrim > firstItemTrim) {
        return -1;
      }
    });
  }

  openFilterModal() {
    this.availableShift = Array.from(
      new Set(
        this.attendanceData.map(
          (employeeItem) => employeeItem.employeeShiftCode
        )
      )
    );
    this.availableStatus = Array.from(
      new Set(this.attendanceData.map((employeeItem) => employeeItem.status))
    );
    const dialogRef = this.dialog.open(TeamAttendanceFilterModalComponent, {
      width: '400px',
      data: {
        attendanceData: this.ogAttendanceData,
        availableShift: this.availableShift,
        availableStatus: this.availableStatus,
        currentOrder: this.filterOrder,
        currentName: this.filterName,
        currentShift: this.filterShift,
        currentStatus: this.filterStatus,
        componentName: 'daily',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.filteredResults) {
        this.attendanceData = result.filteredResults;
        this.alterData();
        this.filterName = result.changeValues.searchName;
        this.filterOrder = result.changeValues.sortingOrder;
        this.filterShift = result.changeValues.shiftFilter;
        this.filterStatus = result.changeValues.statusFilter;
        this.filterDataAval = result.dataAval;
      }
    });
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
