export const ViewEditSection80dColumns = [
  'lineNumber',
  'attachFlag',
  'name',
  'maximumLimit',
  'proposedAmount',
  'actualAmount',
  'verifiedAmount',
];

export const ViewEditSection80dColumnsValues = {
  lineNumber: 'Sr.No.',
  attachFlag: 'Attachment',
  name: 'Investments / Contributions',
  maximumLimit: 'Maximum Limit',
  proposedAmount: 'Proposed Amount',
  actualAmount: 'Actual Amount',
  verifiedAmount: 'Verified Amount',
};

export class Section80dViewEditModel {
  permanentNumber: string;
  referenceNumber: string;
  action: string;
  conAct: boolean;
  totalProposedAmount: number;
  totalActualAmount: number;
  totalVerifiedAmount: number;
  messageType: string;
  message: string;
  employeeComments: string;
  approverComments: string;
  section80dHeaderDetail: Section80dHeaderDetail[];
}

export class AttachmentProofDetail {
  employeeNumber: any;
  incomeTaxDeclarationType: any;
  fileName: any;
  fileType: any;
  fileData: any;
  documentId: any;
  requestNumber: any;
  lineNumber: any;
}
export class Section80dHeaderDetail {
  attachmentProofDetail: AttachmentProofDetail;
  lineNumber: string;
  referenceNumber: string;
  action: string;
  serialNumber: string;
  subSection: string;
  subDivision: string;
  name: string;
  longName: string;
  maximumLimit: number;
  proposedAmount: number;
  actualAmount: number;
  verifiedAmount: number;
  financialYear: string;
  status: string;
  attachFlag: boolean;
  hasAttachment: boolean;
  deleteAttachment: boolean;
  errorMessage: string;
}
export const DeclarationMessage =
  'I do here by declare that the above consfirmations are true and correct. I also declare that I would keep and perserve documentary evidence in support of my claims and the same will be produced as may be required by extant income tax law.';
