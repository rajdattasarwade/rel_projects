import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  Input,
} from '@angular/core';
import { InvestmentDeclarationRootService } from '../investment-declaration-root.service';
import { Subscription } from 'rxjs';
import {
  Section80cViewEditModel,
  Section80CHeaderDetail,
  ViewEditSection80cColumns,
  ViewEditSection80cColumnsValues,
} from './section-80c.model';
import { MatTableDataSource } from '@angular/material/table';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeclarationMessage } from '../section80d/section80d.model';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-section-80c',
  templateUrl: './section-80c.component.html',
  styleUrls: ['./section-80c.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Section80cComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private section80cViewEditDataList: Section80cViewEditModel[];
  @Input() referenceNumber: string;
  @Input() edit: boolean;
  @Input() create:boolean;
  displayedColumns = ViewEditSection80cColumns;
  displayedColumnsValues = ViewEditSection80cColumnsValues;
  sourceData;
  section80CHeaderDetailList: Section80CHeaderDetail[] = [];
  isAcknowledged: boolean = false;
  isFormInvalid: boolean = false;
  showAttachmentColumn: boolean = true;
  employeeRemark: string;
  approveRemark: string;
  constructor(
    public dialog: MatDialog,
    private service: InvestmentDeclarationRootService,
    public messageModalService: MessageModalService,
    public dialogRef: MatDialogRef<Section80cComponent>
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.edit && this.showInfoMessage(true);
    this.get80cDeductionViewEdit();
    this.getIsFormInvalidStatus();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getIsFormInvalidStatus() {
    var sub = this.service.isFormInvalidSubject.subscribe((data: boolean) => {
      this.isFormInvalid = data;
    });
    this.subscription.add(sub);
  }
  get80cDeductionViewEdit() {
    const sub = this.service
      .get80cDeductionViewEdit(this.referenceNumber,this.create)
      .subscribe(
        (data: Section80cViewEditModel[]) => {
          this.section80cViewEditDataList = data;
          console.log('sec80c api responce data=>', data);
          this.employeeRemark = data[0].employeeComments;
          this.approveRemark = data[0].approverComments;
          this.showAttachmentColumn = data[0].conAct;
          if (!this.showAttachmentColumn) {
            let removeFromIndex = this.displayedColumns.indexOf('attachFlag');
            removeFromIndex > 0 &&
              this.displayedColumns.splice(removeFromIndex, 1);
            let rm2 = this.displayedColumns.indexOf('actualAmount');
            removeFromIndex > 0 && this.displayedColumns.splice(rm2, 1);
            let rm3 = this.displayedColumns.indexOf('verifiedAmount');
            removeFromIndex > 0 && this.displayedColumns.splice(rm3, 1);
          }
          this.service.setEditView80cDataList(this.section80cViewEditDataList);
          this.populateDataSource();
          console.log('data section 80 c view edit=>', data);
        },
        (error) => {
          console.error('Error in View/Edit section80c =>', error);
        },
        () => {}
      );
    this.subscription.add(sub);
  }

  populateDataSource() {
    var sub = this.service.editView80cDataListSubject.subscribe((data) => {
      console.log('populateDataSource=>', data);
      this.section80CHeaderDetailList = data[0]['section80CHeaderDetail'];
      this.sourceData = new MatTableDataSource<Section80CHeaderDetail>(
        data[0]['section80CHeaderDetail']
      );
    });
    this.subscription.add(sub);
    this.populateAttachmentMap();
  }
  populateAttachmentMap() {
    this.section80CHeaderDetailList.forEach((x) => {
      this.service.addtoAttachmentMap80c(x.attachmentProofDetail, x.lineNumber);
    });
    console.log('attachment map=>', this.service.attacmentMap80c);
  }
  openAttachment(element: Section80CHeaderDetail) {
    console.log('open attachment=>', element);
    const dialogRef = this.dialog.open(UploadFilesComponent, {
      width: '600px',
      minHeight: '300px',
    });
    dialogRef.componentInstance.element = element;
    dialogRef.componentInstance.attachmentAvailable =
      element.attachFlag || element.hasAttachment;
    dialogRef.componentInstance.edit = this.edit;
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  editActualAmount(element: Section80CHeaderDetail) {
    console.log('editActualAmount=>', element);
  }
  editProposedAmount(element: Section80CHeaderDetail) {
    console.log('editProposedAmount=>', element);
  }
  openAttachmentMessageModel() {}

  showInfoMessage(flag: boolean) {
    var msg = flag
      ? 'Please click on Sr.No. to upload the PDF (File size < 2MB per each line item)'
      : 'Request failed';
    var status = flag ? 'Section 80C' : 'Error';
    var icon = flag ? 'info-icon' : 'warning-icon'; // this should be info
    this.messageModalService.showMessage(msg, status, icon, 'OK');
  }
  onAttachFile(event) {
    console.log('onAttachFile event...=>', event);
  }
  cancel() {
    console.log('cancel changes..');
    this.closeView();
  }
  closeView() {
    this.dialogRef.close();
  }
  submit() {
    console.log('submit section 80c');
    this.onSubmit();
  }
  saveFromData() {
    console.log('saveFromData');
  }
  populatePayload() {}

  showDeclarationMessage() {
    var msg = DeclarationMessage;
    var status = 'Decleration';
    var icon = 'info-icon';
    !this.isAcknowledged &&
      this.messageModalService.showMessage(msg, status, icon, 'OK');
  }
  bindAmount(item, event) {
    item.actualAmount = Number(event.target['value']);
    this.checkInput(item);
  }
  bindProposedAmount(item, event) {
    item.proposedAmount = Number(event.target['value']);
    this.checkProposedInput(item);
  }
  checkProposedInput(item: Section80CHeaderDetail) {
    if (item.proposedAmount == 0) {
      this.service.removeFromListOFInvalidItems(item);
    } else if (Number(item.maximumLimit - item.proposedAmount) >= 0) {
      this.service.removeFromListOFInvalidItems(item);
    } else {
      this.service.addToListOFInvalidItems(item);
    }
  }
  checkInput(item: Section80CHeaderDetail) {
    if (item.actualAmount == 0) {
      this.service.removeFromListOFInvalidItems(item);
    } else if (Number(item.maximumLimit - item.actualAmount) >= 0) {
      this.service.removeFromListOFInvalidItems(item);
    } else {
      this.service.addToListOFInvalidItems(item);
    }
  }
  viewPDF(filePath) {
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    dialogRef.componentInstance.pdfUrl = filePath;
    dialogRef.componentInstance.title = 'Attached File';
  }
  dataOfSecCDataItems: any[] = [];
  attachmentData: any;
  onSubmit() {
    let attachArray = [];
    let sec80cDetails = this.service.getEditView80cDataList[0];
    let items = sec80cDetails['section80CHeaderDetail'];

    for (let data of items) {
      if (
        this.showAttachmentColumn &&
        data.attachFlag &&
        data.actualAmount == 0
      ) {
        let message = 'Actual Amount is Invalid for SrNo.:' + data.lineNumber;
        this.showErrorMessage(message);
        return;
      } 
      // else if (
      //   this.showAttachmentColumn &&
      //   !data.attachFlag &&
      //   data.actualAmount > 0
      // ) {
      //   let message = 'Attachment is missing for SrNo.:' + data.lineNumber;
      //   this.showErrorMessage(message);
      //   return;
      // }
      let sec80cItem = {
        lineNumber: data.lineNumber,
        referenceNumber: '', //data.value.referenceNumber,
        action: data.action,
        serialNumber: data.serialNumber,
        subSection: data.subSection,
        subDivision: data.subDivision,
        name: data.name,
        longName: data.longName,
        maximumLimit: data.maximumLimit,
        proposedAmount: data.proposedAmount,
        actualAmount: data.actualAmount,
        verifiedAmount: data.verifiedAmount,
        financialYear: data.financialYear,
        status: data.status,
        hasAttachment: data.hasAttachment ? data.hasAttachment : false,
        deleteAttachment: data.deleteAttachment ? data.deleteAttachment : false,
      };
      this.dataOfSecCDataItems.push(sec80cItem);
    }

    this.attachmentData = {
      // referenceNumber: this.sec80cDetails.referenceNumber,
      referenceNumber: this.referenceNumber,
      message: sec80cDetails.message,
      action: sec80cDetails.action,
      messageType: sec80cDetails.messageType,
      conAct: sec80cDetails.conAct,
      employeeComments: this.employeeRemark,
      approverComments: sec80cDetails.approverComments,
      sec80CRequestDetail: this.dataOfSecCDataItems,
    };

    Array.from(this.service.attachFileMap80C.values()).forEach((file) => {
      attachArray.push(file);
    });

    this.service.save80C(this.attachmentData, attachArray).subscribe(
      (data) => {
        this.populateResponseMessage(data);
      },
      (error) => {
        this.showErrorMessage('Unexpected Error Occurred!');
        console.error('Section 80 C SAVE ERROR => ', error);
      }
    );
  } //end
  populateResponseMessage(data) {
    var msg =
      data['responseStatus'] == 'SUCCESS'
        ? 'Successfully updated'
        : data['responseStatus'] == 'FAILED'
        ? data['systemErrMsg']
        : 'Request failed';
    var status = data['responseStatus'] == 'SUCCESS' ? 'Success' : 'Error';
    var icon =
      data['responseStatus'] == 'SUCCESS' ? 'success-icon' : 'warning-icon';
    this.messageModalService.showMessage(msg, status, icon, 'CLOSE', () => {
      this.dialogRef.close();
    });
  }
  showErrorMessage(message) {
    this.messageModalService.showMessage(
      message,
      'Error',
      'warning-icon',
      'CLOSE'
    );
  }
}
