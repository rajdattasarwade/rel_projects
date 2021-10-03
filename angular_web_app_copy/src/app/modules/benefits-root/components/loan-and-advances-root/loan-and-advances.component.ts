import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IconsModel } from '../../../../components/common/common-models';
import { MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { MarriageLoanModalComponent } from './marriage-loan-modal/marriage-loan-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LoanRepaymentModalComponent } from './loan-repayment-modal/loan-repayment-modal.component';
import { AdvancesModalComponent } from './advances-modal/advances-modal.component';
import { BenefitsService } from './../../services/benefits.service';
import { Config } from '../../../../components/core/config/config';
//'../../components/shared/services/message-modal-service';
import { MessageModalService } from '../../../../components/shared/services/message-modal-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loan-and-advances',
  templateUrl: './loan-and-advances.component.html',
  styleUrls: ['./loan-and-advances.component.css'],
})
export class LoanAndAdvancesComponent implements OnInit {
  breadcrumbJson: any = [
    {
      label: 'Benefits',
      link: '/benefits',
    },
    {
      label: 'Loan & Advances',
      link: '/benefits/loan-and-advances',
    },
  ];

  icons: any;

  public doughnutChartDataLoan: MultiDataSet = [[25, 10]];
  public doughnutChartLabelsLoan: string[] = ['Pending', 'Completed'];
  public doughnutChartTypeLoan: ChartType = 'doughnut';
  public colorsLoan: any = [{ backgroundColor: ['#60A058', '#ED544E'] }];
  public doughnutChartOptionsLoan: any = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    cutoutPercentage: 50,
  };

  public doughnutChartDataAdvances: MultiDataSet = [[50, 50]];
  public doughnutChartLabelsAdvances: string[] = ['Pending', 'Completed'];
  public doughnutChartTypeAdvances: ChartType = 'doughnut';
  public colorsAdvances: any = [{ backgroundColor: ['#F5AF5D', '#4E9DED'] }];
  public doughnutChartOptionsAdvances: any = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    cutoutPercentage: 50,
  };

  displayedColumnsLoans: any = [
    'loanType',
    'loanAmount',
    'installment',
    'repaid',
    'balance',
  ];
  dataSourceLoans = [];

  displayedColumnsDeduction: any = [
    'payeeName',
    'policyNo',
    'fromDate',
    'toDate',
    'amount',
  ];
  dataSourceDeduction = [];

  displayedColumnsMarriageLoans: any = [
    'requestType',
    'appliedOn',
    'requestStatus',
    'action',
    'rePayment',
  ];
  dataSourceMarriageLoans = [];

  displayedColumnsAdvances: any = [
    'requestType',
    'appliedOn',
    'requestStatus',
    'action',
  ];
  dataSourceAdvances = [
    {
      requestType: '',
      appliedOn: '',
      requestStatus: '',
      action: '',
    },
  ];
  teamAdvanceDetails: any = [];
  dateTimeFormat: any;
  marriageLoanHistoryData: any = [];
  dedReqData: any = [];
  marrigeLoanSummary: any = [];
  sumOfBalance = 0;
  sumOfrem = 0;
  sumOfPaid = 0;
  chartRem = 0;
  chartPaid = 0;
  chartPaidDisplay = 0;
  responseData: any;
  teamAdvance: any;
  advanceTypesData: any;
  recoveryMonths: any;
  blob: any;
  pdfUrl: any;
  loanManager: Subscription = new Subscription();
  editandViewResponseData: any;
  attachedFiles: any[] = []; //files attached array
  subscriptionList: Subscription[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private loansAdvService: BenefitsService,
    private messageService: MessageModalService
  ) {
    this.icons = [];
    this.icons.push(new IconsModel('clear', '', '', 'close'));
    this.dateTimeFormat = Config.APP_DATE_TIME_FORMATS;
  }

  ngOnInit(): void {
    // this.getAdvanceTypes();
    //this.getRecoveryMonths();
    this.getTeamHistory();
    this.getMarrigeLoanHistoryData();
    this.getdeductionsOnReq();
    // this.getMarrigeLoanSummary();
    let MarriageSummary = this.loansAdvService
      .getMarriageLoanSummary()
      .subscribe(
        (data) => {
          this.marrigeLoanSummary = data;
          this.dataSourceLoans = this.marrigeLoanSummary;
          this.dataSourceLoans.forEach((value, index) => {
            this.sumOfBalance =
              this.sumOfBalance + parseFloat(value.loanAmount);
            this.sumOfrem = this.sumOfrem + parseFloat(value.balanceAmount);
            this.sumOfPaid = this.sumOfPaid + parseFloat(value.amountPaid);
          });
          this.chartRem = this.roundOff((this.sumOfrem / this.sumOfrem) * 100);

          this.chartPaid = this.roundOff(
            (this.sumOfPaid / this.sumOfrem) * 100
          );
          if (isNaN(this.chartPaid)) {
            this.chartPaidDisplay = 0;
          } else {
            this.chartPaidDisplay = this.chartPaid;
          }

          //  console.log(this.chartRem+"data"+this.chartPaid);
          this.doughnutChartDataLoan = [[this.chartRem, this.chartPaid]];
        },
        (error) => {
          console.log(error);
        }
      );
    this.loanManager.add(MarriageSummary);
  }
  // createMarriageLoan() {

  // }

  getTeamHistory() {
    let teamHistory = this.loansAdvService.getTeamAdvanceHistory().subscribe(
      (data) => {
        let teamData: any = [];
        teamData = data;
        this.teamAdvanceDetails = teamData.sort(
          (initialDate: any, finalDate: any) =>
            new Date(finalDate.requestDate).getTime() -
            new Date(initialDate.requestDate).getTime()
        );
        this.dataSourceAdvances = this.teamAdvanceDetails;
      },
      (error) => {
        console.log(error);
      }
    );
    this.loanManager.add(teamHistory);
  }
  getMarrigeLoanHistoryData() {
    let mHistory = this.loansAdvService.getMarriageLoansHistory().subscribe(
      (data) => {
        let loanHistory: any = [];
        loanHistory = data;
        this.marriageLoanHistoryData = loanHistory.sort(
          (initialDate: any, finalDate: any) =>
            new Date(finalDate.appliedDate).getTime() -
            new Date(initialDate.appliedDate).getTime()
        );
        this.dataSourceMarriageLoans = this.marriageLoanHistoryData;
      },
      (error) => {
        console.log(error);
      }
    );
    this.loanManager.add(mHistory);
  }

  getdeductionsOnReq() {
    let deduction = this.loansAdvService.getdeductionsOnReq().subscribe(
      (data) => {
        this.dedReqData = data;
        this.dataSourceDeduction = this.dedReqData;
      },
      (error) => {
        console.log(error);
      }
    );
    this.loanManager.add(deduction);
  }

  actionEvent(event) {
    if (event == 'close') {
      this.router.navigate(['/benefits']);
    }
  }

  createTeamAdvancesValidity() {
    let adValidity = this.loansAdvService.checkValidityTeamAdvances().subscribe(
      (data) => {
        this.responseData = data;
        if (this.responseData.error) {
          this.messageService.showMessage(
            this.responseData.error.message.value,
            'Error',
            'warning-icon',
            'CLOSE'
          );
        } else if (
          this.responseData.exResignMessage &&
          this.responseData.validUser
        ) {
          this.messageService.showMessage(
            this.responseData.exResignMessage,
            'Error',
            'warning-icon',
            'CLOSE'
          );
        } else {
          this.dialog.open(AdvancesModalComponent, {
            width: '800px',
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.loanManager.add(adValidity);
  }
  createMarriageLoan() {
    let checkM = this.loansAdvService.checkValidityCreateMarriage().subscribe(
      (data) => {
        this.responseData = data;
        if (
          this.responseData.messageBean &&
          this.responseData.messageBean.error
        ) {
          this.messageService.showMessage(
            this.responseData.messageBean.error.message.value,
            'Error',
            'warning-icon',
            'CLOSE'
          );
        } else if (this.responseData.response) {
          var advanceData = {
            actionType: '',
            data: '',
          };
          const dialogRef = this.dialog.open(MarriageLoanModalComponent, {
            width: '800px',
            data: { editObj: advanceData },
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result) {
              this.refreshList();
            }
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.loanManager.add(checkM);
  }

  viewTeamAdvance(teamAdvance, viewTeamAdvance?) {
    let viewTeam = this.loansAdvService
      .viewTeamAdvance(
        teamAdvance.advanceCode,
        teamAdvance.employeeNumber,
        teamAdvance.sequenceNumber
      )
      .subscribe(
        (data) => {
          this.teamAdvance = data;

          //this.onViewClick(viewTeamAdvance);
        },
        (error) => {
          console.log(error);
        }
      );
    this.loanManager.add(viewTeam);
  }

  performAction(actionType, element) {
    let vTeam = this.loansAdvService
      .viewTeamAdvance(
        element.advanceCode,
        element.employeeNumber,
        element.sequenceNumber
      )
      .subscribe(
        (data) => {
          this.teamAdvance = data;
          var advanceData = {
            actionType: actionType,
            data: this.teamAdvance,
          };

          const dialogRef = this.dialog.open(AdvancesModalComponent, {
            width: '800px',
            data: { editObj: advanceData },
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result) {
              this.getTeamHistory();
            }
          });

          //this.onViewClick(viewTeamAdvance);
        },
        (error) => {
          console.log(error);
        }
      );
    this.loanManager.add(vTeam);
  }
  editAndViewMarriageLoan(actionType, element) {
    let editActionCode;

    if (actionType == 'edit') {
      editActionCode = 'EE';
    } else if (actionType == 'view') {
      editActionCode = 'EV';
    } else {
    }

    let editViewM = this.loansAdvService
      .getViewMarriageDetails(
        element.requestTypeCode,
        editActionCode,
        element.referenceNumber
      )
      .subscribe(
        (data) => {
          this.editandViewResponseData = data;
          var advanceData = {
            actionType: actionType,
            data: this.editandViewResponseData,
          };
          if (element.requestTypeCode === '0045') {
            const dialogRef = this.dialog.open(MarriageLoanModalComponent, {
              width: '800px',
              data: { editObj: advanceData },
            });
            dialogRef.afterClosed().subscribe((result) => {
              console.log(result);
              if (result) {
                this.refreshList();
              }
            });
          } else if (element.requestTypeCode === '0078') {
            const dialogRef = this.dialog.open(LoanRepaymentModalComponent, {
              width: '800px',
              data: { editObj: advanceData },
            });
            dialogRef.afterClosed().subscribe((result) => {
              console.log(result);
              if (result) {
                this.refreshList();
              }
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    this.loanManager.add(editViewM);
  }

  preclosure() {
    var advanceData = {
      actionType: 'preclosure',
      data: '',
    };
    const dialogRef = this.dialog.open(LoanRepaymentModalComponent, {
      width: '800px',
      data: { editObj: advanceData },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.refreshList();
      }
    });
  }

  downloadAttchement(item) {
    let dAttach = this.loansAdvService
      .downloadMarriageLoan(item.referenceNumber)
      .subscribe(
        (data: any) => {
          this.blob = new Blob([data], { type: 'application/pdf' });
          this.pdfUrl = URL.createObjectURL(this.blob);
          //  this.attachementTitle = item.fileName + ".pdf"
          this.downloadPdf();
        },
        (error) => {
          console.log(error);
        }
      );

    this.loanManager.add(dAttach);
  }

  downloadPdf() {
    let D = document;
    let link = D.createElement('a');
    link.href = this.pdfUrl;
    window.open(this.pdfUrl, '_blank');
    // link.click();
  }
  deleteMarriageLoan(obj) {
    let deMarriage = this.messageService.showConfirmation(
      'Do you want to delete this Marriage Loan entry?',
      'Confirmation',
      'confirmation-icon',
      (reason) => {
        if (reason === 'YES') {
          let objRef = {
            referenceNumber: obj.referenceNumber,
          };
          this.loansAdvService.deleteMarriageLoan(objRef).subscribe(
            (res) => {
              if (res) {
                //  let msg = JSON.parse(res.responseData);
                this.messageService.showMessage(
                  'Deleted successfully',
                  'Success',
                  'success-icon',
                  'CLOSE'
                );
                this.getMarrigeLoanHistoryData();
              }
            },
            (error) => {}
          );
        }
      }
    );
    this.loanManager.add(deMarriage);
  }

  deleteTeamAdvance(obj) {
    const requestObj = {};
    requestObj['sequenceNumber'] = obj.sequenceNumber;
    requestObj['imUser'] = '';
    requestObj['exMessage'] = '';
    let dTeamAd = this.loansAdvService
      .deleteTeamAdvance(requestObj, obj.sequenceNumber)
      .subscribe(
        (data) => {
          this.getTeamHistory();
          this.messageService.showMessage(
            'Deleted successfully',
            'Success',
            'success-icon',
            'CLOSE'
          );
        },
        (error) => {
          console.log(error);
        }
      );
    this.loanManager.add(dTeamAd);
  }

  refreshList() {
    this.getMarrigeLoanHistoryData();
  }

  openLoanRepayment() {
    this.dialog.open(LoanRepaymentModalComponent, {
      width: '800px',
    });
  }
  createAdvances() {
    this.dialog.open(AdvancesModalComponent, {
      width: '800px',
    });
  }

  roundOff(value: any) {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    return Math.round(value * 10) / 10;
  }
  ngOnDestroy() {
    this.loanManager.unsubscribe();
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach((subs) => {
        subs.unsubscribe();
      });
    }
  }
}
export interface DialogData {
  editObj: any;
}
