import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pf-pension-info-popup',
  templateUrl: './pf-pension-info-popup.component.html',
  styleUrls: ['./pf-pension-info-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PfPensionInfoPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PfPensionInfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
