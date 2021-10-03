import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ExpenseReportService } from './expense-report.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpenseReportComponent implements OnInit,OnDestroy {

  breadcrumbJson: any = [
    {
      label: 'Reimbursement',
      link: '/reimbursements'
    },
    {
      label: 'Expense Report (Self/Team)',
      link: '/reimbursements/expense-report'
    }
  ];
  subscriptionList: Subscription[]=[];
  constructor(private expenseReportService: ExpenseReportService) { }

  ngOnInit(): void {
    this.getDates();
    this.getEmployees();
  }
  getDates(): void {
    this.subscriptionList.push(
      this.expenseReportService.getDates().subscribe((data: any) => {
        this.expenseReportService.setDatesData(data);
       },
       error => {
         console.log(error);     
       })
    ); 
  }
  
  getEmployees(): void {
    this.subscriptionList.push(
      this.expenseReportService.getEmployees().subscribe((data: any) => {
        this.expenseReportService.setEmployee(data);
      },
      error => {
        console.log(error);     
      })
    );
  }
  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      });
    }
  }
}
