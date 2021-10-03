import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ExpenseReportManagerService } from './expense-report-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-report-manager',
  templateUrl: './expense-report-manager.component.html',
  styleUrls: ['./expense-report-manager.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpenseReportManagerComponent implements OnInit, OnDestroy {
  breadcrumbJson: any = [
    {
      label: 'Reimbursement',
      link: '/reimbursements'
    },
    {
      label: 'Expense Report (Manager)',
      link: '/reimbursements/expense-report-manager'
    }
  ];
  subscription: Subscription;
  constructor(private expenseReportService: ExpenseReportManagerService) { }

  ngOnInit(): void {
    this.subscription = this.expenseReportService.getYears().subscribe((data: any) => {
        if(data){
          this.expenseReportService.setDatesData(data);
        }
      },
      error => {
        console.log(error); 
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
