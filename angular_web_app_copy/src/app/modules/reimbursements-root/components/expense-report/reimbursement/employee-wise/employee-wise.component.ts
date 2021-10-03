import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { ExpenseReportService } from '../../expense-report.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ReimbursementEmployee } from '../../expense-report.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-wise',
  templateUrl: './employee-wise.component.html',
  styleUrls: ['./employee-wise.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class EmployeeWiseComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['employeeName', 'reimbursementType', 'createDate', 'amount'];
  dataSource:any;
  fromDate:any;
  toDate:any;
  maxDate:any;
  employeeList = [];
  selected = "00000000";
  dates: any;
  subscriptionList: Subscription[]=[];
  constructor(private expenseReportService: ExpenseReportService) {
    this.dataSource = new MatTableDataSource<ReimbursementEmployee>([]);
   }

  ngOnInit(): void {
    this.subscriptionList.push(
      this.expenseReportService.getEmployee().subscribe(data => {
        this.employeeList = data;
      })
    );

    this.subscriptionList.push(
      this.expenseReportService.getDatesData().subscribe(dates => {
        this.fromDate = new Date(dates.startDate);
        this.toDate = new Date(dates.endDate);
        this.maxDate = new Date(dates.endDate);
        this.getEmployee();
      })
    );
  }

  getEmployee(): void {
    this.subscriptionList.push(
      this.expenseReportService.getReimbursementEmployee(this.fromDate.getTime(),this.toDate.getTime()).subscribe((data: ReimbursementEmployee[]) => {
        this.dataSource = new MatTableDataSource<ReimbursementEmployee>(data);
      }, error => {
        console.log(error); 
      })
    );
  }

  dateChange(event: MatDatepickerInputEvent<Date>,type: string): void {
    let date = new Date(event.value);
    if(type === 'from') {
      this.fromDate = date;
    }else if(type === 'to') {
      this.toDate = date;
    }
    this.getEmployeeSearch();
  }
  onSelect(): void {
   this.getEmployeeSearch();
  }
  getEmployeeSearch(): void {
    this.subscriptionList.push(
      this.expenseReportService.getEmployeeSearch(this.fromDate.getTime(),this.toDate.getTime(),this.selected).subscribe((data: ReimbursementEmployee[])=> {
        this.dataSource = new MatTableDataSource<ReimbursementEmployee>(data);
      },
      error=> {
        console.log(error);
      })
    );
  }
  getDateFormat(date: string): string {
    return date.split('/').join('.');
  }
  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      });
    }
  }
}
