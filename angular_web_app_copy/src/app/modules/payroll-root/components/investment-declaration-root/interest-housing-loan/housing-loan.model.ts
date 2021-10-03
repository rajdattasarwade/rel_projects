export class HouseLoanDetailModel {
  requestNumber: string;
  sequenceNumber: string;
  propertyCode: string;
  propertyText: string;
  yearlyRentAmount: string;
  actualDeductionInterestUnder24: string;
  repairs: string;
  propertyTaxPaid: string;
  lenderName: string;
  lenderAddressOne: string;
  lenderAddressTwo: string;
  lenderAddressThree: string;
  lenderPancardNumber: string;
  lenderCode: string;
  lenderText: string;
  docId: string;
  possessionDate: number;
  acknowledge: boolean;
  deleteAttachment: boolean;
  propertyAddress: string;
  hasAttachment: boolean;
  deleteflag: boolean;
  attachment: any;

  constructor() {
    this.requestNumber = '';
    this.sequenceNumber = '0';
    this.propertyCode = '1';
    this.propertyText = 'Self-occupied/Deemed self-occupied House Property';
    this.yearlyRentAmount = '0.0';
    this.actualDeductionInterestUnder24 = '0.0';
    this.repairs = '';
    this.propertyTaxPaid = '';
    this.lenderName = '';
    this.lenderAddressOne = '';
    this.lenderAddressTwo = '';
    this.lenderAddressThree = '';
    this.lenderPancardNumber = '';
    this.lenderCode = '';
    this.lenderText = '';
    this.docId = '';
    this.possessionDate = 1600630732289;
    this.acknowledge = false;
    this.deleteAttachment = false;
    this.propertyAddress = '';
    this.hasAttachment = false;
    this.deleteflag = false;
    this.attachment = [];
  }
}

export class HouseLoanOverviewModel {
  proposedAmount: string;
  actualAmount: string;
  approvedAmount: string;
  statusCode: string;
  statusText: string;
  employeeRemarks: string;
  approvalRemarks: string;
  createFlag: boolean;
  editFlag: boolean;
  printFlag: boolean;
  actionFlag: boolean;

  constructor() {
    this.proposedAmount = '';
    this.actualAmount = '';
    this.approvedAmount = '';
    this.statusCode = '';
    this.statusText = '';
    this.employeeRemarks = '';
    this.approvalRemarks = '';
    this.createFlag = false;
    this.editFlag = false;
    this.printFlag = false;
    this.actionFlag = false;
  }
}
export const HousingLoanInitMessage: string =
  '1. You may please attach soft copy of relevant document in single PDF(<2MB). Please update all the property details under one request only. <br> 2. Last year if you have already submitted house related documents such as possession letter, agreement etc, there is no need to submit these documents again. However, statement of principal & interest is mandatory.';
