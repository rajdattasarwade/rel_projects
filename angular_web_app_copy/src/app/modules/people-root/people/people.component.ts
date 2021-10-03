import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { forkJoin, Subscription } from 'rxjs';
import { Config } from '../../../components/core/config/config';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FindPeopleComponent } from '../components/find-people/find-people.component';
import { MyReporteesComponent } from '../components/my-reportees/my-reportees.component';
import { MyOrgRelationshipComponent } from '../components/my-org-relationship/my-org-relationship.component';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PeopleComponent implements OnInit, OnDestroy {
  peersData: any;
  reporteesData: any;
  loggedUserId: any;
  orgRelData: any;
  loggedManagerId: any;
  orgData: any;
  currentUser: any;
  documentList: any;
  subManager: Subscription = new Subscription();

  @ViewChild(FindPeopleComponent) private findPeopleComponent: FindPeopleComponent;
  @ViewChild(MyOrgRelationshipComponent) private myOrgRelationshipComponent: MyOrgRelationshipComponent;
  @ViewChild(MyReporteesComponent) private myReporteesComponent: MyReporteesComponent;
  constructor(private peopleService: PeopleService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loggedUserId = Config.userId;
  }

  populatePeersData(managerId) {
    let peersSub = this.peopleService
      .getSelfPeers(managerId)
      .subscribe((data) => {
        this.peersData = data;
        this.alterData();
      });
    this.subManager.add(peersSub);
  }

  populateReporteesData(userId, managerId) {
    let reporteesSub = this.peopleService
      .getSelfReportees(userId)
      .subscribe((data) => {
        this.reporteesData = data;
        this.loggedManagerId = 'P' + this.reporteesData.MANAGER[0].managerId;
        this.currentUser = this.reporteesData.MANAGER[0].employeeId;
        this.populatePeersData(this.loggedManagerId);
      });
    this.subManager.add(reporteesSub);
  }

  populateTotalData() {
    this.orgData = [];
    this.populateReporteesData(this.loggedUserId, this.loggedManagerId);
  }

  alterData() {
    let peerTempObj;
    let reporteeTempObj;
    this.orgData = {
      employeeName: this.peersData.MANAGER[0].name,
      employeeId: this.peersData.MANAGER[0].employeeId,
      employeeEmail: this.peersData.MANAGER[0].relianceEmail,
      employeeDesg: this.peersData.MANAGER[0].desination,
      employeeMobile: this.peersData.MANAGER[0].mobileNo,
      photoUrl: this.peersData.MANAGER[0].picURL,
      employeeReportees: [],
    };
    this.peersData.SURBODINATE.forEach((peer) => {
      peerTempObj = {
        employeeName: peer.name,
        employeeId: peer.employeeId,
        employeeEmail: peer.relianceEmail,
        employeeDesg: peer.desination,
        employeeMobile: peer.mobileNo,
        photoUrl: peer.picURL,
        employeeReportees: [],
        priority: 2,
      };
      if (this.currentUser == peer.employeeId) {
        peerTempObj.priority = 1;
        if (this.reporteesData.SURBODINATE != undefined) {
          this.reporteesData.SURBODINATE.forEach((reportee) => {
            reporteeTempObj = {
              employeeName: reportee.name,
              employeeId: reportee.employeeId,
              employeeEmail: reportee.relianceEmail,
              employeeDesg: reportee.desination,
              employeeMobile: reportee.mobileNo,
              photoUrl: reportee.picURL,
              employeeReportees: [],
            };
            peerTempObj.employeeReportees.push(reporteeTempObj);
          });
        }
      }
      this.orgData.employeeReportees.push(peerTempObj);
    });
    this.orgData = [this.orgData];
    this.orgData[0].employeeReportees.sort((firstPerson, secondPerson) => {
      if (firstPerson.priority < secondPerson.priority) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  openInfoModal(infoModal) {
    this.getDocuments()
    const dialogRef = this.dialog.open(infoModal, 
    {width: '400px',}); 
  }
  onTabChanged(event: MatTabChangeEvent) 
  {
    if(event.index == 0)
    {
        this.myOrgRelationshipComponent.refresh();
    }
    else  if(event.index == 1)
    {
        this.myReporteesComponent.refresh(); 
    }
    else {
      this.findPeopleComponent.refresh(); 
    }
  }
  getDocuments() {
    let docList = forkJoin([this.peopleService.getGuidelines('H0015'),this.peopleService.getGuidelines('H0062')]).subscribe(((response: any) => {
      this.documentList=response[0]
      for (let item of response[1]) {
        this.documentList.push(item)
      }
    }))
    this.subManager.add(docList);
  }
  closeModal() {
    this.dialog.closeAll()
  }
  openPdf(data) {
    let pdfData = this.peopleService.openGuidelinesPdf(data.docId).subscribe(data => {
    window.open(URL.createObjectURL(data)) 
    })
    this.subManager.add(pdfData);
  }
}
