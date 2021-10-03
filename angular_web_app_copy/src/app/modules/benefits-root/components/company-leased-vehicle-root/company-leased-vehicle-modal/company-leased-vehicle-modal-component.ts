import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { BenefitsService } from '../../../services/benefits.service';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { MatDialogRef } from '../../../../../../../node_modules/@angular/material/dialog';

@Component({
  selector: 'app-company-leased-vehicle-modal-component',
  templateUrl: './company-leased-vehicle-modal-component.html',
  styleUrls: ['./company-leased-vehicle-modal-component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyLeasedVehicleModalComponent implements OnInit {
  addClvForm:FormGroup;
  citySearch: any;
  citySearchFormatter: any;
  lookupData: any;
  isEligible: boolean = true;
  constructor(private benifitService:BenefitsService,
    private messageService:MessageModalService,
    private dialogRef:MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.addCLVForm();
    this.addClvForm.valueChanges.subscribe(value=>{
      console.log(this.addClvForm.status);
    })
  }
  addCLVForm(){
    this.addClvForm = new FormGroup({
      vehicleType: new FormControl("COVC"),
      colorType: new FormControl("", [Validators.required]),
      colorTypeText: new FormControl("", [Validators.required]),
      color: new FormControl("", [Validators.required]),
      make: new FormControl('', [Validators.required]),
      fuelType: new FormControl("", [Validators.required]),
      fuelTypeText: new FormControl("", [Validators.required]),
      model: new FormControl("", [Validators.required]),
      leaseTenure: new FormControl("", [Validators.required]),
      leaseTenureText: new FormControl("", [Validators.required]),
      variant: new FormControl("", [Validators.required]),
      financedAmount: new FormControl("", [Validators.required]),
      engineSize: new FormControl("", [Validators.required]),
      vehicleEmi: new FormControl("", [Validators.required]),
      dealer: new FormControl("", [Validators.required]),
      permissableAmount: new FormControl(""),
      insuranceType: new FormControl("", [Validators.required]),
      insuranceTypeText: new FormControl("", [Validators.required]),
      workCity: new FormControl(""),
      city: new FormControl("", [Validators.required]),
      manufactureYear: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required])
    });

    //get form value from api 
    //this.getAddClvLookup();
    this.setPermissibleAmount(this.lookupData["PERMISSIBLE_AMOUNT"]);
    //this.initialFormValue = this.addClvForm.value;
    this.citySearchFormatter = (result: any) => result.value;
    this.citySearch = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term =>
          term.length < 2 || !this.lookupData
            ? []
            : this.lookupData["WORKING_CITY"].filter(
                v => v.value.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
        )
      );
    }

  setPermissibleAmount(permissibleAmtObj: any) {
    if (permissibleAmtObj && permissibleAmtObj.length > 0) {
      const permissibleAmt = permissibleAmtObj.filter(
        item => item.key === "PRMAMT"
      );
      if (permissibleAmt && permissibleAmt.length > 0) {
        this.addClvForm
          .get("permissableAmount")
          .setValue(Number(permissibleAmt[0].value.trim()));
      }
      const workCityVal = permissibleAmtObj.filter(
        element => element.key === "WORKCITY"
      );
      if (workCityVal && workCityVal.length > 0) {
        this.addClvForm.get("workCity").setValue(workCityVal[0].value);
      }
    }
  }

  setKeyValueControls(
    keyFormControlName: string,
    valueFormControlName: string,
    obj: any
  ) {
    this.addClvForm.get(keyFormControlName).setValue(obj.key);
    this.addClvForm.get(valueFormControlName).setValue(obj.value);
  }
  
  createClicked(){
    let  dtObj= new Date();
    let currentYear =dtObj.getFullYear(); 
    if (
      this.addClvForm.get("vehicleEmi").value >
      this.addClvForm.get("permissableAmount").value
    ) {
      
      this.messageService.showMessage(
        "Vehicle EMI should not be greater than permissible amount",
        "Error",
        "warning-icon",
        "CLOSE"
      );
    }else if(this.addClvForm.get("manufactureYear").value >
    currentYear) {
      this.messageService.showMessage(
        "MFG year can not be greater than current year.",
        "Error",
        "warning-icon",
        "CLOSE"
      );
    } else {
      let payload = JSON.parse(JSON.stringify(this.addClvForm.value));
      payload["status"] = "";
      payload["requestNumber"] = "";
      this.benifitService.submitClvRequest(payload).subscribe(
        (data:any) => {
          console.log(data);
          
          if(data.responseStatus =="SUCCESS"){
            let msgObj=  JSON.parse(data.responseData);
            this.messageService.showMessage(
              msgObj.d.Message,
              "Success",
              "success-icon",
              "CLOSE"
            );
            this.dialogRef.close('success');
          } else{
            this.messageService.showMessage(
              data.responseErrMsg,
              "Error",
              "warning-icon",
              "CLOSE"
            );
          }
          
        },
        error => {}
      );
    }
  }
  onSubmit() {
    console.log("ONSubmit===>",this.addClvForm.value);
  }

  numericOnly(event) {
    let numericVal = this.benifitService.spacevalidation(event);
    if (numericVal) {
      let inputVal = event.target.value.slice(1, -1);
      this.addClvForm.get(event.target.name).patchValue(inputVal);
    } else {
      if(this.benifitService.setNumeric(event.target.value)){
        let inputVal = event.target.value.slice(0, -1);
        this.addClvForm.get(event.target.name).patchValue(inputVal);
      }
    }
  }

  alphabetOnly(event){
    let numericVal = this.benifitService.spacevalidation(event);
    if (numericVal) {
      let inputVal = event.target.value.slice(1, -1);
      this.addClvForm.get(event.target.name).patchValue(inputVal);
    } else {
      if(this.benifitService.setAlphabetOnly(event.target.value,true)){
        let inputVal = event.target.value.slice(0, -1);
        this.addClvForm.get(event.target.name).patchValue(inputVal);
      }
    }
  }

  firstSpaceValidate(event){
    let isNotValid = this.benifitService.spacevalidation(event);
    if (isNotValid) {
      let inputVal = event.target.value.slice(1, -1);
      this.addClvForm.get(event.target.name).patchValue(inputVal);
    }
  }

  alphaNumericOnly(event){
    let alphaNumericVal = this.benifitService.spacevalidation(event);
      if (alphaNumericVal) {
        let inputVal = event.target.value.slice(1, -1);
        this.addClvForm.get(event.target.name).patchValue(inputVal);
      } else {
        if(this.benifitService.setAlphaNumeric(event.target.value,true)){
          let inputVal = event.target.value.slice(0, -1);
          this.addClvForm.get(event.target.name).patchValue(inputVal);
          
        }
      }
  }
  closeModal(){
    this.dialogRef.close();
  }

}
