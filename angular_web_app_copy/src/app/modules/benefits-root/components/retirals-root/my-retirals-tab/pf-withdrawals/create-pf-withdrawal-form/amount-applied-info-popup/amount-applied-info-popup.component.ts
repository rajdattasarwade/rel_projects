import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-amount-applied-info-popup',
  templateUrl: './amount-applied-info-popup.component.html',
  styleUrls: ['./amount-applied-info-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AmountAppliedInfoPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AmountAppliedInfoPopupComponent>
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
