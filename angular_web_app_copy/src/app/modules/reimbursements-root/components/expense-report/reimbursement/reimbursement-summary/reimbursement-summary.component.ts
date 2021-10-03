import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { ExpenseReportService } from '../../expense-report.service';
import { ReimbursementSummary } from '../../expense-report.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reimbursement-summary',
  templateUrl: './reimbursement-summary.component.html',
  styleUrls: ['./reimbursement-summary.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReimbursementSummaryComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['reimbursementType', 'amount'];
  dataSource:any;
  fromDate:any;
  toDate:any;
  maxDate:any;
  subscriptionList: Subscription[]=[];
  constructor(private expenseReportService: ExpenseReportService) { 
    this.dataSource = new MatTableDataSource<ReimbursementSummary>([]);
  }

  ngOnInit(): void {
    this.subscriptionList.push(
      this.expenseReportService.getDatesData().subscribe(dates => {
        this.fromDate = new Date(dates.startDate);
        this.toDate = new Date(dates.endDate);
        this.maxDate = new Date(dates.endDate);
        this.getSummery();
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
    this.getSummery();
  }

  getSummery(): void {
    this.subscriptionList.push(
      this.expenseReportService.getReimbursementSummery(this.fromDate.getTime(), this.toDate.getTime()).subscribe((data: ReimbursementSummary[]) => {
        this.dataSource = new MatTableDataSource<ReimbursementSummary>(data);
      },error=> {
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
