import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from 'src/app/modules/benefits-root/services/benefits.service';

@Component({
  selector: 'app-medical-advance',
  templateUrl: './medical-advance.component.html',
  styleUrls: ['./medical-advance.component.css']
})
export class MedicalAdvanceComponent implements OnInit {

  @Input() advanceType: any;
  public medicalForm: FormGroup;
  recoveryMonth: any = [];
  subscriptionList: Subscription[] = [];
  @Output() imprestValid = new EventEmitter<Object>();
  @Input() dataObj: any;
  @Input() flag: any;
  documentId: String ="";
  attachmentList: any = [];

  constructor(public benefitService:BenefitsService,public dialog: MatDialog,private messageService: MessageModalService) { }

  ngOnInit(): void {
    if(this.flag == "edit" || this.flag == "view"){
      this.editFormSet(this.dataObj);
    }else{
    this.initForm();
    }
    this.getRecoveryMonth();
  }

  initForm(){
    this.medicalForm = new FormGroup({
      advanceType: new FormControl(this.advanceType),
      requestedAmount: new FormControl('', [Validators.required]),
      recoveryMonth: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required,Validators.maxLength(40)]),
      sequenceNumber: new FormControl(''),
      documentId: new FormControl('', [Validators.required]),
      fileName: new FormControl('', [Validators.required]),
      employeeCode: new FormControl(''),
      employeeName: new FormControl(''),
    });
    return this.medicalForm;
  }

  getRecoveryMonth(){
    let sub = this.benefitService
      .getRecoveryMonth()
      .subscribe(
        (data: any) => {
         this.recoveryMonth = data;
        },
        (err) => {
          console.log(err);
        }
      );

      this.subscriptionList.push(sub);
  }

  numericOnly(event){
    let numericVal = this.benefitService.spacevalidation(event);
    if (numericVal) {
      let inputVal = event.target.value.slice(1, -1);
      this.medicalForm.get('requestedAmount').patchValue(inputVal);
    } else {
      if (this.benefitService.setNumeric(event.target.value)) {
        let inputVal = event.target.value.slice(0, -1);
        this.medicalForm.get('requestedAmount').patchValue(inputVal);
      }
    }
    this.passImprestData(this.medicalForm.value);
  }

  ngOnDestroy(): void {
    if(this.subscriptionList.length > 0){
      this.subscriptionList.forEach(subs => {
        subs.unsubscribe();
      });
    }
  }

  passImprestData(data){
    if(this.medicalForm.valid){
        this.imprestValid.emit(data);
    }else{
      this.imprestValid.emit(null);
    }
  }
  
  editFormSet(data){
    this.attachmentList = [];
    this.medicalForm = new FormGroup({
      advanceType: new FormControl(data.advanceCode),
      requestedAmount: new FormControl({value : data.requestedAmount, disabled : this.flag == "view"}, [Validators.required]),
      recoveryMonth: new FormControl({value : data.recoveryMonth, disabled : this.flag == "view"}, [Validators.required]),
      remarks: new FormControl({value : data.remarks, disabled : this.flag == "view"}, [Validators.required,Validators.maxLength(40)]),
      sequenceNumber: new FormControl(data.sequenceNumber),
      documentId: new FormControl(data.documentId, [Validators.required]),
      fileName: new FormControl(data.fileName, [Validators.required]),
      employeeCode: new FormControl(data.employeeNumber),
      employeeName: new FormControl(data.employeeName),
    });
    let file = {'name': ''};
    file.name = data.fileName;
    this.attachmentList.push(file);
    this.documentId = data.documentId;
    this.passImprestData(this.medicalForm.value);
    return this.medicalForm;
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  openPdf(data: any): void {
    let name = '';  
    let index = 0;  
    if(data.imageUrlClicked){
      name = data.fileClicked.name.split('.')[0];
      this.onViewPdf(data.fileClicked, name);
    } else {
      name = this.attachmentList[index] ? this.attachmentList[index].name.split('.')[0]: '';
      let lineNumber:String = this.documentId ? this.documentId : '';
      this.subscriptionList.push(
      this.benefitService.viewAttachmentAdvanceLoan(lineNumber).subscribe((data: any) => {
        if(data){
           this.onViewPdf(data, name); 
        }
      }, error => {
        this.messageService.showMessage(
          'File preview not available',
          'Error',
          'warning-icon',
          'CLOSE'
        );
        console.log(error);
      })
     );
    }
  }
  onViewPdf(data: any, name: string): void {
    let file = new Blob([data],{type: 'application/pdf'});
    let pdfUrl = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = pdfUrl;
    dialogRef.componentInstance.title = name;
    dialogRef.componentInstance.pdfName = name;
  }

  prepareFilesList(files: Array<any>) {
      if (files.length > 0) {
        this.attachmentList.push(files[0]);
        this.medicalForm.get('fileName').setValue(files[0].name, { emitModelToViewChange: false });
        this.medicalForm.get('fileName').updateValueAndValidity();
        this.uploadFile(this.attachmentList);
      } else {
        this.medicalForm.get('fileName').setValue('', { emitModelToViewChange: false });
        this.medicalForm.get('fileName').updateValueAndValidity();
      }
  }

  deleteFile(data: any) {
    let payload = {"referenceNumber": "",
    "lineNumber":  this.documentId ? this.documentId : "" };
    let upload = this.benefitService
      .deleteAttachmentAdvanceLoan(payload)
      .subscribe(
        (data: any) => {
          if(data.responseStatus == "SUCCESS"){
            this.medicalForm.get('documentId').setValue('', { emitModelToViewChange: false });
            this.medicalForm.get('documentId').updateValueAndValidity();
            this.medicalForm.get('fileName').setValue('', { emitModelToViewChange: false });
            this.medicalForm.get('fileName').updateValueAndValidity();
            this.passImprestData(this.medicalForm.value);
            this.attachmentList = [];
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.subscriptionList.push(upload);

  }

  uploadFile(attachmentList){
    let upload = this.benefitService
      .addAttachmentAdvanceLoan(attachmentList)
      .subscribe(
        (data: any) => {
          if(data.responseStatus == "SUCCESS"){
            this.documentId = data.responseData;
            this.medicalForm.get('documentId').setValue(this.documentId, { emitModelToViewChange: false });
            this.medicalForm.get('documentId').updateValueAndValidity();
            this.passImprestData(this.medicalForm.value);
          }
        },
        (err) => {
          console.log(err);
        }
      );

      this.subscriptionList.push(upload);
  }

}
