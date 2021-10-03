import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { AvailMobileSimService } from '../../avail-mobile-sim.service';

@Component({
  selector: 'app-isd-activation-modal',
  templateUrl: './isd-activation-modal.component.html',
  styleUrls: ['./isd-activation-modal.component.css']
})
export class IsdActivationModalComponent implements OnInit, OnDestroy {
  durationList: any[] = [];
  selectedDuration: string = '';
  subscriptionList: Subscription[] =[];
  constructor(public dialogRef: MatDialogRef<IsdActivationModalComponent>, private availMobileSimService: AvailMobileSimService, private messageModalService: MessageModalService) { }

  ngOnInit(): void {
    this.getDurationList();
  }
  getDurationList(): void {
    this.subscriptionList.push(
      this.availMobileSimService.getDropDownList('DUR').subscribe((data: any[]) => {
        if(data.length > 0){
          this.durationList = data;
        }
      })
    ); 
  }
  onSubmit(): void {
    let reqobj = {
    Reqty: '6',
    Type: '',
    Message: '',
    NavISDHdrTOItem: [
      {
        Reqno: '001',
        Reqty: '6',
        Duration: this.selectedDuration
      }
    ]
  }
  this.subscriptionList.push(
    this.availMobileSimService.postIsdIrRequest(reqobj).subscribe((res: any) =>{
      if(res.responseStatus === 'SUCCESS'){
        this.messageModalService.showMessage(
          'Request created successfully',
          "success",
          "success-icon",
          "CLOSE"
        );
        this.dialogRef.close('success')
      }else {
        this.messageModalService.showMessage(
          res.systemErrMsg,
          'Error',
          'warning-icon',
          'CLOSE'
          );
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
