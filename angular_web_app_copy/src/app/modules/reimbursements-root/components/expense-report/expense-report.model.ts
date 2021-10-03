export class ReimbursementSummary {
    fromDate: any;
    toDate: any;
    reimbursementCode: string;
    reimbursementType: string;
    amount: number;
    constructor(){
        this.fromDate = null;
        this.toDate = null;
        this.reimbursementCode = '';
        this.reimbursementType = '';
        this.amount = 0;
    }
}

export class ReimbursementEmployee {
   
        fromDate: any;
        toDate: any;
        employeeNo: string;
        employeeName: string;
        reimbursementCode: string;
        reimbursementType: string;
        createDate: number;
        amount: number;
        constructor(){
            this.fromDate = null;
            this.toDate = null;
            this.employeeNo = '';
            this.employeeName = '';
            this.reimbursementCode = '';
            this.reimbursementType = '';
            this.createDate = 0;
            this.amount = 0;
        }
}

export class TravelSummary {
    fromDate: any;
    toDate: any;
    tripType: string;
    tripText: string;
    noOfTrips: number;
    amount: number;
    constructor(){
        this.fromDate = null;
        this.toDate = null;
        this.tripType = '';
        this.tripText = '';
        this.noOfTrips = 0;
        this.amount = 0;
    }
}

export class TravelEmployeeWise {
    employeeNo: string;
    employeeName: string;
    fromDate: any;
    toDate: any;
    tripType: string;
    placeOfVisit: string;
    claimedAmount: number;
    paidAmount: number;
    currency: string;
    tripNo:number;
    tripPurpose: string;
    constructor(){
        this.employeeNo =  '';
        this.employeeName = '';
        this.fromDate = null;
        this.toDate = null;
        this.tripType = '';
        this.placeOfVisit = '';
        this.claimedAmount = 0;
        this.paidAmount = 0;
        this.currency = '';
        this.tripNo = 0;
        this.tripPurpose = '';
    }
}