import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from 'src/app/modules/benefits-root/services/benefits.service';
import { SearchEmpModel } from '../view-edit-dependents-modal/view-edit-dependents-model';

@Component({
  selector: 'app-search-relative-modal',
  templateUrl: './search-relative-modal.component.html',
  styleUrls: ['./search-relative-modal.component.css'],
})
export class SearchRelativeModalComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isShown: boolean = false; // hidden by default
  firstName: string;
  mail: string;
  mobile: string;

  displayedColumns: any = [
    'select',
    'name',
    'email',
    'company',
    'worklocation',
    'city',
    'state',
  ];
  dataSource: any;
  ELEMENT_DATA: SearchEmpModel[];
  constructor(
    private rootService: BenefitsService,
    private messageModalService: MessageModalService,
    public dialogRefSelf: MatDialogRef<SearchRelativeModalComponent>
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.isShown = false;
    this.firstName = '';
    this.mail = '';
    this.mobile = '';
  }
  toggleShow() {
    this.isShown = !this.isShown;
  }
  searchedEmpList: SearchEmpModel[] = [];
  searchRelatives() {
    var sub = this.rootService
      .searchRelativeAPI(this.firstName, this.mail, this.mobile)
      .subscribe(
        (data: SearchEmpModel[]) => {
          this.searchedEmpList = data;
          console.log('searchRelatives...data....=>', data);
          // this.onClose(this.searchedEmpList[0]);
          this.ELEMENT_DATA = data;
          this.dataSource = new MatTableDataSource<SearchEmpModel>(
            this.ELEMENT_DATA
          );
        },
        (error) => {
          console.error('searchRelatives..error....=>', error);
        }
      );
    this.subscription.add(sub);
  }

  isFormInValid(): boolean {
    if (this.firstName != '' || this.mail != '' || this.mobile != '') {
      return false;
    }
    return true;
  }
  resetForm() {
    this.ngOnInit();
    // this.firstName = '';
    // this.mail = '';
    // this.mobile = '';
  }
  searchEmp() {
    if (this.checkFormValidity()) {
      this.searchRelatives();
    } else {
      this.showErrorMessageOk('Invalid Search Entry');
    }
  }
  checkFormValidity(): boolean {
    if (
      this.firstName.includes('#') ||
      this.mail.includes('#') ||
      this.firstName.includes('?') ||
      this.mail.includes('?')
    ) {
      return false;
    }
    return true;
  }
  showErrorMessageOk(message) {
    this.messageModalService.showMessage(
      message,
      'Error',
      'warning-icon',
      'OK'
    );
  }
  onClose(obj) {
    this.dialogRefSelf.close(obj);
  }
  selection = new SelectionModel<SearchEmpModel>(true, []);
  selectedItem: SearchEmpModel;
  addSelectedItem() {
    this.populateSelectedItems();
    this.onClose(this.selectedItem);
  }
  populateSelectedItems() {
    let count = 0;
    for (let item of this.ELEMENT_DATA) {
      if (this.selection.isSelected(item)) {
        count++;
        this.selectedItem = item;
        return;
      }
    }
  }
}
