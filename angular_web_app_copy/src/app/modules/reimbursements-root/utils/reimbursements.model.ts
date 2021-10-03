export class ReimbursementsTypeDetails {
  reimbursementType: ReimbursementsType;
  reimbursementText: string;
  fromDate: string;
  toDate: string;
  totalAmount: number;
  amount: number;
  balanceAmount: number;
  flag: boolean;
  bgColor: string;
  icon: string;
  imgUrl: string;
  constructor(data: any) {
    this.reimbursementType = new ReimbursementsType(data.reimbursementType);
    this.reimbursementText = data.reimbursementText;
    this.fromDate = data.fromDate;
    this.toDate = data.toDate;
    this.totalAmount = data.totalAmount;
    this.amount = data.amount;
    this.balanceAmount = data.balanceAmount;
    this.flag = false;
    this.bgColor = '';
    this.icon = '';
    this.imgUrl = '';
  }
}
export class ReimbursementsType {
  sapCode: string;
  value: string;
  choicePay: boolean;
  constructor(data: any) {
    this.sapCode = data.sapCode;
    this.value = data.value;
    this.choicePay = data.choicePay;
  }
}

export class storeStatus {
  static statusObj: any = [];
}

export class storeReimbursementType {
  static typeObj: any = [];
}
export const SAVE_AS_DRAFT_CONFIRMATION = 'Do you want to Save as Draft?';
export const SAVE_CONFIRMATION =
  'Ensure all supporting documents are attached. Do you want to Save?';

export class ReimbursementsDetails {
  attachDoc: AttachDoc;
  reimbursementType: string;
  claimNumber: string;
  billNumber: string;
  billDate: number;
  billAmount: number;
  remarks: string;
  travelMode: string;
  travelClass: string;
  ltaPlaceFrom: string;
  ltaPlaceTo: string;
  lineNumber: string;
  dependent: string;
  distance: string;
  lcPlaceFrom: string;
  lcPlaceTo: string;
  travelDate: number;
  requestedAmount: number;
  withoutBill: string;
  childName: string;
  otherReimbursementType: string;
  billNumberNC: string;
  subType: string;
  vendorNameNC: string;
  hasAttached: boolean;
  deletedLineNo: any;
  requestOperation: string;
  constructor(data: any) {
    if (!!data) {
      this.attachDoc = data.attachDoc;
      this.reimbursementType = data.reimbursementType
        ? data.reimbursementType
        : '';
      this.claimNumber = data.claimNumber ? data.claimNumber : '';
      this.billNumber = data.billNumber ? data.billNumber : '';
      this.billDate = data.billDate ? data.billDate : '';
      this.billAmount = data.billAmount ? data.billAmount : '';
      this.remarks = data.remarks ? data.remarks : '';
      this.travelMode = data.travelMode ? data.travelMode : '';
      this.travelClass = data.travelClass ? data.travelClass : '';
      this.ltaPlaceFrom = data.ltaPlaceFrom ? data.ltaPlaceFrom : '';
      this.ltaPlaceTo = data.ltaPlaceTo ? data.ltaPlaceTo : '';
      this.lineNumber = data.lineNumber ? data.lineNumber : '';
      this.dependent = data.dependent ? data.dependent : '';
      this.distance = data.distance ? data.distance : '';
      this.lcPlaceFrom = data.lcPlaceFrom ? data.lcPlaceFrom : '';
      this.lcPlaceTo = data.lcPlaceTo ? data.lcPlaceTo : '';
      this.travelDate = data.travelDate ? data.travelDate : '';
      this.requestedAmount = data.requestedAmount ? data.requestedAmount : '';
      this.withoutBill = data.withoutBill ? data.withoutBill : '';
      this.childName = data.childName ? data.childName : '';
      this.otherReimbursementType = data.otherReimbursementType
        ? data.otherReimbursementType
        : '';
      this.billNumberNC = data.billNumberNC ? data.billNumberNC : '';
      this.subType = data.subType ? data.subType : '';
      this.vendorNameNC = data.vendorNameNC ? data.vendorNameNC : '';
      this.hasAttached = false;
      this.deletedLineNo = data.deletedLineNo ? data.deletedLineNo : [];
      this.requestOperation = data.requestOperation
        ? data.requestOperation
        : '';
    }
  }
}

export class AttachDoc {
  uName: string;
  permanentNumber: string;
  claimNumber: string;
  reimbursementType: string;
  lineNumber: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  fileData: string;
  deleteFlag: boolean;
  constructor(data: any) {
    if (data) {
      this.uName = data.uName ? data.uName : '';
      this.permanentNumber = data.permanentNumber ? data.permanentNumber : '';
      this.claimNumber = data.claimNumber ? data.claimNumber : '';
      this.reimbursementType = data.reimbursementType
        ? data.reimbursementType
        : '';
      this.lineNumber = data.lineNumber ? data.lineNumber : '';
      this.fileName = data.fileName ? data.fileName : '';
      this.fileType = data.fileType ? data.fileType : '';
      this.fileSize = data.fileSize ? data.fileSize : '';
      this.fileData = data.fileData ? data.fileData : '';
      this.deleteFlag = data.deleteFlag ? data.deleteFlag : false;
    }
  }
}
