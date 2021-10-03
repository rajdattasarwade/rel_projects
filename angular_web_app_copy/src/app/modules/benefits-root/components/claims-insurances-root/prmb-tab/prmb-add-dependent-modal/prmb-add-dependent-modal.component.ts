import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { PrmbService } from '../prmb.service';
import { DependentDetailModel } from './../prmb.model';

@Component({
  selector: 'app-prmb-add-dependent-modal',
  templateUrl: './prmb-add-dependent-modal.component.html',
  styleUrls: ['./prmb-add-dependent-modal.component.css'],
})
export class PrmbAddDependentModalComponent implements OnInit {
  selectedDependent: DependentDetailModel = null;
  dependentList: DependentDetailModel[] = [];
  selectedDepType: string = '';

  constructor(
    public activeModal: MatDialog,
    private prmbService: PrmbService,
    private messageModalService: MessageModalService,
    public dialogRefSelf: MatDialogRef<PrmbAddDependentModalComponent>
  ) {}

  ngOnInit(): void {
    console.log('addPrmbNgonit');
  }

  addDependent() {
    console.log('addDepedent...=>', this.selectedDependent);
    if (this.selectedDependent && this.prmbService.checkIfExistInElement(this.selectedDependent)) {
      // this.prmbService.addToElements(this.selectedDependent);
      console.log('already selected');
      this.showErrorMessageOk(
        this.selectedDependent.dependentName + ' is already added'
      );
      this.selectedDependent = null;
    } else {
      console.log('not in list');
    }
  }
  checkDependentAvailable() {
    console.log('dependent type...', this.selectedDepType);
    console.log(
      'this.prmbService.prmbDependentDetails...',
      this.prmbService.prmbDependentDetails
    );
    console.log;
    this.dependentList = this.prmbService.prmbDependentDetails.filter((x) => {
      return x.dependentType == this.selectedDepType;
    });
    if (this.dependentList.length > 0) {
      console.log('listOfDepedent...', this.dependentList);
    } else {
      this.showErrorMessageOk('No record found for this dependent');
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
  disabilityFlag: boolean = false;
  toggleDisability() {
    this.disabilityFlag = !this.disabilityFlag;
    console.log('disablity=>,', this.disabilityFlag);
  }
  onSubmit() {
    this.selectedDependent.depDisab = this.disabilityFlag ? 'Y' : 'N';
    this.prmbService.addToElements(this.selectedDependent);
    this.close();
    console.log('...onSubmit');
  }
  close() {
    this.dialogRefSelf.close();
  }
}
