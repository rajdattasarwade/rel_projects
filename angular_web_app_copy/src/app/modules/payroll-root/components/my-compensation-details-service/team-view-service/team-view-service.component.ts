import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel} from '@angular/cdk/collections';
import { MyCompensationDetailsService } from '../my-compensation-details.service';
import { EmployeeDetailsModel, ReleaseModel } from '../my-compensation-details.model';
import { Config } from 'src/app/components/core/config/config';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-team-view-service',
  templateUrl: './team-view-service.component.html',
  styleUrls: ['./team-view-service.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TeamViewServiceComponent implements OnInit, OnDestroy {
  dataSource: any;
  imgUrl: string;
  avtarUrl = Config.avtarUrl;
  employeeId = Config.userId;
  subscriptionList: Subscription[]=[];
  displayedColumns: string[] = [
    'select',
    'empName',
    'performanceRating',
    'effeDate',
    'bonus',
    'increment',
    'newPay',
    'description',
    'imageUrl',
  ];
  selection = new SelectionModel<EmployeeDetailsModel>(true, []);
  isData: boolean;
  constructor(private compensationDetailsService: MyCompensationDetailsService, private activeModal: MatDialog, private messageModal: MessageModalService) {}

  ngOnInit(): void {
    this.employeeId = this.employeeId ? this.employeeId.substring(1):'-';
    this.imgUrl = this.avtarUrl + this.employeeId +'.jpg';
    this.getTeamActionDetails();
  }

  getTeamActionDetails() {
    this.subscriptionList.push(
      this.compensationDetailsService.getTeamActionDetails().subscribe((data: EmployeeDetailsModel[]) => {
        if(data.length > 0) {
          this.isData = true;
          data.forEach(item => {
            item['imageUrl'] = 'assets/images/view-ico.png'
          });
        }
        this.dataSource = new MatTableDataSource<EmployeeDetailsModel>(data);
      })
    );
  }

 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  if(this.dataSource) {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }else {
    return true;
  }
   
  
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected()
    ? this.selection.clear()
    : this.dataSource.data.forEach((row) => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: EmployeeDetailsModel): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
    row.employeeName + 1
  }`;
}

onRelease(selection): void {
 selection._selected.forEach(element => {
  element['employeeId'] = element.employeeNumber;
  element['documentName'] = element.documentName;
  element['cyAward'] = element.awardAmount;
  element['cyRating'] = element.currentYearRating;
  element['sequenceNo'] = element.sequenceNumber;
  element['imageUrl'] = '';
 });
 let releaseModel = new ReleaseModel();
 releaseModel.documentName = '';
 releaseModel.releaseLetter = this.selection.selected;
 this.subscriptionList.push(
  this.compensationDetailsService.postReleaseLetter(releaseModel).subscribe(
    res => {
      this.getTeamActionDetails();
      this.selection.clear();
    },
    err => {this.messageModal.showMessage('Somthing went wrong, Try again');}
  )
 );
}
openPdf(data: EmployeeDetailsModel): void {
  let req = {
      count: data.count,
      effectiveDate: data.effectiveDate,
      documentName: data.documentName,
      reasonCode: data.reasonCode,
      reasonSubCode: data.reasonSubCode,
      type: data.type,
      year: data.year
    }
  this.subscriptionList.push(
    this.compensationDetailsService.getPDF(req).subscribe(data => {
     if(data){
      let file = new Blob([data],{type: 'application/pdf'});
      let pdfUrl = URL.createObjectURL(file);
      const dialogRef = this.activeModal.open(PdfViewerModalComponent);
      dialogRef.componentInstance.pdfUrl = pdfUrl;
      dialogRef.componentInstance.title = 'View Compensation Letter';
      dialogRef.componentInstance.pdfName = "Compensation Letter";
     }
    },err => {
      this.messageModal.showMessage('Failed to load.');
    })
  );
}
getDateFormat(date: string): string {
  return date.split('/').join('.');
}
ngOnDestroy(): void {
  if(this.subscriptionList.length > 0){
    this.subscriptionList.forEach(subs=>{
      subs.unsubscribe();
    })
  }
}
}
