import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ShiftPlanningConstants } from './constants/shift-planning.constants';
import { MatDialog } from '@angular/material/dialog';
import { AssignShiftModalComponent } from './assign-shift-modal/assign-shift-modal.component';
import { ShiftFilterModalComponent } from './shift-filter-modal/shift-filter-modal.component';
import { MatSelect } from '@angular/material/select';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { ShiftService } from '../manage_shift.service';
import { Config } from 'src/app/components/core/config/config';
import { ErrorTableModalComponent } from '../../error-table-modal/error-table-modal.component';

@Component({
  selector: 'app-shift-planning',
  templateUrl: './shift-planning.component.html',
  styleUrls: ['./shift-planning.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShiftPlanningComponent implements OnInit, OnDestroy {
  columnHeader: any = [];
  displayTable = false;
  availableShift: any;
  timeShiftData: any;
  displayedColumns: string[] = [];
  shiftForm: FormGroup;
  orgData: any;
  shiftData: any;
  flag: any = false;
  filterOrder: any = 'asc';
  filterName: any = '';
  filterShift: any = 'All Shifts';
  seeShift: any;
  saveFrom: any = '';
  timeShiftMap: any;
  previousIndex: any;
  subManager: Subscription = new Subscription();
  permShiftData: any;
  alteredShiftData: any = [];
  @ViewChild('orgSelect') matSelect: MatSelect;
  permShiftData2: any;
  userList: any;
  dateRange: any;
  users: any;
  shiftSearch: any = '';
  resetDisable: boolean = true;
  submitDisable: boolean = true;
  previousFromDate: any;
  previousToDate: any;
  filteredTimeShiftData: any;

  constructor(
    private shiftService: ShiftService,
    public dialog: MatDialog,
    public modalService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.shiftForm = new FormGroup({
      orgControl: new FormControl(''),
      toDateControl: new FormControl(moment().add(1, 'M')),
      fromDateControl: new FormControl(moment()),
    });
    this.previousFromDate = moment(this.shiftForm.value.fromDateControl);
    this.previousToDate = moment(this.shiftForm.value.toDateControl);
    this.seeShift = this.filterShift == 'All Shifts' ? '' : this.filterShift;
    this.populateOrgData();
  }

  populateOrgData() {
    if (this.shiftForm.value.fromDateControl) {
      let orgDataSub = this.shiftService
        .getOrgData(this.shiftForm.value.fromDateControl.valueOf())
        .subscribe((data) => {
          this.orgData = data;
          this.matSelect.value = this.orgData[0].orgTxt;
          this.shiftForm.controls['orgControl'].setValue(
            this.orgData[0].orgUnit
          );
          this.populateShiftTimeData();
        });
      this.subManager.add(orgDataSub);
    }
    this.populateShiftCheck();
  }

  populateShiftTimeData() {
    let timeShiftSub = this.shiftService
      .getShiftTimeData(this.shiftForm.value.fromDateControl.valueOf())
      .subscribe((data) => {
        this.timeShiftData = data;
        this.filteredTimeShiftData = this.timeShiftData;
        this.createTimeMap();
        this.populateShiftData();
      });
    this.subManager.add(timeShiftSub);
  }

  createTimeMap() {
    this.timeShiftMap = new Map();
    this.timeShiftData.forEach((timeShiftItem) => {
      let lastTimeIndex = timeShiftItem.shiftTime.lastIndexOf('-');
      this.timeShiftMap.set(
        timeShiftItem.shiftCode,
        timeShiftItem.shiftTime.slice(lastTimeIndex + 1)
      );
    });
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  populateShiftCheck() {
    let checkDiff = this.shiftForm.value.toDateControl.diff(
      this.shiftForm.value.fromDateControl
    );
    let checkDiffDays = this.shiftForm.value.toDateControl.diff(
      this.shiftForm.value.fromDateControl,
      'd'
    );
    if (checkDiff < 0) {
      this.shiftForm.get('fromDateControl').setValue(this.previousFromDate);
      this.shiftForm.get('toDateControl').setValue(this.previousToDate);
      this.modalService.showMessage(
        'Starting date cannot be greater than the end date.',
        'Error',
        'warning-icon',
        'CLOSE'
      );
      return;
    }
    if (checkDiffDays > 31) {
      this.modalService.showMessage(
        'Difference between dates cannot be more than 31 days.',
        'Error',
        'warning-icon',
        'CLOSE'
      );
      return;
    }
    this.previousFromDate = moment(this.shiftForm.value.fromDateControl);
    this.previousToDate = moment(this.shiftForm.value.toDateControl);
    if (
      this.shiftForm.value.toDateControl &&
      this.shiftForm.value.fromDateControl &&
      this.shiftForm.value.orgControl
    ) {
      this.saveFrom = '';
      this.populateShiftData();
    }
  }

  populateShiftData() {
    let shiftDataSub = this.shiftService
      .getShiftData(
        this.shiftForm.value.fromDateControl.valueOf(),
        this.shiftForm.value.toDateControl.valueOf(),
        this.shiftForm.value.orgControl
      )
      .subscribe((data) => {
        this.shiftData = data;
        this.setDisplayedColumns();
        this.alterData();
      });
    this.subManager.add(shiftDataSub);
  }

  setDisplayedColumns() {
    let keys = Object.keys(this.shiftData);
    this.displayedColumns = ['empName'];
    this.columnHeader = [];
    this.shiftData[keys[0]].forEach((shiftItem) => {
      let date = moment(moment(shiftItem.date).toDate())
        .format('DD MMMM')
        .toString();
      let separateIndex = date.indexOf(' ');
      let dayNum = moment(shiftItem.date).day();
      let dayString = ShiftPlanningConstants.dayMap.get(dayNum);
      let dateObject = {
        day: dayString,
        month: ShiftPlanningConstants.monthMap.get(
          date.slice(separateIndex + 1)
        ),
        date: date.slice(0, separateIndex),
      };
      this.columnHeader.push(dateObject);
      this.displayedColumns.push(dateObject.date + ' ' + dateObject.month);
    });
  }

  alterData() {
    this.resetDisable = true;
    this.submitDisable = true;
    this.alteredShiftData = [];
    let shiftKeys = Object.keys(this.shiftData);
    for (let i = 0; i < shiftKeys.length; i++) {
      let separateIndex = shiftKeys[i].indexOf(',');
      let endIndex = shiftKeys[i].indexOf(')');
      let employeeId = shiftKeys[i].slice(1, separateIndex);
      let employeeName = shiftKeys[i].slice(separateIndex + 1, endIndex);
      let alteredObject = {
        empName: employeeName,
        empId: employeeId,
        oldShifts: [],
        oldShiftTime: [],
        shifts: [],
        shiftTime: [],
        newShift: [],
        newShiftTime: [],
        dropDownActive: [],
        shiftChanged: false,
      };
      this.shiftData[shiftKeys[i]].forEach((shiftItem) => {
        alteredObject.shifts.push(shiftItem.shift);
        alteredObject.dropDownActive.push(false);
        alteredObject.shiftTime.push(this.timeShiftMap.get(shiftItem.shift));
        alteredObject.oldShifts.push(shiftItem.shift);
        alteredObject.oldShiftTime.push(this.timeShiftMap.get(shiftItem.shift));
        alteredObject.newShift.push('');
        alteredObject.newShiftTime.push('');
      });
      this.alteredShiftData.push(alteredObject);
    }
    this.permShiftData = this.alteredShiftData.map((item) => item);
    this.filterName = '';
    this.filterOrder = 'asc';
    this.filterShift = 'All Shifts';
    this.seeShift = '';
    this.displayTable = true;
  }
  setFlagoverlay() {
    this.flag = !this.flag;
  }

  toggleCellDropdown(element, i) {
    let index = this.alteredShiftData.indexOf(element);
    if (this.previousIndex) {
      if (this.previousIndex[0] != index || this.previousIndex[1] != i) {
        this.alteredShiftData[this.previousIndex[0]].dropDownActive[
          this.previousIndex[1]
        ] = false;
      }
    }
    this.previousIndex = [index, i];
    this.alteredShiftData[index].dropDownActive[i] = !this.alteredShiftData[
      index
    ].dropDownActive[i];
  }

  changeShift(element, index, shift) {
    let elementIndex = this.alteredShiftData.indexOf(element);
    this.alteredShiftData[elementIndex].oldShifts.splice(
      index,
      1,
      this.alteredShiftData[elementIndex].shifts[index]
    );
    this.alteredShiftData[elementIndex].oldShiftTime.splice(
      index,
      1,
      this.alteredShiftData[elementIndex].shiftTime[index]
    );
    this.alteredShiftData[elementIndex].shifts.splice(
      index,
      1,
      shift.shiftCode
    );
    this.alteredShiftData[elementIndex].shiftTime.splice(
      index,
      1,
      this.timeShiftMap.get(shift.shiftCode)
    );
    this.alteredShiftData[elementIndex].newShift.splice(
      index,
      1,
      shift.shiftCode
    );
    this.alteredShiftData[elementIndex].newShiftTime.splice(
      index,
      1,
      this.timeShiftMap.get(shift.shiftCode)
    );
    this.alteredShiftData[elementIndex].shiftChanged = true;
    this.resetDisable = false;
    this.submitDisable = false;
    this.alteredShiftData[elementIndex].dropDownActive[index] = false;
    this.filteredTimeShiftData = this.timeShiftData;
    this.shiftSearch = '';
  }

  resetShiftData() {
    let userNumber = 0;
    this.alteredShiftData.forEach((user) => {
      if (user.shiftChanged) {
        this.alteredShiftData[userNumber].shifts = this.alteredShiftData[
          userNumber
        ].oldShifts.slice();
        this.alteredShiftData[userNumber].shiftTime = this.alteredShiftData[
          userNumber
        ].oldShiftTime.slice();
        this.alteredShiftData[userNumber].newShift = [];
        this.alteredShiftData[userNumber].newShiftTime = [];
        this.alteredShiftData[userNumber].dropDownActive = [];
        this.alteredShiftData[userNumber].shifts.forEach((shift) => {
          this.alteredShiftData[userNumber].newShift.push('');
          this.alteredShiftData[userNumber].newShiftTime.push('');
          this.alteredShiftData[userNumber].dropDownActive.push(false);
        });
        this.alteredShiftData[userNumber].shiftChanged = false;
      }
      userNumber++;
    });
    this.submitDisable = true;
    this.resetDisable = true;
  }

  sortData() {
    let regex = /^(\w+\.\s*)+|,[\s\w]*$/;
    this.alteredShiftData.sort((firstItem, secondItem) => {
      let firstItemTrim;
      let secondItemTrim;
      if (this.saveFrom == 'upload') {
        firstItemTrim = firstItem.empId;
        secondItemTrim = secondItem.empId;
      } else {
        firstItemTrim = firstItem.empName.replace(regex, '');
        secondItemTrim = secondItem.empName.replace(regex, '');
      }
      if (firstItemTrim > secondItemTrim) {
        return 1;
      }
      if (secondItemTrim > firstItemTrim) {
        return -1;
      }
    });
    this.permShiftData = this.alteredShiftData.slice();
  }

  submitChangedData() {
    this.dateRange = this.shiftForm.value.toDateControl.diff(
      this.shiftForm.value.fromDateControl,
      'days'
    );
    let payloadArray = [];
    this.alteredShiftData.forEach((user) => {
      let userIndex = 0;
      if (user.shiftChanged) {
        let payload = {
          shiftPlanSaveMsgSet: [],
          endData: moment(this.shiftForm.value.toDateControl)
            .add(1, 'd')
            .valueOf(),
          orgUnit: this.shiftForm.value.orgControl,
          startDate: moment(this.shiftForm.value.fromDateControl)
            .add(1, 'd')
            .valueOf(),
          shiftPlan: [],
        };
        for (let i = 0; i <= this.dateRange; i++) {
          let changedShift =
            user.newShift[i] == '' ? user.shifts[i] : user.newShift[i];
          let userObj = {
            userId: user.empId,
            startDate: moment(this.shiftForm.value.fromDateControl)
              .add(i + 1, 'd')
              .valueOf(),
            shift: user.oldShifts[i],
            changed: '',
            newShift: changedShift,
            errors: '',
          };
          payload.shiftPlan.push(userObj);
        }
        payloadArray.push(payload);
      }
      userIndex++;
    });
    let requestPayloadObs = [];
    payloadArray.forEach((payloadItem) => {
      requestPayloadObs.push(this.shiftService.submitShiftChanges(payloadItem));
    });
    let errorArray = [];
    let postSaveSub = Observable.concat(
      ...requestPayloadObs.map((obs) => obs.last())
    )
      .toArray()
      .subscribe(
        (result) => {
          result.forEach((obsResult) => {
            if ((<Array<any>>obsResult).length > 0) {
              (<Array<any>>obsResult).forEach((resultItem) => {
                errorArray.push(resultItem);
              });
            }
          });
          if (errorArray.length > 0) {
            const dialogRef = this.dialog.open(ErrorTableModalComponent, {
              width: '500px',
              data: errorArray,
            });

            dialogRef.afterClosed().subscribe((data) => {
              this.populateShiftCheck();
            });
          } else if (errorArray.length == 0) {
            this.modalService.showMessage(
              'Data has been submitted successfully.',
              'Success',
              'success-icon',
              'CLOSE',
              () => {
                this.populateShiftCheck();
              }
            );
          }
        },
        (error) => {
          this.modalService.showMessage(
            'Something went wrong. Please try again later.',
            'Error',
            'warning-icon',
            'CLOSE',
            () => {
              this.populateShiftCheck();
            }
          );
        }
      );
    this.subManager.add(postSaveSub);
  }

  openAssignShift() {
    this.userList = [];
    this.permShiftData.forEach((userItem) => {
      let userObj = {
        empName: userItem.empName,
        empId: userItem.empId,
        empTxt: userItem.empName + ' (' + userItem.empId + ')',
        shifts: userItem.shifts,
        shiftTime: userItem.shiftTime,
      };
      this.userList.push(userObj);
    });
    const dialogRef = this.dialog.open(AssignShiftModalComponent, {
      width: '600px',
      data: {
        users: this.userList,
        orgUnit: this.shiftForm.value.orgControl,
        shiftData: this.timeShiftData,
        timeShiftMap: this.timeShiftMap,
        minDate: moment(this.shiftForm.value.fromDateControl),
        maxDate: moment(this.shiftForm.value.toDateControl),
        currentOrgUnit: this.shiftForm.value.orgControl,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.saveFrom == 'assign') {
        this.saveFrom = result.saveFrom;
        this.alteredShiftData = result.alteredShiftData;
        this.permShiftData2 = [...result.alteredShiftData];
        this.dateRange = result.dateRange;
        this.resetDisable = true;
        this.submitDisable = false;
        this.filterName = '';
        this.filterOrder = 'asc';
        this.filterShift = 'All Shifts';
        this.seeShift = '';
        this.sortData();
        this.shiftForm.get('fromDateControl').setValue(result.fromDate);
        this.shiftForm.get('toDateControl').setValue(result.toDate);
        this.setColumnsFromDialog();
      } else if (result?.saveFrom == 'upload') {
        this.saveFrom = result.saveFrom;
        this.alteredShiftData = result.alteredObject;
        this.permShiftData2 = [...result.alteredObject];
        this.columnHeader = result.columnHeaders;
        this.displayedColumns = result.displayColumns;
        this.filterName = '';
        this.filterOrder = 'asc';
        this.filterShift = 'All Shifts';
        this.seeShift = '';
        this.sortData();
        this.resetDisable = true;
        this.submitDisable = false;
        this.shiftForm.get('fromDateControl').setValue(result.fromDate);
        this.shiftForm.get('toDateControl').setValue(result.toDate);
      }
    });
  }

  setColumnsFromDialog() {
    this.displayedColumns = ['empName'];
    this.columnHeader = [];
    for (let i = 0; i <= this.dateRange; i++) {
      let date = moment(
        moment(this.shiftForm.value.fromDateControl).add(i, 'd')
      )
        .format('DD MMMM')
        .toString();
      let separateIndex = date.indexOf(' ');
      let dayNum = moment(date).day();
      let dayString = ShiftPlanningConstants.dayMap.get(dayNum);
      let dateObject = {
        day: dayString,
        month: ShiftPlanningConstants.monthMap.get(
          date.slice(separateIndex + 1)
        ),
        date: date.slice(0, separateIndex),
      };
      this.columnHeader.push(dateObject);
      this.displayedColumns.push(dateObject.date + ' ' + dateObject.month);
    }
  }

  checkAvailableShifts() {
    let avalShifts = [];
    if (this.saveFrom == '') {
      this.permShiftData.forEach((shiftItem) => {
        avalShifts = avalShifts.concat(shiftItem.shifts);
      });
    } else {
      this.permShiftData2.forEach((shiftItem) => {
        avalShifts = avalShifts.concat(shiftItem.shifts);
      });
    }
    this.availableShift = Array.from(new Set(avalShifts));
  }

  emptySearchString() {
    this.shiftSearch = '';
    this.filteredTimeShiftData = this.timeShiftData;
  }

  filterTimeShiftData(element, index) {
    let elementIndex = this.alteredShiftData.indexOf(element);
    if (
      this.alteredShiftData[elementIndex].dropDownActive[index] == false &&
      this.shiftSearch != ''
    ) {
      this.alteredShiftData[elementIndex].dropDownActive[index] = true;
    }
    this.filteredTimeShiftData = this.timeShiftData;
    this.filteredTimeShiftData = this.filteredTimeShiftData.filter(
      (timeShiftItem) => {
        return timeShiftItem.shiftCode
          .toLowerCase()
          .includes(this.shiftSearch.toLowerCase());
      }
    );
  }

  openFilter() {
    this.checkAvailableShifts();
    const dialogRef = this.dialog.open(ShiftFilterModalComponent, {
      width: '400px',
      data: {
        shiftData:
          this.saveFrom == ''
            ? [...this.permShiftData]
            : [...this.permShiftData2],
        avalShifts: this.availableShift,
        currentName: this.filterName,
        currentOrder: this.filterOrder,
        currentShift: this.filterShift,
        saveFrom: this.saveFrom,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.filteredResults) {
        this.alteredShiftData = result.filteredResults;
        this.seeShift =
          result.changeValues.shiftControl == 'All Shifts'
            ? ''
            : result.changeValues.shiftControl;
        this.filterName = result.changeValues.searchControl;
        this.filterOrder = result.changeValues.sortingControl;
        this.filterShift = result.changeValues.shiftControl;
      }
    });
  }
}
