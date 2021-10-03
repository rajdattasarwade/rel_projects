import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InstallmentDetailsPopupComponent } from './installment-details-popup/installment-details-popup.component';
import { CreatePfWithdrawalFormComponent } from './create-pf-withdrawal-form/create-pf-withdrawal-form.component';
import { Subscription } from 'rxjs';
import { WithdrawalService } from './withdrawal.service';
import * as moment from 'moment';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-pf-withdrawals',
  templateUrl: './pf-withdrawals.component.html',
  styleUrls: ['./pf-withdrawals.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PfWithdrawalsComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  displayedColumns: any = ['type','app_date','amt_applied','amt_sanctioned','installments','inward_no','action'];
  dataSource = [];

  constructor(
    public dialog: MatDialog,
    public withdrawalServices: WithdrawalService,
    private messageService:MessageModalService,
    public dialogRef: MatDialogRef<CreatePfWithdrawalFormComponent>
  ) { }

  ngOnInit(): void {
    this.getWithdrawalList()
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  getWithdrawalList(){
    this.subscriptionsList.push(this.withdrawalServices.getWithdrawalList().subscribe(
      (data: any)=>{
        this.dataSource = data.length>0?data:[]
        this.dataSource.forEach(element=>{
          element.showApplyDate = element.applyDate? moment(element.applyDate).format('DD-MM-YYYY') : null
        })
      }
    ))
  }


  getInstallmentDetails(element){
    let applyDate =element.applyDate
    this.subscriptionsList.push(this.withdrawalServices.getInstallmentType(
      'INS',
      element.withdrawalCode,
      applyDate,
      element.applyAmount
    ).subscribe((data: any)=>{
      if (data.responseStatus == 'FAILED' || data.length == 0){
        let errorMsg = data.responseData? JSON.parse(data.responseData).message:'Loan not yet sanctioned.'
        this.messageService.showMessage(
          errorMsg,
          'Error',
          'warning-icon',
          'CLOSE'
        );
      }else {
        this.openInstallmentDetails(data,element)
      }
    }))
  }

  openInstallmentDetails(installmentArray,element) {
    // installmentArray = [{​​​​​ "loanType":"",
    // "inwardNo":"",
    // "installmentNo":123334,
    // "memberBalance":"",
    // "companyBalance":"",
    // "postingDate":12334556,
    // "belnr":"",
    // "gjaHr":"",
    // "insType":"",
    // "hbkId":"",
    // "hktId":"",
    // "checkNo":"",
    // "checkDate":1234455555,
    // "mode":"",
    // "withdrawalCode":"",
    // "appliedDate":12233444444,
    // "appliedAmount":123333
    
    // }​​​​​]
    this.dialog.open(InstallmentDetailsPopupComponent, {
      width: '683px',
      data: {
        rowData: element,
        instalmentArray: Object.assign([],installmentArray)
      }
    });
  }

  openPfWithdrawalForm(flag, element) {
    let rowData = Object.assign({},element)
    if(flag != 'C'){
      console.log('inside if')
      rowData.applyDate = rowData.applyDate?rowData.applyDate : null
    }
    const dialogRef=this.dialog.open(CreatePfWithdrawalFormComponent, {
      width: '683px',
      data: {
        flag: flag,
        rowData: rowData
      }
    });
   dialogRef.afterClosed().subscribe(resp=>{
     this.getWithdrawalList()
   })
  }



  printPDF(element){
    let applyDate = element.applyDate
    this.subscriptionsList.push(
      this.withdrawalServices.getWithdrawalPDF(
        element.inwardNo,
        element.withdrawalCode,
        applyDate,
        element.maxNo
      ).subscribe(
        (data: any)=>{
          let file = new Blob([data],{type: 'application/pdf'});
          let pdfUrl = URL.createObjectURL(file);
          const dialogRef = this.dialog.open(PdfViewerModalComponent);
          dialogRef.componentInstance.pdfUrl = pdfUrl;
          dialogRef.componentInstance.title = 'Withdrawal';
          dialogRef.componentInstance.pdfName = "Withdrawal";

        }
      )
    )
  }

  confirmationDelete(element){
    this.messageService.showConfirmation(
      'Are you sure want to delete?',
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
          this.deleteRow(element);
        }
      }
    );
  }

  deleteRow(element){
    let applyDate = element.applyDate
    let payload = {
      "withdrawalCode": element.withdrawalCode,
      "maxNo": element.maxNo,
      "imMode": "",
      "applyDate": applyDate
    }
    this.subscriptionsList.push(this.withdrawalServices.deleteWithdrawal(payload).subscribe(
      (data: any)=>{
        if (data.responseStatus == 'SUCCESS'){
          this.messageService.showMessage(
            'Deleted Successfully',
            'Success',
            'success-icon',
            'CLOSE'
          );
          this.getWithdrawalList()
        }else {
          let errorMsg =data.systemErrMsg?data.systemErrMsg:''
          this.messageService.showMessage(
            errorMsg,
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      }
    ))
  }

  editRow(element){

  }

}
