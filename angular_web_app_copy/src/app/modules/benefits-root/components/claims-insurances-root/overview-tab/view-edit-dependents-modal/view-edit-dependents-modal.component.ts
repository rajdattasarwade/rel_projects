import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from 'src/app/modules/benefits-root/services/benefits.service';
import { AddDependentModalComponent } from '../add-dependent-modal/add-dependent-modal.component';
import { AddRelativeModalComponent } from '../add-relative-modal/add-relative-modal.component';
import {
  DependentDetailsModel,
  GHPDetailModel,
  ViewEditDependentsColumns,
} from './view-edit-dependents-model';

@Component({
  selector: 'app-view-edit-dependents-modal',
  templateUrl: './view-edit-dependents-modal.component.html',
  styleUrls: ['./view-edit-dependents-modal.component.css'],
})
export class ViewEditDependentsModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  displayedColumns: string[] = ViewEditDependentsColumns;
  dataSource: DependentDetailsModel[];
  planId: string = 'GHP';
  coverageId: string = 'ESCP';
  ghpDetailObj: GHPDetailModel;
  insuranceDebits: number = 0;
  coverageString: string = '';
  dependentDetailsArray: DependentDetailsModel[] = [];
  constructor(
    public dialogRefSelf: MatDialogRef<ViewEditDependentsModalComponent>,
    public dialogRefAddDependent: MatDialogRef<AddDependentModalComponent>,
    public dialogRefAddRelative: MatDialogRef<AddRelativeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public activeModal: MatDialog,
    private rootService: BenefitsService,
    public messageModelService: MessageModalService,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getEnrolleddependents();
    this.getViewbeneficiaries();
    // this.populateLookupdata();
  }
  openAddDependent(edit: boolean) {
    const dialogRef = this.activeModal.open(AddDependentModalComponent, {
      width: '683px',
    });
    dialogRef.componentInstance.edit = edit;
  }
  openRelativeModal(edit: boolean) {
    const dialogRef = this.activeModal.open(AddRelativeModalComponent, {
      width: '683px',
    });
    dialogRef.componentInstance.edit = edit;
  }
  routeToDependentList() {
    this.router.navigate(['/benefits/view-edit-dependent-list']);
    this.dialogRefSelf.close();
  }
  getEnrolleddependents() {
    var sub = this.rootService
      .getEnrolleddependentsApi(this.planId, this.coverageId)
      .subscribe(
        (data: DependentDetailsModel[]) => {
          console.log('getEnrolleddependents dependentDetailsArray=>', data);
          this.dependentDetailsArray = data;
          this.dataSource = data;
        },
        (error) => {
          console.error('ERROR in getEnrolleddependents..', error);
        }
      );
    this.subscription.add(sub);
  }

  getViewbeneficiaries() {
    var sub = this.rootService.getViewbeneficiariesApi(this.planId).subscribe(
      (data: GHPDetailModel[]) => {
        console.log('getViewbeneficiariesApi data==>', data);
        this.ghpDetailObj = data[0];
        this.populateGhpData();
      },
      (error) => {
        console.error('ERROR in getViewbeneficiaries..', error);
      }
    );
    this.subscription.add(sub);
  }
  // populateLookupdata() {
  //   var sub = this.rootService.getLookupDataApi().subscribe((data: any) => {
  //     this.rootService.setLookupdata(data);
  //     console.log('loookup....>', this.rootService.getLookupdata);
  //   });
  //   this.subscription.add(sub);
  // }
  populateGhpData() {
    this.insuranceDebits = this.ghpDetailObj.insuranceDebits;
    this.coverageString = this.ghpDetailObj.coverage;
    if (this.coverageString) {
      this.coverageString = this.coverageString.replace('Emp+', '1 employee,');
      this.coverageString = this.coverageString.replace(
        'spouse+',
        '1 spouse, '
      );
      this.coverageString = this.coverageString.replace(/\+/g, ', ');
      this.coverageString = this.coverageString.replace('Ch', ' children');
      this.coverageString = this.coverageString.replace('P', ' parents');
    }
    // coverage: "Emp+ spouse+3Ch+2P"
    console.log('coverage...', this.coverageString);
  }
}
