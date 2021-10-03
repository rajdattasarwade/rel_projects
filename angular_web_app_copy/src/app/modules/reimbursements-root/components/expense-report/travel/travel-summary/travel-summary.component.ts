import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ExpenseReportService } from '../../expense-report.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { TravelSummary } from '../../expense-report.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-travel-summary',
  templateUrl: './travel-summary.component.html',
  styleUrls: ['./travel-summary.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TravelSummaryComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['typeExpense', 'trips', 'amount'];
  dataSource:any;
  fromDate:any;
  toDate:any;
  maxDate:any;
  subscriptionList: Subscription[]=[];
  constructor(private expenseReportService: ExpenseReportService) {
    this.dataSource = new MatTableDataSource<TravelSummary>([]);
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
      this.expenseReportService.getTravelSummery(this.fromDate.getTime(), this.toDate.getTime()).subscribe((data: TravelSummary[]) => {
        this.dataSource = new MatTableDataSource<TravelSummary>(data);
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
