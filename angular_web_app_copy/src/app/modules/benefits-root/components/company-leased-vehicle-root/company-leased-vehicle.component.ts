import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CovBuybackComponent } from './cov-buyback/cov-buyback.component';
import { CompanyLeasedVehicleModalComponent } from './company-leased-vehicle-modal/company-leased-vehicle-modal-component';
import { ClvViewModalComponent } from './clv-view-modal/clv-view-modal.component';
import { AttachmenmtsModalComponent } from './attachmenmts-modal/attachmenmts-modal.component';
import { BenefitsService } from '../../services/benefits.service';
import { OverviewDetails } from '../../benifit-model';
import { ClvConstant } from './clv-constant';
import { PdfViewerModalComponent } from '../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from '../../../../components/shared/services/message-modal-service';
import { InfoModalComponent } from './info-modal/info-modal.component';

export interface PeriodicElement {
  vehicleType: {};
  mode: {};
  vehicleMark: {};
  status: {};
  requestDate:{},
  action:{},
  documents:{}
}

const ELEMENT_DATA: PeriodicElement[] = [
  {vehicleType: '1', mode: 'Company Leased', vehicleMark:'Audi', status: 'In Progress', requestDate:'21-08-2019', action:'', documents:''}
];

@Component({
  selector: 'app-company-leased-vehicle',
  templateUrl: './company-leased-vehicle.component.html',
  styleUrls: ['./company-leased-vehicle.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyLeasedVehicleComponent implements OnInit {
  breadcrumbJson: any = [
    {
      label: 'Benefits',
      link: '/benefits'
    },
    {
      label: 'Company Leased Vehicle',
      link: '/benefits/company-leased-vehicle'
    }
  ];
  overViewDetails:OverviewDetails[];
  pdfFile: any;
  pdfUrl: any;
  isStatusAquired: string = ClvConstant.CLVSTATUSAQUIRED;
  isAgreement: string = ClvConstant.AGREEMENT;
  isRepaymentSchedule: string = ClvConstant.SCHEDULEPAYMENT;
  isRcBook: string = ClvConstant.RCBOOK;
  isInsurance: string = ClvConstant.INSURANCE;
  isCOV: string = ClvConstant.VEHICLEMODECOV;
  createFormBtn:boolean=true;
  @ViewChild('companyLeasedVehicleModal') public companyLeasedVehicleModal;
  instruModal:any;
  lookupData:any;
  isEligible: boolean = true;
  eligibilityMessage:any;
  // Table Data Binding
  displayedColumns: string[] = ['vehicleType', 'mode', 'vehicleMark', 'status', 'requestDate', 'action', 'documents'];
  //dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog,
    private benifiteService:BenefitsService,
    public dialogRef: MatDialogRef<any>,
    public messageService:MessageModalService
  ) { }

  ngOnInit(): void {
    this.getAddClvLookup();
  }
  //overview details
  getclvDetails(){
    let overviewSub = this.benifiteService.getCVOverview().subscribe(
      (data:OverviewDetails[])=>{
           this.overViewDetails =data;
      },(err)=>{

      }
    )
  }
  
  companyLeasedVehicle(companyLeasedVehicleModal) {
    if (!this.isEligible) {
      this.messageService.showMessage(
        this.eligibilityMessage,
        "",
        "warning-icon"
      );
      return;
    }
    this.createFormBtn= true;
    this.instruModal = this.dialog.open(companyLeasedVehicleModal, 
    {width: '600px',}); 
  }

  openBuyBackModal(overViewObj) {
    const dialogRef = this.dialog.open(CovBuybackComponent, 
    {width: '600px',}); 
    dialogRef.componentInstance.overviewObject = overViewObj;
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'success') {
        this.getAddClvLookup();
      }
    });
  }
  createCLVModal() {
    const dialogRef = this.dialog.open(CompanyLeasedVehicleModalComponent, 
    {width: '600px',}); 
    dialogRef.componentInstance.lookupData =this.lookupData;
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'success') {
        this.closeModal();
        this.getAddClvLookup();
      }
    });
  }
  viewCLVModal(overviewObject) {
    const dialogRef = this.dialog.open(ClvViewModalComponent, 
    {width: '600px',});
    dialogRef.componentInstance.overviewObject = overviewObject;
    dialogRef.componentInstance.lookUpData = this.lookupData;
    

  }

  openAttachmentModal(overviewObject){
    const dialogRef = this.dialog.open(AttachmenmtsModalComponent, 
      {width: '600px',}); 
      dialogRef.componentInstance.overviewObject = overviewObject;
  }

  viewClvDocument(docName: string,element:any) {
    let clvObj = element;
    switch (docName) {
      case this.isAgreement:
        this.getAgreementDoc(clvObj);
        break;
      case this.isRcBook:
        this.getRcBookDoc(clvObj);
        break;
      case this.isRepaymentSchedule:
        this.getScheduleDoc(clvObj);
        break;
      case this.isInsurance:
        this.getInsuranceDoc(clvObj);
        break;
    }
  }

  getAgreementDoc(clvObj) {
    let isCLV = clvObj.vehicleMode === ClvConstant.VEHICLEMODECLV;
    this.benifiteService
      .getUndertaking(clvObj.requestNumber, isCLV)
      .subscribe(
        data => {
          this.pdfFile = new Blob([data], {
            type: "application/pdf"
          });
          this.pdfUrl = URL.createObjectURL(this.pdfFile);
          this.viewPdfDocument(
            this.pdfUrl,
            this.pdfFile,
            ClvConstant.AGREEMENT
          );
        },
        error => {}
      );
  }

  getRcBookDoc(clvObj) {
    this.benifiteService.getRcBookDoc(clvObj.requestNumber).subscribe(
      data => {
        this.pdfFile = new Blob([data], {
          type: "application/pdf"
        });
        this.pdfUrl = URL.createObjectURL(this.pdfFile);
        this.viewPdfDocument(this.pdfUrl, this.pdfFile, ClvConstant.RCBOOK);
      },
      error => {}
    );
  }

  getInsuranceDoc(clvObj) {
    this.benifiteService
      .getInsuranceDoc(clvObj.requestNumber)
      .subscribe(
        data => {
          this.pdfFile = new Blob([data], {
            type: "application/pdf"
          });
          this.pdfUrl = URL.createObjectURL(this.pdfFile);
          this.viewPdfDocument(
            this.pdfUrl,
            this.pdfFile,
            ClvConstant.INSURANCE
          );
        },
        error => {}
      );
  }
  getScheduleDoc(clvObj) {
    this.benifiteService.getScheduleDoc(clvObj.requestNumber).subscribe(
      data => {
        this.pdfFile = new Blob([data], {
          type: "application/pdf"
        });
        this.pdfUrl = URL.createObjectURL(this.pdfFile);
        this.viewPdfDocument(
          this.pdfUrl,
          this.pdfFile,
          ClvConstant.SCHEDULEPAYMENT
        );
      },
      error => {}
    );
  }

  
  viewPdfDocument(attachmentURL, file, title) {
    const pdfUrl = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = pdfUrl;
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.pdfName = title;
  }

  showOptions(status){
   this.createFormBtn = !this.createFormBtn;
  }

  closeModal(){
    this.instruModal.close();
  }

  forcloseCall(overviewObj){
    this.messageService.showConfirmation(
      "Are you sure, do you want to foreclose the vehicle?",
        "Confirmation",
        "confirmation-icon",
        reason => {
          if (reason === "YES") {
            this.forcloseClv(overviewObj);
          }
        });
    }

    forcloseClv(overviewObj) {
      let forclosePayload = {
        requestNumber: overviewObj.requestNumber,
        vehicleNumber: "",
        vehicleType: ClvConstant.VEHICLEMODECLV,
        message: ""
      };
      this.benifiteService.setForcloseClv(forclosePayload).subscribe(
        (data: any) => {
          if (data.responseStatus === "SUCCESS") {
                this.messageService.showMessage(
                  "Forclose request created successfully",
                  'Success',
                  'success-icon',
                  'CLOSE'
                );
                this.getclvDetails();
          } else {
            this.messageService.showMessage(
              "Something went wrong. Please try after sometime.",
              "Error",
              "warning-icon"
            );
            //this.activeModal.dismiss();
          }
        },
        err => {
          console.log(err);
        }
      );
    }

    //lookup
    getAddClvLookup() {
      this.benifiteService.getLookUpData().subscribe(
        (data: any) => {
          this.lookupData = data;
          this.checkEligibility(this.lookupData["ELIGIBILITY"]);
          this.getclvDetails();
        },
        error => {
          console.log("CLV-ERROR: ", error);
        }
      );
    }

    checkEligibility(eligibilityData: any[]) {
      if (eligibilityData && eligibilityData.length > 0) {
        const eligibilityCode = eligibilityData.filter(
          item => item.key === "ELIG_CODE"
        );
        if (eligibilityCode && eligibilityCode.length > 0) {
          if (eligibilityCode[0].value.trim() !== "3") {
            this.isEligible = false;
            const eligibilityMessage = eligibilityData.filter(
              item => item.key === "MESSAGE"
            );
            if (eligibilityMessage && eligibilityMessage.length > 0) {
              if (eligibilityMessage[0].value.trim() !== "") {
                this.eligibilityMessage = eligibilityMessage[0].value;
              }
              if (
                eligibilityMessage.length > 1 &&
                eligibilityMessage[1].value.trim() !== "" &&
                this.eligibilityMessage !== eligibilityMessage[1].value.trim()
              ) {
                this.eligibilityMessage = this.eligibilityMessage.concat(
                  "<br/>" + eligibilityMessage[1].value
                );
              }
            }
          }
        }
      } else {
        this.isEligible = true;
      }
    }

    openInfoModal() {
      const dialogRef = this.dialog.open(InfoModalComponent, 
      {width: '400px',}); 
    }
}
