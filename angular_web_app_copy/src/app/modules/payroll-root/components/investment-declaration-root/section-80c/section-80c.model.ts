export const ViewEditSection80cColumns = [
  'lineNumber',
  'attachFlag',
  'name',
  'maximumLimit',
  'proposedAmount',
  'actualAmount',
  'verifiedAmount',
];

export const ViewEditSection80cColumnsValues = {
  lineNumber: 'Sr.No.',
  attachFlag: 'Attachment',
  name: 'Investments / Contributions',
  maximumLimit:'Maximum Limit',
  proposedAmount: 'Proposed Amount',
  actualAmount: 'Actual Amount',
  verifiedAmount: 'Verified Amount',
};

export class Section80cViewEditModel {
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
  section80CHeaderDetail: Section80CHeaderDetail[];
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
export class Section80CHeaderDetail {
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
