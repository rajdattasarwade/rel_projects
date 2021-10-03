import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PayrollService } from '../../payroll.service';
import { Subscription } from '../../../../../../node_modules/rxjs';

@Component({
  selector: 'payroll-loans',
  templateUrl: './payroll-loans.component.html',
  styleUrls: ['./payroll-loans.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PayrollLoansComponent implements OnInit, OnDestroy {

  loansData: any;
  loanSubscription: Subscription;

  constructor(
    private router: Router,
    private payrollService: PayrollService
  ) {}

  ngOnInit(): void {
    this.getLoansData();
  }

  getLoansData() {
    this.loanSubscription = this.payrollService.getLoansDetails().subscribe(
      data => {
        if (data != '' && data != [] && data != null ){
          data.forEach(element => {
            element.percentage = 100 * element.paidAmt / element.principalAmt;
            
          });
          this.loansData = data;
        } else {
          this.loansData = null;
        }
      }
    );
  }

  loanSerice() {
    this.router.navigate(['/payroll/payroll-loan-service']);
  }

  ngOnDestroy() {
    this.loanSubscription.unsubscribe();
  }
}
