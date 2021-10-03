export class DependentDetailsModel {
    amount: string;
    childRelationId: string;
    coverageId: string;
    dependentEnable: boolean;
    dependentName: string;
    planId: string;
    relationId: string;
    relationName: string;
    selectedDependent: boolean;
  }

  export const ViewEditDependentsColumns = [
    'position',
    'name',
    'relationship',
 ];

 export class RelativeDetailsModel {
    permanentNumber: string;
    beginDate: string;
    endDate: string;
    employeeName: string;
    relationPermanentNumber: string;
    relativeName: string;
    relationCode: string;
    relationValue: string;
  }

  export class AddEditDependentModel {
    relation: any;
    firstName: string;
    lastName: string;
    dateOfBirth: number;
    nationality: any;
    countryOfBirth: any;
    cityOfBirth: string;
    occupation: any;
    organizationName: string;
    dependent: boolean;
    coverageRequired: boolean;
    hasAttached: boolean;
    attachedDocs: any;
    beginDate: number;
    objectId: string;
    gender: string;
    permanentNumber: number;
    endDate: number;
    sequenceNumber: string;
    lockIndicator: string;
    subType: string;
    marriageDate: number;
    noReasonKey: string;
    noReasonDescription: string;
  }

  export class AddRelativePayload {
    employeeNumber: string;
    relationCode: string;
    constructor() {
      this.employeeNumber = '';
      this.relationCode = '';
    }
  }

  export const choiceArray = [
    { code: true, value: 'Yes' },
    { code: false, value: 'No' },
  ];

  export class AddEditDependentPayloadModel {
    relation: any;
    gender: string;
    firstName: string;
    lastName: string;
    dateOfBirth: number;
    marriageDate: number;
    nationality: any;
    cityOfBirth: string;
    countryOfBirth: any;
    occupation: any;
    organizationName: string;
    dependent: boolean;
    coverageRequired: boolean;
    noReasonKey: string;
    beginDate: number;
    objectId: string;
    permanentNumber: number;
    sequenceNumber: string;
    lockIndicator: string;
    subType: string;
    endDate: number;
    attachedDocs: any;
    hasAttached: boolean;
  }
  