import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-leave-credited-popup',
  templateUrl: './leave-credited-popup.component.html',
  styleUrls: ['./leave-credited-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeaveCreditedPopupComponent implements OnInit {

  displayedColumns = ['leave_type','from_date','to_date','days'];
  
dataDetails=[];
leaveTypeMain:any;
  constructor(
    public dialogRef: MatDialogRef<LeaveCreditedPopupComponent>,
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
