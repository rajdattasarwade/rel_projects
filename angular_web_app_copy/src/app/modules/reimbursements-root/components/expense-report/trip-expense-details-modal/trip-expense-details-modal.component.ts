import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-trip-expense-details-modal',
  templateUrl: './trip-expense-details-modal.component.html',
  styleUrls: ['./trip-expense-details-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TripExpenseDetailsModalComponent implements OnInit {
  tripDetails: any[];
  constructor(public dialogRef: MatDialogRef<TripExpenseDetailsModalComponent>) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }
  
}
