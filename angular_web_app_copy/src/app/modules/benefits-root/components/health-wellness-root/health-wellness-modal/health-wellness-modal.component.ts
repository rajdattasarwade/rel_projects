import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PdfViewerModalComponent } from '../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { AddressInfoModalComponent } from '../address-info-modal/address-info-modal.component';
import { AddDependentModalComponent } from '../../claims-insurances-root/overview-tab/add-dependent-modal/add-dependent-modal.component';
import { from, Subscription } from 'rxjs';
import { ComingSoonComponent } from '../../../../../components/shared/common-cards/coming-soon/coming-soon.component';
import { BenefitsService } from '../../../services/benefits.service';
import { GhpClaimTabComponent } from '../../claims-insurances-root/ghp-claim-tab/ghp-claim-tab.component';
import { MedibuddyTabComponent } from '../../claims-insurances-root/medibuddy-tab/medibuddy-tab.component';
import { AppointmentModalComponent } from '../../claims-insurances-root/pme-tab/pme-centers-modal/appointment-modal/appointment-modal.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MedicalCentersInfoModalComponent } from '../medical-centers-info-modal/medical-centers-info-modal.component';
import { PmeService } from '../../claims-insurances-root/pme-tab/pme.service';

export interface DialogData {
  animal: 'panda';
}

@Component({
  selector: 'app-health-wellness-modal',
  templateUrl: './health-wellness-modal.component.html',
  styleUrls: ['./health-wellness-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HealthWellnessModalComponent implements OnInit {
  fileExtension: boolean = false;
  selectedValue: any;
  title: string;
  policySetData: any;
  videoUrl: any;
  policyDocs: any = [];
  videoSourceURl = '';
  teamAddressData: any;
  subscription: Subscription[] = [];
  pmeLetterData: any;
  pmeCheckData:any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private activeModal: MatDialog,
    public dialogRef: MatDialogRef<HealthWellnessModalComponent>,
    public modalService: MessageModalService,
    public benefitsService: BenefitsService,
    public pmeService:PmeService
  ) {}

  ngOnInit(): void {
    this.subscription.push(this.pmeService.getPmeCheck().subscribe(res=>{this.pmeCheckData=res;
    if(this.pmeCheckData['spouseFlag']!=true)
    document.getElementById('spouse').style.display='none'}))
    this.subscription.push(
      this.benefitsService.getHealthWellnessInfo().subscribe((response) => {
        this.pmeLetterData = response;
      })
    );
    this.subscription.push(
      this.benefitsService.getPolicyset('HELT').subscribe((res) => {
        this.policySetData = res;
        for (let each of this.policySetData) {
          each['videoUrl'] != ''
            ? (this.videoUrl = each['videoUrl'])
            : this.policyDocs.push(each);
        }
        this.getVideo();
      })
    );
  }
  getVideo() {
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
  policy(item) {
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

  openPmePdf(pmeForString) {
    let stringCheck= pmeForString=='SELF'?'selfMessag':'spouseMessage'
    if(this.pmeCheckData[stringCheck]==null){let data = this.pmeLetterData.filter((item) => item.pmeFor == pmeForString);
      this.subscription.push(
        this.benefitsService
          .getPMELetter(
            data[0].pmeFor,
            String(data[0].age),
            String(data[0].amount)
          )
          .subscribe((res) => {
              let pdfUrl = res;
              let file = new Blob([pdfUrl], { type: 'application/pdf' });
              let url = URL.createObjectURL(file);
              const dialogRef = this.activeModal.open(PdfViewerModalComponent);
              dialogRef.componentInstance.pdfUrl = url;
              dialogRef.componentInstance.title = 'Pme for' + pmeForString;
              dialogRef.componentInstance.pdfName = 'Pme for' + pmeForString;
          })
      );}
      else{
        this.modalService.showMessage(
          this.pmeCheckData[stringCheck],
          '',
          'info-icon',
          'OK'
        );
      }
    
  }
  openGuidelinePdf(key) {
    this.subscription.push(
      this.benefitsService.getPolicyset(key).subscribe((res) => {
        let data = res;
        this.policy(data[0]);
      })
    );
  }
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  addDependent() {
    this.activeModal.closeAll();
    this.router.navigate(['/benefits/view-edit-dependent-list']);
  }
  goToGhpPage() {
    this.dialogRef.close();
    this.router.navigate(['benefits/claims-insurances'], {
      queryParams: { tab: this.selectedValue = 1 },
    });
  }
  goToPme() {
    this.activeModal.open(AppointmentModalComponent, {
      width: '500px',
    });
  }
  medicalCenters() {
    this.subscription.push(
      this.benefitsService.getmedicalCenters().subscribe((res) => {
        const dialogRef = this.activeModal.open(
          MedicalCentersInfoModalComponent
        );
        dialogRef.componentInstance.title = 'INFORMATION';
        dialogRef.componentInstance.address = res;
      })
    );
  }
  goToReimbursement() {
    this.dialogRef.close();
    this.router.navigate(['reimbursements']);
  }

  goToAddNomiee() {
    const dialogRef = this.dialog.open(ComingSoonComponent, {
      width: '683px',
    });
  }
  goToGpa() {
    this.dialogRef.close();
    this.router.navigate(['benefits/claims-insurances'], {
      queryParams: { tab: this.selectedValue = 2 },
    });
  }

  goToMedibuddy() {
    this.dialogRef.close();
    this.router.navigate(['benefits/claims-insurances'], {
      queryParams: { tab: this.selectedValue = 4 },
    });
  }
  ngOnDestroy() {
    if (this.subscription.length > 0)
      this.subscription.forEach((s) => s.unsubscribe());
  }
}
