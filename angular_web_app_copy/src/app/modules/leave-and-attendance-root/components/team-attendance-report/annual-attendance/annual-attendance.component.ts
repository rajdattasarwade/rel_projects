import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Input,
} from '@angular/core';
import { TeamAttendanceFilterModalComponent } from '../team-attendance-filter-modal/team-attendance-filter-modal.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { TeamAttendanceService } from '../team-attendance.service';
import { Config } from '../../../../../components/core/config/config';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import getYear from 'date-fns/getYear';
import { Subscription } from 'rxjs';
import { MatTable } from '@angular/material/table';

export class PeriodicElement {
  empName: string;
  empPernr: number;
  presentCount: number;
  absentCount: number;
  WOCount: number;
  leaveCount: number;
  PHCount: number;
  compOffCount: number;
  expandedElement: boolean;
  constructor(data: any) {
    this.expandedElement = false;
  }
}
export interface PeriodicElement2 {
  leaves: string;
  days: number;
}
export interface PeriodicElement3 {
  startDate: string;
  endDate: string;
  numberDays: number;
  leaveType: string;
}

@Component({
  selector: 'app-annual-attendance',
  templateUrl: './annual-attendance.component.html',
  styleUrls: ['./annual-attendance.component.css'],
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
export class AnnualAttendanceComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'employee',
    'present',
    'absent',
    'wo',
    'leaves',
    'ph',
    'coff',
  ];
  displayedColumns2: string[] = ['leaves', 'days'];
  displayedColumns3: string[] = [
    'startDate',
    'endDate',
    'numberDays',
    'leaveType',
  ];
  dataSource: any[];
  dataSource2 = '';
  dataSource3 = '';
  oGdataSource: any = [];
  leaveCountDisplay: any = [];
  dateTimeFormats: any;
  key: any;
  keyValue: any;
  nosubOrdinateFlag: any;
  endDate = new Date(2021, 0, 1);
  displayDate: any;
  leaveDetailsSubscription: Subscription = new Subscription();
  leaveCountSubscription: Subscription = new Subscription();
  subordinateSubscription: Subscription = new Subscription();
  filterOrder: any = 'asc';
  filterName: any;
  maxYear: any;
  @Input() firstClickedGlobal;
  firstClickedLocal: boolean = true;
  @ViewChild('picker') datepicker: MatDatepicker<any>;
  @ViewChild('annualTable') matTable: MatTable<any>;
  expandedElement: boolean;

  constructor(
    public dialog: MatDialog,
    private timeReporTeamService: TeamAttendanceService
  ) {
    this.expandedElement = false;
    this.dateTimeFormats = Config.APP_DATE_TIME_FORMATS;
  }

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.firstClickedGlobal) {
      if (this.firstClickedLocal) {
        this.onClickFunc();
        this.firstClickedLocal = false;
      }
    }
  }

  onClickFunc() {
    let year = getYear(new Date());
    this.maxYear = year;
    // console.log("year"+year);
    this.displayDate = year;
    this.getsubordinate(year);
  }

  openFilterModal() {
    const dialogRef = this.dialog.open(TeamAttendanceFilterModalComponent, {
      width: '400px',
      data: {
        attendanceData: this.oGdataSource,
        currentOrder: this.filterOrder,
        currentName: this.filterName,
        componentName: 'annual',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.filteredResults) {
        this.dataSource = result.filteredResults;
        this.filterName = result.changeValues.searchName;
        this.filterOrder = result.changeValues.sortingOrder;
        this.matTable.renderRows();
      }
    });
  }

  chosenYearHandler(event) {
    var result = getYear(new Date(event));
    this.displayDate = result;
    this.getsubordinate(result);
    this.datepicker.close();
  }

  toggleRow(element) {
    for (let allSubObj of this.dataSource) {
      if (element.empPernr === allSubObj.empPernr) {
        allSubObj.expandedElement = !allSubObj.expandedElement;
      } else {
        allSubObj.expandedElement = false;
      }
    }
    this.getLeaveDetails(this.displayDate, element.empPernr);
    this.getLeaveCount(this.displayDate, element.empPernr);
  }

  getLeaveDetails(year, subordinateId) {
    this.leaveDetailsSubscription = this.timeReporTeamService
      .getLeaveDetails(year, subordinateId)
      .subscribe(
        (data: any) => {
          this.dataSource3 = data;

          if (this.dataSource3.length > 0) {
            // this.noResultFlag = false;
          } else if (this.dataSource3.length == 0) {
            // this.noResultFlag = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getLeaveCount(year, subordinateId) {
    this.leaveCountSubscription = this.timeReporTeamService
      .getLeaveCount(year, subordinateId)
      .subscribe(
        (data: any) => {
          var arr = [];
          Object.keys(data).forEach(function (key) {
            var value = data[key];
            arr.push({
              typeOfleave: key,
              noOfDays: value,
            });
          });
          this.leaveCountDisplay = arr;
          this.dataSource2 = this.leaveCountDisplay;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getsubordinate(year) {
    this.subordinateSubscription = this.timeReporTeamService
      .getsubordinate(year)
      .subscribe(
        (data: any) => {
          this.dataSource = data;
          this.sortInitialData();
          this.oGdataSource = this.dataSource;
          if (this.dataSource.length > 0) {
            this.nosubOrdinateFlag = false;
          } else if (this.dataSource.length == 0) {
            this.nosubOrdinateFlag = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  sortInitialData() {
    let regex = /^(\w+\.\s*)+|,[\s\w]*$/;
    this.dataSource.sort((firstItem, secondItem) => {
      let firstItemTrim = firstItem.empName.replace(regex, '');
      let secondItemTrim = secondItem.empName.replace(regex, '');
      if (firstItemTrim > secondItemTrim) {
        return 1;
      }
      if (secondItemTrim > firstItemTrim) {
        return -1;
      }
    });
  }

  ngOnDestroy() {
    this.leaveDetailsSubscription.unsubscribe();
    this.leaveCountSubscription.unsubscribe();
    this.subordinateSubscription.unsubscribe();
  }
}
