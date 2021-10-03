import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MyCompensationDetailsService } from '../my-compensation-details.service';
import { EmployeeDetailsModel } from '../my-compensation-details.model';
import { Config } from 'src/app/components/core/config/config';
import { Subscription } from 'rxjs';
import { PayrollService } from '../../../payroll.service';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-personal-view-service',
  templateUrl: './personal-view-service.component.html',
  styleUrls: ['./personal-view-service.component.css'],
  encapsulation:ViewEncapsulation.None
})



export class PersonalViewServiceComponent implements OnInit, OnDestroy {
  imgUrl: string;
  avtarUrl = Config.avtarUrl;
  employeeId = Config.userId;
  dataSource:any;
  subscriptionList: Subscription[]=[];
    displayedColumns: string[] = [
      'description',
      'performanceRating',
      'effeDate',
      'bonus',
      'increment',
      'newPay',
      'imageUrl',
    ];    
ctc: any;
isData:boolean;
pdfUrl: any;
  constructor(private compensationDetailsService: MyCompensationDetailsService,
     private payrollService: PayrollService, public activeModal: MatDialog) { }

  ngOnInit(): void {
    this.employeeId = this.employeeId ? this.employeeId.substring(1):'-';
    this.imgUrl = this.avtarUrl + this.employeeId +'.jpg';
    this.getSelfHistory();
    this.getPayData();
  }

  getSelfHistory(): void {
    this.subscriptionList.push(
      this.compensationDetailsService.getSelfHistory().subscribe((data: EmployeeDetailsModel[]) => {
        if(data.length > 0){
          this.isData = true;
          data.forEach( item => {
            item['imageUrl'] = 'assets/images/view-ico.png';
          });
         this.dataSource = new MatTableDataSource<EmployeeDetailsModel>(data);
        } 
      })
    );
  }

  getPayData(): void {
    const payrollData = this.payrollService.getChoicePayData();
    if (payrollData){
     const ctcData = payrollData.payData.find(item => item.compensationType === 'CTC');
     this.ctc = ctcData ? ctcData.amount.split('.')[0]: '';
    }
  }
  openPdf(data: EmployeeDetailsModel): void {
    let req = {
        count: data.count,
        effectiveDate: data.effectiveDate,
        documentName: "00000000",
        reasonCode: data.reasonCode,
        reasonSubCode: data.reasonSubCode,
        type: data.type,
        year: data.year
      }
    this.subscriptionList.push(
      this.compensationDetailsService.getPDF(req).subscribe(data => {
       if(data){
        let file = new Blob([data],{type: 'application/pdf'});
        this.pdfUrl = URL.createObjectURL(file);
        const dialogRef = this.activeModal.open(PdfViewerModalComponent);
        dialogRef.componentInstance.pdfUrl = this.pdfUrl;
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
      });
    }
  }
}
