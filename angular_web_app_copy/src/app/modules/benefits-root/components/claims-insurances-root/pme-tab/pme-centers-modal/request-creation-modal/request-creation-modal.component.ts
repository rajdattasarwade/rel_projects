import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-creation-modal',
  templateUrl: './request-creation-modal.component.html',
  styleUrls: ['./request-creation-modal.component.css']
})
export class RequestCreationModalComponent implements OnInit {

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }
}
