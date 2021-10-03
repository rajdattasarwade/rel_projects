import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuccessModalComponent implements OnInit {
  @Input() message;
  constructor(public dialogRef: MatDialogRef<SuccessModalComponent>,) { }

  ngOnInit(): void {
  }
  dismiss() {
    this.dialogRef.close();
  }

}
