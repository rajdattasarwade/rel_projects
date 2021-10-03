import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TimeReportSelfService } from '../time-report-self.service';
import { Subscription } from 'rxjs';
// import * as moment from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import * as _moment from 'moment';
import { Moment} from 'moment';
const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const ELEMENT_DATA: any = [];

@Component({
  selector: 'app-coff-availed',
  templateUrl: './coff-availed.component.html',
  styleUrls: ['./coff-availed.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CoffAvailedComponent implements OnInit {
  public subscriptionsList: Subscription[] = [];
  public Month:string;
  public Year:number;
  public CurrentDate;
  disableNextBtn: boolean = true;
  today = new Date();
  sixMonthsAgo = new Date();
  currdate: any;
  displayedColumns: string[] = ['coffDate', 'noOfDays', 'validUpto', 'daysUsed', 'availedFrom', 'availedTo','nocoffAvailed', 'coffEncashed', 'noOfCoffEncashed' ];
  //dataSource =this.dateFormatter(ELEMENT_DATA) ;
dataSource=[];
  constructor(
    private attendanceCoff: TimeReportSelfService,
  ) {}

  ngOnInit(): void {
    this.CurrentDate=new Date();
    this.currdate = new FormControl(moment(this.CurrentDate));
this.Month=this.CurrentDate.toLocaleString('default', { month: 'long' })
this.Year=this.CurrentDate.getUTCFullYear();
this.getCOFFDetailsApi(this.CurrentDate.getMonth()+1,this.Year)
  }
  onprevsMonth(){
    if(this.CurrentDate.getMonth()==0){
      this.CurrentDate.setFullYear(this.CurrentDate.getFullYear()-1)
      this.CurrentDate.setMonth(11)
    }else{
      this.CurrentDate.setMonth(this.CurrentDate.getMonth()-1)
    }
    this.Month=this.CurrentDate.toLocaleString('default', { month: 'long' })
    this.Year=this.CurrentDate.getUTCFullYear();
    this.getCOFFDetailsApi(this.CurrentDate.getMonth()+1,this.Year)
    let currentDate=new Date();
    currentDate.setHours(0);
    this.CurrentDate.setHours(0);
    if(this.CurrentDate.getTime()!=currentDate.getTime()){
    this.disableNextBtn=false;
    }else{
      this.disableNextBtn=true;
    }
    this.currdate = new FormControl(moment(this.CurrentDate));
  }
  onnextMonth(){
    if(this.CurrentDate.getMonth()==11){
      this.CurrentDate.setFullYear(this.CurrentDate.getFullYear()+1)
      this.CurrentDate.setMonth(0)
    }else{
      this.CurrentDate.setMonth(this.CurrentDate.getMonth()+1)
    }
    this.Month=this.CurrentDate.toLocaleString('default', { month: 'long' })
    this.Year=this.CurrentDate.getUTCFullYear();
    let currentDate=new Date();
    currentDate.setHours(0,0,0,0);
    this.CurrentDate.setHours(0,0,0,0);
    if(this.CurrentDate.getTime()!=currentDate.getTime()){
    this.disableNextBtn=false;
    }else{
      this.disableNextBtn=true;
    }
    this.currdate = new FormControl(moment(this.CurrentDate));
    this.getCOFFDetailsApi(this.CurrentDate.getMonth()+1,this.Year)
  }
  getCOFFDetailsApi(month, year) {
    this.subscriptionsList.push(
      this.attendanceCoff.getCoffDetails(month, year).subscribe(
        (data: any) => {
          if (data) {
            data=this.dateFormatter(data);
            //this.coffData = data; // store API response of attendance detail model
            // fill calendar dynamically with data to show
            this.dataSource=data;
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }
  dateFormatter(dataArry){
    dataArry.map((data) => {
      if(data.availedFromDate)
data.availedFromDate=moment(data.availedFromDate).format('DD/MM/YYYY')
if(data.validUptoDate)
data.validUptoDate=moment(data.validUptoDate).format('DD/MM/YYYY')
if(data.compOffDate)
data.compOffDate=moment(data.compOffDate).format('DD/MM/YYYY')
if(data.availedToDate)
data.availedToDate=moment(data.availedToDate).format('DD/MM/YYYY')
if(data.compOffEncashedDate)
data.compOffEncashedDate=moment(data.compOffEncashedDate).format('DD/MM/YYYY')
    })
    return dataArry

  }
  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    debugger
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    debugger
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.Month=ctrlValue._d.toLocaleString('default', { month: 'long' })
    this.Year=ctrlValue._d.getUTCFullYear();
    // this.getCOFFStausApi(ctrlValue._d.getMonth()+1,this.Year)
    this.getCOFFDetailsApi(ctrlValue._d.getMonth()+1,this.Year)
    let currentDate=new Date();
    currentDate.setHours(0,0,0,0);
    ctrlValue._d.setHours(0,0,0,0);
    if(ctrlValue._d.getTime()!=currentDate.getTime()){
    this.disableNextBtn=false;
    }else{
      this.disableNextBtn=true;
    }
    this.currdate = new FormControl(moment(ctrlValue._d));
    this.CurrentDate = ctrlValue._d;
  }



  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
