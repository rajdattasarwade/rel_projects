export class DashboardModel {
    requestNumber: string;
    type: string;
    value: string;
    year: string;
    name: string;
    employeeNumber: string;
    expenseType: string;
    selfAmount: number;
    rollAmount: number;
    expFlag: boolean;
    repFlag: boolean;
    dashboardModel: DashboardModel[];
    constructor(){
        this.requestNumber = '';
        this.type = '';
        this.value = '';
        this.year = '';
        this.name = '';
        this.employeeNumber = '';
        this.expenseType = '';
        this.selfAmount = 0;
        this.rollAmount = 0;
        this.expFlag = false;
        this.repFlag = false;
        this.dashboardModel = [];
    }
}

export class ClaimsModel {
    requestNumber: string;
    type: string;
    value: string;
    year: string;
    claimNo: string;
    employeeNumber: string;
    expenseType: string;
    claimDate: number;
    amount: number;
    amount1: number;
    attchFlag: boolean;
    receiptno: string;
    expTypeText: string;
    tripNo: string;
    attchCount: string;
    attachName: string;
    constructor(){
        this.requestNumber = '';
        this.type = '';
        this.value = '';
        this.year = '';
        this.claimNo = '';
        this.employeeNumber = '';
        this.expenseType = '';
        this.claimDate =  0;
        this.amount =  0;
        this.amount1 =  0;
        this.attchFlag = false;
        this.receiptno = '';
        this.expTypeText = '';
        this.tripNo = '';
        this.attchCount = '';
        this.attachName = '';
    }
}