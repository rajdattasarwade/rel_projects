import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from 'src/app/modules/benefits-root/services/benefits.service';
import { AddDependentModalComponent } from '../../add-dependent-modal/add-dependent-modal.component';
import { AddRelativeModalComponent } from '../../add-relative-modal/add-relative-modal.component';
import { AddEditDependentModel } from '../view-edit-dependents-model';

@Component({
  selector: 'app-dependent-details',
  templateUrl: './dependent-details.component.html',
  styleUrls: ['./dependent-details.component.css'],
})
export class DependentDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  displayedColumns: any = [
    'relationship',
    'name',
    'birthdate',
    'status',
    'edit',
  ];
  dataSource: AddEditDependentModel[];
  constructor(
    public dialogRefSelf: MatDialogRef<DependentDetailsComponent>,
    public dialogRefAddDependent: MatDialogRef<AddDependentModalComponent>,
    public dialogRefAddRelative: MatDialogRef<AddRelativeModalComponent>,
    public activeModal: MatDialog,
    private rootService: BenefitsService,
    public messageModelService: MessageModalService
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getEmployeeDependentService();
  }
  getEmployeeDependentService() {
    var sub = this.rootService.getEmployeeDependentServiceAPI().subscribe(
      (data: AddEditDependentModel[]) => {
        console.log('getEmployeeDependentService data...=>', data);
        this.dataSource = data;
      },
      (error) => {
        console.error('getEmployeeDependentService error...=>', error);
      }
    );
    this.subscription.add(sub);
  }
  openAddDependent(edit: boolean, editObj: AddEditDependentModel) {
    const dialogRef = this.activeModal.open(AddDependentModalComponent, {
      width: '683px',
    });
    dialogRef.componentInstance.edit = edit;
    if (editObj) {
      dialogRef.componentInstance.editObject = editObj;
    }
    var sub = dialogRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
    this.subscription.add(sub);
  }
  openRelativeModal(edit: boolean) {
    const dialogRef = this.activeModal.open(AddRelativeModalComponent, {
      width: '683px',
    });
    dialogRef.componentInstance.edit = edit;
  }
}
