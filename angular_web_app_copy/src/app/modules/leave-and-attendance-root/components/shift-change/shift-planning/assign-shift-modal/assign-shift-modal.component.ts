import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { MessageModalService } from '../../../../../../components/shared/services/message-modal-service';
import { Subscription } from 'rxjs';
import { ShiftService } from '../../manage_shift.service';
import { ShiftPlanningConstants } from '../constants/shift-planning.constants';

@Component({
  selector: 'app-assign-shift-modal',
  templateUrl: './assign-shift-modal.component.html',
  styleUrls: ['./assign-shift-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AssignShiftModalComponent implements OnInit, OnDestroy {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  uploadData: any;
  submitResult: any;
  fileUpload: FormGroup;
  assignForm: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  users: any = [];
  fileName: any;
  filteredUsers: any;
  shiftData: any;
  alteredDialogData: any = [];
  dateRange: any;
  dateRange2: any;
  orgUnitFile: any = [];
  empIdFile: any = [];
  uploadMonth: any;
  subManager: Subscription = new Subscription();
  timeShiftMap: any;
  minDate: any;
  maxDate: any;
  previousFromDate: any;
  previousToDate: any;
  uploadFromDate: any;
  uploadToDate: any;
  monthFile: any = [];
  yearFile: any = [];

  add(userObj, fromSelect): void {
    let input = <HTMLInputElement>document.getElementById('chipInput');
    if (
      this.filteredUsers.length > 0 &&
      (this.assignForm.value.userControl != '' || fromSelect)
    ) {
      this.users.push(userObj);
      let index = this.data.users.findIndex(
        (user) => user.empId == userObj.empId
      );
      this.data.users.splice(index, 1);
      input.value = '';
      this.assignForm.get('userControl').setValue('');
    } else if (this.filteredUsers.length == 0) {
      input.value = '';
      this.assignForm.get('userControl').setValue('');
    }
  }

  clearUsers() {
    this.users.forEach((user) => {
      this.data.users.push(user);
    });
    this.users = [];
  }

  remove(user: User): void {
    const index = this.users.indexOf(user);
    if (index >= 0) {
      this.data.users.push(this.users[index]);
      this.users.splice(index, 1);
    }
  }

  constructor(
    private shiftService: ShiftService,
    public dialogRef: MatDialogRef<AssignShiftModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.previousFromDate = moment(this.data.minDate);
    this.previousToDate = moment(this.data.maxDate);
    this.timeShiftMap = this.data.timeShiftMap;
    this.shiftData = this.data.shiftData;
    this.filteredUsers = this.data.users;
    this.fileUpload = new FormGroup({
      fileControl: new FormControl(''),
    });
    this.assignForm = new FormGroup({
      userControl: new FormControl(''),
      shiftControl: new FormControl('', Validators.required),
      fromDateControl: new FormControl(
        moment(this.data.minDate),
        Validators.required
      ),
      toDateControl: new FormControl(
        moment(this.data.maxDate),
        Validators.required
      ),
    });
    this.assignForm.get('userControl').valueChanges.subscribe((change) => {
      this.filteredUsers = this.data.users;
      this.filteredUsers = this.filteredUsers.filter((user) => {
        return user.empTxt.toLowerCase().includes(change);
      });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  dateCheck() {
    let dateDiff = this.assignForm.value.toDateControl.diff(
      this.assignForm.value.fromDateControl
    );
    let dateDiffDays = this.assignForm.value.toDateControl.diff(
      this.assignForm.value.fromDateControl,
      'd'
    );
    if (dateDiff >= 0 && dateDiffDays < 31) {
      this.previousFromDate = moment(this.assignForm.value.fromDateControl);
      this.previousToDate = moment(this.assignForm.value.toDateControl);
    }
  }

  downloadShiftTemplate() {
    let downloadTempSub = this.shiftService
      .downloadTemplate()
      .subscribe((data) => {
        let blob: Blob = data;
        let blobUrl = URL.createObjectURL(blob);
        let downloadAnchor = document.createElement('a');
        downloadAnchor.style.display = 'none';
        downloadAnchor.href = blobUrl;
        downloadAnchor.download = 'filename.xls';
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
      });
    this.subManager.add(downloadTempSub);
  }

  uploadShiftTemplate(event) {
    this.fileName = event.target.files[0].name;
    if (event.target.files[0].type != 'text/plain') {
      this.modalService.showMessage(
        'Please upload a file with .txt format.',
        'Error',
        'warning-icon',
        'CLOSE'
      );
      return;
    }
    this.dateRange2 = moment(this.maxDate).diff(moment(this.minDate), 'd') + 1;
    let reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onloadend = (e) => {
      const stringResult = e.target.result;
      this.uploadData = stringResult;
      this.checkTxtData();
      if (this.empIdFile.length != this.alteredDialogData.length) {
        this.modalService.showMessage(
          'Please upload a file with unique Employee IDs.',
          'Error',
          'warning-icon',
          'CLOSE'
        );
        this.empIdFile = [];
        this.yearFile = [];
        this.monthFile = [];
        this.orgUnitFile = [];
        this.alteredDialogData = [];
        return;
      }
      if (this.yearFile.length > 1 || this.monthFile.length > 1) {
        this.modalService.showMessage(
          'Please select same month and year for employees.',
          'Error',
          'warning-icon',
          'CLOSE'
        );
        this.empIdFile = [];
        this.yearFile = [];
        this.monthFile = [];
        this.orgUnitFile = [];
        this.alteredDialogData = [];
        return;
      }
      if (this.orgUnitFile.length > 1) {
        this.modalService.showMessage(
          'Please select same organisation unit for employees.',
          'Error',
          'warning-icon',
          'CLOSE'
        );
        this.empIdFile = [];
        this.yearFile = [];
        this.monthFile = [];
        this.orgUnitFile = [];
        this.alteredDialogData = [];
        return;
      }
      if (this.orgUnitFile[0] != this.data.currentOrgUnit) {
        this.modalService.showMessage(
          'Uploaded organisation unit not found.',
          'Error',
          'warning-icon',
          'CLOSE'
        );
        this.empIdFile = [];
        this.yearFile = [];
        this.monthFile = [];
        this.orgUnitFile = [];
        this.alteredDialogData = [];
        return;
      }
      let uploadTemp = this.shiftService
        .uploadTemplate(event.target.files)
        .subscribe(
          (success) => {
            this.modalService.showMessage(
              'Data has been submitted successfully.',
              'Success',
              'success-icon',
              'CLOSE',
              () => {
                this.setDisplayColumns();
              }
            );
          },
          (error) => {
            this.alteredDialogData = [];
            this.modalService.showMessage(
              'Something went wrong. Please try again later.',
              'Error',
              'warning-icon',
              'CLOSE'
            );
          }
        );
      this.subManager.add(uploadTemp);
    };
    console.log(event);
  }

  checkTxtData() {
    let lastIndex = this.uploadData.indexOf('\n');
    let result = this.uploadData.slice(lastIndex + 1);
    let results = result.split('\n');
    for (let i = 0; i < results.length - 1; i++) {
      let replacedResult = results[i].replace('\r', '');
      this.stringCheck(replacedResult);
    }
    console.log(this.alteredDialogData);
  }

  setDisplayColumns() {
    let columnHeaders = [];
    let displayColumns = ['empName'];
    let loopNumber = 1;
    let yearAndMonth =
      this.alteredDialogData[0].year + '-' + this.alteredDialogData[0].month;
    let daysInMonth = moment(yearAndMonth, 'YYYY-MM').daysInMonth();
    // this.alteredDialogData[0].shifts.forEach((shift) => {
    //   let heading = 'S' + loopNumber;
    //   if (loopNumber <= daysInMonth) {
    //     columnHeaders.push(heading);
    //     displayColumns.push(heading);
    //   }
    //   loopNumber++;
    // });
    let endIndex =
      this.alteredDialogData[0].shifts.length < daysInMonth
        ? this.alteredDialogData[0].shifts.length
        : daysInMonth;
    for (let i = 0; i < endIndex; i++) {
      let date = moment(
        moment([
          this.alteredDialogData[0].year,
          this.alteredDialogData[0].month - 1,
          1,
        ]).add(i, 'd')
      )
        .format('DD MMMM')
        .toString();
      let separateIndex = date.indexOf(' ');
      let dayNum = moment([
        this.alteredDialogData[0].year,
        this.alteredDialogData[0].month - 1,
        1,
      ])
        .add(i, 'd')
        .day();
      let dayString = ShiftPlanningConstants.dayMap.get(dayNum);
      let dateObject = {
        day: dayString,
        month: ShiftPlanningConstants.monthMap.get(
          date.slice(separateIndex + 1)
        ),
        date: date.slice(0, separateIndex),
      };
      columnHeaders.push(dateObject);
      displayColumns.push(dateObject.date + ' ' + dateObject.month);
    }
    let callbackData = {
      alteredObject: this.alteredDialogData,
      saveFrom: 'upload',
      columnHeaders: columnHeaders,
      displayColumns: displayColumns,
      fromDate: moment([
        this.alteredDialogData[0].year,
        this.alteredDialogData[0].month - 1,
        1,
      ]),
      toDate: moment([
        this.alteredDialogData[0].year,
        this.alteredDialogData[0].month - 1,
        endIndex,
      ]),
    };
    this.dialogRef.close(callbackData);
    this.alteredDialogData = [];
  }

  stringCheck(string) {
    let stringArray = string.split('\t');
    let emptyShiftArray = [];
    for (let i = 4; i < stringArray.length; i++) {
      emptyShiftArray.push('');
    }
    let yearAndMonth = stringArray[2] + '-' + stringArray[1];
    let daysInMonth = moment(yearAndMonth, 'YYYY-MM').daysInMonth();
    let alteredObject = {
      month: stringArray[1],
      year: stringArray[2],
      empId: stringArray[3],
      empName: '',
      oldShifts: emptyShiftArray,
      oldShiftTime: [],
      shifts: stringArray.slice(4),
      shiftTime: [],
      newShift: [],
      newShiftTime: [],
      dropDownActive: [],
      shiftChanged: true,
    };
    alteredObject.shifts.forEach((shift) => {
      let shiftTime =
        this.timeShiftMap.get(shift) != undefined
          ? this.timeShiftMap.get(shift)
          : '';
      alteredObject.shiftTime.push(shiftTime);
      alteredObject.oldShiftTime.push(shiftTime);
      alteredObject.dropDownActive.push(false);
      alteredObject.newShift.push('');
      alteredObject.newShiftTime.push('');
    });
    this.orgUnitFile.push(stringArray[0]);
    this.orgUnitFile = Array.from(new Set(this.orgUnitFile));
    this.empIdFile.push(stringArray[3]);
    this.empIdFile = Array.from(new Set(this.empIdFile));
    this.monthFile.push(stringArray[1]);
    this.monthFile = Array.from(new Set(this.monthFile));
    this.yearFile.push(stringArray[2]);
    this.yearFile = Array.from(new Set(this.yearFile));
    this.alteredDialogData.push(alteredObject);
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  submitChanges() {
    this.dateRange = this.assignForm.value.toDateControl.diff(
      this.assignForm.value.fromDateControl,
      'days'
    );
    let dateDiff = this.assignForm.value.toDateControl.diff(
      this.assignForm.value.fromDateControl
    );
    let dateDiffDays = this.assignForm.value.toDateControl.diff(
      this.assignForm.value.fromDateControl,
      'd'
    );
    if (dateDiff < 0) {
      this.modalService.showMessage(
        'Starting date cannot be greater than the end date.',
        'Error',
        'warning-icon',
        'CLOSE'
      );
      return;
    }
    if (dateDiffDays > 31) {
      this.modalService.showMessage(
        'Difference between dates cannot be more than 31 days.',
        'Error',
        'warning-icon',
        'CLOSE'
      );
      return;
    }
    this.users.forEach((user) => {
      let userIndex = 0;
      let alteredObject = {
        empName: user.empName,
        empId: user.empId,
        oldShifts: user.shifts,
        oldShiftTime: user.shiftTime,
        newShift: [],
        newShiftTime: [],
        shifts: [],
        shiftTime: [],
        dropDownActive: [],
        shiftChanged: true,
      };
      for (let i = 0; i <= this.dateRange; i++) {
        alteredObject.newShift.push(this.assignForm.value.shiftControl);
        alteredObject.newShiftTime.push(
          this.timeShiftMap.get(this.assignForm.value.shiftControl)
        );
        alteredObject.shifts.push(this.assignForm.value.shiftControl);
        alteredObject.shiftTime.push(
          this.timeShiftMap.get(this.assignForm.value.shiftControl)
        );
        alteredObject.dropDownActive.push(false);
      }
      userIndex++;
      this.alteredDialogData.push(alteredObject);
    });
    this.closeDialogOnSuccess();
  }

  closeDialogOnSuccess() {
    let callbackData = {
      users: this.users,
      alteredShiftData: this.alteredDialogData,
      dateRange: this.dateRange,
      shiftChanged: true,
      saveFrom: 'assign',
      fromDate: moment(this.assignForm.value.fromDateControl),
      toDate: moment(this.assignForm.value.toDateControl),
    };
    console.log(this.alteredDialogData);
    this.dialogRef.close(callbackData);
    this.alteredDialogData = [];
  }
}

export interface User {
  name: string;
}
