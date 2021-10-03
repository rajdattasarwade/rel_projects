import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BenefitsService } from 'src/app/modules/benefits-root/services/benefits.service';
import { ReimbursementsService } from 'src/app/modules/reimbursements-root/services/reimbursements.service';
import * as moment from 'moment';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';

@Component({
  selector: 'app-team-building-advance',
  templateUrl: './team-building-advance.component.html',
  styleUrls: ['./team-building-advance.component.css']
})
export class TeamBuildingAdvanceComponent implements OnInit {

  @Input() advanceType: any;
  public teamBuilding: FormGroup;
  recoveryMonth: any = [];
  subscriptionList: Subscription[] = [];
  @Output() teamBuildValid = new EventEmitter<Object>();
  @Input() dataObj: any;
  @Input() flag: any;
  eventDate: any;
  dateValid: Boolean = true;
  constructor(public benefitService:BenefitsService,private reimbursmentService: ReimbursementsService,public dialog: MatDialog,private messageService: MessageModalService) { }

  ngOnInit(): void {
    if(this.flag == "edit" || this.flag == "view"){

      this.editFormSet(this.dataObj);
    }else{
    this.initForm();
    }
    this.getRecoveryMonth();
  }

  initForm(){
    this.teamBuilding = new FormGroup({
      advanceType: new FormControl(this.advanceType),
      numberOfMembers: new FormControl('', [Validators.required]),
      requestedAmount: new FormControl('', [Validators.required]),
      eventDate: new FormControl(Date, [Validators.required]),
      recoveryMonth: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.maxLength(40)]),
      sequenceNumber: new FormControl(''),
    });
    return this.teamBuilding;
  }

  getRecoveryMonth(){
    let sub = this.benefitService
      .getRecoveryMonth()
      .subscribe(
        (data: any) => {
         this.recoveryMonth = data;
        },
        (err) => {
          console.log(err);
        }
      );

      this.subscriptionList.push(sub);
  }

  numericOnly(event){
    let numericVal = this.reimbursmentService.spacevalidation(event);
    if (numericVal) {
      let inputVal = event.target.value.slice(1, -1);
      this.teamBuilding.get('requestedAmount').patchValue(inputVal);
    } else {
      if (this.reimbursmentService.setNumeric(event.target.value)) {
        let inputVal = event.target.value.slice(0, -1);
        this.teamBuilding.get('requestedAmount').patchValue(inputVal);
      }
    }
    this.passTeambuildData(this.teamBuilding.value,event);
  }

  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0){
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      });
    }
  }

  passTeambuildData(data,event){
    let dateObj = event.value && event.value._isAMomentObject ? event.value._isAMomentObject : false;
    if(dateObj){
      let checkDate = moment(new Date()).add('month', 1).endOf("month");
     let selectedValue = moment(event.value);
      if (checkDate.isBefore(selectedValue)) {
        this.messageService.showMessage(
          'Select Date from Current or Next Month',
          'Error',
          'warning-icon',
          'CLOSE'
        );
        this.dateValid = false;
      }else{
        this.dateValid = true;
      } 
    }
    
    if(this.teamBuilding.valid && this.dateValid){
      this.teamBuildValid.emit(data);
    }else{
      this.teamBuildValid.emit(null);
    }
  }
  
  editFormSet(result){
   
    this.teamBuilding = new FormGroup({
      advanceType: new FormControl(result.advanceCode),
      numberOfMembers: new FormControl({value : result.noOfMembers, disabled : this.flag == "view"}, [Validators.required]),
      requestedAmount: new FormControl({value : result.requestedAmount, disabled : this.flag == "view"}, [Validators.required]),
      eventDate: new FormControl({value : new Date(result.eventDate),disabled : this.flag == "view"}, [Validators.required]),
      recoveryMonth: new FormControl({value : result.recoveryMonth, disabled : this.flag == "view"}, [Validators.required]),
      remarks: new FormControl({value : result.remarks, disabled : this.flag == "view"}, [Validators.maxLength(40)]),
      sequenceNumber: new FormControl(result.sequenceNumber),
    });
    this.passTeambuildData(this.teamBuilding.value,false);
  }

   monthCheck(group: FormGroup) {
     
  }

}
