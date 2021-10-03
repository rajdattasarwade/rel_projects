import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-details-modal',
  templateUrl: './vehicle-details-modal.component.html',
  styleUrls: ['./vehicle-details-modal.component.css'],
})
export class VehicleDetailsModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<any>) {}

  ngOnInit(): void {}
  dismiss() {
    this.dialogRef.close();
  }
}
