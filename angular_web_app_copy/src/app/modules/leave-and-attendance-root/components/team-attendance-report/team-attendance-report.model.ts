export class TeamAttendanceReport {
    attSatus: AttStatus;
    userId: string;
    username: string;
    atteStatusCount:any;
    expandedElement:boolean;
    
    constructor(data: any) {
        this.attSatus = 
         data.attSatus
        ? data.attSatus.map(
            item => new AttStatus(item)
          )
        : [];
        this.userId = data.userId;
        this.username = data.username;
        this.expandedElement=false;
        this.atteStatusCount = [];
    }
}
export class AttStatus {
    status: string;
    colorCode: string;
    constructor(data: any) {
        this.status = data.status?data.status:'';
        this.colorCode = data.color?data.colorCode:'';
    }
}

export class AttendanceMonthlyCount{
    employeeId:string
    employeeName:string;
    presentCnt:number;
    absentCnt:number;
    pHCnt:number;
    weekOffCnt:number
    leaveCnt:number
    oTCnt:number;
    cOffCnt:number;
    constructor(data: any) {
        this.employeeId = data.employeeId;
        this.employeeName = data.employeeName;
        this.presentCnt = data.presentCnt || data.presentCnt==0 ? data.presentCnt:'--';
        this.absentCnt = data.absentCnt || data.absentCnt==0? data.absentCnt:'--';
        this.pHCnt =  data.pHCnt || data.pHCnt==0 ? data.pHCnt:'--';
        this.weekOffCnt = data.weekOffCnt || data.weekOffCnt==0 ? data.weekOffCnt:'--';
        this.leaveCnt = data.leaveCnt || data.leaveCnt==0 ? data.leaveCnt:'--';
        this.oTCnt =  data.oTCnt || data.oTCnt==0 ? data.oTCnt:'--';
        this.cOffCnt = data.cOffCnt || data.cOffCnt==0 ? data.cOffCnt:'--';
    }
}

export class SubordinateMothlyAttemdance{
    absentFlag: false;
    actualIn: number;
    actualOut: number;
    approvedHours: string
    attendanceDate: number;
    attendanceStatus: string;
    colorCode: string;
    computedHours: string;
    displayButton: string;
    employeeNumber: string;
    generatedHours: string;
    layout:string;
    leaveApply: string;
    leaveStatus: string;
    leaveTime: string;
    mergeHours: string;
    month: string;
    regularHours: string;
    regularizationStatus: string;
    regularizedTime: string;
    shiftCode: string;
    shiftTime: string;
    supInd: string;
    timeStatus: string;
    user: string;
    year: string;
    //Here used for binding only
    weekDay:string;
    day:string;
    actualTimeHours:string;
    constructor(data:any){
        this.absentFlag =data.absentFlag;
        this.actualIn=data.actualIn;
        this.actualOut=data.actualOut;
        this.approvedHours=data.approvedHours; 
        this.attendanceDate=data.attendanceDate;
        this.attendanceStatus=data.attendanceStatus;
        this.colorCode=data.colorCode;
        this.computedHours=data.computedHours;
        this.displayButton=data.displayButton;
        this.employeeNumber=data.employeeNumber;
        this.generatedHours=data.generatedHours;
        this.layout=data.layout;
        this.leaveApply=data.leaveApply;
        this.leaveStatus=data.leaveStatus;
        this.leaveTime=data.leaveTime !="00:00-00:00" && data.leaveTime !='' ? data.leaveTime :"0";
        this.mergeHours=data.mergeHours;
        this.month=data.month;
        this.regularHours=data.regularHours;
        this.regularizationStatus=data.regularizationStatus;
        this.regularizedTime=data.regularizedTime !="00:00-00:00" && data.regularizedTime !='' ? data.regularizedTime :"0";;
        this.shiftCode=data.shiftCode;
        this.shiftTime=data.shiftTime;
        this.supInd=data.supInd;
        this.timeStatus=data.timeStatus;
        this.user=data.user;
        this.year=data.year;
        this.weekDay =data.weekDay;
        this.day =data.day;
        this.actualTimeHours=data.actualTimeHours;
    }
}

export class TeamAttendanceReportNew{
    month: string;
    year: string;
    subordinateNo: string;
    subordinateName: string;
    day1Status: string;
    day2Status: string;
    day3Status: string;
    day4Status: string;
    day5Status: string;
    day6Status: string;
    day7Status: string;
    day8Status: string;
    day9Status: string;
    day10Status: string;
    day11Status: string;
    day12Status: string;
    day13Status: string;
    day14Status: string;
    day15Status: string;
    day16Status: string;
    day17Status: string
    day18Status: string;
    day19Status: string;
    day20Status: string;
    day21Status: string;
    day22Status: string;
    day23Status: string;
    day24Status: string;
    day25Status: string;
    day26Status: string;
    day27Status: string;
    day28Status: string;
    day29Status: string
    day30Status: string;
    day31Status: string;
    expandedElement:boolean;
    constructor(data:any){
        this.month= data.month;
        this.year= data.year;
        this.subordinateNo= data.subordinateNo;
        this.subordinateName= data.subordinateName;
        this.day1Status= data.day1Status;
        this.day2Status= data.day2Status;
        this.day3Status= data.day3Status;
        this.day4Status= data.day4Status;
        this.day5Status= data.day5Status;
        this.day6Status= data.day6Status;
        this.day7Status= data.day7Status;
        this.day8Status= data.day8Status;
        this.day9Status= data.day9Status;
        this.day10Status= data.day10Status;
        this.day11Status= data.day11Status;
        this.day12Status= data.day12Status;
        this.day13Status= data.day13Status;
        this.day14Status= data.day14Status;
        this.day15Status= data.day15Status;
        this.day16Status= data.day16Status;
        this.day17Status= data.day17Status;
        this.day18Status= data.day18Status;
        this.day19Status= data.day19Status;
        this.day20Status= data.day20Status;
        this.day21Status= data.day21Status;
        this.day22Status= data.day22Status;
        this.day23Status= data.day23Status;
        this.day24Status= data.day24Status;
        this.day25Status= data.day25Status;
        this.day26Status= data.day26Status;
        this.day27Status= data.day27Status;
        this.day28Status= data.day28Status;
        this.day29Status= data.day29Status;
        this.day30Status= data.day30Status;
        this.day31Status= data.day31Status;
        this.expandedElement=false;
    }
}

