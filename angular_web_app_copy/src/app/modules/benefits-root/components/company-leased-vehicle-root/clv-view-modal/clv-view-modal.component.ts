import { Component, OnInit } from '@angular/core';
import { BenefitsService } from '../../../services/benefits.service';
import { MatDialogRef } from '../../../../../../../node_modules/@angular/material/dialog';

@Component({
  selector: 'app-clv-view-modal',
  templateUrl: './clv-view-modal.component.html',
  styleUrls: ['./clv-view-modal.component.css']
})
export class ClvViewModalComponent implements OnInit {
  overviewObject:any;
  lookUpData:any;
  covClvData:any;
  isCOV:boolean;
  titelText:string;
  constructor(private benifitService:BenefitsService,
    public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    
    this.viewClvDetails();
  }

  viewClvDetails() {
     this.isCOV = this.overviewObject.vehicleMode === "COV";
     if(this.isCOV){
       this.titelText ="View of Company Owned Vehicle";
     } else{
      this.titelText ="View of Company Leased Vehicle";
     }
    this.benifitService
      .getClvCovDetails(
        this.overviewObject.requestNumberDate.split("/")[1].trim(),
        this.isCOV
      )
      .subscribe(
        data => {
          this.covClvData = data;
          this.covClvData["vehicleType"] = this.overviewObject.vehicleType;
          if (!this.isCOV) {
            this.covClvData.leaseTenureText = this.getLookupText(
              "LEASE_TENURE",
              this.covClvData.leaseTenure
            );
          }
          this.covClvData.colorTypeText = this.getLookupText(
            "COLOR_TYPE",
            this.covClvData.colorType
          );
        },
        error => {
          console.error("CLV: ", error);
        }
      );
  }
  cancelModal(){
    this.dialogRef.close();
  }

  getLookupText(lookupText, code) {
    if (this.lookUpData && this.lookUpData[lookupText]) {
      const result = this.lookUpData[lookupText].filter(
        element => element.key === code
      );
      if (result && result.length > 0) {
        return result[0].value;
      }
    }

    return "";
  }
}
