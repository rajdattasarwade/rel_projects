import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageModalService } from '../../../../components/shared/services/message-modal-service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MultiAttachPdfComponent } from '../../../../components/shared/multi-attach-pdf/multi-attach-pdf.component';
import { IconsModel } from '../../../../components/common/common-models';
//import { AddDependentModalComponent } from '../../../benefits-root/components/claims-insurances-root/overview-tab/add-dependent-modal/add-dependent-modal.component';
import { AddRelativeModalComponent } from '../../../benefits-root/components/claims-insurances-root/overview-tab/add-relative-modal/add-relative-modal.component';
import { FamilyDetailsEditComponent } from './family-details-edit/family-details-edit.component';
import { DependentDetailsModel, ViewEditDependentsColumns, RelativeDetailsModel } from './family-details-model';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { PersonalDetailsService } from '../../services/personal-details.service';
//import { FamilyDetailsPageComponent } from './family-details-page/family-details-page.component';

@Component({
  selector: 'app-family-details-root',
  templateUrl: './family-details-root.component.html',
  styleUrls: ['./family-details-root.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FamilyDetailsRootComponent implements OnInit {
  breadcrumbJson: any = [
    {
      label: 'Personal Details',
      link: '/personal-details',
    },
    {
      label: 'Family Details',
      link: '/personal-details/nominations',
    },
  ];
  icons: any[];
  selectedValue: any = 0;
  private subscription: Subscription;
  displayedColumns: string[] = ViewEditDependentsColumns;
  planId: string = 'GHP';
  coverageId: string = 'ESCP';
  dependentDetailsArray: DependentDetailsModel[] = [];
  relativeOverview: any;
  relativeDetailsList: RelativeDetailsModel[] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private messageModalSrv: MessageModalService,
    public dialogRef: MatDialogRef<FamilyDetailsRootComponent>,
    private activeModal: MatDialog,
    private personalDService: PersonalDetailsService
  ) {
    this.icons = [];
    this.icons.push(new IconsModel('', 'Edit', 'ico-extra-small edit-white-ico', ''));
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getRelativeOveview();
    this.getEnrolleddependents();
   
  }

  //depenedant call
  getEnrolleddependents() {
    let enrollDepen = this.personalDService
      .getEnrolleddependentsApi(this.planId, this.coverageId).subscribe(
        (data:DependentDetailsModel[]) => {
          console.log('getEnrolleddependents dependentDetailsArray=>', data);
          this.dependentDetailsArray = data;
          //this.dataSource = data;
        },
        (error) => {
          console.error('ERROR in getEnrolleddependents..', error);
        }
      );
    this.subscription.add(enrollDepen);
  }

  //relatives call
  getRelativeOveview() {
   let relativeOverview =  this.personalDService.getRelativeDetailsOverviewAPI().subscribe(
      (data) => {
        console.log('getRelativeOveview...data...=>', data);
        this.relativeOverview = data;
        this.relativeDetailsList = this.relativeOverview['relativeList'];
        if (this.relativeDetailsList.length == 0) {
          //this.showConfirmationPopup('Do you have any relatives in Reliance?');
        } else {
          //this.dataSource = this.relativeDetailsList;
        }
      },
      (error) => {
        console.error('getRelativeOveview....error.....=>', error);
      }
    );
    this.subscription.add(relativeOverview);
  }
  openConfirmationInfo() {
    this.messageModalSrv.showConfirmation(
      'Do you want to delete your regularization request?',
      'Warning',
      'confirmation-icon',
      (reason: string) => {
        if (reason == 'YES') {
          this.activeModal.closeAll;
        }
      }
    );
  }

  addFamilyMembers() {
    const dialogRef = this.dialog.open(FamilyDetailsEditComponent, {
      width: '800px',
    });
  }

  infoModal() {
    const dialogRef = this.dialog.open(MultiAttachPdfComponent, {
      width: '600px',
    });
  }
  subFamilyDetails(){
  this.router.navigate(['/personal-details/family-details']);
  }

  

  addRelative() {
    const dialogRef = this.dialog.open(AddRelativeModalComponent, {
      width: '600px',
    });
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
    
  ClaimInsuarance() {
    this.router.navigate(['benefits/claims-insurances'], {
      queryParams: { tab: this.selectedValue },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
