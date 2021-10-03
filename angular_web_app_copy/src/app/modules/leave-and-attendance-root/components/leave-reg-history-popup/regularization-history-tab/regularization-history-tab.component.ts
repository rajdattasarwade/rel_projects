import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { LeaveRegHistoryPopupService } from '../leave-reg-history-popup.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { AttendanceCalendarService } from '../../calendar/attendance-calendar.service';
@Component({
  selector: 'app-regularization-history-tab',
  templateUrl: './regularization-history-tab.component.html',
  styleUrls: ['./regularization-history-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegularizationHistoryTabComponent implements OnInit {
  public subscriptionsList: Subscription[] = [];
  displayedColumns:any = ['reg_date','applied_date','reg_in','reg_out','reg_hours','status','app_rej_date','cancel_request'];
  CancelData:object={};
  dataSource=[];
  constructor(
    private messageModalService: MessageModalService,
    private LeaveService: LeaveRegHistoryPopupService,
    private LeaveRoot:AttendanceCalendarService
  ) { }

  ngOnInit(): void {
    //this.dataSource=this.dataFormatFun(this.data);
    this.bindData();
  }
  bindData(){
    this.getRegHistoryData();
  } 
  getRegHistoryData() {
    this.subscriptionsList.push(
      this.LeaveService.getRegHistory().subscribe(
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
  onCalcleReg(){
    let payload=this.CancelData["counter"];
    this.subscriptionsList.push(
      this.LeaveService.CancelReg(payload).subscribe(
        (res: any) => {
          var data=res
         this.onMessages(data);

        },
        (error) => {
          console.log();
        }
      )
    );
  }
  onMessages(data){
    var msg=data['responseStatus'] == "SUCCESS" ? "Request cancelled successfully" : data['responseStatus'] == "FAILED" ? data['responseErrMsg'] : "Request failed"
    var status=data['responseStatus'] == "SUCCESS" ? "Success" : "Error" ;
    var icon=data['responseStatus'] == "SUCCESS" ? "success-icon" : "warning-icon" ;
    this.messageModalService.showMessage(
      msg,
      status,
      icon,
      'CLOSE',
      this.bindData.bind(this),
    );
    if(icon=="success-icon"){
      let fromDate=this.DateReformat(this.CancelData['workDate'])
      delete this.LeaveRoot.cachedAttDetail[
        String(fromDate.getMonth() + 1) + String(fromDate.getFullYear())
      ];
      this.LeaveRoot.generateCalendar(fromDate, true);
      
    }
  }
  DateReformat(string){
var Dateobj=new Date();
Dateobj.setDate(string.split("/")[0])
Dateobj.setMonth(parseInt(string.split("/")[1])-1)
Dateobj.setFullYear(string.split("/")[2])
return Dateobj;
  }
  dataFormatFun(data){
    for (var i=0;i<data.length;i++){
      data[i].workDate=moment(data[i].workDate).format('DD/MM/YYYY');
      if(data[i].approvedRejectedDate)
      data[i].approvedRejectedDate=moment(data[i].approvedRejectedDate).format('DD/MM/YYYY');
      if(data[i].appliedDate)
      data[i].appliedDate=moment(data[i].appliedDate).format('DD/MM/YYYY');
      else
      data[i].appliedDate="-"
      data[i].regIn=this.LeaveService.formatInTime(data[i].regIn)
      data[i].regOut=this.LeaveService.formatInTime(data[i].regOut)
    }
    console.log(data);
    return data;
  }
 getStatusColor(status) {
    switch (status) {
      case "Pending with Manager":
        return "orange";
      case "Approved":
        return "green";
      case "Cancellation approved":
        return "red";
        case "Rejected":
        return "red";
      default:
        return "";
    }
  }

  cancelRequest(element) {
    this.CancelData=element;
    this.messageModalService.showConfirmation(
      'Do you want to delete your regularization request?',
      'Warning',
      'confirmation-icon',
      this.MessageResponse.bind(this),
    );
  }
  MessageResponse(d){
    if(d=="YES"){
this.onCalcleReg();
    }
  }  
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }

}
