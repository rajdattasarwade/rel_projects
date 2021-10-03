import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { LeaveAndAttendanceRootService } from '../../../leave-and-attendance-root.service';
import { SuccessModalComponent } from 'src/app/modules/leave-and-attendance-root/components/success-modal/success-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-otp-service',
  templateUrl: './generate-otp-service.component.html',
  styleUrls: ['./generate-otp-service.component.css'],
})
export class GenerateOtpServiceComponent implements OnInit {
  public OTform: FormGroup;
  minDate: Date;
  maxDate: Date;
  pdfUrl: string;
  subordinateList: any = [];
  subscription: Subscription[] = [];
  subordinateJson = [
    {
      user: '',
      employeeId: '16243977',
      name: '16243977-Mr. Abc Xyz',
    },
    { user: '', employeeId: '16243977', name: '16243977-Mr. C' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. B' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. A' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. A' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. A' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. A' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. A' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. A' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. A' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. A' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. A' },
    { user: '', employeeId: '16243977', name: '16243977-Mr. A' },
  ];
  file: any;
  fileName: String;
  breadcrumbJson: any = [
    {
      label: 'Leave and Attendance',
      link: '/leave-and-attendance',
    },
    {
      label: 'Generate OT Slip',
      link: '/leave-and-attendance/generate-OT-Slip',
    },
  ];
  today = new Date();

  otSlipObj: any = {};
  constructor(
    private leaveservice: LeaveAndAttendanceRootService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.OTform = new FormGroup({
      fDate: new FormControl(Date, [Validators.required]),
      tDate: new FormControl(Date, [Validators.required]),
      subordinate: new FormControl('', [Validators.required]),
    });
    this.getOTSlipSubordinate();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.minDate = new Date(event.value);
    this.maxDate = new Date(event.value);
    this.maxDate.setDate(this.maxDate.getDate() + 14);
    // this.OTform.get('tDate').setValue('');
  }

  downloadPdf() {
    let D = document;
    let link = D.createElement('a');
    link.href = this.pdfUrl;
    link.download =
      'OTslip_' + this.today.getMonth() + this.today.getFullYear() + '.pdf';
    link.click();
  }

  getOTSlipSubordinate() {
    let subscription = this.leaveservice
      .getOTSlipSubordinate()
      .subscribe((response) => {
        if (response) {
          for (let d in response) {
            this.subordinateList.push(response[d]);
          }
        }
      });
    this.subscription.push(subscription);
  }

  ngOnDestroy() {
    if (this.subscription.length > 0) {
      this.subscription.forEach((s) => s.unsubscribe());
    }
  }

  generteOTSlip(OTSlipForm) {
    this.otSlipObj = OTSlipForm;
    let beginDate = new Date(
      moment(OTSlipForm['fDate']).format('MM/DD/YYYY')
    ).getTime();
    let endDate = new Date(
      moment(OTSlipForm['tDate']).format('MM/DD/YYYY')
    ).getTime();
    let employeeId = OTSlipForm['subordinate'].employeeId;
    let subscription = this.leaveservice
      .getOTSlipPdf(employeeId, beginDate, endDate)
      .subscribe(
        (data) => {
          if (data) {
            console.log(data);
            this.file = new Blob([data], { type: 'application/pdf' });
            this.pdfUrl = URL.createObjectURL(this.file);
            this.fileName =
              'OTSlip_' +
              this.today.getMonth() +
              this.today.getFullYear() +
              '.pdf';
          } else {
            this.pdfUrl = null;
          }
        },
        (error) => {
          this.pdfUrl = null;
        }
      );
    this.subscription.push(subscription);
  }

  enlargepdf() {
    window.open(this.pdfUrl);
  }

  mailpdf() {
    let payload = {
      employeeId: this.otSlipObj['subordinate'].employeeId,
      beginDate: new Date(
        moment(this.otSlipObj['fDate']).format('MM/DD/YYYY')
      ).getTime(),
      endDate: new Date(
        moment(this.otSlipObj['tDate']).format('MM/DD/YYYY')
      ).getTime(),
      subordinateName: this.otSlipObj['subordinate'].name
        .substring(this.otSlipObj['subordinate'].name.indexOf('-'))
        .replace('-', ''),
    };
    let subscription = this.leaveservice
      .sendOTSlipMail(payload)
      .subscribe((response) => {
        if (response) {
          console.log(response);
          const dialogRef = this.dialog.open(SuccessModalComponent, {
            width: '250px',
            height: '150px',
          });
          dialogRef.componentInstance.message =
            response['responseStatus'] == 'SUCCESS'
              ? 'Email sent successfully.'
              : 'Request failed';
        }
      });
    this.subscription.push(subscription);
  }
}
