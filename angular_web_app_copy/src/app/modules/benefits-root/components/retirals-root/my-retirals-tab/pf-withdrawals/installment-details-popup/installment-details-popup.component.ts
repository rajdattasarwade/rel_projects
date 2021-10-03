import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-installment-details-popup',
  templateUrl: './installment-details-popup.component.html',
  styleUrls: ['./installment-details-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InstallmentDetailsPopupComponent implements OnInit {

  displayedColumns: any = ['installment_no','member_balance','company_balance','posting_date','cheque_no','cheque_date'];
  dataSource =[];

  constructor(
    public dialogRef: MatDialogRef<InstallmentDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.dataSource = this.data.instalmentArray
    console.log(this.dataSource)
    if(this.dataSource.length > 0){
      this.dataSource.forEach(element =>{
        element.postingDate = moment(element.postingDate).format('DD-MM-YYYY')
        element.checkDate = moment(element.checkDate).format('DD-MM-YYYY')
      })
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
