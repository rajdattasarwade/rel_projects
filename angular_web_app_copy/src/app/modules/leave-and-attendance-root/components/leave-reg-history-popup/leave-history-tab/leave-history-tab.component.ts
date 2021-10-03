import { Component, OnInit, ViewEncapsulation, DefaultIterableDiffer } from '@angular/core';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { LeaveRegHistoryPopupService } from '../leave-reg-history-popup.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { AttendanceCalendarService } from '../../calendar/attendance-calendar.service';
@Component({
  selector: 'app-leave-history-tab',
  templateUrl: './leave-history-tab.component.html',
  styleUrls: ['./leave-history-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeaveHistoryTabComponent implements OnInit {
  public subscriptionsList: Subscription[] = [];
  displayedColumns = ['leave_type','applied_on','from_date','to_date','used','status','app_rej_date','cancel_request','attachment'];

  dataSource=[];
  CancelData:object={}
  

  constructor(
    private messageModalService: MessageModalService,
    private LeaveService: LeaveRegHistoryPopupService,
    private LeaveRoot:AttendanceCalendarService
    
  ) { }

  ngOnInit(): void {
  //this.dataSource=this.dataFormatFun(this.data)
  this.bindData();
  }
  getLeaveHistoryData(year) {
    this.subscriptionsList.push(
      this.LeaveService.getLeaveHistory(year).subscribe(
        (data: any) => {
          if (data) {
            data=this.dataFormatFun(data);
            this.dataSource=data;
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }
  onCalcleLeave(){
    let payload=[];
    let obj={"requestId":this.CancelData["leaveRequestId"],
             "leaveMode":"W",
              "leaveStartDate":this.CancelData["leaveFromDate"],
              "leaveEndDate":this.CancelData["leaveToDate"]};
    payload.push(obj);
    this.subscriptionsList.push(
      this.LeaveService.CancelLeave(payload).subscribe(
        (res: any) => {
          var data=res[0]
         this.onMessages(data);

        },
        (error) => {
          console.log();
        }
      )
    );
  }
  onMessages(data){
    var msg=data['requestStatus'] == "SUCCESS" ? "Request cancelled successfully" : data['requestStatus'] == "FAILED" ? data['systemErrMsg'] : "Request failed"
    var status=data['requestStatus'] == "SUCCESS" ? "Success" : "Error" ;
    var icon=data['requestStatus'] == "SUCCESS" ? "success-icon" : "warning-icon" ;
    this.messageModalService.showMessage(
      msg,
      status,
      icon,
      'CLOSE',
      this.bindData.bind(this),
    );
    if(icon=="success-icon"){
     let fromDate= new Date(this.CancelData["leaveFromDate"]);
     let ToDate= new Date(this.CancelData["leaveToDate"])
     delete this.LeaveRoot.cachedAttDetail[
      String(fromDate.getMonth() + 1) + String(fromDate.getFullYear())
    ];
    this.LeaveRoot.generateCalendar(fromDate, true);
     if(fromDate.getMonth()!=ToDate.getMonth()){
      delete this.LeaveRoot.cachedAttDetail[
        String(ToDate.getMonth() + 1) + String(ToDate.getFullYear())
      ];
      this.LeaveRoot.generateCalendar(ToDate, true);
     }
      
      
      
    }
  }
  bindData(){
    let date=new Date();
    this.getLeaveHistoryData(date.getFullYear());
  } 
dataFormatFun(data){
  var finalarry=[];
  for (const property in data) {
  
  for (var i=0;i<data[property].length;i++){
    data[property][i].leaveFromDateDis=moment(data[property][i].leaveFromDate).format('DD/MM/YYYY');
    data[property][i].applyDate=moment(data[property][i].applyDate).format('DD/MM/YYYY');
    data[property][i].leaveToDateDis=moment(data[property][i].leaveToDate).format('DD/MM/YYYY');
    if(data[property][i].actionDate)
    data[property][i].actionDate=moment(data[property][i].actionDate).format('DD/MM/YYYY');
    
    finalarry.push(data[property][i])
  }
}
console.log(finalarry);
return finalarry
}
  getStatusColor(status) {
    switch (status) {
      case "SENT":
        return "orange";
      case "APPROVED":
        return "green";
      case "REJECTED":
        return "red";
        case "PENDING":
        return "orange";
      default:
        return "";
    }
  }

  cancelRequest(element) {
    this.CancelData=element;
    this.messageModalService.showConfirmation(
      'Do you want to delete your leave request?',
      'Warning',
      'confirmation-icon',
      this.MessageResponse.bind(this),
    );
  }
  MessageResponse(d){
    if(d=="YES"){
this.onCalcleLeave();
    }

  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
  openAttachment(Data){

      this.subscriptionsList.push(
        this.LeaveService.getPDFbyLeave(Data.attachDocId).subscribe(
          (data: any) => {
            window.open(URL.createObjectURL(data));
          },
          (error) => {
            console.log();
          }
        )
      );
   
  }
}
