import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { AvailMobileSimService } from '../../avail-mobile-sim.service';

@Component({
  selector: 'app-confirmation-sim-modal',
  templateUrl: './confirmation-sim-modal.component.html',
  styleUrls: ['./confirmation-sim-modal.component.css']
})
export class ConfirmationSimModalComponent implements OnInit, OnDestroy {
  providersList: any[] = [];
  selected: string = 'JO';
  subscriptionList: Subscription[] = [];
  constructor(private availMobileSimService: AvailMobileSimService, public dialogRef: MatDialogRef<ConfirmationSimModalComponent>, private messageModalService: MessageModalService) { }

  ngOnInit(): void {
    //this.getProviderList();
  }
  getProviderList(): void {
    this.subscriptionList.push(
      this.availMobileSimService.getAvailSim().subscribe((data: any[]) => {
        this.providersList = data;
      })
    );
  }
  submitRequest(): void {
    var fData = { ImServiceProvider: 'JO' };
    let formData = JSON.parse(JSON.stringify(fData));
    this.subscriptionList.push(
      this.availMobileSimService.postApplyRequest(formData).subscribe((data: any) => {
        if (data.responseStatus === "SUCCESS") {
          this.messageModalService.showMessage(
            "The request for avail new SIM has been generated successfuly.",
            "success",
            "success-icon"
          );
          this.dialogRef.close('success');
        } else {
          this.messageModalService.showMessage(
            "The request for avail new SIM could not be processed.",
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
