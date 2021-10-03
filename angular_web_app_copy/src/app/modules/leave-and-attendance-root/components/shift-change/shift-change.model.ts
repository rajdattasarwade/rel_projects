export class AttendanceDetModel {
  static actualIn: any;
  static actualOut: any;
  static shiftStartTime: any;
  static attCategory: any;
  static attStatus: any;
  static shiftEndTime: any;
  static shiftType: any;
  static actualTime: any = '';
  static shiftTime: any = '';
  static isToday: any;
  static isSelected: any;
  static mDate: any;
  static colorCode: any;
  static holidayDesc: any;
  static isFuture: boolean;
  static isLeave: any;
  static leaveStatus: any;
  static leaveApplied: any;
  static isRegularize: any;
  static regStatus: any;
}

export class MonthlyAttendanceDetail {
  absFlag: any;
  actualIn: any;
  actualOut: any;
  actualTime: any;
  attCategory: any;
  attEndDate: any;
  attStartDate: any;
  attStatus: any;
  colorCode: any;
  isLeave: any;
  isRegularize: any;
  leaveApplied: any;
  leaveEndTime: any;
  leaveStartTime: any;
  leaveStatus: any;
  locationCode: any;
  locationDesc: any;
  maxWorkingTime: any;
  mergeHrs: any;
  minWorkingTime: any;
  overTimeApproved: any;
  overTimeGenerated: any;
  planShiftEndTime: any;
  planShiftStartTime: any;
  regIn: any;
  regOut: any;
  regStatus: any;
  shiftEndTime: any;
  shiftStartTime: any;
  shiftTime: any;
  shiftType: any;
  toleranceEndTime: any;
  toleranceStartTime: any;
  userId: any;
  weekOfMonth: any;
}

export class storeColorCodes {
  static colorCodeObj: any = [];
  static default = '#959595';
  static todayColor = '#45545E';
}

export class IndividualShift {
  date: any;
  uName: any;
  employeeId: any;
  reqName: any;
  scheduleShift: any;
  requestShift: any;
  approvedBy: any;
  status: any;
  statusColorCode:any;
}
export class MutualShift {
  changeDate: any;
  scheduleShift: any;
  employeeId: any;
  subEmpName: any;
  subEmpShift: any;
  approvedBy: any;
  status: any;
  statusColorCode:any;
}