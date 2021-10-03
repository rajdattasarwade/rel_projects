import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveAndAttendanceComponent } from '../leave-and-attendance-root/leave-and-attendance-landing/leave-and-attendance.component';
import { TimeReportSelfComponent } from '../leave-and-attendance-root/components/time-report-self/time-report-self.component';
import { TimeReportTeamComponent } from '../leave-and-attendance-root/components/time-report-team/time-report-team.component';
import { ShiftChangeComponent } from '../leave-and-attendance-root/components/shift-change/shift-change.component';
import { TeamAttendanceReportComponent } from '../leave-and-attendance-root/components/team-attendance-report/team-attendance-report.component';
import { DailyAttendanceComponent } from '../leave-and-attendance-root/components/team-attendance-report/daily-attendance/daily-attendance.component';
import { MonthlyAttendanceComponent } from '../leave-and-attendance-root/components/team-attendance-report/monthly-attendance/monthly-attendance.component';
import { AnnualAttendanceComponent } from '../leave-and-attendance-root/components/team-attendance-report/annual-attendance/annual-attendance.component';
import { ApplyLeavesServiceComponent } from '../../components/shared/apply-leaves/apply-leaves-service/apply-leaves-service.component';
import { GenerateOtpServiceComponent } from '../leave-and-attendance-root/components/generate-otp/generate-otp-service/generate-otp-service.component';
import { UpcomingHolidaysServiceComponent } from '../../components/shared/holiday-calendar/upcoming-holidays-service/upcoming-holidays-service.component';
import { LeaveRegHistoryPopupComponent } from './components/leave-reg-history-popup/leave-reg-history-popup.component';
import { LeaveReconciliationComponent } from './components/leave-reconciliation/leave-reconciliation.component';
import { LeaveEncashmentComponent } from './components/leave-encashment/leave-encashment.component';
import { NationalHolidayComponent } from './components/national-holiday/national-holiday/national-holiday.component';

const routes: Routes = [
  {
    path: '',
    component: LeaveAndAttendanceComponent,
  },
  { path: 'teamReportSelf', component: TimeReportSelfComponent },
  { path: 'teamReportTeam', component: TimeReportTeamComponent },
  { path: 'shiftPlanning', component: ShiftChangeComponent },
  { path: 'teamAttendanceReport', component: TeamAttendanceReportComponent },
  { path: 'dailyAttendance', component: DailyAttendanceComponent },
  { path: 'monthlyAttendance', component: MonthlyAttendanceComponent },
  { path: 'annualAttendance', component: AnnualAttendanceComponent },
  { path: 'leave-planner', component: ApplyLeavesServiceComponent },
  { path: 'generate-OT-Slip', component: GenerateOtpServiceComponent },
  { path: 'upcomingHolidayList', component: UpcomingHolidaysServiceComponent },
  { path: 'leaveRegularizationHistory', component: LeaveRegHistoryPopupComponent },
  { path: 'leaveReconciliation', component: LeaveReconciliationComponent},
  { path: 'leaveEncashment', component: LeaveEncashmentComponent},
  { path: 'nationalHolidays', component: NationalHolidayComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveAttendanceRoutingModule {}
