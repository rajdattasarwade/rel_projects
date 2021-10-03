export class DependentDetailModel {
  user: string;
  dependentType: string;
  dependentRelation: string;
  dependentName: string;
  depDisab: string;
  address: string;
  exFlag: string;
  depObjps: string;
}

export class PrmbEligibilityModel {
  user: string;
  activeFlag: boolean;
  eligibiltyFlag: boolean;
  foundFlag: boolean;
  mailFlag: boolean;
  employeeId: string;
  employeeName: string;
  dateOfJoining: number;
  dateOfRetiring: number;
  type: string;
  message: string;
}
