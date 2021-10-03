import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  public message: string = "";
  public title: string = "Warning";
  public yesBtn: string = "YES";
  public noBtn: string = "NO";
  public messageIcon: string = "";
  public modalCls: string = "";
  public dismissCallback: (reason: string) => {};
  constructor(public activeModal: MatDialog, public dialogRef: MatDialogRef<ConfirmationModalComponent>) { }

  ngOnInit(): void {
  }
  dismiss(reason: string) {
    if (this.dismissCallback) {
      this.dismissCallback(reason);
    }
    this.dialogRef.close();
  }
}
