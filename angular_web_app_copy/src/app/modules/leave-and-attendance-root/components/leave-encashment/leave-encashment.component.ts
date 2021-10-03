import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LeaveEncashmentService } from './leave-encashment.service';
import { Subscription } from 'rxjs';
import { MessageModalService } from '../../../../components/shared/services/message-modal-service';
@Component({
  selector: 'app-leave-encashment',
  templateUrl: './leave-encashment.component.html',
  styleUrls: ['./leave-encashment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeaveEncashmentComponent implements OnInit {

  breadcrumbJson: any = [
    {
      label: 'Leave and Attendance',
      link: '/leave-and-attendance'
    },
    {
      label: 'Leave Encashment',
      link: '/leave-and-attendance/leaveEncashment'
    }
  ];
  displayedColumns = ['checkbox','leave_type','balance','encashable','encash'];
  saveDisabled=true;
  elementData;
  data=[]
  public subscriptionsList: Subscription[] = [];
  constructor(private LeaveEnch:LeaveEncashmentService,
    private messageModalService: MessageModalService
    ) { }

  ngOnInit(): void {
this.getLeaveEncashSummary();
  }
  SaveButtonLogic(e){
    debugger
    if(e.currentTarget.value){
      this.saveDisabled=false;
    }else{
      this.saveDisabled=true;
    }
  }
  getLeaveEncashSummary() {
    this.subscriptionsList.push(
      this.LeaveEnch.getLeaveSummary().subscribe(
        (data: any) => {
          if (data) {
            this.data=data;
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }
  onMessages(data){
    var msg=data['responseStatus'] == "SUCCESS" ? "Successfully updated" : data['responseStatus'] == "FAILED" ? data['systemErrMsg'] : "Request failed"
    var status=data['responseStatus'] == "SUCCESS" ? "Success" : "Error" ;
    var icon=data['responseStatus'] == "SUCCESS" ? "success-icon" : "warning-icon" ;
    if(icon=="success-icon"){
      this.reset();
    }
    this.messageModalService.showMessage(
      msg,
      status,
      icon,
      'CLOSE',
      
    );
  }
  MessageResponse(d){
    if(d=="NO"){
this.reset();
    }
  }  
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
  showOptions(e,element){
    let index=this.data.indexOf(element);
if(e.checked){
for(var i=0;i<this.data.length;i++){
  if(i!=index){
    this.data[i].checked=false;
    this.data[i].enCash="";
  }

}
if(element.leaveCode=="0008"){
  this.messageModalService.showConfirmation(
    'Special project leave can be encashed once. Are you sure to proceed?',
    'Warning',
    'confirmation-icon',
    this.MessageResponse.bind(this),
  );
}

this.elementData=element;
}else{
  this.elementData={};
   this.data[index].enCash="";
  this.saveDisabled=true
}
  }
  save(){
   var payload= {"leaveCode":this.elementData.leaveCode,
   "leaveText":this.elementData.leaveText,"balance":this.elementData.balance,"enCashableLeave":this.elementData.enCashableLeave,"toBeEncash":this.elementData.enCash.toString(),"errType":"","errMesg":""}
   this.subscriptionsList.push(
    this.LeaveEnch.enCashSave(payload).subscribe(
      (data: any) => {
        this.onMessages(data); 
      },
      (error) => {
        console.log();
      }
    )
  );
   
  }
  reset(){
this.getLeaveEncashSummary();
this.saveDisabled=true;
  this.elementData={};
  }
}
