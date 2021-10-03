import { Component, OnInit } from '@angular/core';
import { NationalHolidayService } from '../national-holiday.service';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-national-holiday',
  templateUrl: './national-holiday.component.html',
  styleUrls: ['./national-holiday.component.css']
})
export class NationalHolidayComponent implements OnInit {

  breadcrumbJson: any = [
    {
      label: 'Leave and Attendance',
      link: '/leave-and-attendance'
    },
    {
      label: 'National Holidays',
      link: '/leave-and-attendance/nationalHolidays'
    }
  ];
  data=[]
  blance:any;
  applyFlg:boolean=true;
  SelectedLeaves:any=[];
  public subscriptionsList: Subscription[] = [];
  constructor(private nationalService:NationalHolidayService,
    private messageDialog:MessageModalService) { }
  displayedColumns: string[] = ['ophRHList', 'date', 'day', 'selection'];
  ngOnInit(): void {
    //this.data = this.dataFormatFun(this.data);
    this.getNationalService(new Date().getUTCFullYear())
    this.SelectedLeaves=[];
  }
  getNationalService(year){
    this.subscriptionsList.push(
      this.nationalService.getNationalHolidaySummary(year).subscribe(
        (data: any) => {
          if (data) {
            this.data=this.dataFormatFun(data);
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }
  showOptions(e,element){
    let index=this.data.indexOf(element);
if(e.checked){

if(this.blance==0){
    this.messageDialog.showMessage(
      "You are not allowed to select more than four holidays",
      "Error",
      "warning-icon",
      'CLOSE',
      
    );
  e.source._checked=false
  this.data[index].selectFlag=false;
}else{
  this.blance=this.blance-1
  this.SelectedLeaves.push(element);
}
}else{
  let indexSel=this.SelectedLeaves.indexOf(element);
  this.SelectedLeaves.splice(indexSel);
  this.blance=this.blance+1;
}

this.caluclatedChecks()==0?this.applyFlg=true:this.applyFlg=false;
}
caluclatedChecks(){
  var cnt=0;
for(var i=0;i<this.data.length;i++){
if(this.data[i].selectFlag && this.data[i].readOnlyFlag==false){
cnt++
}
}
return cnt;
}

  dataFormatFun(data){
    let cnt=0
     for (var i=0;i<data.length;i++){
       data[i].holidayDate1=moment(data[i].holidayDate).format('DD/MM/YYYY');
       if(data[i].selectFlag){
        cnt++
       }
       }
       this.blance=4-cnt;
       return data
 }
  
onSaveHoliday(){
  var payload=
    {
      "date":"",
      "saveSet":[],
          
      "messageSet":[]
  }
  
  for(var i=0;i<this.SelectedLeaves.length;i++){
    let obj={};
    obj['imUser']=""
    obj['imYear']=""
    obj['holidayDate']=this.SelectedLeaves[i].holidayDate
    obj['holidayDay']=this.SelectedLeaves[i].holidayDay
    obj['readOnlyFlag']=this.SelectedLeaves[i].readOnlyFlag
    obj['holidayDesc']=this.SelectedLeaves[i].holidayDesc
    obj['selectFlag']=true;
    
    payload.saveSet.push(obj)
  }
  this.subscriptionsList.push(
    this.nationalService.onSaveHoliday(payload).subscribe(
      (data: any) => {
        this.onMessages(data)
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
    this.getNationalService(new Date().getUTCFullYear())
    this.SelectedLeaves=[];
    this.applyFlg=true; 
  }
  this.messageDialog.showMessage(
    msg,
    status,
    icon,
    'CLOSE',
    
  );
}

}
