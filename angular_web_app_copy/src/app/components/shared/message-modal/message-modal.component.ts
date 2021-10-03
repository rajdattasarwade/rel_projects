import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {
  public message: string = "";
  public title: string = "Error";
  public messageIcon: string = "";
  public btnTitle: string = "CLOSE";
  public dismissCallback: Function = () => {};
  btnClass: string = "";
  constructor(public activeModal: MatDialog, public dialogRef: MatDialogRef<MessageModalComponent>) { }

  ngOnInit(): void {
    if (this.btnTitle != "CLOSE") {
      this.btnClass = "secondory-btn";
    } else {
      this.btnClass = "primary-btn";
    }
  }
  dismiss() {
    if (this.dismissCallback) {
      this.dismissCallback();
    }
    this.dialogRef.close();
  }
}
