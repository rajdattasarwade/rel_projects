export class OverviewModel {
    flagTransfer: string;
    imUser: string;
    serialNo: string;
    requestDate: number;
    connectionStatus: string;
    mobileNo: string;
    requestType: string;
    isflagSurrender: boolean;
    flagCreateStatus: string;
    isFlagDelete: boolean;
    isFlagPrint: boolean;
    isFlagCertify: boolean;    
    constructor(){
        this.flagTransfer = '';
        this.imUser = '';
        this.serialNo = '';
        this.requestDate = 0;
        this.connectionStatus = '';
        this.mobileNo = '';
        this.requestType = '';
        this.isflagSurrender = false;
        this.flagCreateStatus = '';
        this.isFlagDelete = false;
        this.isFlagPrint = false;
        this.isFlagCertify = false;
    }                                              
}

export class IsdIrModel {
    imType: string;
    reqNo: string;
    reqTy: string;
    reqtyTxt: string;
    startDt: string;
    endDt: string;
    duration: string;
    status: string;
    country: string;
    constructor(){
        this.imType = '';
        this.reqNo = '';
        this.reqTy = '';
        this.reqtyTxt = '';
        this.startDt = '';
        this.endDt = '';
        this.duration = '';
        this.status = '';
        this.country = '';
    }
}