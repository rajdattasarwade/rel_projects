import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MedibuddyCardComponent } from 'src/app/components/shared/medibuddy-card/medibuddy-card.component';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { PolicyService } from 'src/app/components/shared/view-policies/view-policies-service/policy.service';
import { LeaveHistoryTabComponent } from 'src/app/modules/leave-and-attendance-root/components/leave-reg-history-popup/leave-history-tab/leave-history-tab.component';
import { BenefitsLandingComponent } from '../../../benefits-landing/benefits-landing.component';
import { BenefitsService } from '../../../services/benefits.service';
import { GhpClaimTabComponent } from '../../claims-insurances-root/ghp-claim-tab/ghp-claim-tab.component';
import { MedibuddyTabComponent } from '../../claims-insurances-root/medibuddy-tab/medibuddy-tab.component';
import { AddDependentModalComponent } from '../../claims-insurances-root/overview-tab/add-dependent-modal/add-dependent-modal.component';
import { AddressInfoModalComponent } from '../../health-wellness-root/address-info-modal/address-info-modal.component';

@Component({
  selector: 'app-paternity-info-modal',
  templateUrl: './paternity-info-modal.component.html',
  styleUrls: ['./paternity-info-modal.component.css'],
})
export class PaternityInfoModalComponent implements OnInit {
  videoSourceURl = '';
  videoUrl = '';
  teamAddressData: any;
  fileExtension: boolean = false;
  policySetData: any;
  videoId: any;
  policyDocs: any = [];
  subscription: Subscription[] = [];
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<BenefitsLandingComponent>,
    public dialog: MatDialog,
    private modalService: MessageModalService,
    private benefitsService: BenefitsService
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.benefitsService.getPolicyset('PATR').subscribe((res) => {
        this.policySetData = res;
        for (let each of this.policySetData) {
          each['videoUrl'] != ''
            ? (this.videoUrl = each['videoUrl'])
            : this.policyDocs.push(each);
        }
        this.getPaternityVideo();
      })
    );
  }
  getPaternityVideo() {
    this.videoSourceURl = '';
    this.subscription.push(
      this.benefitsService.generateVideo(this.videoUrl).subscribe((res) => {
        this.videoSourceURl = URL.createObjectURL(res);
      })
    );
  }
  Leavepolicy(item) {
    this.subscription.push(
      this.benefitsService
        .viewPolicyAttachment(item.policyDoc)
        .subscribe((res) => {
          let pdfUrl = res;
          let file = new Blob([pdfUrl], { type: 'application/pdf' });
          let url = URL.createObjectURL(file);
          const dialogRef = this.dialog.open(PdfViewerModalComponent);
          dialogRef.componentInstance.pdfUrl = url;
          dialogRef.componentInstance.title = item.text;
          dialogRef.componentInstance.pdfName = item.text;
        })
    );
  }
  checkCards() {
    this.dialog.closeAll();
    this.router.navigate(['benefits/claims-insurances'], {
      queryParams: { tab: 5 },
    });
  }
  updateFamily() {
    this.dialog.closeAll();
    this.router.navigate(['/benefits/view-edit-dependent-list']);
  }
  applyLeave() {
    this.dialog.closeAll();
    this.router.navigate(['/leave-and-attendance/leave-planner']);
  }
  checkStatus() {
    this.dialog.closeAll();
    this.router.navigate(['/leave-and-attendance/leaveRegularizationHistory'], {
      queryParams: { tab: 0 },
    });
  }
  initiateClaim() {
    this.dialog.closeAll();
    this.router.navigate(['benefits/claims-insurances'], {
      queryParams: { tab: 1 },
    });
  }
  teamAddress() {
    this.subscription.push(
      this.benefitsService.getTeamAddress().subscribe((res) => {
        this.teamAddressData = res;
        const dialogRef = this.dialog.open(AddressInfoModalComponent);
        dialogRef.componentInstance.title =
          'HOSPITALIZATION INSURANCE CLAIM DESK';
        dialogRef.componentInstance.address = this.teamAddressData;
      })
    );
  }
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  ngOnDestroy() {
    if (this.subscription.length > 0)
      this.subscription.forEach((s) => s.unsubscribe());
  }
}
