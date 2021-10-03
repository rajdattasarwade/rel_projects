import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PfPensionService } from '../../pf-pension.service';

@Component({
  selector: 'app-pf-transfer-state-popup',
  templateUrl: './pf-transfer-state-popup.component.html',
  styleUrls: ['./pf-transfer-state-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PfTransferStatePopupComponent implements OnInit {

  public subscriptionsList: Subscription[] = [];
  public stateList: any=[];
  public stateCode: any='';
  public regionCode: any='';
  public regionList:any=[];
  constructor(
    public dialogRef: MatDialogRef<PfTransferStatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pfPensionService: PfPensionService
  ) { }

  ngOnInit(): void {
    this.stateCode = this.data.stateCode
    this.regionCode = this.data.regionCode
    this.getStateList()
    if(this.stateCode && this.regionCode){
      this.getRegionList()
    }
  }

  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }

  getStateList(){
    this.stateList = []
    this.subscriptionsList.push(
      this.pfPensionService.getStateList().subscribe(
          (data: any) => {
            if(data.length>0){
              this.stateList = data.filter(v => v.stateCode)
            }
          }
        ))
  }

  getRegionList(){
    this.regionList = []
    this.subscriptionsList.push(
      this.pfPensionService.getRegionList(this.stateCode).subscribe(
          (data: any) => {
            if(data.length>0){
              this.regionList = data.filter(v => v.regionCode)
            }
          }
        ))
  }

  saveCodes(){
    let obj = {
      stateCode: this.stateCode,
      regionCode: this.regionCode,
      flag: this.data.flag
    }
    this.dialogRef.close(obj)
  }


  closeModal() {
    this.dialogRef.close(false);
  }

}
