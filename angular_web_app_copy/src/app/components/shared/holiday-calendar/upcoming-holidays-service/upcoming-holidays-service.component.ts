import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UpcomingHolidayService } from '../upcoming-holiday.service';
import { Router } from '@angular/router';
import { forkJoin,Subscription } from 'rxjs';
import * as moment from 'moment';
import {
  NHEligibility
} from '../../../../modules/leave-and-attendance-root/components/calendar/attendance-det.model';


@Component({
  selector: 'app-upcoming-holidays-service',
  templateUrl: './upcoming-holidays-service.component.html',
  styleUrls: ['./upcoming-holidays-service.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class UpcomingHolidaysServiceComponent implements OnInit, OnDestroy  {
  
  breadcrumbJson: any = [
    {
      label: 'Leave and Attendance',
      link: '/leave-and-attendance'
    },
    {
      label: 'Holiday Calendar',
      link: '/leave-and-attendance/'
    }
  ];
  holidayList: any = []
  prevHolidayList:any=[]
  monthList: any = []
  renderingFlag: boolean = true
  scrollToBottomFlag:boolean=false
  NHElegibility:boolean=false;
  subscriptionsList: Subscription[] = [];
  legendvis:boolean = false;
  oph:boolean = false;
 constructor(private router: Router, private holidayService:UpcomingHolidayService) { }

  ngOnInit(): void {
    this.getData()
    // this.getNationalEligibility();
    this.NHElegibility = NHEligibility.isEligible;
  }
  getData() {
  // api integration ****************************************************************************************
    let currentYear = new Date().getFullYear();
    let prevYear = new Date().getFullYear() - 1;
    this.subscriptionsList.push(forkJoin([this.holidayService.getHolidayList(prevYear), this.holidayService.getHolidayList(currentYear)]).subscribe((data) => {
      this.prevHolidayList = data[0];
      this.holidayList = data[1];
      for (let item of this.holidayList) {
        this.prevHolidayList.push(item)
      }
      this.holidayService.sortByKey(this.prevHolidayList,'holidayStartDate')
      this.monthGroups()
    }))
  // api integration ****************************************************************************************
    
  }
  getNationalEligibility(){
    this.subscriptionsList.push(this.holidayService.getNationalHolidayElig().subscribe((data) => {
      this.NHElegibility=data['isEligible'];
    }))
  }

  //to group holidays according to month
  monthGroups() {
    let ophcount = 0;
    for (let item of this.prevHolidayList) {
      item.month = new Date(item.holidayStartDate).toLocaleString('default', { month: 'long' })
      item.year= new Date(item.holidayStartDate).getFullYear() 
      if(item.holidayType=='OPH')
      ophcount++;
    }
    console.log(ophcount,"OPH")
    this.oph=ophcount==0?false:true
    if(NHEligibility.isEligible==false && ophcount==0){
      this.legendvis=false 
    }else{
    this.legendvis=true
    }
    var resArr1 = [];
    this.prevHolidayList.forEach(function(item){
      var i = resArr1.findIndex(x =>x.month==item.month && x.year==item.year);
      if(i <= -1){
        resArr1.push({ month: item.month,year:item.year });
      }
    });
    this.monthList = resArr1
    console.log(this.monthList)
  }

  //to check current month on screen
  ngAfterViewChecked() {
    this.scrollToBottomFlag=false
    if (this.renderingFlag) {
        for (let i = new Date().getMonth(); i < 12; i++){
          let nextHoliday = document.getElementById(moment.months(i) + new Date().getFullYear());
          if (nextHoliday) {
            this.gotoPosition(nextHoliday)
            break;
          }
          else {
            if (i == 11) {
              this.scrollToBottomFlag=true
            }
          }
      }
      if (this.scrollToBottomFlag) {
        for (let i = new Date().getMonth(); i >=0; i--){
          let nextHoliday = document.getElementById(moment.months(i) + new Date().getFullYear());
          if (nextHoliday) {
            this.gotoPosition(nextHoliday)
            break;
          }
      }
      }
    }
  }

// to scroll to particular position
  gotoPosition(element) {
    this.renderingFlag=false
    element.scrollIntoView(true)
  }

  upcomingWidgetHome(){
    this.router.navigate(['leave-and-attendance']);
  }

  ngOnDestroy(){
    if(this.subscriptionsList.length > 0) this.subscriptionsList.forEach(subscription => { subscription.unsubscribe() })
  }

}
