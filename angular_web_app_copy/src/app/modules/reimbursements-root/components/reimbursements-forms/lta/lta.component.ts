import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ComponentFactoryResolver,
  Input,
  Inject,
} from '@angular/core';
import { ReimbursementsService } from '../../../services/reimbursements.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '../../../../../../../node_modules/@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Observable, empty } from 'rxjs';
import * as moment from 'moment';
import { HelperService } from 'src/app/components/core/services/helper.service';
import { LTAConstants } from './lta.constants';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { AttachDoc, ReimbursementsDetails } from '../../../utils/reimbursements.model';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-lta',
  templateUrl: './lta.component.html',
  styleUrls: ['./lta.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LtaComponent implements OnInit {
  public LTAform: FormGroup;
  totalAmount: number = 0;
  ltaItem: any[] = [1];
  subscriptionList: Subscription[] = [];
  dropdownList: any[] = [];
  today = new Date();
  maxDate = new Date();
  filteredOptions = [];
  public baseform: FormGroup;
  form: FormArray;
  selectedFrom: any[];
  distanceinKM: Number;
  fileAttached: boolean = false;
  file: any[]= [];
  setOperation: String;
  viewMode: Boolean = false;
  @Input() public typeDetails: any;
  filteredOptionsTo = [];
  rembTypeDetails: any;
  validFile: boolean = false;
  reimburseStatusKey: any;
  claimNumber: any;
  claimDetails: any;
  headerdetail: any;
  obj = {
    attachDoc: null,
  };
  payload: any;
  billDetails: ReimbursementsDetails = new ReimbursementsDetails(this.obj);
  billDetailsData: ReimbursementsDetails[] = [];
  lineNoToDelete: string[] = [];
  setClaimDetail: any = [];
  sapCode: any;
  typeText: any;
  totalAmountDis: any;
  amount: any;
  balanceAmount: any;
  counter = 1;
  setClaimDetailObj: any = []; //final payload for billDetails
  addAttachmentKey: string = '';
  attachmentObj: AttachDoc = new AttachDoc([]);
  childFormGroup:FormGroup;
  statusText: boolean = false;
  displayFiles: any[] = [];
  constructor(
    private reimbursmentService: ReimbursementsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    private helperService: HelperService,
    private renderer: Renderer2,
    private messageService: MessageModalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.maxDate.setDate(this.today.getDate());
    this.baseform = new FormGroup({
      leaveBeginDate: new FormControl(Date, [Validators.required]),
      leaveEndDate: new FormControl(Date, [Validators.required]),
      claimYear: new FormControl('', [Validators.required]),
      selfTravelled: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  ngOnInit(): void {
    this.getClaimValue();
    this.lineNoToDelete = [];
    this.setOperation = this.data.payLoad.setOperation;
    this.viewMode = this.data.payLoad.viewMode;
    this.form=new FormArray([]);

    this.getDropdownLta();

    if (this.setOperation == 'Edit') {
      
      console.log('Details===>', this.data);
      
      this.claimDetails = JSON.parse(
        JSON.stringify(this.data.payLoad.typeDetails)
      );
      if (this.data.payLoad.typeDetails.statusText.includes('Saved')) {
        this.statusText = true;
      } else {
        this.statusText = false;
      }
      this.sapCode = this.data.payLoad.typeDetails.reimbursementTypeKey.sapCode;
      this.typeText = this.data.payLoad.typeDetails.reimbursementTypeKey.value;

      this.headerClaimDetails();
      this.reimbursmentService
        .getClaimBills(this.claimDetails.claimNumber)
        .subscribe(
          (data: ReimbursementsDetails[]) => {
            
            this.baseform = new FormGroup({
              leaveBeginDate: new FormControl(
                new Date(this.headerdetail.leaveBeginDate),
                [Validators.required]
              ),
              leaveEndDate: new FormControl(
                new Date(this.headerdetail.leaveEndDate),
                [Validators.required]
              ),
              claimYear: new FormControl(this.headerdetail.claimYear, [Validators.required]),
              selfTravelled: new FormControl(this.headerdetail.selfTravelled, [
                Validators.requiredTrue,
              ]),
            });
            this.billDetailsData = data;
            if (this.billDetailsData.length > 0) {
              this.claimNumber = this.billDetailsData[0].claimNumber;
              
              for (let bill of this.billDetailsData) {
                this.file.push(bill.attachDoc);
                if(bill.attachDoc){
                  let obj = {
                    name: bill.attachDoc.fileName,
                    lineNumber: bill.attachDoc.lineNumber
                  }
                  this.displayFiles.push([obj]);
                }else{
                  this.displayFiles.push([]);
                }
                this.setEditViewObj(bill);
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }else{
      this.statusText = false;
      this.sapCode = this.data.typeDetails.reimbursementType.sapCode;
      this.addFormDetail();
    }
  }

  addNewItem(counter) {
    

    this.childFormGroup = new FormGroup({
      travelMode: new FormControl('', [Validators.required]),
      travelClass: new FormControl('', []),
      ltaPlaceFrom: new FormControl('', [Validators.required]),
      ltaPlaceTo: new FormControl('', [Validators.required]),
      dependent: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
      ]),
      billNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      billDate: new FormControl(Date, [Validators.required]),
      billAmount: new FormControl('', [
        Validators.required,
        ,
        Validators.maxLength(13),
      ]),
      distance: new FormControl('', [Validators.required]),
      remarks: new FormControl('', Validators.maxLength(200)),
      attachment: new FormControl(''),
      lineNo: new FormControl('000' + counter),
    });
    return this.childFormGroup;
  }
  
  addFormDetail() {
    this.filteredOptions = this.dropdownList['FROM_CITY'];
    this.filteredOptionsTo = this.dropdownList['TO_CITY'];
    if (this.billDetailsData.length > 0) {
      if (this.counter == 1) {
        let count = this.billDetailsData[this.billDetailsData.length - 1].lineNumber;
        let indexToStartFrom = count.substring(count.length - 1);
        this.counter = parseInt(indexToStartFrom) + 1;
        this.form.push(this.addNewItem(this.counter));
      } else {
        this.form.push(this.addNewItem(this.counter));
        this.counter++;
      }
    } else {
      this.form.push(this.addNewItem(this.counter));
      this.counter++;
    }
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  createClicked(actionStatus) {
    let lineNumberDupli = this.checkDuplicateRowVal(this.form.value);
    if (lineNumberDupli.length > 0) {
      let duplMsg = 'Entries at ' + lineNumberDupli.join() + ' should not same';
      this.messageService.showMessage(
        duplMsg,
        'Error',
        'warning-icon',
        'CLOSE'
      );
      return;
    }

    this.messageService.showConfirmation(
      '1. For Air travel, both Bill and stamped Boardin pass/Travel certificate from airways is mandatory to cliam exemption, without which teh claim willbe rejected. <br> 2. LTA will be paid as taxable if no supportings are attached. Pls check for attachment in your LTA claim.',
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
          this.messageService.showConfirmation(
            '1. I hereby confirm that this LTA claim includes only trvael cost i.e. to and from fares by the shortest route within India for self, my spouse & upto 2 children, my parents and brothers and sisters wgo are fully or mainly dependent on me. <br> 2. I understand that the applicable Income Tax exemption isbeing extended based on proof of expensive provided by me and I confirm that I will preserve teh original supportings for verification.',
            'Confirmation',
            'confirmation-icon',
            (reason) => {
              if (reason === 'YES') {
                let confiMessage = '';
                if (actionStatus == 'draft') {
                  this.reimburseStatusKey = 'N';
                  confiMessage = 'Do you want to Save as Draft?';
                } else if (actionStatus == 'submit') {
                  this.reimburseStatusKey = 'T';
                  confiMessage =
                    'Ensure all supporting documents are attached. Do you want to save?';
                }
                this.messageService.showConfirmation(
                  confiMessage,
                  'Confirmation',
                  'confirmation-icon',
                  (reason) => {
                    if (reason === 'YES') {
                      this.createPayLoad('', 'create');
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  computeTotalAmount() {
    this.totalAmount = 0;
    let data = this.LTAform.value.ltaItems;
    if (data && data.length > 0) {
      for (let bill of data) {
        this.totalAmount += Number(bill.billAmount);
      }
    }
  }

  getDropdownLta() {
    this.subscriptionList.push(
      this.reimbursmentService.getDropdownLta().subscribe(
        (data: any) => {
    if (data) {
      data['CLAIM_YEAR'] = data['CLAIM_YEAR'].filter(
        (item) => item.code !== 'ZISPACE'
      );
      data['MODE_OF_TRAVEL'] = data['MODE_OF_TRAVEL'].filter(
        (item) => item.code !== 'ZISPACE'
      );
      data['CLASS_OF_TRAVEL'] = data['CLASS_OF_TRAVEL'].filter(
        (item) => item.code !== 'ZISPACE'
      );
      data['FROM_CITY'] = data['FROM_CITY'].filter(
        (item) => item.code !== 'ZISPACE'
      );
      data['TO_CITY'] = data['TO_CITY'].filter(
        (item) => item.code !== 'ZISPACE'
      );
      this.dropdownList = data;
      this.filteredOptionsTo = this.dropdownList['TO_CITY'];
      this.filteredOptions = this.dropdownList['FROM_CITY'];
    }
        },
        (error: any) => {
          console.log(error.message);
        }
      )
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }

  googleCalculatedDistance(origin, destination, index) {
    this.distanceinKM = 0;
    this.subscriptionList.push(
      this.helperService
        .getGoogleCalculatedDistance(origin, destination)
        .subscribe(
          (data: Number) => {
            this.distanceinKM = data;
            if (this.distanceinKM != 0) {
              this.form.controls[index]
                .get('distance')
                .setValue(this.distanceinKM);
              this.form.updateValueAndValidity();
            } else if (this.distanceinKM == 0) {
              this.form.controls[index].get('distance').setValue(0);
              this.form.updateValueAndValidity();
            }
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
    );
  }

  calculateDistance(index, event) {
    let mode = this.form.controls[index]['controls'].travelMode.value;
    if (mode == '004' || mode == '003' || mode == '006') {
      let origin =
        this.form.controls[index]['controls'].ltaPlaceFrom.value != ''
          ? this.form.controls[index]['controls'].ltaPlaceFrom.value
          : '';
      let destination =
      this.form.controls[index]['controls'].ltaPlaceTo.value != ''
          ? this.form.controls[index]['controls'].ltaPlaceTo.value
          : '';

      {
        if (
          this.helperService.isScriptAvailable &&
          origin != '' &&
          destination != ''
        ) {
          this.googleCalculatedDistance(origin, destination, index);
        } else {
          this.subscriptionList.push(
            this.helperService.loadScript(this.renderer).subscribe(
              (data) => {
                this.googleCalculatedDistance(origin, destination, index);
              },
              (error: HttpErrorResponse) => {}
            )
          );
        }
      }
    }
  }

  travelMode(event, index) {
    if(this.data.payLoad.setOperation != 'Edit'){
      this.form.controls[index].get('distance').setValue('');
    }
    
    if (event.value == '001') {
      this.dropdownList['CLASS_OF_TRAVEL'] = LTAConstants.Air;
    } else if (event.value == '004') {
      this.dropdownList['CLASS_OF_TRAVEL'] = LTAConstants.Taxi;
    } else if (event.value == '003') {
      this.dropdownList['CLASS_OF_TRAVEL'] = LTAConstants.Car;
    } else if (event.value == '005') {
      this.dropdownList['CLASS_OF_TRAVEL'] = LTAConstants.Train;
    } else if (event.value == '002') {
      this.dropdownList['CLASS_OF_TRAVEL'] = LTAConstants.Bus;
    } else if (event.value == '006') {
      this.dropdownList['CLASS_OF_TRAVEL'] = LTAConstants.Ship;
    }
  }

  onAttachFile(files: Array<any>, index) {
    if (files.length > 0) {
      let isFileSizeValid = false;
      let isFileTypeValid = false;
      isFileSizeValid = this.reimbursmentService.isFileSizeValid(files[0]);
      isFileTypeValid = this.reimbursmentService.isFileTypeValid(files[0]);
      if (isFileSizeValid && isFileTypeValid) {
        if (index !== -1 && this.file.length > index) {
          this.file[index] = files[0];
        } else {
          this.file.push(files[0]);
        }

        this.form.controls[index]['controls'].attachment.value =
          files[0].name;
        this.validFile = false;
      } else {
        this.form.controls[index]['controls'].attachment.value =
          '';
        this.validFile = true;
      }
      this.createPayLoad(index, 'addAttachment');
    }
  }

  removeAt(index) {
    let lineNumber = '';
    lineNumber = this.form.controls[index]['controls'].lineNo.value;
    this.form.removeAt(index);
    this.file.splice(index, 1);
    this.lineNoToDelete.push(lineNumber);
    this.createPayLoad(index, 'deleteRow');
  }
  

  changeValue(event, i) {
    this.form.controls[i]['controls'].ltaPlaceFrom.valueChanges.subscribe(
      (changes) => {
        this.filteredOptions = this.dropdownList['FROM_CITY'];
        this.filteredOptions = this.filteredOptions.filter((item) => {
          return item.value
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        });
      }
    );
  }

  changeValueTo(event, i) {
    this.form.controls[i]['controls'].ltaPlaceTo.valueChanges.subscribe(
      (changes) => {
        this.filteredOptionsTo = this.dropdownList['TO_CITY'];
        this.filteredOptionsTo = this.filteredOptionsTo.filter((item) => {
          return item.value
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        });
      }
    );
  }
  expansionReset() {
    this.filteredOptions = this.dropdownList['FROM_CITY'];
    this.filteredOptionsTo = this.dropdownList['TO_CITY'];
  }

  removeFile(data: any,index: number) {

    this.createPayLoad(index, 'deleteAttachment');
    this.form.controls[index][
      'controls'
    ].attachment.value = '';
    this.file[index] = null;
    
  }

  setEditViewObj(bill) {
    let viewMode = this.data.payLoad.viewMode;
    let setEditAttach = '';
    if (bill.attachDoc != 'undefined' && bill.attachDoc != null) {
      setEditAttach = bill.attachDoc.fileName;
    }
    
    bill.billDate = new Date(bill.billDate);
    
    this.form.push(
      this.fb.group({
        travelMode: new FormControl({ value: bill.travelMode,disabled: viewMode }, [Validators.required]),
        travelClass: new FormControl({ value: bill.travelClass,disabled: viewMode }, []),
        ltaPlaceFrom: new FormControl({ value: bill.ltaPlaceFrom,disabled: viewMode }, [Validators.required]),
        ltaPlaceTo: new FormControl({ value: bill.ltaPlaceTo,disabled: viewMode }, [Validators.required]),
        dependent: new FormControl({ value: bill.dependent,disabled: viewMode }, [
          Validators.required,
          Validators.maxLength(2),
        ]),
        billNumber: new FormControl({ value: bill.billNumber,disabled: viewMode }, [
          Validators.required,
          Validators.maxLength(20),
        ]),
        billDate: new FormControl({ value: bill.billDate,disabled: viewMode }, [Validators.required]),
        billAmount: new FormControl({ value: bill.billAmount,disabled: viewMode }, [
          Validators.required,
          ,
          Validators.maxLength(13),
        ]),
        distance: new FormControl({ value: bill.distance,disabled: viewMode }, [Validators.required]),
        remarks: new FormControl({ value: bill.remarks,disabled: viewMode },
          Validators.maxLength(200)),
        attachment: new FormControl({ value: setEditAttach,disabled: viewMode }),
        lineNo: new FormControl(bill.lineNumber),
      })
    );
    return this.form;
  }

  getClaimValue() {
    this.reimbursmentService.getEligibility().subscribe(
      (data) => {
    if (data.length > 0) {
      for (let item of data) {
        if (item.reimbursementType.sapCode == 'SLTA') {
          this.totalAmountDis = item.totalAmount;
          this.amount = item.amount;
          this.balanceAmount = item.balanceAmount;
        }
      }
    }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkDuplicateRowVal(formVals) {
    let tempFormVal = [];
    let lineNumberDupliVal = [];
    let i = 1;
    for (let formval of formVals) {
      if (tempFormVal.length > 0) {
        let j = 1;
        for (let checkDuplicate of tempFormVal) {
          checkDuplicate.billDate = moment(checkDuplicate.billDate).format('MM/DD/YYYY');
          formval.billDate = moment(formval.billDate).format('MM/DD/YYYY');
          if (
           
            checkDuplicate.billNumber == formval.billNumber &&
            new Date(checkDuplicate.billDate).getTime() ==
              new Date(formval.billDate).getTime() &&
            checkDuplicate.billAmount == formval.billAmount
          ) {
            let lineNumber = 'Line no ' + j + ' and Line no ' + i;
            lineNumberDupliVal.push(lineNumber);
          }
          j++;
        }
      }
      tempFormVal.push(formval);
      i++;
    }
    return lineNumberDupliVal;
  }

  headerClaimDetails() {
    this.reimbursmentService
      .getClaimHeader(this.claimDetails.claimNumber)
      .subscribe(
        (data) => {
          this.headerdetail = data[0];
        },
        (err) => {
          console.log(err);
        }
      );
  }

  

  createPayLoad(index, opr) {
    let totalAmt = 0; //total Amt of all claim
    this.setClaimDetailObj = [];
    if (opr == 'addAttachment') {
      this.addAttachmentFuctionality(index, totalAmt, opr);
    } else if (opr == 'deleteAttachment') {
      this.deleteAttachmentFunctionality(index, opr);
    } else if (opr == 'deleteRow') {
      this.deleteRow(index, opr);
    } else if (opr == 'create') {
      this.createAndEdit(totalAmt, opr);
    }
  }

  addAttachmentFuctionality(index, totalAmt, opr) {
    this.addAttachmentKey = 'A';
    let lineNumber = this.form.controls[index]['controls'].lineNo
      .value;
    this.billDetails.lineNumber = lineNumber;
    totalAmt = totalAmt +
      parseInt(
        this.form.controls[index]['controls'].billAmount.value
      );
    this.billDetails.claimNumber = this.claimNumber
      ? this.claimNumber
      : this.addAttachmentKey == 'A'
      ? ' '
      : '';
      
      this.billDetails.billNumber = this.form.controls[index]['controls'].billNumber.value;
      this.billDetails.billDate = new Date(
        moment(this.form.controls[index]['controls'].billDate.value).format('MM/DD/YYYY')
      ).getTime();
      this.billDetails.billAmount = this.form.controls[index]['controls'].billAmount.value;
      this.billDetails.remarks = this.form.controls[index]['controls'].remarks.value;
      this.billDetails.travelMode = this.form.controls[index]['controls'].travelMode.value;
      this.billDetails.travelClass = this.form.controls[index]['controls'].travelClass.value;
      this.billDetails.ltaPlaceFrom = this.form.controls[index]['controls'].ltaPlaceFrom.value;
      this.billDetails.ltaPlaceTo = this.form.controls[index]['controls'].ltaPlaceTo.value;
      this.billDetails.dependent = this.form.controls[index]['controls'].dependent.value;
      this.billDetails.distance = this.form.controls[index]['controls'].distance.value;

    
      let claimDetailObj = JSON.parse(JSON.stringify(this.billDetails));
    this.setClaimDetailObj.push(claimDetailObj);
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);

    this.hitOperationApi(index, finalPayLoad, opr);
  }

  deleteAttachmentFunctionality(index, opr) {
    this.attachmentObj.fileName = this.file[index].fileName;
    this.attachmentObj.claimNumber = this.claimNumber;
    this.attachmentObj.reimbursementType = this.sapCode;
    this.attachmentObj.fileType = '.pdf';
    this.attachmentObj.deleteFlag = false;
    this.attachmentObj.lineNumber = this.form.controls[index][
      'controls'
    ].lineNo.value;
    let claimDetailObj = JSON.parse(JSON.stringify(this.attachmentObj));
    this.hitOperationApi(index, claimDetailObj, opr);
  }

  deleteRow(index, opr) {
    this.setClaimDetailObj = null;
    var finalPayLoad = this.createFinalPayLoad(this.setClaimDetailObj, 0);
    this.hitOperationApi(index, finalPayLoad, opr);
  }

  createAndEdit(totalAmt, opr) {
    let lineNumber = '';
    this.form.value.forEach((element, i) => {
      if (this.setOperation == 'Edit' && i < this.billDetailsData.length) {
        this.billDetails.attachDoc = this.billDetailsData[i].attachDoc;
        lineNumber = this.billDetailsData[i].lineNumber;
      } else {
        this.billDetails.attachDoc = null;
        lineNumber = '000' + (this.billDetailsData.length + 1);
      }

      
      this.billDetails.hasAttached = this.file[i] != null ? true : false;
      this.billDetails.reimbursementType = 'SLTA';
      this.billDetails.claimNumber = '';
      this.billDetails.billNumber = element.billNumber;
      this.billDetails.billDate = new Date(
        moment(element.billDate).format('MM/DD/YYYY')
      ).getTime();
      this.billDetails.billAmount = element.billAmount;
      this.billDetails.remarks = element.remarks;
      this.billDetails.travelMode = element.travelMode;
      this.billDetails.travelClass = element.travelClass;
      this.billDetails.ltaPlaceFrom = element.ltaPlaceFrom;
      this.billDetails.ltaPlaceTo = element.ltaPlaceTo;
      this.billDetails.dependent = element.dependent;
      this.billDetails.distance = element.distance;
      this.billDetails.lineNumber = element.lineNo;
      let claimDetailObj = JSON.parse(JSON.stringify(this.billDetails));
      this.setClaimDetailObj.push(claimDetailObj);
    });
    var finalPayLoad = this.createFinalPayLoad(
      this.setClaimDetailObj,
      totalAmt
    );
    this.addAttachmentKey = '';
    this.hitOperationApi(0, finalPayLoad, opr);
  }

  createFinalPayLoad(obj, totalAmt) {
    
    var payload = {
      claimDetail: obj,
      reimbursementType: this.sapCode,
      totalAmount: totalAmt != 0 ? totalAmt : 0,
      requestOperation: this.data.payLoad.setOperation == 'Edit' ? 'EE' : 'EC',
      deletedLineNumber: this.lineNoToDelete,
      claimNumber: this.claimNumber
        ? this.claimNumber
        : this.addAttachmentKey == 'A'
        ? ' '
        : '',
      reimbursementStatus: this.reimburseStatusKey
        ? this.reimburseStatusKey
        : '',
      requestNumberNC: '',
      leaveBeginDate:new Date(
              moment(this.baseform.value.leaveBeginDate).format('MM/DD/YYYY')
            ).getTime(),
      leaveEndDate: new Date(
        moment(this.baseform.value.leaveEndDate).format('MM/DD/YYYY')
      ).getTime(),
      selfTravelled: this.baseform.value.selfTravelled,
      claimYear: this.baseform.value.claimYear,
    };
    console.log(payload);
    return payload;
  }

  hitOperationApi(index, payload, opr) {
    console.log(opr);
    if (opr == 'addAttachment') {
      this.reimbursmentService
        .addAttachment(payload, this.file[index])
        .subscribe(
          (data: any) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (opr == 'deleteAttachment') {
      this.reimbursmentService.deleteAttachment(payload).subscribe(
        (data: any) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (opr == 'deleteRow') {
      this.reimbursmentService.deleteRows(payload).subscribe(
        (data: any) => {
          console.log(data);
          this.lineNoToDelete = [];
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (opr == 'create') {
      this.reimbursmentService.createClaim(payload).subscribe((data: any) => {
        console.log(data);
        if (data.responseStatus == 'FAILED') {
          this.messageService.showMessage(
            data.systemErrMsg,
            'Error',
            'warning-icon',
            'CLOSE'
          );
        } else {
          let msg = JSON.parse(data.responseData);
          this.messageService.showMessage(
            msg.message,
            'Success',
            'success-icon',
            'CLOSE'
          );
          this.dialogRef.close('success');
        }
      });
    } else {
      //do nothimg
    }
  }

  onFileDrops(data, index): void {        
    this.onAttachFile(data.files, index);
  }

  openPdf(data: any, index: number): void {
    let name = '';    
    if(data.imageUrlClicked){
      name = data.fileClicked.name.split('.')[0];
      this.onViewPdf(data.fileClicked, name);
    } else {
      name = this.file[index] ? this.file[index].fileName.split('.')[0]: '';
     let obj = {
      sapCode: this.file[index].reimbursementType,
      claimNo: this.file[index].claimNumber,
      lineNo: this.file[index].lineNumber 
     };
     this.subscriptionList.push(
      this.reimbursmentService.openAttachment(obj).subscribe((data: any) => {
        if(data){
           this.onViewPdf(data, name); 
        }
      }, error => {
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

  deleteFile(data: any,index: number) {
    this.removeFile(data,index);
  }

  numericOnly(event, index, grp){
    let numericVal = this.reimbursmentService.spacevalidation(event);
    if (numericVal) {
      let inputVal = event.target.value.slice(1, -1);
      grp.get(event.target.name).patchValue(inputVal);
    } else {
      if (this.reimbursmentService.setNumeric(event.target.value)) {
        let inputVal = event.target.value.slice(0, -1);
        grp.get(event.target.name).patchValue(inputVal);
      }
  }
}
}
