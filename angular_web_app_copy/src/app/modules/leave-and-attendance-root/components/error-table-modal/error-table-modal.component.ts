import { Component, OnInit , ViewEncapsulation, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-error-table-modal',
  templateUrl: './error-table-modal.component.html',
  styleUrls: ['./error-table-modal.component.css']
})
export class ErrorTableModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ErrorTableModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  displayedColumns = ['employeeId','shiftDate','errorMessage'];
  alteredDataSource: any;
  ngOnInit(): void {
    this.errorData();
  }

  errorData() {
    this.alteredDataSource = [];
    for(let i = 0; i < this.data.length; i++ ) {
      let value = Object.values(this.data[i]);
      let dataObj = {
        employeeId : value[0],
        shiftDate : moment(value[1]).format('LL'),
        errorMessage : value [3]
      }
      this.alteredDataSource.push(dataObj);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
