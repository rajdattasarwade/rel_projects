import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ExpenseReportManagerService } from '../expense-report-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardModel, ClaimsModel } from '../expense-report-manager.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-travel',
  templateUrl: './manager-travel.component.html',
  styleUrls: ['./manager-travel.component.css'],
  encapsulation: ViewEncapsulation.None,

  animations: [
    trigger('detailExpand', [
      state(
        'collapsed, void',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ManagerTravelComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['search', 'self', 'rollUp'];
  displayedColumns2: string[] = ['searchSub', 'selfSub', 'rollUpSub'];
  dataSource;
  subscriptionList: Subscription[] = [];
  yearList = [];
  prev = false;
  next = false;
  currentYear: any;
  index = 0;
  directAmmount = 0;
  rollupAmount = 0;
  searchValue: FormControl;
  userList = [];
  filteredList = [];
  activePage:number = 1; 

  constructor(private expenseReportService: ExpenseReportManagerService, private dialog: MatDialog, private router: Router) {
    this.searchValue = new FormControl();
    this.dataSource = new MatTableDataSource<DashboardModel>([]);
   }

   ngOnInit(): void {
    this.getYearList();
  }
  getYearList(): void {
    this.subscriptionList.push(
      this.expenseReportService.getDatesData().subscribe(data => {        
        this.yearList = data;
        if(this.yearList.length > 0){
          this.currentYear = parseInt(data[this.index].year);
          this.next = true;
          this.getTravels(); 
        }else{
          this.prev = this.next = true;
        }
        
      },error => {
        this.prev = this.next = true;
      })
    );
  }
  toggleRow(element) {
    for (let allSubObj of this.dataSource.filteredData) {
      if (element.name === allSubObj.name) {
        if(allSubObj.dashboardModel.length == 0) {
          this.subscriptionList.push(
            this.expenseReportService.getdashboardClaims('T',this.currentYear, element.employeeNumber).subscribe((data: any) => { 
          allSubObj.dashboardModel = data;
            },error => {
              console.log(error);    
            })
           );
        }
        allSubObj.expandedElement = !allSubObj.expandedElement;
      } else {
        allSubObj.expandedElement = false;
      }
    }
  }
  getTravels(): void {
    this.activePage = 0;
    this.rollupAmount = this.directAmmount = 0;
    this.subscriptionList.push(
      this.expenseReportService.getdashboardbyYear('T', this.currentYear).subscribe((data: DashboardModel[]) => {
        if(data) {
          this.userList = data;
          this.userList.forEach(item => item.dashboardModel = []);
          this.filteredList = data;
          if(this.filteredList.length > 10 ){
            this.dataSource = new MatTableDataSource<DashboardModel>(this.filteredList.slice(0,9)); 
          } else {
            this.dataSource = new MatTableDataSource<DashboardModel>(this.filteredList); 
          }
          data.forEach(item => {
            this.rollupAmount = this.rollupAmount + item.rollAmount;
            this.directAmmount = this.directAmmount + item.selfAmount;
          })
        }
      })
    );
  }
  changeValue(value): void {
    this.index = this.index + value;
    if(this.index === this.yearList.length - 1){
      this.prev = true;
    }else if (this.index === 0){
      this.next = true;
    }else{
      this.prev = this.next = false;
    }
    this.currentYear = parseInt(this.yearList[this.index].year);
    this.getTravels();
    this.searchValue.setValue('');
 }
 openTravelModel(element, name): void {
    this.subscriptionList.push(
      this.expenseReportService.getClaimsList('T', this.currentYear, element.employeeNumber, element.expenseType).subscribe((data: ClaimsModel[]) => {
        let obj = {
          claimList: data,
          name: name,
          type: 'T',
          subName: element.name,
          year: this.currentYear
        }
        this.router.navigate(['/reimbursements/reimbursement-claims'],
         { state:obj });
      },error => {
      })
    );
 }
 searchCandidateList(): void {
    this.searchValue.valueChanges.subscribe((searchValue: string) => {
      if (searchValue) {
        this.filteredList = this.userList.filter((item: any) => item.name.toLowerCase().indexOf(searchValue.toLowerCase().trim()) != -1);
      }else {
        this.filteredList = this.userList;
      }
      if(this.filteredList.length > 10 ){
        this.dataSource = new MatTableDataSource<DashboardModel>(this.filteredList.slice(0,9)); 
      } else {
        this.dataSource = new MatTableDataSource<DashboardModel>(this.filteredList); 
      }
    });
 }
 displayActivePage(activePageNumber:number){  
  this.activePage = activePageNumber;
  let start = this.activePage * 10;
    this.dataSource = new MatTableDataSource<DashboardModel>(this.filteredList.slice(start-10,start-1));
}
ngOnDestroy(): void {
  if(this.subscriptionList.length > 0) {
    this.subscriptionList.forEach(subs => {
      subs.unsubscribe();
    });
  }
}
}
