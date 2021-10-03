export class EmployeeDetailsModel {
    awardAmount: string;
    bonusAmount: string;
    count: string;
    currentYearRating: string;
    effectiveDate: number;
    employeeNumber: string;
    employeeName: string;
    fYear: string;
    mvYear: string;
    incrementAmount: string;
    printFlag: string;
    reason: string;
    reasonCode: string;
    reasonSubCode: string;
    sequenceNumber: string;
    teamMember: string;
    type: string;
    typeText: string;
    year: string;
    documentName: string;
  
    constructor() {
      this.awardAmount = "";
      this.bonusAmount = "";
      this.count = "";
      this.currentYearRating = "";
      this.effectiveDate = 0;
      this.employeeNumber = "";
      this.employeeName = "";
      this.fYear = "";
      this.mvYear = "";
      this.incrementAmount = "";
      this.printFlag = "";
      this.reason = "";
      this.reasonCode = "";
      this.reasonSubCode = "";
      this.sequenceNumber = "";
      this.teamMember = "";
      this.type = "";
      this.typeText = "";
      this.year = "";
      this.documentName = "";
    }
  }

  export class ReleaseModel {
    documentName: string;
    releaseLetter: any[];
  
    constructor() {
      this.documentName = "";
      this.releaseLetter = [];
    }
  }
  export class EmployeeModel {
    userCode: string;
    userName: string;
    uName: string;
    constructor() {
      this.userName = "";
      this.userCode = "";
      this.uName = "";
    }
  }