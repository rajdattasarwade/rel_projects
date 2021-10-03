import { ReimbursementsDetails } from '../../../utils/reimbursements.model';

class ReimbursementsTypeKey {
  sapCode: string;
  value: string;
  choicePay: boolean;
  constructor(data: any) {
    this.sapCode = data.sapCode;
    this.value = data.value;
    this.choicePay = data.choicePay;
  }
}

export class ReimbursementsTypeObjectModel {
  reimbursementTypeKey: ReimbursementsTypeKey;
  claimDate: number;
  statusKey: string;
  statusText: string;
  requiredAmount: number;
  appilicableAmount: number;
  editFlag: boolean;
  deleteFlag: boolean;
  attachmentFlag: boolean;
  attachmentCount: string;
  claimNumber: string;
}

export class ClaimHeaderModel {
  claimNumber: string;
  reimbursementType: string;
  reimbursementStatus: string;
  totalAmount: number;
  claimYear: string;
  leaveBeginDate: any;
  leaveEndDate: any;
  requestOperation: string;
  selfTravelled: boolean;
  claimMonthNC: string;
  categoryNC: string;
  physicianNC: string;
  specialistNC: string;
  accidentDateNC: any;
  requestNumberNC: string;
  message: string;
  claimDetail: results;
}
class results {
  results: ReimbursementsDetails[];
}

export class CreateClaimPayloadModel {
  reimbursementType: string;
  totalAmount: number;
  requestOperation: string;
  claimDetail: ReimbursementsDetails[];
  deletedLineNumber: string[];
  reimbursementStatus: string;
  claimNumber: string;
  claimMonthNC: string;
  claimYear: string;
}
export class TypeOfExpense {
  dropdownType: string;
  code: string;
  value: string;
}
export class ClaimYear {
  dropdownType: string;
  code: string;
  value: string;
}
export class DeleteAttachmentModel {
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
}
