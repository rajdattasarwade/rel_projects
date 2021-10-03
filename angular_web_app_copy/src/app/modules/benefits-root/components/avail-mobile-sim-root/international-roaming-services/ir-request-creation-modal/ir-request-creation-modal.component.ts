import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { AvailMobileSimService } from '../../avail-mobile-sim.service';

@Component({
  selector: 'app-ir-request-creation-modal',
  templateUrl: './ir-request-creation-modal.component.html',
  styleUrls: ['./ir-request-creation-modal.component.css'],
  providers: [DatePipe]
})
export class IrRequestCreationModalComponent implements OnInit, OnDestroy {
  value = 'IR REQUEST 1';
  irForm: FormGroup; //its a form group
  irFormArray: FormArray;
  countryList: any[] = [];
  minDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  subscriptionList: Subscription[] = [];
  constructor(public dialogRef: MatDialogRef<IrRequestCreationModalComponent>, private availMobileSimService: AvailMobileSimService, private messageModalService: MessageModalService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.irFormArray = new FormArray([]);
    this.minDate = new Date();
    this.endMinDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate() + 1);
    this.addForm();
    this.getCountryList();
  }
  getCountryList(): void {
    this.subscriptionList.push(
      this.availMobileSimService.getDropDownList('CON').subscribe((data: any[]) => {
        if(data.length > 0){
          this.countryList = data;
        }
      })
    );
  }
  addForm(): void {
    this.irFormArray.push(this.createForm());
  }
  createForm(): FormGroup {
    this.irForm = new FormGroup({
      startDate: new FormControl('' , Validators.required),
      endDate: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      remark: new FormControl('', )
    });
    return this.irForm;
  }
  deleteForm(index: number): void {
    this.irFormArray.removeAt(index);
  }
  onDateSelect(event: MatDatepickerInputEvent<Date>, type: string): void {
    let date = new Date(event.value);    
     if(type === 'endDate') {
      this.startMaxDate = new Date(date.getFullYear(),date.getMonth(), date.getDate() - 1);
    }else if(type === 'startDate'){
      this.endMinDate = new Date(date.getFullYear(),date.getMonth(), date.getDate() + 1);
    }
  }
  onSubmit(): void {
    let itemList = [];
    for (let [index, irObj] of this.irFormArray.value.entries()) { 
      let obj = {
        Reqty: '5',
        Reqno: "00",
        Startdt: this.getDate(irObj.startDate),
        Enddt: this.getDate(irObj.endDate),
        Country: irObj.country
      }
      itemList.push(obj);
    }
    let reqObj =  {  
      Reqty: '5',
      NavISDHdrTOItem: itemList
  }
  this.subscriptionList.push(
    this.availMobileSimService.postIsdIrRequest(reqObj).subscribe((data: any) => {
      if(data.responseStatus === 'SUCCESS'){
        this.messageModalService.showMessage(
          'Request created successfully',
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
        );
      }
    }, error => {
      this.messageModalService.showMessage(
        "Sorry for the inconvenience.Please try again.",
        'Error',
        'warning-icon',
        'CLOSE'
      );
    })
  );
  }
  getDate(date): string {
    let dt = new Date(date);
    return `${this.datePipe.transform(dt, 'yyyy-MM-dd')}T00:00:00`;
  }
  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0){
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      })
    }
  }
}
