export class SectionADataModel {
  deductionName: string;
  proposedAmount: number;
  actualAmount: number;
  referenceNumber: string;
  actualAmountVerified: number;
  status: string;
  statusText: string;
  icons: string;
  createFlag: boolean;
  editFlag: boolean;
  printFlag: boolean;
}
export const HouseRentDeclarationColumns = [
  'deductionName',
  'period',
  'actualRentAmount',
  'approxAmount',
  'statusText',
  'icons',
];
export const HouseRentDeclarationColumnValues = {
  deductionName: 'Deduction Name',
  period: 'Period',
  actualRentAmount: 'Declared Amount',
  approxAmount: 'Actual Amt Verified',
  statusText: 'Status',
  icons: '',
};
export const HouseRentReceiptColumns = [
  'deductionName',
  'fromDate',
  'toDate',
  'claimAmount',
  'requestStatusText',
  'icons',
];
export const HouseRentReceiptColumnValues = {
  deductionName: 'Deduction Name',
  fromDate: 'From Date',
  toDate: 'To Date',
  claimAmount: 'Rent Claim Amount',
  requestStatusText: 'Status',
  icons: '',
};
export const HouseRentReceiptColumnsNoValues = ['deductionName'];
export const HouseRentReceiptColumnValuesNoValues = {
  deductionName: 'No Data Available',
};
export const SectionAColumns = [
  'deductionName',
  'proposedAmount',
  'actualAmount',
  'actualAmountVerified',
  'statusText',
  'icons',
];
export const SectionAColumnValues = {
  deductionName: 'Deduction Name',
  proposedAmount: 'Proposed Amount',
  actualAmount: 'Actual Amount',
  actualAmountVerified: 'Actual Amt Verified',
  statusText: 'Status',
  icons: '',
};
export const Form12BBColumns = [
  'deductionName',
  'fromDate',
  'toDate',
  'investmentAmount',
  'statusDescription',
  'icons',
];
export const From12BBColumnValues = {
  deductionName: 'Deduction Name',
  fromDate: 'From Date',
  toDate: 'To Date',
  investmentAmount: 'Actual Amount',
  statusDescription: 'Status',
  icons: '',
};
