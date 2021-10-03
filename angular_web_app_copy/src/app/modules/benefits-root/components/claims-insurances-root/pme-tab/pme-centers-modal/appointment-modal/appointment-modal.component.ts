import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { PmeService } from '../../pme.service';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit,OnDestroy {
  public subscriptionsList: Subscription[] = [];
  filteredDates=[]
  appointmentDate: any;
  dateTimeData:any
  timeSlots=[]
  selectedTime:any
  constructor(private pmeService:PmeService,private messageService: MessageModalService,public dialogRef: MatDialogRef<AppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getAppointmentDetails()
   
  }
  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach(element => {
        element.unsubscribe()
      })
    }
  }
  getAppointmentDetails(){
    this.subscriptionsList.push(this.pmeService.getAppointmentDates().subscribe((data:any)=>{
      console.log(data)
      this.dateTimeData=data
      this.filteredDates=Object.keys(data)
      console.log(this.filteredDates)
      for(let i=0;i<this.filteredDates.length;i++){
        this.filteredDates[i]=Number(this.filteredDates[i])
        this.filteredDates[i]=new Date(new Date(this.filteredDates[i]).setHours(0,0,0,0))
        
      }
      
      console.log(this.filteredDates)
   
    }))
  }
  myFilter = (d: Date): boolean => {
 
   return this.filteredDates.findIndex(testDate => new Date(d).toUTCString() == testDate.toUTCString()) >= 0;
    }
   getTimeSlots(){
     console.log(this.appointmentDate.toDate().getTime(),new Date(this.filteredDates[0]).setHours(0,0,0,0))
     for(var key in this.dateTimeData){
       console.log(
        new Date(+key).setHours(0,0,0,0)
       )
       if(this.appointmentDate.toDate().getTime()==new Date(+key).setHours(0,0,0,0)){
         console.log('inside if')
         this.timeSlots=Object.assign([],this.dateTimeData[key])
       }
     }
     console.log(this.timeSlots)
     for(let i=0;i<this.timeSlots.length;i++){
      let milliTime=this.timeSlots[i]
      let time={milliSeconds:milliTime,time:String(new Date(this.timeSlots[i]).getHours()).padStart(2, '0')+':'+ String(new Date(this.timeSlots[i]).getMinutes()).padStart(2, '0')+':'+String(new Date(this.timeSlots[i]).getSeconds()).padStart(2, '0')}
      // this.timeSlots[i]=Object.assign({},this.timeSlots[i])
      //  this.timeSlots[i]=String(new Date(this.timeSlots[i]).getHours()).padStart(2, '0')+':'+ String(new Date(this.timeSlots[i]).getMinutes()).padStart(2, '0')+':'+String(new Date(this.timeSlots[i]).getSeconds()).padStart(2, '0')
      this.timeSlots[i]=time
     }
     console.log(this.timeSlots)
   }
   createAppointment(){
     console.log(this.selectedTime,this.data)
     const body=[
       {
         "apptDate":moment(this.appointmentDate).valueOf(),
         "apptTimeSlot":this.selectedTime,
         "pmeRelation":this.data.pmeFor=='SELF'?0:1
        }
      ]
    
    console.log(body)
    this.subscriptionsList.push(this.pmeService.bookPME(body).subscribe((data:any)=>{
      console.log(data)
      if (data[0].requestStatus == 'FAILED') {
        this.messageService.showMessage(
          data[0].requestErrMsg,
          'Error',
          'warning-icon',
          'CLOSE'
        );
      } else {
        this.messageService.showMessage(
          data[0].requestErrMsg,
          'Success',
          'success-icon',
          'CLOSE'
        );
        this.dialogRef.close('success');
      }
    }))
   }
   cancel(){
     this.dialogRef.close()
   }
  }

