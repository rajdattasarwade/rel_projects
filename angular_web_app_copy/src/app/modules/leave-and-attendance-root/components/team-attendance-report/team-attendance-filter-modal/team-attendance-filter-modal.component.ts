import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Inject,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-team-attendance-filter-modal',
  templateUrl: './team-attendance-filter-modal.component.html',
  styleUrls: ['./team-attendance-filter-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TeamAttendanceFilterModalComponent implements OnInit {
  filteredResults: any;
  filterForm: FormGroup;
  sortingOrder: FormControl;
  searchName: FormControl;
  statusFilter: FormControl;
  shiftFilter: FormControl;
  @ViewChild('statusSelect') statusSelect: MatSelect;
  @ViewChild('shiftSelect') shiftSelect: MatSelect;
  constructor(
    public dialogRef: MatDialogRef<TeamAttendanceFilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      sortingOrder: new FormControl(this.data.currentOrder),
      searchName: new FormControl(this.data.currentName),
      statusFilter: new FormControl(this.data.currentStatus),
      shiftFilter: new FormControl(this.data.currentShift),
    });
    this.filteredResults = this.data.attendanceData;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  Resetfilter() {
    this.filterForm.reset();
    this.filterForm.get('sortingOrder').patchValue('asc');
    if (this.data.componentName == 'daily') {
      this.statusSelect.value = 'Show All';
      this.shiftSelect.value = 'All Shifts';
      this.filterForm.get('statusFilter').patchValue('Show All');
      this.filterForm.get('shiftFilter').patchValue('All Shifts');
    }
  }
  annualApplyFilters() {
    if (this.filterForm.value.searchName) {
      this.filteredResults = this.filteredResults.filter((employeeItem) => {
        return (
          employeeItem.empName
            .toLowerCase()
            .includes(this.filterForm.value.searchName.toLowerCase()) ||
          employeeItem.empPernr.includes(this.filterForm.value.searchName)
        );
      });
    }

    if (this.filterForm.value.sortingOrder) {
      this.sortDataAnnualy(this.filterForm.value.sortingOrder);
    }
  }
  dailyApplyFilters() {
    if (this.filterForm.value.searchName) {
      this.filteredResults = this.filteredResults.filter((employeeItem) => {
        return (
          employeeItem.employeeName
            .toLowerCase()
            .includes(this.filterForm.value.searchName.toLowerCase()) ||
          employeeItem.employeeCode.includes(this.filterForm.value.searchName)
        );
      });
    }
    if (this.filterForm.value.statusFilter != 'Show All') {
      this.filteredResults = this.filteredResults.filter((employeeItem) => {
        return employeeItem.status == this.filterForm.value.statusFilter;
      });
    }
    if (this.filterForm.value.shiftFilter != 'All Shifts') {
      this.filteredResults = this.filteredResults.filter((employeeItem) => {
        return (
          employeeItem.employeeShiftCode == this.filterForm.value.shiftFilter
        );
      });
    }

    if (this.filterForm.value.sortingOrder) {
      this.sortDataDaily(this.filterForm.value.sortingOrder);
    }
  }
  monthlyApplyFilters() {
    if (this.filterForm.value.searchName) {
      this.filteredResults = this.filteredResults.filter((employeeItem) => {
        return (
          employeeItem.subordinateName
            .toLowerCase()
            .includes(this.filterForm.value.searchName.toLowerCase()) ||
          employeeItem.subordinateNo.includes(
            this.filterForm.value.searchName
          )
        );
      });
    }

    if (this.filterForm.value.sortingOrder) {
      this.sortDataMonthly(this.filterForm.value.sortingOrder);
    }
  }
  sortDataMonthly(order) {
    //Regex for title Mr. Ms. ets.
    let regex = /^(\w+\.\s*)+|,[\s\w]*$/;
    if (order == 'asc') {
      this.filteredResults.sort((firstItem, secondItem) => {
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
    if (order == 'dsc') {
      this.filteredResults.sort((firstItem, secondItem) => {
        let firstItemTrim = firstItem.subordinateName.replace(regex, '');
        let secondItemTrim = secondItem.subordinateName.replace(regex, '');
        if (firstItemTrim > secondItemTrim) {
          return -1;
        }
        if (secondItemTrim > firstItemTrim) {
          return 1;
        }
      });
    }
  }
  applyFilters() {
    console.log(this.filterForm);
    if (this.data.componentName == 'daily') {
      this.dailyApplyFilters();
    } else if (this.data.componentName == 'annual') {
      this.annualApplyFilters();
    } else if (this.data.componentName == 'monthly') {
      this.monthlyApplyFilters();
    }

    let callbackData = {
      filteredResults: this.filteredResults,
      changeValues: this.filterForm.value,
      dataAval: this.filteredResults.length != 0,
    };
    this.dialogRef.close(callbackData);
  }

  sortDataDaily(order) {
    let regex = /^(\w+\.\s*)+|,[\s\w]*$/;
    if (order == 'asc') {
      this.filteredResults.sort((firstItem, secondItem) => {
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
    if (order == 'dsc') {
      this.filteredResults.sort((firstItem, secondItem) => {
        let firstItemTrim = firstItem.employeeName.replace(regex, '');
        let secondItemTrim = secondItem.employeeName.replace(regex, '');
        if (firstItemTrim > secondItemTrim) {
          return -1;
        }
        if (secondItemTrim > firstItemTrim) {
          return 1;
        }
      });
    }
  }
  sortDataAnnualy(order) {
    let regex = /^(\w+\.\s*)+|,[\s\w]*$/;
    if (order == 'asc') {
      this.filteredResults.sort((firstItem, secondItem) => {
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
    if (order == 'dsc') {
      this.filteredResults.sort((firstItem, secondItem) => {
        let firstItemTrim = firstItem.empName.replace(regex, '');
        let secondItemTrim = secondItem.empName.replace(regex, '');
        if (firstItemTrim > secondItemTrim) {
          return -1;
        }
        if (secondItemTrim > firstItemTrim) {
          return 1;
        }
      });
    }
  }
  onCloseClick() {
    this.dialogRef.close();
  }
}
