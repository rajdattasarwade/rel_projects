import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shift-filter-modal',
  templateUrl: './shift-filter-modal.component.html',
  styleUrls: ['./shift-filter-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShiftFilterModalComponent implements OnInit {
  filterForm: FormGroup;
  filteredResults: any;
  avalShifts: any;
  constructor(
    public dialogRef: MatDialogRef<ShiftFilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      sortingControl: new FormControl(this.data.currentOrder),
      searchControl: new FormControl(this.data.currentName),
      shiftControl: new FormControl(this.data.currentShift),
    });
    this.filteredResults = this.data.shiftData;
    this.avalShifts = this.data.avalShifts;
  }

  applyFilters() {
    if (this.filterForm.value.searchControl != '') {
      this.filteredResults = this.filteredResults.filter((shiftItem) => {
        return (
          shiftItem.empName
            .toLowerCase()
            .includes(this.filterForm.value.searchControl.toLowerCase()) ||
          shiftItem.empId.includes(this.filterForm.value.searchControl)
        );
      });
    }
    this.sortData(this.filterForm.value.sortingControl);

    let callbackData = {
      filteredResults: this.filteredResults,
      changeValues: this.filterForm.value,
    };
    this.dialogRef.close(callbackData);
  }

  resetFilters() {
    this.filterForm.reset();
    this.filterForm.get('sortingControl').patchValue('asc');
    this.filterForm.get('searchControl').patchValue('');
    this.filterForm.get('shiftControl').patchValue('All Shifts');
  }

  sortData(order) {
    let regex = /^(\w+\.\s*)+|,[\s\w]*$/;
    if (order == 'asc') {
      this.filteredResults.sort((firstItem, secondItem) => {
        let firstItemTrim;
        let secondItemTrim;
        if (this.data.saveFrom == 'upload') {
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
    }
    if (order == 'dsc') {
      this.filteredResults.sort((firstItem, secondItem) => {
        let firstItemTrim;
        let secondItemTrim;
        if (this.data.saveFrom == 'upload') {
          firstItemTrim = firstItem.empId;
          secondItemTrim = secondItem.empId;
        } else {
          firstItemTrim = firstItem.empName.replace(regex, '');
          secondItemTrim = secondItem.empName.replace(regex, '');
        }
        if (firstItemTrim > secondItemTrim) {
          return -1;
        }
        if (secondItemTrim > firstItemTrim) {
          return 1;
        }
      });
    }
  }
}
