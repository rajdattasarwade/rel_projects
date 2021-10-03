import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/components/core/config/config';
import { UserService } from 'src/app/components/core/services/user.service';
import { PeopleService } from '../../services/people.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-my-reportees',
  templateUrl: './my-reportees.component.html',
  styleUrls: ['./my-reportees.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MyReporteesComponent implements OnInit, OnDestroy {
  peopleData = { 
    'empName': '', 
    'desgn': '',
    'picUrl': '',
    'Location': '',
    'Telephone Number': '',
    'Email ID': '', 
    'L1 Name': "",
    "Mobile": '', 
    "Birthday": ''
  };   
  myReportees: any = []
  employeeData: any = []
  userData:any=[]
  subscriptionsList: Subscription[] = [];
  selectedIndex: any;
  constructor(private peopleService: PeopleService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private titlecasePipe:TitleCasePipe) { }

  ngOnInit(): void {
    this.getUserProfile()
    this.getReportees()
  }
  refresh() {
    this.selectedIndex=null
    this.getUserProfile()
    this.getReportees()
  }
  getUserProfile() {
    if (this.peopleService.userData) {
      this.userData = this.peopleService.userData
      this.setData()
    }
    else {
      this.callAPI()
    }
   
  }
  callAPI() {
    this.subscriptionsList.push(this.userService.getUserDetails().subscribe((response => {
      this.userData = response
      this.peopleService.cacheLogData(this.userData)
      this.setData()
    })))
  }
  setData() {
    if(this.userData) {
      this.getEmpDetails(this.userData.employeeId)
    }
  }
  getReportees() {
    if (this.peopleService.cacheReporteesObj) {
      this.myReportees = this.peopleService.cacheReporteesObj
      this.setReporteeData()
    }
    else (
      this.callReporteeApi()
    )
  
  }
  callReporteeApi() {
    this.subscriptionsList.push(this.peopleService.getReportees().subscribe(((response:any) => {
      this.myReportees = response
      this.peopleService.cacheReportees(this.myReportees)
      this.setReporteeData()
    })))
  }
  setReporteeData() {
    for (let element of this.myReportees) {
      if (element.picUrl!="" && element.picUrl!=null) {
        element.picurl = this.sanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + element.picUrl)
      }
    }
  }
  setRow(index) {
    this.selectedIndex=index
  }
  getEmpDetails(userId) {
    let id = 'P' + userId
    this.employeeData = []
    this.subscriptionsList.push(this.peopleService.getSelfReportees(id).subscribe((response: any) => {
      if (response.MANAGER) {
        this.employeeData = response.MANAGER[0]
        this.peopleData['empName'] =  this.titlecasePipe.transform(this.employeeData.name)
        this.peopleData['desgn']=this.titlecasePipe.transform(this.employeeData.desination)
        this.peopleData['picUrl']=this.employeeData.picURL
        this.peopleData['Location']=this.titlecasePipe.transform(this.employeeData.workLocation)
        this.peopleData['Telephone Number']=this.employeeData.residenceNo
        this.peopleData['Email ID']=this.employeeData.relianceEmail.toLowerCase()
        this.peopleData['L1 Name']=this.titlecasePipe.transform(this.employeeData.managerName)
        this.peopleData['Mobile']=this.employeeData.mobileNo
        this.peopleData['Birthday'] = moment(this.employeeData.dateOfBirth, "YYYY-MM-DD").format("DD,MMMM")
        this.peopleData = Object.assign({}, this.peopleData);
      }
      else {
        this.emptyInfo()
      }
    }))
  }
  emptyInfo() {
    this.peopleData['empName'] = ''  
    this.peopleData['desgn']=''
    this.peopleData['picUrl']=''
    this.peopleData['Location']=''
    this.peopleData['Telephone Number']=''
    this.peopleData['Email ID']=''
    this.peopleData['L1 Name']=''
    this.peopleData['Mobile']=''
    this.peopleData['Birthday'] = ''
    this.peopleData = Object.assign({}, this.peopleData);
  }
  ngOnDestroy(){
    if(this.subscriptionsList.length > 0) this.subscriptionsList.forEach(subscription => { subscription.unsubscribe() })
  }
}