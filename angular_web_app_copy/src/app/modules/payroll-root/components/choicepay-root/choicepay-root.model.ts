export class ChoicePayPeriod {
  infoMessage: string;
  userName: string;
  indexNumber: string;
  effectiveDate: number;
  type: string;
  message: string;
  flag: boolean;
  elementFlag: boolean;
  financialStartYear: string;
  financialEndDate: string;
  constructor() {}
}

export class CodeValue {
  code: string;
  value: string;
}
export class ChoicePayComponentModel {
  effectiveDate: number;
  userName: string;
  indexNumber: string;
  component: string;
  componentText: string;
  amount: number;
  minAmount: number;
  maxAmount: number;
  isEditable: boolean;
  isMandatory: boolean;
  hasSelected: boolean;
  isDeleted: boolean;
  type: string;
  message: string;
  key: string;
  claimedAmount: number;
  balanceAmount: number;
}

export const ChoicePayComponentMapping = {
  GPAI: 'Group Personal Accident Insurance',
  GTLI: 'Group Term Life Insurannce',
  MEDP: 'Group hospitalisation ins',
  SUPA: 'Superannuation contribution',
};
export const breadcrumbAddNewElementJson: any = [
  {
    label: 'Payroll',
    link: '/payroll',
  },
  {
    label: 'Choice Pay',
    link: '/payroll/choicepay',
  },
  {
    label: 'Add New Element',
    link: '/payroll/choicepay/add-new-element',
  },
];

export class breadcrumbObj {
  label: string;
  link: string;
  constructor(label, link) {
    this.label = label;
    this.link = link;
  }
}

export const breadcrumbChoicePayJson: any = [
  {
    label: 'Payroll',
    link: '/payroll',
  },
  {
    label: 'Choice Pay',
    link: '/payroll/choicepay',
  },
];
export const EXCLUSIVE_CHOICEPAY_COMPONENTS=["HRA","FUMT","FMTW"];