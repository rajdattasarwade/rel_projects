import { formatDate } from '@angular/common';
import { NativeDateAdapter } from '@angular/material/core';

export class FinancialYearModel {
  startFinancialYear: string;
  endFinancialYear: string;
  financialYear: string;
}

export class MyInvestmentValidationModel {
  permanentNumber: string;
  validateFlag: boolean;
  message: string;
}

export class Form12BBDetailModel {
  deductionName: string;
  fromDate: string;
  toDate: string;
  permanentNumber: string;
  financialStartDate: number;
  financialEndDate: number;
  financialYear: string;
  investmentAmount: number;
  status: string;
  statusDescription: string;
  displayFlag: boolean;
  editFlag: boolean;
  printFlag: boolean;
  tabFlag: boolean;
  dataFlag: boolean;
  createFlag: boolean;
}
export const BreadcrumbJson: any = [
  {
    label: 'Payroll',
    link: '/payroll',
  },
  {
    label: 'Investment Declaration',
    link: '/payroll/investment-declaration',
  },
];

export class OverviewModel80c {
  name: string;
  referenceNumber: string;
  totalVerifiedAmount: number;
  totalActualAmount: number;
  totalProposedAmount: number;
  status: string;
  statusText: string;
  createFlag: boolean;
  editFlag: boolean;
  printFlag: boolean;
}
export class OverviewModel80D {
  referenceNumber: string;
  totalProposedAmount: number;
  totalActualAmount: number;
  totalVerifiedAmount: number;
  statusCode: string;
  statusText: string;
  name: string;
  createFlag: boolean;
  editFlag: boolean;
  printFlag: boolean;
}
export class OverviewModelHouseLoan {
  proposedAmount: number;
  actualAmount: number;
  approvedAmount: number;
  statusCode: number;
  statusText: string;
  employeeRemarks: string;
  approvalRemarks: string;
  createFlag: boolean;
  editFlag: boolean;
  printFlag: boolean;
  actionFlag: boolean;
}
export class OverviewModelHouseRentDeclaration {
  deductionName: string;
  period: string;
  requestNumber: string;
  fromDate: any;
  toDate: any;
  cityKey: string;
  actualRentAmount: number;
  landLordDecleration: boolean;
  landLordPan: string;
  approxAmount: number;
  statusKey: string;
  landLordAddress: string;
  remarks: string;
  comments: string;
  cityText: string;
  statusText: string;
  action: string;
  message: string;
  createFlag: boolean;
  documentNumber: string;
  landLordName: string;
}

export class ShowDeclarationModel {
  certify: string;
  showIndicatior: boolean;
  user: string;
  data: string;
  documentFlag: string;
}
export class OverviewModelHouseRentReceipt {
  deductionName: string;
  requestNumber: string;
  fromDate: number;
  toDate: number;
  requestCredit: number;
  claimAmount: number;
  approveAmount: number;
  requestStatusKey: string;
  employeeComments: string;
  approveComments: string;
  requestStatusText: string;
  actionFlag: boolean;
  documentNumber: string;
  sequenceNumber: string;
  createFlag: boolean;
}
export class MyInvestmentAttachmentDetailModel {
  employeeNumber: string;
  declarationType: string;
  fileName: string;
  fileType: string;
  fileData: string;
  documentId: string;
  requestNumber: string;
  lineNumber: string;
}
export class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd.MM.yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}
export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};