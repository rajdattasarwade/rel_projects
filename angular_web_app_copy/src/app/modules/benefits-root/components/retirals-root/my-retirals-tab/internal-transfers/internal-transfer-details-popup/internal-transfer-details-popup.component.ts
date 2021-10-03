import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-internal-transfer-details-popup',
  templateUrl: './internal-transfer-details-popup.component.html',
  styleUrls: ['./internal-transfer-details-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InternalTransferDetailsPopupComponent implements OnInit {
  formData: any;

  constructor(
    public dialogRef: MatDialogRef<InternalTransferDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.formData = this.data.rowData
    this.formData.dateOfJoining = this.formData.dateOfJoining?moment(this.formData.dateOfJoining).format('DD-MM-YYYY'):null
    this.formData.dateOfLeaving = this.formData.dateOfLeaving?moment(this.formData.dateOfLeaving).format('DD-MM-YYYY'):null
  }

  closeModal() {
    this.dialogRef.close();
  }

}
