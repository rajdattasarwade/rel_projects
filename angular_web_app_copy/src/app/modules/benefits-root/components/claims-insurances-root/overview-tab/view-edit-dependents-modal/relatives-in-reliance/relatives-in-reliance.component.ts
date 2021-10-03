import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from 'src/app/modules/benefits-root/services/benefits.service';
import { AddRelativeModalComponent } from '../../add-relative-modal/add-relative-modal.component';
import {
  AddRelativePayload,
  RelativeDetailsModel,
  RelativeViewDatasourceModel,
} from '../view-edit-dependents-model';

@Component({
  selector: 'app-relatives-in-reliance',
  templateUrl: './relatives-in-reliance.component.html',
  styleUrls: ['./relatives-in-reliance.component.css'],
})
export class RelativesInRelianceComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  displayedColumns: any = ['relationship', 'relativename', 'action'];
  dataSource: RelativeDetailsModel[] = [];
  relativeOverview: any;
  relativeDetailsList: RelativeDetailsModel[] = [];
  constructor(
    public dialogRefSelf: MatDialogRef<RelativesInRelianceComponent>,
    public dialogRefAddRelative: MatDialogRef<AddRelativeModalComponent>,
    public activeModal: MatDialog,
    private rootService: BenefitsService,
    public messageModalService: MessageModalService
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getRelativeOveview();
  }

  getRelativeOveview() {
    var sub = this.rootService.getRelativeDetailsOverviewAPI().subscribe(
      (data) => {
        console.log('getRelativeOveview...data...=>', data);
        this.relativeOverview = data;
        this.relativeDetailsList = this.relativeOverview['relativeList'];
        if (this.relativeDetailsList.length == 0) {
          this.showConfirmationPopup('Do you have any relatives in Reliance?');
        } else {
          this.dataSource = this.relativeDetailsList;
        }
      },
      (error) => {
        console.error('getRelativeOveview....error.....=>', error);
      }
    );
    this.subscription.add(sub);
  }
  // populateDataSource() {
  //   this.dataSource = [];
  //   this.relativeDetailsList.forEach((x) => {
  //     let obj = new RelativeViewDatasourceModel();
  //     obj.relationship = x.relationValue;
  //     obj.relativeName = x.relativeName;
  //     this.dataSource.push(obj);
  //   });
  // }

  showConfirmationPopup(message: string) {
    this.messageModalService.showConfirmation(
      message,
      'Declaration',
      'confirmation-icon',
      this.confirmationResponse.bind(this),
      'Yes',
      'No'
    );
  }
  confirmationResponse(d) {
    if (d == 'YES') {
      this.addFormRow();
    } else {
      this.addRelative(new AddRelativePayload());
    }
  }

  addRelative(addRelativePayload) {
    console.log('addRelative...');
    var sub = this.rootService
      .saveRelativePostAPI(addRelativePayload)
      .subscribe(
        (data) => {
          console.log('addRelative response .....=>', data);
          this.ngOnInit();
        },
        (error) => {
          console.error('addRelative...error...', error);
        }
      );
    this.subscription.add(sub);
  }
  addFormRow() {
    console.log('addFormRow...');
    this.openRelativeModal(false);
  }
  openRelativeModal(edit: boolean) {
    const dialogRef = this.activeModal.open(AddRelativeModalComponent, {
      width: '683px',
    });
    dialogRef.componentInstance.edit = edit;
    dialogRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }
  confirmDeleteEmployee(element) {
    this.messageModalService.showConfirmation(
      'Are you sure you want to delete the record?',
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
          this.deleteRow(element);
        }
      }
    );
  }
  deleteRow(payload) {
    var sub = this.rootService.removeRelativePostAPI(payload).subscribe(
      (data) => {
        console.log('deleteRelativeRow response .....=>', data);
        this.ngOnInit();
      },
      (error) => {
        console.error('deleteRelativeRow...error...', error);
      }
    );
    this.subscription.add(sub);
  }

  populateResponseMessage(data) {
    var msg =
      data['responseStatus'] == 'SUCCESS'
        ? ''
        : data['responseStatus'] == 'FAILED'
        ? data['systemErrMsg']
        : 'Request Failed.';
    var status = data['responseStatus'] == 'SUCCESS' ? 'Success' : 'Error';
    var icon =
      data['responseStatus'] == 'SUCCESS' ? 'success-icon' : 'warning-icon';
    this.messageModalService.showMessage(msg, status, icon, 'CLOSE', () => {
      if (data['responseStatus'] == 'SUCCESS') {
        this.activeModal.closeAll();
      }
    });
  }
}
