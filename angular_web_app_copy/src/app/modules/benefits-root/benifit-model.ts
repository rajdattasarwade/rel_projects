export class OverviewDetails{
    permanentNumber: number;
    requestNumber: string;
    vehicleType: string;
    vehicleMode: string;
    vehicleModelNumber: string
    statusText: string
    requestNumberDate: string;
    status: string;
    rcBookFlag: boolean;
    insuranceFlag: boolean;
    buyBackFlag: boolean;
    repaymentSchedule: boolean;
    otherFlag: boolean;
    filePath:string;
    constructor(data:any){
        this.permanentNumber = data.permanentNumber;
        this.requestNumber = data.requestNumber;
        this.vehicleType = data.vehicleType;
        this.vehicleMode = data.vehicleMode;
        this.vehicleModelNumber = data.vehicleModelNumber;
        this.statusText = data.statusText;
        this.requestNumberDate = data.requestNumberDate;
        this.status = data.status;
        this.rcBookFlag = data.rcBookFlag;
        this.insuranceFlag = data.insuranceFlag;
        this.buyBackFlag = data.buyBackFlag;
        this.repaymentSchedule = data.repaymentSchedule;
        this.otherFlag = data.otherFlag;
        this.filePath = data.filePath;
    }
}

export class DetailsCOV {
      requestNumber: string;
      vehicleNumber: string;
      checkNumber: number
      checkDate: Date;
      bankName: string;
      vehicleCost: number;
      noOfMonths: number;
      vehicleEmi: number;
      insuranceEmi: number;
      wdvit: number; //WDVT as per income tax
      bbAmount: number; //wdv as per ctc
      perquisite: number;
      gstElgAmt: number;
      cgstAmount: number;
      cgstPercent: number;

      sgstAmount: number;
      sgstPercent: number;

      cessAmount: number;
      cessPercent: number;

      totalTaxAmt: number;
      discountAmt: number;
      discountPer: number;

      totalNet: number;
      tcsAmount: number;
      tcsPerAmount: number;
      vatTax: number;
      totalCheqAmt: number;
      constructor(data:any){
        this.requestNumber = data.requestNumber;
        this.vehicleNumber = data.vehicleNumber;
        this.checkNumber = data.checkNumber;
        this.checkDate = data.checkDate;
        this.bankName = data.bankName;
        this.vehicleCost = data.vehicleCost.toString();
        this.noOfMonths = data.noOfMonths.toString();
        this.vehicleEmi = data.vehicleEmi.toString();
        this.insuranceEmi = data.insuranceEmi.toString();
        this.wdvit = data.wdvit.toString(); //WDVT as per income tax
        this.bbAmount = data.bbAmount.toString(); //wdv as per ctc
        this.perquisite = data.perquisite.toString();
        this.gstElgAmt= data.gstElgAmt.toString();
        this.cgstAmount= data.cgstAmount.toString();
        this.cgstPercent= data.cgstPercent.toString();

        this.sgstAmount= data.sgstAmount.toString();
        this.sgstPercent= data.sgstPercent.toString();

        this.cessAmount= data.cessAmount.toString();
        this.cessPercent= data.cessPercent.toString();

        this.totalTaxAmt= data.totalTaxAmt.toString();
        this.discountAmt= data.discountAmt.toString();
        this.discountPer= data.discountPer.toString();

        this.totalNet= data.totalNet.toString();
        this.tcsAmount= data.tcsAmount.toString();
        this.tcsPerAmount= data.tcsPerAmount.toString();
        this.vatTax= data.vatTax.toString();
        this.totalCheqAmt= data.totalCheqAmt.toString();
      }
}