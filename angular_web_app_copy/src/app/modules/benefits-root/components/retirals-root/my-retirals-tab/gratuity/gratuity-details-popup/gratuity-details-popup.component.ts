import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-gratuity-details-popup',
  templateUrl: './gratuity-details-popup.component.html',
  styleUrls: ['./gratuity-details-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GratuityDetailsPopupComponent implements OnInit {

  public formData: any = {
    "inwardNo": "",
    "previousEmployer": "",
    "trustId": "",
    "previousTrust": "",
    "addressLine1": "",
    "addressLine2": "",
    "addressLine3": "",
    "addressLine4": "",
    "dateOfLeaving": null,
    "licCode": ""
  }
  constructor(
    public dialogRef: MatDialogRef<GratuityDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.formData = this.data.rowData
    if(this.formData.dateOfLeaving){
      this.formData.dateOfLeaving = moment(this.formData.dateOfLeaving).format('DD-MM-YYYY')
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
