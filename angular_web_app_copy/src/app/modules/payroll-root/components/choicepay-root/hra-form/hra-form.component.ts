import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-hra-form',
  templateUrl: './hra-form.component.html',
  styleUrls: ['./hra-form.component.css'],
  encapsulation: ViewEncapsulation.None,
  // providers: [HouseLoanService],
})
export class HraFormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<any>) {}

  ngOnInit() {}

  dismiss() {
    this.dialogRef.close();
  }
}
