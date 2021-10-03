import { Component, OnInit, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { AddEditDependentModel, choiceArray, AddEditDependentPayloadModel } from '../family-details-model';
import { Subscription } from '../../../../../../../node_modules/rxjs';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../node_modules/@angular/forms';
import { PersonalDetailsService } from '../../../services/personal-details.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../../node_modules/@angular/material/dialog';
import { MessageModalService } from '../../../../../components/shared/services/message-modal-service';
import { PdfViewerModalComponent } from '../../../../../components/shared/pdf-viewer-modal/pdf-viewer-modal.component';

@Component({
  selector: 'app-add-family-dependent-modal',
  templateUrl: './add-family-dependent-modal.component.html',
  styleUrls: ['./add-family-dependent-modal.component.css']
})
export class AddFamilyDependentModalComponent implements OnInit {

  @Input() edit: boolean = false;
  @Input() editObject: AddEditDependentModel;
  today: Date = new Date();
  subscription: Subscription;
  formGroup: FormGroup;
  COUNTRIES: any;
  OCCUPATIONS: any;
  RELATIONS: any;
  NATIONALITIES: any;
  insuranceCoverageDropdown: any[] = choiceArray;
  dependentDropdown: any[] = choiceArray;
  noReasonKeydDropdown: any[] = choiceArray;
  fileObj: any;

  constructor(
    private personalDService: PersonalDetailsService,
    public dialog: MatDialog,
    public dialogRefSelf: MatDialogRef<AddFamilyDependentModalComponent>,
    private messageModalService: MessageModalService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public overviewData: any,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getNoReason();
    this.populateLookupData();
    this.populateForm();
  }

  populateLookupData() {
    this.COUNTRIES = this.personalDService.getLookupdata['COUNTRIES'];
    this.OCCUPATIONS = this.personalDService.getLookupdata['OCCUPATIONS'];
    this.RELATIONS = this.personalDService.getLookupdata['RELATIONS'];
    /** remove empty value */
    let removeElemet = this.RELATIONS.find((obj) => {
      return obj.value == '';
    });
    const removeFromIndex = this.RELATIONS.indexOf(removeElemet);
    if (removeFromIndex > -1) {
      console.log('RELATIONS element removed from...index', removeFromIndex);
      this.RELATIONS.splice(removeFromIndex, 1);
    }
    /**end */
    this.NATIONALITIES = this.personalDService.getLookupdata['NATIONALITIES'];
  }
  getNoReason() {
    let subNoReason = this.personalDService.getNoReasonAPI().subscribe(
      (data: any[]) => {
        this.noReasonKeydDropdown = data;
        console.log('getNoReason...data....=>', data);
        this.noReasonKeydDropdown.splice(0, 1);
      },
      (error) => {
        console.error('getNoReason..error....=>', error);
      }
    );
    this.subscription.add(subNoReason);
  }
  editRelation: string = 'Dependent Member';
  editCountry: string = 'Country of Birth';
  editNationality: string = 'Nationality';
  editOccupation: string = 'Occupation';
  populateForm() {
    console.log('edit===>', this.edit);
    console.log('edit===>', this.editObject);
    let obj: AddEditDependentModel = new AddEditDependentModel();
    if (this.edit) {
      obj = this.editObject;
      this.editRelation =
        obj.relation.value == 'Daughter' || obj.relation.value == 'Son'
          ? 'Child'
          : obj.relation.value;
      this.editCountry = obj.countryOfBirth.value;
      this.editNationality = obj.nationality.value;
      this.editOccupation = obj.occupation.value;
      this.formGroup = this.formBuilder.group({
        relationValue: [
          { value: this.editRelation, disabled: true },
          [Validators.required],
        ],
        relation: [obj.relation, [Validators.required]],
        firstName: [obj.firstName, [Validators.required]],
        lastName: [obj.lastName],
        gender: [obj.gender],
        dateOfBirth: [new Date(obj.dateOfBirth), [Validators.required]],
        cityOfBirth: [obj.cityOfBirth],
        countryOfBirthValue: [obj.countryOfBirth.value, [Validators.required]],
        countryOfBirth: [obj.countryOfBirth, [Validators.required]],
        nationalityValue: [obj.nationality.value, [Validators.required]],
        nationality: [obj.nationality, [Validators.required]],
        occupationValue: [obj.occupation.value, [Validators.required]],
        occupation: [obj.occupation, [Validators.required]],
        dependent: [obj.dependent, [Validators.required]],
        organizationName: [obj.organizationName],
        coverageRequired: [obj.coverageRequired, [Validators.required]],
        noReasonKey: [obj.noReasonKey],
        hasAttached: [obj.hasAttached],
        attachedDocs: [obj.attachedDocs],
      });
    } else {
      this.formGroup = this.formBuilder.group({
        relationValue: [null, [Validators.required, Validators.nullValidator]],
        relation: [null],
        firstName: [null, [Validators.required, Validators.nullValidator]],
        lastName: [''],
        gender: [null],
        dateOfBirth: [Date, [Validators.required, Validators.nullValidator]],
        cityOfBirth: [''],
        countryOfBirthValue: [null, [Validators.required]],
        countryOfBirth: [null, [Validators.required, Validators.nullValidator]],
        nationalityValue: [
          null,
          [Validators.required, Validators.nullValidator],
        ],
        nationality: [null, [Validators.required, Validators.nullValidator]],
        occupationValue: [
          null,
          [Validators.required, Validators.nullValidator],
        ],
        occupation: [null, [Validators.required, Validators.nullValidator]],
        dependent: [null, [Validators.required, Validators.nullValidator]],
        organizationName: [''],
        coverageRequired: [
          null,
          [Validators.required, Validators.nullValidator],
        ],
        noReasonKey: [null],
        hasAttached: [false],
        attachedDocs: [null],
      });
    }
  }
  detechChange() {
    this.changeDetectorRef.detectChanges();
  }
  showReason(): boolean {
    if (this.formGroup.get('coverageRequired').value == null) {
      return false;
    } else if (this.formGroup.get('coverageRequired').value == false) {
      return true;
    } else {
      return false;
    }
  }
  onCancel() {
    this.dialogRefSelf.close();
  }
  onSave() {
    if (this.formGroup.invalid) {
      console.log('form is not valid...');
      this.showErrorMessageOk('Please fill required fields!!!');
      return;
    }
    if (
      this.commonGender.includes(this.formGroup.get('relation').value.value)
    ) {
      if (this.formGroup.get('gender').value == null) {
        this.showErrorMessageOk('Please fill gender.');
        return;
      }
    }
    if (this.formGroup.get('coverageRequired').value == false) {
      if (this.formGroup.get('noReasonKey').value == null) {
        this.showErrorMessageOk('Please fill reason.');
        return;
      }
    }
    let message = 'Do you want to Save?';
    this.messageModalService.showConfirmation(
      message,
      'Confirmation',
      'confirmation-icon',
      this.confirmationResponse.bind(this),
      'Yes',
      'No'
    );
  }

  populatePayload() {}
  genderMale = [
    'Son',
    'Father',
    'Brother',
    'Uncle',
    'Nephew',
    'Father-In-Law',
    'Son-In-Law',
    'Brother-In-Law',
  ];
  commonGender = ['Child', 'Guardian'];
  commonEditGender = ['Son', 'Daughter', 'Guardian'];
  getGender(): string {
    if (this.formGroup.get('gender').value) {
      return this.formGroup.get('gender').value;
    }
    if (this.genderMale.includes(this.formGroup.get('relation').value.value))
      return 'MALE';
    return 'FEMALE';
  }
  showGender() {
    if (
      this.commonGender.includes(this.formGroup.get('relationValue').value) ||
      this.commonEditGender.includes(this.editObject?.relation.value)
    ) {
      return true;
    }
    return false;
  }
  getFinalPayload(): AddEditDependentPayloadModel {
    let payload = new AddEditDependentPayloadModel();
    payload.relation = this.formGroup.get('relation').value;
    payload.gender = this.getGender();
    payload.firstName = this.formGroup.get('firstName').value;
    payload.lastName = this.formGroup.get('lastName').value;
    payload.dateOfBirth = new Date(
      this.formGroup.get('dateOfBirth').value
    ).getTime();
    payload.nationality = this.formGroup.get('nationality').value;
    payload.cityOfBirth = this.formGroup.get('cityOfBirth').value;
    payload.countryOfBirth = this.formGroup.get('countryOfBirth').value;
    payload.occupation = this.formGroup.get('occupation').value;
    payload.organizationName = this.formGroup.get('organizationName').value;
    payload.coverageRequired = this.formGroup.get('coverageRequired').value;
    payload.dependent = this.formGroup.get('dependent').value;
    payload.noReasonKey = this.formGroup.get('noReasonKey').value;
    payload.hasAttached = this.formGroup.get('hasAttached').value;
    if (this.edit) {
      payload.marriageDate = this.editObject.marriageDate;
      payload.beginDate = this.editObject.beginDate;
      payload.objectId = this.editObject.objectId;
      payload.permanentNumber = this.editObject.permanentNumber;
      payload.sequenceNumber = this.editObject.sequenceNumber;
      payload.subType = this.editObject.subType;
      payload.endDate = this.editObject.endDate;
      payload.attachedDocs = this.editObject.attachedDocs;
      payload.lockIndicator = this.editObject.lockIndicator;
    }
    return payload;
  }
  submitPost() {
    if (this.edit) {
      this.editUpdate();
    } else {
      this.addNewSave();
    }
  }
  editUpdate() {
    let subEdit = this.personalDService
      .editDependentUpdateApi(this.getFinalPayload(), this.fileObj)
      .subscribe(
        (data) => {
          this.populateResponseMessage(data, true);
        },
        (error) => {
          this.showErrorMessage('Unexpected Error Occurred!');
          console.error('Add-dependent SAVE ERROR => ', error);
        }
      );
    this.subscription.add(subEdit);
  }
  addNewSave() {
    let subSave = this.personalDService
      .saveDependentApi(this.getFinalPayload(), this.fileObj)
      .subscribe(
        (data) => {
          this.populateResponseMessage(data, false);
        },
        (error) => {
          this.showErrorMessage('Unexpected Error Occurred!');
          console.error('Add-dependent SAVE ERROR => ', error);
        }
      );
    this.subscription.add(subSave);
  }
  /**
   * Message code
   */
  confirmationResponse(d) {
    if (d == 'YES') {
      this.submitPost();
    }
  }
  populateResponseMessage(data, edit: boolean) {
    let successMessage = edit
      ? 'Successfully updated.'
      : 'Successfully created.';
    var msg =
      data['responseStatus'] == 'SUCCESS'
        ? successMessage
        : data['responseStatus'] == 'FAILED'
        ? data['systemErrMsg']
        : 'Request failed';
    var status = data['responseStatus'] == 'SUCCESS' ? 'Success' : 'Error';
    var icon =
      data['responseStatus'] == 'SUCCESS' ? 'success-icon' : 'warning-icon';
    this.messageModalService.showMessage(msg, status, icon, 'CLOSE', () => {
      if (data['responseStatus'] == 'SUCCESS') {
        this.dialogRefSelf.close('success');
      }
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
  showErrorMessageOk(message) {
    this.messageModalService.showMessage(
      message,
      'Error',
      'warning-icon',
      'OK'
    );
  }

  setRelation(item) {
    this.formGroup.get('relation').setValue(item);
  }
  setCountryOfBirth(item) {
    this.formGroup.get('countryOfBirth').setValue(item);
  }
  setNationality(item) {
    this.formGroup.get('nationality').setValue(item);
  }
  setOccupation(item) {
    this.formGroup.get('occupation').setValue(item);
  }
  /**
   * Ends
   */

  /**
   * attachment code
   */
  maxSize = '2mb';
  acceptedFormats = ['.pdf'];
  fileToDownloadUrl: any;
  clearFile(flag: boolean, fileName: string) {
    console.log('clear file');
    this.fileObj = null;
    this.updateAttachment(false, fileName);
    flag && this.formGroup.get('hasAttached').setValue(flag);
  }
  onFileChange(files) {
    if (files && files[0]) {
      console.log('file size=>', files[0].size);
      console.log('file=>', files[0]);
      this.fileObj = files[0];
    }
  }
  filesDropped(event) {
    console.log('filesDropped event=>', event);
    this.onFileChange(event.files);
    this.fileToDownloadUrl = event.imageUrls;
    this.updateAttachment(true, null);
  }
  viewClicked(event) {
    console.log('viewClickedevent->', event);

    if (!event.imageUrlClicked) {
      console.log('file not present fetch from server...');
      this.getAttachment(event['fileClicked']);
    } else {
      const dialogRef = this.dialog.open(PdfViewerModalComponent);
      let pdfUrl = URL.createObjectURL(this.fileObj);
      dialogRef.componentInstance.pdfUrl = pdfUrl;
      dialogRef.componentInstance.title = event.fileClicked.name;
    }
  }
  getAttachment(fileName: string) {
    console.log('open attachment');
    let attachDocList = this.formGroup.get('attachedDocs').value;
    let docId = '';
    attachDocList.forEach((element) => {
      if (element.fileName == fileName) {
        docId = element.fileGUId;
      }
    });
    this.openDocument(docId, fileName);
  }
  openDocument(docId, fileName) {
    console.log('openDocument attachDoc=>', docId);
    var sub = this.personalDService.getDependentAttachment(docId).subscribe(
      (res: Blob) => {
        if (res) {
          this.fileObj = new Blob([res], { type: 'application/pdf' });
          var pdfUrl = URL.createObjectURL(this.fileObj);
          const dialogRef = this.dialog.open(PdfViewerModalComponent);
          dialogRef.componentInstance.pdfUrl = pdfUrl;
          dialogRef.componentInstance.title = fileName;
          dialogRef.componentInstance.pdfName = fileName;
        }
      },
      (error) => {
        console.error('Veiw Attachment Error, in open document', error);
      }
    );
    //this.subscription.add(sub);
  }
  filesDeleted(event) {
    console.log('filesDeleted=>', event);
    let removedFileName = event.fileRemoved.fileName
      ? event.fileRemoved.fileName
      : event.fileRemoved;
    this.clearFile(false, removedFileName);
  }
  updateAttachment(flag: boolean, fileName: string) {
    this.formGroup.get('hasAttached').setValue(flag);
    if (this.edit && this.formGroup.get('attachedDocs').value[0]) {
      this.formGroup.get('attachedDocs').value.forEach((element) => {
        console.log('attacDoc', element);
        if (element.fileName == fileName) {
          element.deleted = true;
        }
      });
    }
  }

  getExistingFileName(): string[] {
    let attacDocArray = this.formGroup.get('attachedDocs').value;
    let fileNameArray = [];
    if (attacDocArray) {
      attacDocArray.forEach((element) => {
        let fileName = element ? element['fileName'] : 'FileName';
        fileNameArray.push(fileName);
      });
    }
    if (fileNameArray.length > 0) {
      return fileNameArray;
    } else {
      return null;
    }
  }

  /**
   * end attachment code
   */
}
