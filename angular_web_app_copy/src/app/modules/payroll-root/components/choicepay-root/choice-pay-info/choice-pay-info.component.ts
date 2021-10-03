import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChoicepayRootService } from '../choicepay-root.service';

@Component({
  selector: 'app-choice-pay-info',
  templateUrl: './choice-pay-info.component.html',
  styleUrls: ['./choice-pay-info.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChoicePayInfoComponent implements OnInit {
  @Input() infoMessage: any;
  constructor(
    public dialogRef: MatDialogRef<any>,
    private service: ChoicepayRootService
  ) {}

  ngOnInit(): void {
    this.service.showInformationLandingPopUp = false;
  }
  dismiss() {
    this.dialogRef.close();
  }
}
