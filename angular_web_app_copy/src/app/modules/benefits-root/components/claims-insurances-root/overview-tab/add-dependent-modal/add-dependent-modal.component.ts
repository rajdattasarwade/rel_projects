import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PdfViewerModalComponent } from 'src/app/components/shared/pdf-viewer-modal/pdf-viewer-modal.component';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from 'src/app/modules/benefits-root/services/benefits.service';
import {
  AddEditDependentModel,
  AddEditDependentPayloadModel,
  choiceArray,
} from '../view-edit-dependents-modal/view-edit-dependents-model';

@Component({
  selector: 'app-add-dependent-modal',
  templateUrl: './add-dependent-modal.component.html',
  styleUrls: ['./add-dependent-modal.component.css'],
})
export class AddDependentModalComponent implements OnInit, OnDestroy {
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
    private rootService: BenefitsService,
    public dialog: MatDialog,
    public dialogRefSelf: MatDialogRef<AddDependentModalComponent>,
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
    this.COUNTRIES = this.rootService.getLookupdata['COUNTRIES'];
    this.OCCUPATIONS = this.rootService.getLookupdata['OCCUPATIONS'];
    this.RELATIONS = this.rootService.getLookupdata['RELATIONS'];
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
    this.NATIONALITIES = this.rootService.getLookupdata['NATIONALITIES'];
  }
  getNoReason() {
    var sub = this.rootService.getNoReasonAPI().subscribe(
      (data: any[]) => {
        this.noReasonKeydDropdown = data;
        console.log('getNoReason...data....=>', data);
        this.noReasonKeydDropdown.splice(0, 1);
      },
      (error) => {
        console.error('getNoReason..error....=>', error);
      }
    );
    this.subscription.add(sub);
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
    console.log('.....onsave...', this.formGroup.get('relation').value?.value);
    console.log(
      this.commonGender.includes(this.formGroup.get('relation').value?.value)
    );
    if (this.formGroup.invalid) {
      console.log('form is not valid...');
      console.log(this.formGroup.status);
      console.log(this.formGroup.valid);
      console.log(this.formGroup.invalid);
      this.showErrorMessageOk('Please fill required fields!!!');
      return;
    }
    if (
      this.commonGender.includes(this.formGroup.get('relation').value?.value)
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
    console.log('..getGender..', this.formGroup.get('relation').value);
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
    var sub = this.rootService
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
    this.subscription.add(sub);
  }
  addNewSave() {
    var sub = this.rootService
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
    this.subscription.add(sub);
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
    console.log('setRelation....=>', item);
    this.formGroup.get('relation').setValue(item);
  }
  setCountryOfBirth(item) {
    console.log('setCountryOfBirth....=>', item);
    this.formGroup.get('countryOfBirth').setValue(item);
  }
  setNationality(item) {
    console.log('nationality....=>', item);
    this.formGroup.get('nationality').setValue(item);
  }
  setOccupation(item) {
    console.log('setoccupationRelation....=>', item);
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
  clearFile(flag: boolean) {
    console.log('clear file');
    this.fileObj = null;
    this.updateAttachment(false);
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
    console.log('file attacg drag drop ', event);
    this.onFileChange(event.files);
    this.fileToDownloadUrl = event.imageUrls;
    this.updateAttachment(true);
  }
  viewClicked(event) {
    console.log('viewClickedevent->', event);
    const dialogRef = this.dialog.open(PdfViewerModalComponent);
    let pdfUrl = URL.createObjectURL(this.fileObj);
    dialogRef.componentInstance.pdfUrl = pdfUrl;
    dialogRef.componentInstance.title = event.fileClicked.name;
  }
  filesDeleted(evenst) {
    console.log('filesDeleted=>');
    this.clearFile(false);
  }
  updateAttachment(flag: boolean) {
    this.formGroup.get('hasAttached').setValue(flag);
  }
  getExistingFileName(): string[] {
    let fileName = this.formGroup.get('attachedDocs').value
      ? this.formGroup.get('attachedDocs').value.fileName
      : 'FileName';
    if (this.formGroup.get('hasAttached').value) {
      return [fileName];
    } else {
      return null;
    }
  }
  /**
   * end attachment code
   */
}
