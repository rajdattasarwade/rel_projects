import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { viewClassName } from '@angular/compiler/src/compile_metadata';
import { VehicleBenefitsModalComponent } from '../components/vehicle-benefits-root/vehicle-benefits-modal.component';
import { MarriageDetailsModalComponent } from '../components/Marriage-root/marriage-details-modal/marriage-details-modal.component';
import { HealthWellnessModalComponent } from '../components/health-wellness-root/health-wellness-modal/health-wellness-modal.component';
import { PhoneRootComponent } from '../components/phone-root/phone-root.component';
import { MaternityPaternityLandingComponent } from '../components/maternity-paternity-root/maternity-paternity-landing/maternity-paternity-landing.component';
import { ReimbursementsService } from '../../reimbursements-root/services/reimbursements.service';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BenefitsService } from '../services/benefits.service';

@Component({
  selector: 'app-benefits-landing',
  templateUrl: './benefits-landing.component.html',
  styleUrls: ['./benefits-landing.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BenefitsLandingComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  handsetTabColorFlag: boolean = false;
  isAlive = true;
  healthAwareness: any;
  healthTabColorFlag: boolean = false;

  constructor(
    public dialog: MatDialog,
    private reimbursmentService: ReimbursementsService,
    public benefitService: BenefitsService
  ) {}

  ngOnInit(): void {
    this.reimbursmentService.getReimbursementType();
    this.reimbursmentService.ReimbTypeData.pipe(
      takeWhile(() => this.isAlive)
    ).subscribe((res) => {
      if (!!res) {
        res.forEach((type) => {
          if (type.reimbursementType.sapCode == 'ZRIM') {
            this.handsetTabColorFlag = true;
          }
        });
      }
    });
    this.getHealthWellnessInfo();
  }
  marriageDetails() {
    const dialogRef = this.dialog.open(MarriageDetailsModalComponent, {
      width: '800px',
    });
  }
  vehicleBenefitsModal() {
    const dialogRef = this.dialog.open(VehicleBenefitsModalComponent, {
      width: '800px',
    });
  }
  healthWellness() {
    const dialogRef = this.dialog.open(HealthWellnessModalComponent, {
      width: '800px',
    });
  }
  phoneDetailsModal() {
    const dialogRef = this.dialog.open(PhoneRootComponent, {
      width: '800px',
    });
  }
  maternityPaternityForm() {
    const dialogRef = this.dialog.open(MaternityPaternityLandingComponent, {
      width: '700px',
    });
  }

  getHealthWellnessInfo() {
    this.subscriptionsList.push(
      this.benefitService.getHealthWellnessInfo().subscribe((data) => {
        if (data) {
          this.healthAwareness = data;
          if (this.healthAwareness.length > 0) {
            this.healthAwareness.forEach((healthDet) => {
              if (healthDet.pmeFor == 'SELF') {
                if (healthDet.pmeDocGenerated == true) {
                  if (healthDet.pmeAvailed == false) {
                    this.healthTabColorFlag = true;
                  } else {
                    this.healthTabColorFlag = false;
                  }
                } else {
                  this.healthTabColorFlag = false;
                }
              }
            });
          } else {
            this.healthTabColorFlag = false;
          }
        }
        (error) => {
          console.log();
        };
      })
    );
  }

  ngOnDestroy() {
    this.isAlive = false;
    if (this.subscriptionsList.length > 0) {
      this.subscriptionsList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
