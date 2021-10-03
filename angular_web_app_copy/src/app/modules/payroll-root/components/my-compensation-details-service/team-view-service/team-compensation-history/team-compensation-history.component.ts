import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyCompensationDetailsService } from '../../my-compensation-details.service';
import { EmployeeModel, EmployeeDetailsModel } from '../../my-compensation-details.model';
import { MatTableDataSource } from '@angular/material/table';
import { PdfViewerModalComponent } from '../../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-team-compensation-history',
  templateUrl: './team-compensation-history.component.html',
  styleUrls: ['./team-compensation-history.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TeamCompensationHistoryComponent implements OnInit {

  breadcrumbJson: any = [
    {
      label: 'Payroll',
      link: '/payroll'
    },
    {
      label: 'My compensation',
      link: '/payroll'
    },
    {
      label: 'View Team compensation History',
      link: '/payroll/my-compensation-details'
    }
  ]; 

  imgUrl: string;
  dataSource:any;
  empList: EmployeeModel[] = [];
  selected: string = 'Select';
  subscriptionList: Subscription[]=[];
  isData:boolean;
    displayedColumns: string[] = [
      'description',
      'performanceRating',
      'effeDate',
      'bonus',
      'increment',
      'newPay',
      'imageUrl',
    ];   

  constructor(private compensationDetailsService: MyCompensationDetailsService, private activeModal: MatDialog) { }

  ngOnInit(): void {
    this.getEmployeeListForManager();
  }

  getEmployeeListForManager(): void {
    this.subscriptionList.push(
      this.compensationDetailsService.getEmployeeList().subscribe((data: EmployeeModel[]) => {
        if(data.length > 0) {
          this.empList = data;
          this.selected = this.empList[0].userCode;
          this.onSelect();
        }
      })
    );
  }
  onSelect(){
    this.subscriptionList.push(
      this.compensationDetailsService.getTeamHistory(this.selected).subscribe((data:EmployeeDetailsModel[]) => {
        console.log(data);
        if(data.length > 0) {
          this.isData = true;
          data.forEach(item => {
            item['imageUrl'] = 'assets/images/view-ico.png'
          });
          this.dataSource = new MatTableDataSource<EmployeeDetailsModel>(data);
        }
      })
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
