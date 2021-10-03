import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog } from'@angular/material/dialog';
import { TripExpenseDetailsModalComponent } from '../../trip-expense-details-modal/trip-expense-details-modal.component';
import { ExpenseReportService } from '../../expense-report.service';
import { MatTableDataSource } from '@angular/material/table';
import { TravelEmployeeWise } from '../../expense-report.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-travel-employee-wise',
  templateUrl: './travel-employee-wise.component.html',
  styleUrls: ['./travel-employee-wise.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TravelEmployeeWiseComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['employeeName', 'tripType', 'fromDate','toDate', 'placeVisit', 'claimedAmount','paidAmount', 'currency', 'tripNo', 'tripPurpose'];
  dataSource:any;
  fromDate:any;
  toDate:any;
  maxDate:any;
  employeeList = [];
  selected = "00000000";
  dates: any;
  subscriptionList: Subscription[]=[];
  constructor(public dialog: MatDialog, private expenseReportService: ExpenseReportService) {
    this.dataSource = new MatTableDataSource<TravelEmployeeWise>([]);    
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
        this.getEmployeewise();
      })
    );
  }

  openTripExpenseDetailsModal(tripNo) {
    this.subscriptionList.push(
      this.expenseReportService.getTripDetails(tripNo).subscribe((data: any[]) => {
        const dialogRef = this.dialog.open(TripExpenseDetailsModalComponent, {
          width: '600px',}); 
          dialogRef.componentInstance.tripDetails = data;
      },error=> {
        console.log(error);
        
      })
    );
  }

  getEmployeewise(): void {
    this.subscriptionList.push(
      this.expenseReportService.getTravelEmployee(this.fromDate.getTime(),this.toDate.getTime()).subscribe((data: TravelEmployeeWise[]) => {
        this.dataSource = new MatTableDataSource<TravelEmployeeWise>(data); 
      }, 
      error => {
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
      this.expenseReportService.getEmployeeTravelSearch(this.fromDate.getTime(),this.toDate.getTime(),this.selected).subscribe((data: TravelEmployeeWise[])=> {
        this.dataSource = new MatTableDataSource<TravelEmployeeWise>(data);
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
