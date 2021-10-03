import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { AvailMobileSimService } from '../../avail-mobile-sim.service';

@Component({
  selector: 'app-discontinue-sim-modal',
  templateUrl: './discontinue-sim-modal.component.html',
  styleUrls: ['./discontinue-sim-modal.component.css']
})
export class DiscontinueSimModalComponent implements OnInit, OnDestroy {
  serialNo: string;
  reasonsList:any[] = [];
  selectedReason: string = '';
  type: string = 'L';
  subscriptionList: Subscription[] = [];
  constructor(private availMobileSimService: AvailMobileSimService, public dialogRef: MatDialogRef<DiscontinueSimModalComponent>, private messageModalService: MessageModalService) { }

  ngOnInit(): void {
    this.getReasonsList();
  }
  getReasonsList(): void {
    this.subscriptionList.push(
      this.availMobileSimService.getReasonsList(this.type).subscribe((data: any[]) => {
        if(data.length > 0){
          this.reasonsList = data;
        }
      },
      error => {
  
      })
    ); 
  }
  onSubmit(): void {
    var fData = {
      ImAction: this.type,
      ImReason: this.selectedReason,
      ImSrno: this.serialNo
    };
    let formData = JSON.parse(JSON.stringify(fData));
    this.subscriptionList.push(
      this.availMobileSimService.putDiscontinueRequest(this.serialNo, formData).subscribe((data: any) => {
        if(data.responseStatus == 'SUCCESS'){
          let msg = '';
          if(this.type === 'S') {
            msg = 'Your SIM surrender request has been registered.';
          } else if(this.type === 'R'){
            msg = 'Your SIM retention request has been captured. Please print the NOC form & submit to the desired service provider.';
          }else {
            msg = 'Your request for Duplicate SIM has been registered.';
          }
          this.messageModalService.showMessage(
            msg,
            "success",
            "success-icon",
            "CLOSE"
          );
          this.dialogRef.close('success');
        }else{
          this.messageModalService.showMessage(
            data.systemErrMsg,
            'Error',
            'warning-icon',
            'CLOSE'
          )
        }
      }, error => {
        this.messageModalService.showMessage(
          'Sorry for the inconvenience.Please try again.',
          'Error',
          'warning-icon',
          'CLOSE'
        );
      })
    );
  }
  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0){
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      })
    }
  }
}
