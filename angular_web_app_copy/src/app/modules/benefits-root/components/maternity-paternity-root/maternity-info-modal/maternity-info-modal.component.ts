import { Component, OnInit } from '@angular/core';
import { PdfViewerModalComponent } from '../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequestModalComponent } from 'src/app/modules/leave-and-attendance-root/components/leave-request-modal/leave-request-modal.component';
import { LeaveHistoryTabComponent } from 'src/app/modules/leave-and-attendance-root/components/leave-reg-history-popup/leave-history-tab/leave-history-tab.component';
import { MedibuddyCardComponent } from 'src/app/components/shared/medibuddy-card/medibuddy-card.component';
import { BenefitsService } from '../../../services/benefits.service';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { GhpClaimTabComponent } from '../../claims-insurances-root/ghp-claim-tab/ghp-claim-tab.component';
import { AddDependentModalComponent } from '../../claims-insurances-root/overview-tab/add-dependent-modal/add-dependent-modal.component';
import { Router } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';
import { MedibuddyTabComponent } from '../../claims-insurances-root/medibuddy-tab/medibuddy-tab.component';
import { AddressInfoModalComponent } from '../../health-wellness-root/address-info-modal/address-info-modal.component';

@Component({
  selector: 'app-maternity-info-modal',
  templateUrl: './maternity-info-modal.component.html',
  styleUrls: ['./maternity-info-modal.component.css'],
})
export class MaternityInfoModalComponent implements OnInit {
  videoSourceURl = '';
  fileExtension: boolean = false;
  teamAddressData: any;
  // videoSourceURl: any;
  videoUrl;
  policySetData: any;
  videoId: any;
  policyDocs: any = [];
  subscription: Subscription[] = [];
  constructor(
    private activeModal: MatDialog,
    private benefitsService: BenefitsService,
    private modalService: MessageModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.benefitsService.getPolicyset('MATR').subscribe((res) => {
        this.policySetData = res;
        for (let each of this.policySetData) {
          each['videoUrl'] != ''
            ? (this.videoUrl = each['videoUrl'])
            : this.policyDocs.push(each);
        }
        this.getMaternityVideo();
      })
    );
  }
  getMaternityVideo() {
    this.videoSourceURl = '';
    this.subscription.push(
      this.benefitsService.generateVideo(this.videoUrl).subscribe((res) => {
        this.videoSourceURl = URL.createObjectURL(res);
      })
    );
  }
  teamAddress() {
    this.subscription.push(
      this.benefitsService.getTeamAddress().subscribe((res) => {
        this.teamAddressData = res;
        const dialogRef = this.activeModal.open(AddressInfoModalComponent);
        dialogRef.componentInstance.title =
          'HOSPITALIZATION INSURANCE CLAIM DESK';
        dialogRef.componentInstance.address = this.teamAddressData;
      })
    );
  }
  updateFamilyDetails() {
    this.activeModal.closeAll();
    this.router.navigate(['/benefits/view-edit-dependent-list']);
  }
  openPdf() {
    this.subscription.push(
      this.benefitsService.downloadRequestForm().subscribe((res) => {
        let data = res;
        this.benefitsService
          .viewPolicyAttachment(data[0]['policyDoc'])
          .subscribe((res) => {
            let pdfUrl = res;
            let file = new Blob([pdfUrl], { type: 'application/pdf' });
            let url = URL.createObjectURL(file);
            const dialogRef = this.activeModal.open(PdfViewerModalComponent);
            dialogRef.componentInstance.pdfUrl = url;
            dialogRef.componentInstance.title = 'Download Request Form';
            dialogRef.componentInstance.pdfName = 'Download Request Form';
          });
      })
    );
  }
  applyLeave() {
    this.activeModal.closeAll();
    this.router.navigate(['/leave-and-attendance/leave-planner']);
  }
  leaveHistory() {
    this.activeModal.closeAll();
    this.router.navigate(['/leave-and-attendance/leaveRegularizationHistory'], {
      queryParams: { tab: 0 },
    });
  }
  checkMedCards() {
    this.activeModal.closeAll();
    this.router.navigate(['benefits/claims-insurances'], {
      queryParams: { tab: 5 },
    });
  }
  Leavepolicy(item) {
    this.subscription.push(
      this.benefitsService
        .viewPolicyAttachment(item.policyDoc)
        .subscribe((res) => {
          let pdfUrl = res;
          let file = new Blob([pdfUrl], { type: 'application/pdf' });
          let url = URL.createObjectURL(file);
          const dialogRef = this.activeModal.open(PdfViewerModalComponent);
          dialogRef.componentInstance.pdfUrl = url;
          dialogRef.componentInstance.title = item.text;
          dialogRef.componentInstance.pdfName = item.text;
        })
    );
  }
  initiateMaternityClaim() {
    this.activeModal.closeAll();
    this.router.navigate(['benefits/claims-insurances'], {
      queryParams: { tab: 1 },
    });
  }
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  ngOnDestroy() {
    if (this.subscription.length > 0)
      this.subscription.forEach((s) => s.unsubscribe());
  }
}
