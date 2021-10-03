import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileSearchPopupComponent } from '../../../../../components/shared/profile-search-popup/profile-search-popup.component';
import { RemoveSubordinateModalComponent } from '../remove-subordinate-modal/remove-subordinate-modal.component';
import { MultiAttachPdfComponent } from '../../../../../components/shared/multi-attach-pdf/multi-attach-pdf.component';
import { IconsModel } from '../../../../../components/common/common-models';
import { PersonalDetailsService } from '../../../services/personal-details.service';
import { Subscription } from 'rxjs';
import { myMgrDetails, subordinateDetails } from '../../../../personal-details-root/personal-details.model';



@Component({
  selector: 'app-my-team-edit',
  templateUrl: './my-team-edit.component.html',
  styleUrls: ['./my-team-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyTeamEditComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  managersList: any;
  subordinatesList: any;
  mgrDetails;
  subDetails;
  subOrdinateCount: number = 1;
  labelName:string;

  breadcrumbJson: any = [
    {
      label: 'Personal Details',
      link: '/personal-details'
    },
    {
      label: 'My Team',
      link: '/personal-details/my-team'
    }
  ];
  iconsMain: any;

  constructor(
    public dialog: MatDialog,
    private service: PersonalDetailsService
  ) {
    this.iconsMain = [];
    this.iconsMain.push(new IconsModel('', '', 'header-ico info_ico', 'info'));
  }

  ngOnDestroy() {
    if (this.subscription.length > 0) {
      this.subscription.forEach((s) => s.unsubscribe());
    }
  }

  ngOnInit(): void {
    this.managersList = myMgrDetails.mgrDetailsData;
    this.subordinatesList = subordinateDetails.subordinateDetailsData;
    console.log(this.managersList);
    console.log(this.subordinatesList);
    if(this.subOrdinateCount < this.subordinatesList.length){
      this.labelName="Show More";
    }
    
  }

  getManagersList(){
    this.subscription.push(
      this.service.getCurrentManager().subscribe(
        (data) => {
          this.managersList = data;
        },
        (error) => {
          console.log(error);
        }
      )
    )
  }

  getSubordinateList(){
    this.subscription.push(
      this.service.getSubordinates().subscribe(
        (data) => {
          this.subordinatesList = data;
        },
        (error) => {
          console.log(error);
        }
      )
    )
  }

  changeManager() {
    let dataJson: any = {
      'picUrl': 'assets/images/avatar.png',
      'dialogTitle': 'Search Manager',
      'Employee Name :': 'Mary Jsoe',
      'Employee Email Id :': 'Darth.Vader@ril.com',
      'Organization Unit :': 'Product Management',
      'Position :': 'Product Manager',
      'Employee No. :': '3344551'
    };
    this.dialog.open(ProfileSearchPopupComponent, {
      width: '500px',
      data: dataJson
    });

  }

  addSubordinate() {
    let dataJson: any = {
      'picUrl': 'assets/images/avatar.png',
      'dialogTitle': 'Search Subordinates',
      'Employee Name :': 'Mary Jsoe',
      'Employee Email Id :': 'Darth.Vader@ril.com',
      'Organization Unit :': 'Product Management',
      'Position :': 'Product Manager',
      'Employee No. :': '3344551'
    };
    this.dialog.open(ProfileSearchPopupComponent, {
      width: '500px',
      data: dataJson
    });

  }

  removeSubordinate() {
    this.dialog.open(RemoveSubordinateModalComponent, {
      width: '500px'
    });
  }

  actionEventMain(event) {
    if (event == 'info') {
      this.dialog.open(MultiAttachPdfComponent, {
        width: '600px',
      });
    }
  }

  showMoreSubordinate(){

    if(this.labelName =="Show More"){
      this.subOrdinateCount = this.subordinatesList.length;
      this.labelName ="Show Less"
    } else {
      this.subOrdinateCount = 1;
      this.labelName ="Show More"
    }
    
  }

}
