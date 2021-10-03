import { OverviewModelHouseRentReceipt } from '../investment-declaration-root.model';

export class HouseRentReceiptModel {
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
  constructor() {
    this.requestNumber = '';
    this.fromDate = new Date().getTime();
    this.toDate = new Date().getTime();
    this.requestCredit = 0;
    this.claimAmount = 0;
    this.approveAmount = 0;
    this.requestStatusKey = '';
    this.employeeComments = '';
    this.approveComments = '';
    this.requestStatusText = '';
    this.actionFlag = false;
    this.documentNumber = '';
    this.sequenceNumber = '';
    this.createFlag = false;
  }
}
