import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ShiftService } from '../manage_shift.service';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkScheduleComponent implements OnInit {
  dataForm: FormGroup;
  dataSourceEmp: any;
  checked = false;
  checkedAll = false;
  dataList: Array<any> = []; //Capturing Selected Rows
  payload: any;
  shiftManager: Subscription = new Subscription();

  constructor(
    private shiftService: ShiftService,
    private modalService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      fromDateControl: new FormControl(moment()),
      toDateControl: new FormControl(moment().add(1, 'M')),
    });
  }

  displayedColumns: string[] = ['select', 'name', 'empNo', 'orgUnit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  populateData() {
    let fromdate = this.dataForm.value.fromDateControl.valueOf();
    let todate = this.dataForm.value.toDateControl.valueOf();
    var diff = todate - fromdate;
    var inDays = diff / (1000 * 3600 * 24);

    if (fromdate > todate) {
      this.modalService.showMessage(
        'From date is greater than To date.',
        'Error',
        'warning-icon',
        'CLOSE'
      );
    } else if (inDays < 5) {
      this.modalService.showMessage(
        "You can't select Shutdown period less than 7 days ",
        'Error',
        'warning-icon',
        'CLOSE'
      );
    } else {
      let workflow = this.shiftService
        .getManagerEmployees(
          this.dataForm.value.fromDateControl.valueOf(),
          this.dataForm.value.toDateControl.valueOf()
        )
        .subscribe((data) => {
          this.dataSourceEmp = data;
        });
      this.shiftManager.add(workflow);
    }
  }

  //For Saving Data
  postShiftPlanning() {
    //Creating Payload
    if (this.dataList) {
      this.payload = {
        fromDate: this.dataForm.value.fromDateControl.valueOf(),
        toDate: this.dataForm.value.toDateControl.valueOf(),
        workScheduleSet: this.dataList,
      };
      let postShift = this.shiftService
        .postShiftPlanning(this.payload)
        .subscribe(
          (data: any) => {
            if (data.responseStatus == 'SUCCESS') {
              this.modalService.showMessage(
                'Data has been submitted successfully',
                'Success',
                'success-icon',
                'CLOSE',
                () => this.clearData()
              );
            } else {
              this.modalService.showMessage(
                'Data Update Failed',
                'Error',
                'warning-icon',
                'CLOSE',
                () => this.clearData()
              );
            }
          },
          (error) => {}
        );
      this.shiftManager.add(postShift);
    }
  }

  //Checkbox selection change
  onChange(index, event, data) {
    //Intializing Object
    let empObject = {
      fromData: '',
      toDate: '',
      check: false,
      employeeNumber: '',
      name: '',
      organisationUnit: '',
      flag: '',
    };
    //Checkbox Selected
    if (event.checked == true) {
      empObject.fromData = this.dataForm.value.fromDateControl.valueOf();
      empObject.toDate = this.dataForm.value.toDateControl.valueOf();
      empObject.check = true;
      empObject.employeeNumber = data.employeeNumber;
      empObject.name = data.name;
      empObject.organisationUnit = data.organisationUnit;
      empObject.flag = data.flag;
      this.dataList.push(empObject);
      //DataList Contains all selected elements
      if (this.dataList.length == this.dataSourceEmp.length) {
        this.checkedAll = true;
      }
    } else {
      //deleting record from Array - Based on EMPNO slicing the records
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].employeeNumber == data.employeeNumber) {
          this.dataList.splice(i, 1);
        }
      }
      this.checkedAll = false;
    }
  }

  clearData() {
    this.dataList = [];
    this.checked = false;
    this.checkedAll = false;
    this.populateData();
  }

  //Select-All Event
  selectAll(event) {
    if (event.checked == true) {
      this.checked = true;
      this.checkedAll = true;
      this.dataList = [];
      this.dataSourceEmp.forEach((data) => {
        let empObject = {
          fromData: '',
          toDate: '',
          check: false,
          employeeNumber: '',
          name: '',
          organisationUnit: '',
          flag: '',
        };
        empObject.fromData = this.dataForm.value.fromDateControl.valueOf();
        empObject.toDate = this.dataForm.value.toDateControl.valueOf();
        empObject.check = true;
        empObject.employeeNumber = data.employeeNumber;
        empObject.name = data.name;
        empObject.organisationUnit = data.organisationUnit;
        empObject.flag = data.flag;
        //Pushing all the elements
        this.dataList.push(empObject);
      });
    } else {
      //Emptying Array
      this.dataList = [];
      this.checked = false;
      this.checkedAll = false;
    }
  }
  ngOnDestroy() {
    this.shiftManager.unsubscribe();
  }
}

export interface PeriodicElement {
  name: string;
  empNo: number;
  orgUnit: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];
