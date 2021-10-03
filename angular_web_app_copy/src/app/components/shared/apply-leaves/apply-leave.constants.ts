export class ApplyLeaveConstants {
  static readonly OPTIONAL_HOLIDAY_LEAVE_CODE = '0402';
  static readonly MATERNITY_LEAVE_CODE = '0500';
  static readonly MISCARRIAGE_LEAVE_CODE = '0520';
  static readonly CONTINGENCY_LEAVE_CODE = '0300';
  static readonly SICK_LEAVE_CODE = '0200';
  static readonly PRIVILEGE_LEAVE_CODE = '0100';
  static readonly ADVANCE_PL_LEAVE_CODE = '0105';
  static readonly LEAVE_WITHOUT_PAY_LEAVE_CODE = '0150';
  static readonly OUTDOOR_DUTY_LEAVE_CODE = '0450';
  static readonly PH_LEAVE_CODE = '0570';
  static readonly PATERNITY_LEAVE_CODE = '0525';
  static readonly ADVANCE_SICK_LEAVE_CODE = '0205';
  static readonly MATERNITY_LEAVE_ESIC_CODE = '0490';
  static readonly WORK_FROM_HOME = '0455';

  static dontShowLeftLeaveCodeArray = [
    ApplyLeaveConstants.OUTDOOR_DUTY_LEAVE_CODE,
    ApplyLeaveConstants.ADVANCE_PL_LEAVE_CODE,
    ApplyLeaveConstants.LEAVE_WITHOUT_PAY_LEAVE_CODE,
    ApplyLeaveConstants.MISCARRIAGE_LEAVE_CODE,
    ApplyLeaveConstants.ADVANCE_SICK_LEAVE_CODE,
    ApplyLeaveConstants.PH_LEAVE_CODE,
    ApplyLeaveConstants.MATERNITY_LEAVE_CODE,
    ApplyLeaveConstants.MATERNITY_LEAVE_ESIC_CODE,
    ApplyLeaveConstants.WORK_FROM_HOME,
  ];
}
