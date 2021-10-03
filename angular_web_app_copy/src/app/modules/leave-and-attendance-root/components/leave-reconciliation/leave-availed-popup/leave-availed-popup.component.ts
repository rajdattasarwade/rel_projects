import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-leave-availed-popup',
  templateUrl: './leave-availed-popup.component.html',
  styleUrls: ['./leave-availed-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeaveAvailedPopupComponent implements OnInit {

  displayedColumns = ['leave_type','from_date','days'];
  dataDetails=[]
  leaveTypeMain:any;
  constructor(
    public dialogRef: MatDialogRef<LeaveAvailedPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.dataDetails=this.dataFormatFun(this.data)
    this.leaveTypeMain=this.data[0].leaveText;
    //this.leaveTypeMain="text"
  }
  dataFormatFun(data){
    debugger
     for (var i=0;i<data.length;i++){
       data[i].fromDate=moment(data[i].fromDate).format('DD/MM/YYYY');
       data[i].toDate=moment(data[i].toDate).format('DD/MM/YYYY');
       }
       return data
 }
  closeModal() {
    this.dialogRef.close();
  }

}
