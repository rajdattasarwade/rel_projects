import * as moment from 'moment';

export class WithdrawalModelDetails{
    applyAmount: String;
    payeeName: String;
    payeeAddress1: String;
    payeeAddress2: String;
    withdrawalCode: String;
    maxNo: String;
    inwardNo: String;
    applyDate: number;
    relationTypeCode: String;
    name: String;
    reason1: String;
    reason2: String;
    remarks: String;
    insurancePolicyNo: number;
    policyStartDate: number;
    policyEndDate: number;
    premiumDate: number;
    premiumMonth: String;
    bankName: String;
    accountNo: number;
    accountTypeCode: String;
    ifscCode: String;
    micr: number;
    branch: String;
    bankAddress1: String;
    bankAddress2: String;
    bankAddress3: String;
    serialNo: String;
    description: String;
    check: String;
    imMode: String;
    message: String;
    date: number;
    noOfInstallment: number

    constructor(data:any){
        if(!!data){
            if(data.policyStart){
                if(moment.isMoment((data.policyStart))){
                    data.policyStart=data.policyStart.toDate().getTime()
                }
                else{
                    data.policyStart=data.policyStart.getTime()
                }
            }
            if(data.policyEnd){
                if(moment.isMoment((data.policyEnd))){
                    data.policyEnd=data.policyEnd.toDate().getTime()
                }
                else{
                    data.policyEnd=data.policyEnd.getTime()
                }
            }
            if(data.date){
                if(moment.isMoment((data.date))){
                    data.date=data.date.toDate().getTime()
                }
                else{
                    data.date=data.date.getTime()
                }
            }
            this.applyAmount= data.amountApplied?data.amountApplied:'';
            this.payeeName= data.payeeName?data.payeeName:'';
            this.payeeAddress1= data.payeeAdd1?data.payeeAdd1:'';
            this.payeeAddress2= data.payeeAdd2?data.payeeAdd2:'';
            this.withdrawalCode= data.withdrawalCode?data.withdrawalCode:'';
            this.maxNo= data.maxNo?data.maxNo:'';
            this.inwardNo= data.inwardNo?data.inwardNo:'';
            this.applyDate= data.applyDate?data.applyDate:null;
            this.relationTypeCode= data.relation?data.relation:'';
            this.name= data.name?data.name:'';
            this.reason1= data.reason1?data.reason1:'';
            this.reason2= data.reason2?data.reason2:'';
            this.remarks= data.remarks?data.remarks:'';
            this.insurancePolicyNo= data.insurancepolicy?data.insurancepolicy:'';
            this.policyStartDate= data.policyStart?data.policyStart:null;
            this.policyEndDate= data.policyEnd?data.policyEnd:null;
            this.premiumDate= data.premiumDay?data.premiumDay:'0';
            this.premiumMonth= data.premiumMonth?data.premiumMonth:'0';
            this.bankName= data.bankName?data.bankName:'';
            this.accountNo= data.accountNumber?data.accountNumber:null;
            this.accountTypeCode= data.accountTypeCode?data.accountTypeCode:'';
            this.ifscCode= data.ifscCode?data.ifscCode:'';
            this.micr= data.micr?data.micr:'';
            this.branch= data.branch?data.branch:'';
            this.bankAddress1= data.bankAddress1?data.bankAddress1:'';
            this.bankAddress2= data.bankAddress2?data.bankAddress2:'';
            this.bankAddress3= data.bankAddress3?data.bankAddress3:'';
            this.serialNo= data.serialNo?data.serialNo:'';
            this.description= data.description?data.description:'';
            this.check= data.check?data.check:'';
            this.imMode= data.imMode?data.imMode:'';
            this.message= data.message?data.message:'';
            this.date= data.date?data.date:null;
            this.noOfInstallment= data.installmentNumber?data.installmentNumber:null
        }
    }
}