import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SuperCreateDeductionModalComponent } from '../super-create-deduction-modal/super-create-deduction-modal.component';
import { SuperannuationService } from '../superannuation.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent implements OnInit {

  public subscriptionList: Subscription[]=[]
  displayedColumns: string[] = ['fromdate', 'todate', 'deduction'];
  dataSource: any = new MatTableDataSource([])
  constructor(public dialogRef: MatDialogRef<SuperCreateDeductionModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, public activeModal: MatDialog,
    private supperannuationService: SuperannuationService,
    private messageService: MessageModalService) { }

  ngOnInit(): void {
    this.getContribution()
  }
  ngOnDestroy() {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  getValidation() {
    this.subscriptionList.push(
      this.supperannuationService.getValidation().subscribe(
        (data: any) => {
          if(data.messageType == 'E'){
            this.messageService.showMessage(
              data.message,
              'Error',
              'warning-icon',
              'CLOSE'
            );
          }else{
            this.createDeduction(data)
          }
        }
      )
    )
  }
  createDeduction(data) {
    const dialogRef = this.activeModal.open(SuperCreateDeductionModalComponent, {
      width: '683px',
      data: data
    });

    this.subscriptionList.push(dialogRef.afterClosed().subscribe(
      (res)=>{
        this.getContribution()
      }
    ))
  }

  getContribution(){
    this.subscriptionList.push(
      this.supperannuationService.getSuperannuationContribution().subscribe(
        (data: any)=>{
          if(data.length > 0){
          for(let i=0;i<data.length;i++){
            data[i].fromDate= data[i].fromDate?moment(data[i].fromDate).format('DD-MM-YYYY'):''
            data[i].toDate = data[i].toDate?moment(data[i].toDate).format('DD-MM-YYYY'):''
            data[i].deductionAmount = Number(data[i].deductionAmount).toLocaleString('en-US',{minimumFractionDigits:2})
          }
          this.dataSource=new MatTableDataSource<any>(data)
        }else {
          data=[]
          let obj = {
            fromDate: moment().startOf('month').format('DD-MM-YYYY'),
            toDate: '31-12-9999',
            deductionAmount: 0
          }
          data.push(obj)
          this.dataSource=new MatTableDataSource<any>(data)
        }
        }
      )
    )
  }
}
