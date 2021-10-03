import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
//import { Config } from "../../core/config/config";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Config } from '../../core/config/config';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.css'],
})
export class EmailModalComponent implements OnInit {
  rilSpecific: boolean;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  //dismissCallback: (callbackValue: HrssEmailActions, emailId) => {};
  dismissCallback: any = [];
  dissmissActions = HrssEmailActions;
  emailId: any;
  emailTitle: string = null;
  constructor(
    public activeModal: MatDialog,
    public dialogRef: MatDialogRef<EmailModalComponent>
  ) {}

  ngOnInit(): void {
    this.rilSpecific
      ? (this.emailFormControl.setValidators([
          Validators.pattern('[a-z0-9._%+-]+@ril.com'),
          Validators.required,
          Validators.email,
        ]),
        this.emailFormControl.updateValueAndValidity)
      : '';
  }
  onDismissAction(dismissBtn: HrssEmailActions, emailId) {
    if (this.dismissCallback) {
      this.dismissCallback(dismissBtn, emailId);
    }
    this.dialogRef.close();
  }

  // validateEmail(raw) {
  //   let emails = raw;
  //   let regex = Config.emailregex;
  //   this.buttonDisabled = !regex.test(emails.replace(/\s/g, ""));
  // }
}
export enum HrssEmailActions {
  SEND = 'SEND',
  CANCEL = 'CANCEL',
}
