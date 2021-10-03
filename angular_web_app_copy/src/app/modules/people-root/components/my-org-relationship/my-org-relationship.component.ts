import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/components/core/config/config';
import { UserService } from 'src/app/components/core/services/user.service';
import { PeopleService } from '../../services/people.service';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-my-org-relationship',
  templateUrl: './my-org-relationship.component.html',
  styleUrls: ['./my-org-relationship.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MyOrgRelationshipComponent implements OnInit, OnDestroy {
  peopleData = { 
    'empName': '', 
    'desgn': '',
    'picUrl': '',
    'Location': '',
    'Telephone Number': '',
    'Email ID': '', 
    'L1 Name': '',
    "Mobile": '', 
    "Birthday": ''
  };  
  units: any = [
    { "unit": "Unit Relationship"},
    { "unit": "HR Relationship" },
    { "unit": "EC Sponsor" },
    { "unit": "Overseas Travel Role" }
  ]
  userData: any;
  avtarUrl = Config.avtarUrl;
  imageUrl: string;
  profileUrl: string;
  employeeData: any;
  orgRelationships: any = []
  selectedIndex: any;
  employeeIndex: boolean=false;
  subscriptionsList: Subscription[] = [];
  constructor(private userService: UserService,
    private peopleService: PeopleService,
    private sanitizer: DomSanitizer,
    private titlecasePipe:TitleCasePipe) { }

  ngOnInit(): void {
    this.getUserProfile()
    this.getOrgRelationship()
  }
  refresh() {
    this.employeeIndex=false
    this.selectedIndex=null
    this.getUserProfile()
    this.getOrgRelationship()
  }
  getDetails() {
    this.employeeIndex = true
    this.selectedIndex=null
    this.getUserProfile()
    this.getOrgRelationship()
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
      this.imageUrl = this.avtarUrl + this.userData.employeeId + '.jpg'
      this.getEmpDetails(this.userData.employeeId)
    }
  }
  getOrgRelationship() {
    if (this.peopleService.cacheOrgRelData) {
      this.orgRelationships = this.peopleService.cacheOrgRelData
      this.groupUnits()
    }
    else {
      this.callOrgApi()
    }
  }
  callOrgApi() {
    this.subscriptionsList.push(this.peopleService.getOrgRelationship().subscribe(((response:any) => {
      this.orgRelationships = response
      this.peopleService.cacheOrgRelationship(this.orgRelationships)
      this.groupUnits()
    })))
  }
  groupUnits() {
    for (let element of this.orgRelationships) {
      if (element.picUrl!="" && element.picUrl!=null) {
        element.picurl = this.sanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + element.picUrl)
      }
      if (element.sequence == "1" || element.sequence == "2" || element.sequence == "3") {
        element.unit="Unit Relationship"
      }
      else if (element.sequence == "4" || element.sequence == "5" || element.sequence == "6") {
        element.unit="HR Relationship"
      }
      else if (element.sequence == "7") {
        element.unit="EC Sponsor"
      }
      else if (element.sequence == "8") {
        element.unit="Overseas Travel Role"
      }
    }
  }
  setRow(index) {
    this.employeeIndex=false
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
          this.peopleData['Birthday'] =moment(this.employeeData.dateOfBirth, "YYYY-MM-DD").format("DD,MMMM")
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