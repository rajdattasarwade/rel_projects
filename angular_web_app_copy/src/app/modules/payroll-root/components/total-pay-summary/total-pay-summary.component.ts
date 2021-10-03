import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IconsModel } from '../../../../components/common/common-models';
import { PayrollService } from '../../payroll.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-total-pay-summary',
  templateUrl: './total-pay-summary.component.html',
  styleUrls: ['./total-pay-summary.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TotalPaySummaryComponent implements OnInit {
  icons: any;
  data: any = [];
  variablePayamt: number = 0;
  array = { BASE: 0, BPAY: 0, TCHP: 0, TCTC: 0, TSPA: 0, 'Variable pay': 0 };
  choicePayData = { payData: [], payDetail: [] };
  constructor(public payrollService: PayrollService) {
    this.icons = [];
    this.icons.push(
      new IconsModel('', '', 'header-ico total-pay-summary-ico', 'TotalPayIco')
    );
  }

  ngOnInit(): void {
    this.payrollService.getVariablePay().subscribe((res) => {
      let data = res;
      this.choicePayData.payData = data;
      for (let each of data)
        each['compensationType'] == 'VARIABLE_PAY'
          ? (this.array['Variable pay'] = Math.round(each['amount']))
          : '';
    });
    this.payrollService.getChoicePayPeriod().subscribe((res) => {
      let data = res[0];
      this.getTaxSummaryDetails(data['effectiveDate']);
    });
  }
  getTaxSummaryDetails(effectiveDate) {
    this.payrollService
      .getChoicePayComponents(effectiveDate)
      .subscribe((res) => {
        this.data = res;
        for (let each of this.data) {
          Object.keys(this.array).includes(each['component'])
            ? (this.array[each['component']] = each['amount'])
            : '';
        }
        this.choicePayData.payDetail = this.data;
        this.payrollService.setchoicePayData(this.choicePayData);
      });
  }
}
