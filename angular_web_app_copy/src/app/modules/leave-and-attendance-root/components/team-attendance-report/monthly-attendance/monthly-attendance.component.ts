import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
  ViewChild,
  Input,
  OnChanges,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TeamAttendanceService } from '../team-attendance.service';
import {
  TeamAttendanceReport,
  AttendanceMonthlyCount,
  SubordinateMothlyAttemdance,
  TeamAttendanceReportNew,
} from '../team-attendance-report.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from '../../../../../../../node_modules/rxjs';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { getYear, getMonth, getDaysInMonth } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { TeamAttendanceFilterModalComponent } from '../team-attendance-filter-modal/team-attendance-filter-modal.component';

@Component({
  selector: 'app-monthly-attendance',
  templateUrl: './monthly-attendance.component.html',
  styleUrls: ['./monthly-attendance.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed, void',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MonthlyAttendanceComponent implements OnInit, OnChanges {
  displayedColumns = [];
  dataSource: TeamAttendanceReport[];
  displayedColumns2 = [];
  dataSource2 = [];
  mothlyAttData: SubordinateMothlyAttemdance[];
  displayedColumns3 = [];
  dataSource3 = [];
  allSubordinateAttCount: AttendanceMonthlyCount[];
  colorCodeList: any = [];
  dataSourceNew: TeamAttendanceReportNew[];
  filterDataSource: TeamAttendanceReportNew[];
  columnName: any = [];
  subManager: Subscription = new Subscription();
  month: any;
  year: number;
  displayTable: boolean = false;
  firstClickedLocal: boolean = true;
  displayDate: FormControl;
  @ViewChild('picker') datepicker: MatDatepicker<any>;
  @ViewChild('monthlyTable') matTable: MatTable<any>;
  @Input() private statusText;
  @Input() firstClickedGlobal;
  filterMonthlyOrder: string = 'asc';
  filterMonthlyName: any;
  setMaxDate: any;
  constructor(
    private teamAttService: TeamAttendanceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    console.log(changes);
    if (this.firstClickedGlobal) {
      if (this.firstClickedLocal) {
        this.onClickFunction();
        this.firstClickedLocal = false;
      }
    }
  }

  onClickFunction() {
    let year = getYear(new Date());
    let month = getMonth(new Date());
    this.month = ('0' + (month + 1)).slice(-2);
    this.year = year;
    let endMonthValidationDt = year + ',' + this.month + ',1';
    this.setMaxDate = new Date(endMonthValidationDt);
    let monthName = this.monthName(month);
    this.displayDate = monthName;
    this.setParentTableColumnName(new Date());
    this.colorCodeDetailsList();
    this.getAttStatusCountDetails();
    this.getSubordinateNew();
    this.displayedColumns2 = [
      'present',
      'absent',
      'wo',
      'leave',
      'holiday',
      'coff',
      'ot',
    ];
    this.displayedColumns3 = [
      'date',
      'shift',
      'actual_time',
      'att_status',
      'reg_time',
      'leave_time',
      'regular_hour',
      'computed_hours',
      'ot_coff_gen',
      'ot_coff_appr',
    ];
    this.displayTable = true;
  }
  //Subordinate call
  getSubordinateNew() {
    let subordinateDetails = this.teamAttService
      .getDetailsNew(this.month, this.year)
      .subscribe(
        (data: TeamAttendanceReportNew[]) => {
          this.dataSourceNew = data;
          this.sortAscendingData();
          this.filterDataSource = this.dataSourceNew;
        },
        (err) => {
          console.log(err);
        }
      );
    this.subManager.add(subordinateDetails);
  }
  sortAscendingData() {
    this.dataSourceNew.sort((firstItem, secondItem) => {
      //Regex for title Mr. Ms. ets.
      let regex = /^(\w+\.\s*)+|,[\s\w]*$/;
      let firstItemTrim = firstItem.subordinateName.replace(regex, '');
      let secondItemTrim = secondItem.subordinateName.replace(regex, '');
      if (firstItemTrim > secondItemTrim) {
        return 1;
      }
      if (secondItemTrim > firstItemTrim) {
        return -1;
      }
    });
  }

  getAttStatusCountDetails() {
    let attStatusCount = this.teamAttService
      .getAttStatusCount(this.month, this.year)
      .subscribe(
        (data: AttendanceMonthlyCount[]) => {
          this.allSubordinateAttCount = data;
        },
        (err) => {
          console.log(err);
        }
      );
    this.subManager.add(attStatusCount);
  }

  colorCodeDetailsList() {
    let colorCodeList = this.teamAttService.getColorCodeDetail().subscribe(
      (data: any) => {
        this.colorCodeList = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.subManager.add(colorCodeList);
  }

  getMonthlySubOrdiDetails(empNo) {
    let monthlySubDetails = this.teamAttService
      .getMonthlySubDetail(this.year, this.month, empNo)
      .subscribe(
        (data: SubordinateMothlyAttemdance[]) => {
          this.mothlyAttData = data;
          for (let dayObj of this.mothlyAttData) {
            let dayAndWeekDay = this.weekDayName(dayObj.attendanceDate);
            let dayAndWeekDaySplit = dayAndWeekDay.split('/');
            dayObj.day = dayAndWeekDaySplit[0];
            dayObj.weekDay = dayAndWeekDaySplit[1];
            //Actual timestamp to Hours: Min
            dayObj.actualTimeHours = this.getDateFunBasisTimstamp(
              dayObj.actualIn
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
    this.subManager.add(monthlySubDetails);
  }

  getDateFunBasisTimstamp(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minute = date.getMinutes();
    let timeFormat = hours + ':' + minute != '0:0' ? hours + ':' + minute : '0';
    return timeFormat;
  }

  weekDayName(attendanceDate) {
    var weekdays = new Array(7);
    weekdays[0] = 'Sun';
    weekdays[1] = 'Mon';
    weekdays[2] = 'Tue';
    weekdays[3] = 'Wed';
    weekdays[4] = 'Thu';
    weekdays[5] = 'Fri';
    weekdays[6] = 'Sat';

    let current_date = new Date(attendanceDate);
    let weekday_value = current_date.getDay();
    let day = current_date.getDate();
    return day + '/' + weekdays[weekday_value];
  }

  //Listed colorCode not found then show default colorCode.
  getStatusColor(attStatus) {
    let trimAttStatus = attStatus.trim();
    let notFound = true;
    for (let colorObj of this.colorCodeList) {
      if (trimAttStatus === colorObj.attendanceType) {
        notFound = false;
        return colorObj.attendanceColorCode;
      }
    }
    if (notFound && trimAttStatus != 'Unprocessed' && trimAttStatus != '') {
      return '#07e4f0';
    }
  }

  chosenMonthHandler(event) {
    let year = getYear(new Date(event));
    let month = getMonth(new Date(event));
    this.month = ('0' + (month + 1)).slice(-2);
    this.year = year;
    this.getSubordinateNew();
    this.getAttStatusCountDetails();
    let monthName = this.monthName(month);
    this.displayDate = monthName;
    this.datepicker.close();
    this.setParentTableColumnName(event);
  }

  //Set Parent table column name dynamically for month wise.
  setParentTableColumnName(event) {
    this.displayedColumns = [];
    this.columnName = [];
    this.displayedColumns[0] = 'Name';
    this.displayedColumns[1] = 'Employee Id';
    let currentMonthDays = getDaysInMonth(new Date(event));
    for (let i = 1; i <= currentMonthDays; i++) {
      this.displayedColumns[i + 1] = i.toString();
      let key = 'day' + i + 'Status';
      this.columnName.push(key);
    }
  }

  toggleRow(element) {
    //api call for monthly attendance details.
    this.dataSource2 = [];
    if (!element.expandedElement) {
      this.getMonthlySubOrdiDetails(element.subordinateNo);
    }
    //Subordinate wise mothly attendance status count
    for (let obj of this.allSubordinateAttCount) {
      if (element.subordinateNo === obj.employeeId) {
        this.dataSource2.push(obj);
      }
    }

    for (let allSubObj of this.dataSourceNew) {
      if (element.subordinateNo === allSubObj.subordinateNo) {
        allSubObj.expandedElement = !allSubObj.expandedElement;
      } else {
        allSubObj.expandedElement = false;
      }
    }
  }

  openFilterModal() {
    const dialogRef = this.dialog.open(TeamAttendanceFilterModalComponent, {
      width: '400px',
      data: {
        attendanceData: this.filterDataSource,
        currentOrder: this.filterMonthlyOrder,
        currentName: this.filterMonthlyName,
        componentName: 'monthly',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.filteredResults) {
        this.dataSourceNew = result.filteredResults;
        this.filterMonthlyName = result.changeValues.searchName;
        this.filterMonthlyOrder = result.changeValues.sortingOrder;
        this.matTable.renderRows();
      }
    });
  }
  monthName(month) {
    let monthArr = new Array(12);
    monthArr[0] = 'January';
    monthArr[1] = 'February';
    monthArr[2] = 'March';
    monthArr[3] = 'April';
    monthArr[4] = 'May';
    monthArr[5] = 'June';
    monthArr[6] = 'July';
    monthArr[7] = 'August';
    monthArr[8] = 'September';
    monthArr[9] = 'October';
    monthArr[10] = 'November';
    monthArr[11] = 'December';

    return monthArr[month];
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
