import { TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/components/core/config/config';
import { SearchPeopleDropdownComponent } from 'src/app/components/shared/common-cards/search-people-dropdown/search-people-dropdown.component';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-find-people',
  templateUrl: './find-people.component.html',
  styleUrls: ['./find-people.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FindPeopleComponent implements OnInit, OnDestroy {
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
  hierarichalData: any=[];
  subOrdinates: any=[];
  subscriptionsList: Subscription[] = [];
  showInfo: boolean = false
  avtarUrl = Config.avtarUrl;
  imageUrl: string;
  @ViewChild(SearchPeopleDropdownComponent) private searchComponent: SearchPeopleDropdownComponent;
  constructor(private peopleService: PeopleService,private titlecasePipe:TitleCasePipe) { }

  ngOnInit(): void {
  }
  refresh() {
    this.showInfo = false
    this.subOrdinates = []
    this.hierarichalData = []
    this.searchComponent.resetSearch()
  }
  selectedUser(value) {
    this.showInfo = true
    this.getHierarchy(value.employeeId)
  }
  getHierarchy(userId) {
    let id = 'P' + userId
    this.subOrdinates = []
    this.hierarichalData=[]
    this.subscriptionsList.push(this.peopleService.getSelfReportees(id).subscribe((response: any) => {
      if (response.MANAGER) {
        this.hierarichalData = response.MANAGER[0]
        this.subOrdinates = response.SURBODINATE
        this.imageUrl = this.avtarUrl + this.hierarichalData.managerId + '.jpg' 
        if (this.hierarichalData) {
          this.peopleData['empName'] = this.titlecasePipe.transform(this.hierarichalData.name)
          this.peopleData['desgn']=this.titlecasePipe.transform(this.hierarichalData.desination)
          this.peopleData['picUrl']=this.hierarichalData.picURL
          this.peopleData['Location']=this.titlecasePipe.transform(this.hierarichalData.workLocation)
          this.peopleData['Telephone Number']=this.hierarichalData.residenceNo
          this.peopleData['Email ID']=this.hierarichalData.relianceEmail.toLowerCase()
          this.peopleData['L1 Name']=this.titlecasePipe.transform(this.hierarichalData.managerName)
          this.peopleData['Mobile']=this.hierarichalData.mobileNo
          this.peopleData['Birthday'] = moment(this.hierarichalData.dateOfBirth, "YYYY-MM-DD").format("DD,MMMM")
          this.peopleData = Object.assign({}, this.peopleData);
        }
        else {
          this.emptyInfo()
        }
      }
      else {
        this.showInfo = false
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
