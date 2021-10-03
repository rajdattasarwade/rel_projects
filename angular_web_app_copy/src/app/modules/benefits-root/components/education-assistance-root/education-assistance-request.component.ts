import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MessageModalService } from 'src/app/components/shared/services/message-modal-service';
import { BenefitsService } from '../../services/benefits.service';
import { AssistanceRequestModalComponent } from './assistance-request-modal/assistance-request-modal.component';

@Component({
  selector: 'app-education-assistance-request',
  templateUrl: './education-assistance-request.component.html',
  styleUrls: ['./education-assistance-request.component.css'],
})
export class EducationAssistanceRequestComponent implements OnInit, OnDestroy {
  breadcrumbJson: any = [
    {
      label: 'Benefits',
      link: '/benefits',
    },
    {
      label: 'Educational Support',
      link: '/benefits/education-assistance-request',
    },
  ];
  educationRequestDetails: any;
  editRequestDocs: any;
  editRequestDetails: any = [];
  dropdownData: any;
  errorMessage: any;
  subManager: Subscription = new Subscription();
  canCreate: boolean = false;
  displayedColumns: string[] = [
    'requestDate',
    'type',
    'status',
    'documents',
    'action',
  ];
  existingFiles: any = [];

  constructor(
    public dialog: MatDialog,
    private educationApi: BenefitsService,
    private messageModalService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.populateEducationData();
    this.validateRequestCreation();
  }

  openEducationModal(editFlag, viewMode) {
    let data;
    if (this.editRequestDetails.length != 0) {
      data = this.editRequestDetails;
    } else {
      data = [];
    }
    if (editFlag || viewMode || this.errorMessage.message == '') {
      const dialogRef = this.dialog.open(AssistanceRequestModalComponent, {
        width: '650px',
        data: {
          editFlag: editFlag,
          educationData: data,
          existingFiles: this.existingFiles,
          existingDocs: this.editRequestDocs,
          viewMode: viewMode,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.editRequestDetails = [];
        this.existingFiles = [];
        this.editRequestDocs = [];
        if (result == 'S') {
          this.populateEducationData();
          this.validateRequestCreation();
        }
      });
    } else {
      this.messageModalService.showMessage(
        this.errorMessage.message,
        'Error',
        'warning-icon',
        'CLOSE'
      );
    }
  }

  populateEducationData() {
    let educationOverviewSub = this.educationApi
      .getEducationOverview()
      .subscribe(
        (data) => {
          this.educationRequestDetails = data;
        },
        (error) => {
          this.messageModalService.showMessage(
            'Something went wrong. Please try again later.',
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      );
    this.subManager.add(educationOverviewSub);
  }

  validateRequestCreation() {
    let validationSub = this.educationApi.getRequestValidation().subscribe(
      (data) => {
        this.errorMessage = data;
      },
      (error) => {
        this.messageModalService.showMessage(
          'Something went wrong. Please try again later.',
          'Error',
          'warning-icon',
          'CLOSE'
        );
      }
    );
    this.subManager.add(validationSub);
  }

  editRequest(requestNo) {
    let editRequestSub = this.educationApi
      .editEducationRequest(requestNo)
      .subscribe(
        (data) => {
          this.editRequestDetails = data;
          this.getRequestAttach(requestNo, true, false);
        },
        (error) => {
          this.messageModalService.showMessage(
            'Something went wrong. Please try again later.',
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      );
    this.subManager.add(editRequestSub);
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  getRequestAttach(requestNo, editFlag, viewMode) {
    let requestAttachSub = this.educationApi
      .getReqDocuments(requestNo)
      .subscribe(
        (data) => {
          this.editRequestDocs = data;
          for (let i = 0; i < this.editRequestDocs.length; i++) {
            let fileObj = {
              name: this.editRequestDocs[i].fileName,
              lineNumber: this.editRequestDocs[i].documentNumber,
            };
            this.existingFiles.push(fileObj);
          }
          this.openEducationModal(editFlag, viewMode);
        },
        (error) => {
          this.messageModalService.showMessage(
            'Something went wrong. Please try again later.',
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      );
    this.subManager.add(requestAttachSub);
  }

  deleteRequest(requestNo) {
    let requestDetailsSub = this.educationApi
      .editEducationRequest(requestNo)
      .subscribe((data) => {
        data['action'] = 'W';
        let deleteReqSub = this.educationApi
          .deleteEducationRequest(data)
          .subscribe(
            (data) => {
              this.messageModalService.showMessage(
                'The request was deleted successfully.',
                'Success',
                'success-icon',
                'CLOSE',
                () => {
                  this.populateEducationData();
                  this.validateRequestCreation();
                }
              );
            },
            (error) => {
              this.messageModalService.showMessage(
                'Something went wrong. Please try again later.',
                'Error',
                'warning-icon',
                'CLOSE'
              );
            }
          );
        this.subManager.add(deleteReqSub);
      });
    this.subManager.add(requestDetailsSub);
  }

  viewRequest(requestNumber) {
    let viewRequestSub = this.educationApi
      .editEducationRequest(requestNumber)
      .subscribe(
        (data) => {
          this.editRequestDetails = data;
          this.getRequestAttach(requestNumber, false, true);
        },
        (error) => {
          this.messageModalService.showMessage(
            'Something went wrong. Please try again later.',
            'Error',
            'warning-icon',
            'CLOSE'
          );
        }
      );
    this.subManager.add(viewRequestSub);
  }
}
