import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { EmailModalComponent } from '../email-modal/email-modal.component';

@Component({
  selector: 'app-medibuddy-card',
  templateUrl: './medibuddy-card.component.html',
  styleUrls: ['./medibuddy-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedibuddyCardComponent implements OnInit {
  @Input() headerText: any;
  @Input() memberId: any;
  @Input() validUptoDate: any;
  @Input() emailId: any;
  @Output() viewClicked = new EventEmitter<void>();
  @Output() printClicked = new EventEmitter<void>();
  @Output() downloadClicked = new EventEmitter<void>();
  @Output() emailClick = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.validUptoDate =
      this.validUptoDate == undefined
        ? '--'
        : moment(this.validUptoDate).format('DD-MM-YYYY');
    this.memberId = this.memberId == undefined ? '--' : this.memberId;
    this.headerText = this.headerText == undefined ? '' : this.headerText;
  }

  viewCardAction() {
    this.viewClicked.emit();
  }
  printAction() {
    this.printClicked.emit();
  }
  downloadAction() {
    this.downloadClicked.emit();
  }
  emailAction() {
    // const dialogRef = this.dialog.open(EmailModalComponent, {
    //   width: '600px',
    // });
    this.emailClick.emit();
  }
}
