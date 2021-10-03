import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PeopleService } from 'src/app/modules/people-root/services/people.service';
import { IconsModel } from '../../../../../components/common/common-models';
import { MultiAttachPdfComponent } from '../../../../../components/shared/multi-attach-pdf/multi-attach-pdf.component';
import { BenefitsService } from '../../../services/benefits.service';
import { ClaimInsuranceInfoComponent } from '../claim-insurance-info/claim-insurance-info.component';

@Component({
  selector: 'app-claim-insurance-widget',
  templateUrl: './claim-insurance-widget.component.html',
  styleUrls: ['./claim-insurance-widget.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ClaimInsuranceWidgetComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  icons: any[];
  grpHospPolicy: any;
  grpPersonalAccident: any;
  grpTermLinkInsurance: any;
  insuranceClaimCoverageDet: any;
  infoList: any;
  selectedValue: any = 4;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public benefitService: BenefitsService,
    public peopleService: PeopleService
  ) {
    this.icons = [];
    this.icons.push(new IconsModel('', '', 'header-ico info_ico', 'info'));
  }

  ngOnInit(): void {
    this.getInsuranceCoverageAndClaims();
    this.getInfoDocs();
  }

  getInfoDocs() {
    this.subscriptionsList.push(
      this.peopleService.getGuidelines('H0022').subscribe(
        (data) => {
          if (data) {
            this.infoList = data;
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }

  infoModal() {
    const dialogRef = this.dialog.open(MultiAttachPdfComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.attachmentDet = this.infoList;
    dialogRef.afterClosed().subscribe((result) => {
      var docId = result;
      if (docId != '') {
        this.subscriptionsList.push(
          this.peopleService.openGuidelinesPdf(docId).subscribe(
            (data) => {
              if (data) {
                window.open(URL.createObjectURL(data));
              }
            },
            (error) => {
              console.log();
            }
          )
        );
      } else {
      }
    });
  }

  routeToClaim() {
    this.router.navigate(['benefits/claims-insurances']);
  }

  routeToMedibuddy() {
    this.router.navigate(['benefits/claims-insurances'], 
    { queryParams: 
        { tab: this.selectedValue } 
    });
  }

  getInsuranceCoverageAndClaims() {
    this.subscriptionsList.push(
      this.benefitService.getCoverageOverview().subscribe(
        (data) => {
          if (data) {
            this.insuranceClaimCoverageDet = data;
            this.insuranceClaimCoverageDet.forEach((insuranceDet) => {
              if (insuranceDet.planName == 'Group Hospitalization Policy') {
                this.grpHospPolicy = insuranceDet.coverageAmount;
              } else if (
                insuranceDet.planName == 'Group Personal Accident Policy'
              ) {
                this.grpPersonalAccident = insuranceDet.coverageAmount;
              } else {
                this.grpTermLinkInsurance = insuranceDet.coverageAmount;
              }
            });
            // this.insuranceCoverageClaimDetail = data;
          }
        },
        (error) => {
          console.log();
        }
      )
    );
  }

  ngOnDestroy() {
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
