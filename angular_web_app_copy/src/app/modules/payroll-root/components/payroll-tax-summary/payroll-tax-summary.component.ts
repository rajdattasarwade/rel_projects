import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { PayrollService } from '../../payroll.service';
import { Subscription } from '../../../../../../node_modules/rxjs';

@Component({
  selector: 'payroll-tax-summary',
  templateUrl: './payroll-tax-summary.component.html',
  styleUrls: ['./payroll-tax-summary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PayrollTaxSummaryComponent implements OnInit, OnDestroy {

  taxSummaryData: any;
  taxSubscription: Subscription;
  noOfMonths: number;
  monthlyTaxAmount: number;

  constructor(
    private payrollService: PayrollService
  ) {
    let setdate = new Date ('2021-03-31')
    let currentdate = new Date();
    var months;
    months = (setdate.getFullYear() - currentdate.getFullYear()) * 12;
    months -= currentdate.getMonth();
    months += setdate.getMonth();
    this.noOfMonths  =  months <= 0 ? 0 : months + 1;
    console.log(this.noOfMonths);
  }

  ngOnInit(): void {
    this.getTaxSummary();
  }

  getTaxSummary() {
    this.taxSubscription = this.payrollService.getTaxSummaryDetails().subscribe(
      data => {
        if (data != '' && data != null) {
          data.percentage = 100 * data.totalDedcutedTax / data.totalIncomeTax;
          this.taxSummaryData = data;
          this.monthlyTaxAmount = this.taxSummaryData.balRecovery / this.noOfMonths;
        } else {
          this.taxSummaryData = null;
        }
      }
    );
  }

  ngOnDestroy() {
    this.taxSubscription.unsubscribe();
  }
}
