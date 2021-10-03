import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from 'src/app/modules/benefits-root/services/benefits.service';
import { SearchRelativeModalComponent } from '../search-relative-modal/search-relative-modal.component';
import {
  AddRelativePayload,
  SearchEmpModel,
} from '../view-edit-dependents-modal/view-edit-dependents-model';

@Component({
  selector: 'app-add-relative-modal',
  templateUrl: './add-relative-modal.component.html',
  styleUrls: ['./add-relative-modal.component.css'],
})
export class AddRelativeModalComponent implements OnInit {
  @Input() edit: boolean = false;
  subscription: Subscription;
  saveRelativePayload: AddRelativePayload = new AddRelativePayload();
  selectedEmployee: SearchEmpModel;
  RELATION_LOOKUP: any;
  selectedRelation: any;
  relativeName: string;
  constructor(
    private rootService: BenefitsService,
    public activeModal: MatDialog,
    public dialogRef: MatDialogRef<SearchRelativeModalComponent>,
    public dialogRefSelf: MatDialogRef<AddRelativeModalComponent>,
    private messageModalService: MessageModalService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.selectedRelation = null;
    this.getRelationLookup();
  }
  searchRelative() {
    const dialogRef = this.activeModal.open(SearchRelativeModalComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.selectedEmployee = res;
      this.relativeName = this.selectedEmployee?.fullName;
      console.log('selected employee===>', res);
    });
  }

  getRelationLookup() {
    var sub = this.rootService.getRelativeDropdownAPI().subscribe(
      (data) => {
        console.log('getRelationLookup...data...=>', data);
        this.RELATION_LOOKUP = data;
        this.populateRelationLookup();
      },
      (error) => {
        console.error('getRelationLookup....error.....=>', error);
      }
    );
    this.subscription.add(sub);
  }
  populateRelationLookup(){
        /** remove 'No relatives in Reliance' value */
        let removeElemet = this.RELATION_LOOKUP.find((obj) => {
          return obj.code == '9998';
        });
        const removeFromIndex = this.RELATION_LOOKUP.indexOf(removeElemet);
        if (removeFromIndex > -1) {
          console.log('RELATION_LOOKUP element removed from...index', removeFromIndex);
          this.RELATION_LOOKUP.splice(removeFromIndex, 1);
        }
        /**end */
  }
  showConfirmationPopup(message: string) {
    this.messageModalService.showConfirmation(
      message,
      'Confirmation',
      'confirmation-icon',
      this.confirmationResponse.bind(this),
      'Yes',
      'No'
    );
  }

  onSave() {
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
  confirmationResponse(d) {
    if (d == 'YES') {
      this.saveNewRelative();
    }
  }
  showErrorMessageOk(message) {
    this.messageModalService.showMessage(
      message,
      'Error',
      'warning-icon',
      'OK'
    );
  }
  saveNewRelative() {
    console.log('saveNewRelative');
    this.saveRelativePayload.employeeNumber = this.selectedEmployee.employeeNumber;
    this.saveRelativePayload.relationCode = this.selectedRelation.code;
    var sub = this.rootService
      .saveRelativePostAPI(this.saveRelativePayload)
      .subscribe(
        (data) => {
          console.log('saveNewRelative....data respoce...=>', data);
          this.populateResponseMessage(data);
        },
        (error) => {
          console.error('Error...saveNewRelative ... error =>', error);
        }
      );
    this.subscription.add(sub);
  }

  populateResponseMessage(data) {
    var msg =
      data['responseStatus'] == 'SUCCESS'
        ? 'Relative added successfully'
        : data['responseStatus'] == 'FAILED'
        ? data['systemErrMsg']
        : 'Request Failed.';
    var status = data['responseStatus'] == 'SUCCESS' ? 'Success' : 'Error';
    var icon =
      data['responseStatus'] == 'SUCCESS' ? 'success-icon' : 'warning-icon';
    this.messageModalService.showMessage(msg, status, icon, 'CLOSE', () => {
      if (data['responseStatus'] == 'SUCCESS') {
        this.dialogRefSelf.close('success');
      }
    });
  }

  isFormInvalid() {
    if (this.selectedRelation && this.relativeName) {
      return false;
    }
    return true;
  }
  onCancel() {
    this.dialogRefSelf.close();
  }
}
