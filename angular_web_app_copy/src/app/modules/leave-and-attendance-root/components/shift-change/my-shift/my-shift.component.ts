import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ShiftService } from '../manage_shift.service';
import { IndividualShift, MutualShift } from '../shift-change.model';
import { Subscription } from 'rxjs';
import { Config } from '../../../../../components/core/config/config';
import { storeColorCodes } from '../../calendar/attendance-det.model';

@Component({
  selector: 'app-my-shift',
  templateUrl: './my-shift.component.html',
  styleUrls: ['./my-shift.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MyShiftComponent implements OnInit {
  myshiftFlag: boolean = true;
  dataFlagValue: boolean = true;
  dateTimeFormats: any;
  individualShift: IndividualShift[]; // store individual shift details
  mutualShift: MutualShift[];
  individualHistory: Subscription = new Subscription();
  mutualHistory: Subscription = new Subscription();
  constructor(private shiftService: ShiftService) {
    this.dateTimeFormats = Config.APP_DATE_TIME_FORMATS;
  }

  ngOnInit(): void {
    this.getIndividualHistory();
    this.getMutualHistory();
    // this.myshiftFlag=true;
  }
  refreshList() {
    this.getIndividualHistory();
    this.getMutualHistory();
  }
  getIndividualHistory() {
    this.individualHistory = this.shiftService.getIndividualHistory().subscribe(
      (data: any) => {
        this.individualShift = data;
        this.individualShift.forEach((item) => {
          // const shiftItems = item.shiftDDText.split('--');
          switch (item.status) {
            case 'SENT': {
              item.statusColorCode = this.loopOverColorCodes('SHIFT_SENT');
              break;
            }
            case 'REJECTED': {
              item.statusColorCode = this.loopOverColorCodes('SHIFT_REJ');
              break;
            }
            case 'APPROVED': {
              item.statusColorCode = this.loopOverColorCodes('SHIFT_APP');
              break;
            }
            default: {
              item.statusColorCode = '#959595';
              break;
            }
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getMutualHistory() {
    this.mutualHistory = this.shiftService.getMutualHistory().subscribe(
      (data: any) => {
        this.mutualShift = data;
        this.mutualShift.forEach((item) => {
          // const shiftItems = item.shiftDDText.split('--');
          switch (item.status) {
            case 'SENT': {
              item.statusColorCode = this.loopOverColorCodes('SHIFT_SENT');
              break;
            }
            case 'REJECTED': {
              item.statusColorCode = this.loopOverColorCodes('SHIFT_REJ');
              break;
            }
            case 'APPROVED': {
              item.statusColorCode = this.loopOverColorCodes('SHIFT_APP');
              break;
            }
            default: {
              item.statusColorCode = '#959595';
              break;
            }
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loopOverColorCodes(status) {
    var colorCode;
    storeColorCodes.colorCodeObj.forEach((color) => {
      //{prs:111}
      if (Object.keys(color) == status) {
        colorCode = color[status];
      }
    });
    return colorCode;
  }

  ngOnDestroy() {
    this.individualHistory.unsubscribe();
    this.mutualHistory.unsubscribe();
  }
}
