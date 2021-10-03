import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClaimsModel } from '../expense-report-manager.model';
import { FormControl } from '@angular/forms';
import { ExpenseReportManagerService } from '../expense-report-manager.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FilesModelComponent } from '../files-model/files-model.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReimbursementComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['search', 'amount', 'claimDate', 'attachment'];
  dataSource ;
  selectedData=[];
  name = '';
  type = '';
  filteredList = [];
  activePage:number = 1; 
  routerData: any;
  breadcrumbJson: any = [
    {
      label: 'Reimbursement',
      link: '/reimbursements'
    },
    {
      label: 'Expense Report Manager',
      link: '/reimbursements/expense-report-manager'
    },
    {
      label: 'Reimbursement Claims',
      link: '/reimbursements/expense-report-manager/reimbursement-claims'
    }
  ];
  searchValue: FormControl;
  subscriptionList: Subscription[] = [];
  year: number = 0;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private expenseReportService: ExpenseReportManagerService, private router: Router, private dialog: MatDialog) { 
    this.searchValue = new FormControl();
    this.dataSource = new MatTableDataSource<ClaimsModel>([]);
    this.routerData = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.selectedData = this.routerData.claimList;
    this.name = this.routerData.name;
    this.type = this.routerData.type;
    this.year = this.routerData.year;
    this.filteredList = this.selectedData;
    if(this.filteredList.length > 10 ){
      this.dataSource = new MatTableDataSource<ClaimsModel>(this.filteredList.slice(0,9)); 
    } else {
      this.dataSource = new MatTableDataSource<ClaimsModel>(this.filteredList);
    }
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  displayActivePage(activePageNumber:number){  
    this.activePage = activePageNumber;
    let start = this.activePage * 10;
      this.dataSource = new MatTableDataSource<ClaimsModel>(this.filteredList.slice(start-10,start-1));
  }

  searchCandidateList(): void {
    this.searchValue.valueChanges.subscribe((searchValue: string) => {
      if (searchValue) {
        this.filteredList = this.selectedData.filter((item: any) => item.expTypeText.toLowerCase().indexOf(searchValue.toLowerCase().trim()) != -1);
      }else {
        this.filteredList = this.selectedData;
      }
      if(this.filteredList.length > 10 ){
        this.dataSource = new MatTableDataSource<ClaimsModel>(this.filteredList.slice(0,9)); 
      } else {
        this.dataSource = new MatTableDataSource<ClaimsModel>(this.filteredList); 
      }
    });
 }
 getDateFormat(date: string): string {
  return date.split('/').join('.');
}
multiAttachList(element): void {
  let list = [];
  if(element.attachName){
    element['name'] = element.attachName;
    element['rType'] = 'T';;
    list.push(element);
    const dialogRef = this.dialog.open(FilesModelComponent, {
      width: '683px',
    });
    dialogRef.componentInstance.attachmentDeta = list;
  }else {
    this.subscriptionList.push(
      this.expenseReportService.getPdfList(this.type, element.claimNo).subscribe((data: any)=> {
        if(data){
          if(data){
            const dialogRef = this.dialog.open(FilesModelComponent, {
              width: '683px',
            });
            dialogRef.componentInstance.attachmentDeta = data;
          }
        }
      }, error => {  
      })
    );
  }
}
getHeaderText(): string {
  return this.name === this.routerData.subName ? 'Reimbursements': this.routerData.subName;
}
ngOnDestroy(): void {
  if(this.subscriptionList.length > 0) {
    this.subscriptionList.forEach(subs => {
      subs.unsubscribe();
    });
  }
}
}
