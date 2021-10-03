import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { AvailMobileSimService } from '../../avail-mobile-sim.service';

@Component({
  selector: 'app-mobile-number-portability',
  templateUrl: './mobile-number-portability.component.html',
  styleUrls: ['./mobile-number-portability.component.css']
})
export class MobileNumberPortabilityComponent implements OnInit, OnDestroy {
  stateList: any[] = [];
  mnpTransferForm: FormGroup;
  serialNo: string;
  subscriptionList: Subscription[] = [];
  constructor(private availMobileSimService: AvailMobileSimService, private messageModalService: MessageModalService, public dialogRef: MatDialogRef<MobileNumberPortabilityComponent>) { }

  ngOnInit(): void {
    this.createForm();
    this.getStateList()
  }
  createForm(): void {
    this.mnpTransferForm = new FormGroup({
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      reason: new FormControl('', Validators.required)
    });
  }

  getStateList(): void {
    this.subscriptionList.push(
      this.availMobileSimService.getMnpCircleList().subscribe((data: any[]) => {
        if(data.length > 0){
         this.stateList = data;
        }
       })
    );
  }
  onSubmit(): void {
    let reqObj = {
      ImAction: "T",
      ImReason: this.mnpTransferForm.controls.reason.value,
      ImSimRefNo: "",
      ImSrno: this.serialNo,
      ImMnpFrm: this.mnpTransferForm.controls.to.value,
      ImMnpTo: this.mnpTransferForm.controls.from.value
    }
    this.subscriptionList.push(
      this.availMobileSimService.submitMnpTransfer(JSON.parse(JSON.stringify(reqObj)), this.serialNo).subscribe((data: any) => {
        if(data){
         this.messageModalService.showMessage(
           "All changes made by you have been successfully saved.",
           "success",
           "success-icon",
           "CLOSE"
         );
         this.dialogRef.close('success');
        } 
       },
       error => {
   
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
