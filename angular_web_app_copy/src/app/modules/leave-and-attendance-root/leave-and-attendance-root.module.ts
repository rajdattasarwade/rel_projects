import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../components/shared/shared.module';
import { LeaveAndAttendanceComponent } from './leave-and-attendance-landing/leave-and-attendance.component';
import { LeaveAttendanceRoutingModule } from './leave-attendance-routing.module';
import { CoreModule } from '../../core.module';
import { ApplyLeavesWidgetComponent } from '../../components/shared/apply-leaves/apply-leaves-widget/apply-leaves-widget.component';
import { ApplyLeavesServiceComponent } from '../../components/shared/apply-leaves/apply-leaves-service/apply-leaves-service.component';
import { UpcomingHolidaysWidgetComponent } from '../../components/shared/holiday-calendar/upcoming-holidays-widget/upcoming-holidays-widget.component';
import { UpcomingHolidaysServiceComponent } from '../../components/shared/holiday-calendar/upcoming-holidays-service/upcoming-holidays-service.component';
import { AttendanceCalendarComponent } from '../leave-and-attendance-root/components/calendar/attendance-calendar/attendance-calendar.component';
import { RegularizeModalComponent } from './components/regularize-modal/regularize-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeReportSelfComponent } from '../leave-and-attendance-root/components/time-report-self/time-report-self.component';
import { TimeReportTeamComponent } from '../leave-and-attendance-root/components/time-report-team/time-report-team.component';
import { ShiftChangeComponent } from '../leave-and-attendance-root/components/shift-change/shift-change.component';
import { TeamAttendanceReportComponent } from '../leave-and-attendance-root/components/team-attendance-report/team-attendance-report.component';
import { DailyAttendanceComponent } from '../leave-and-attendance-root/components/team-attendance-report/daily-attendance/daily-attendance.component';
import { MonthlyAttendanceComponent } from '../leave-and-attendance-root/components/team-attendance-report/monthly-attendance/monthly-attendance.component';
import { AnnualAttendanceComponent } from '../leave-and-attendance-root/components/team-attendance-report/annual-attendance/annual-attendance.component';
import { LeaveRequestModalComponent } from './components/leave-request-modal/leave-request-modal.component';
import { TeamAttendanceFilterModalComponent } from './components/team-attendance-report/team-attendance-filter-modal/team-attendance-filter-modal.component';
import { HeaderCalendarComponent } from './components/calendar/header-calendar/header-calendar.component';
import { CalendarListViewComponent } from './components/calendar/calendar-list-view/calendar-list-view.component';
import { GenerateOtpWidgetComponent } from './components/generate-otp/generate-otp-widget/generate-otp-widget.component';
import { GenerateOtpServiceComponent } from './components/generate-otp/generate-otp-service/generate-otp-service.component';
import { CalActionPopupComponent } from './components/cal-action-popup/cal-action-popup.component';
import { TeamAttendanceService } from '../leave-and-attendance-root/components/team-attendance-report/team-attendance.service';
import { LeaveModalComponent } from './components/leave-modal/leave-modal.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { MyShiftComponent } from './components/shift-change/my-shift/my-shift.component';
import { ShiftPlanningComponent } from './components/shift-change/shift-planning/shift-planning.component';
import { WorkScheduleComponent } from './components/shift-change/work-schedule/work-schedule.component';
import { AssignShiftModalComponent } from './components/shift-change/shift-planning/assign-shift-modal/assign-shift-modal.component';
import { ShiftChangeModalComponent } from './components/shift-change/my-shift/shift-change-modal/shift-change-modal.component';
import { ShiftFilterModalComponent } from './components/shift-change/shift-planning/shift-filter-modal/shift-filter-modal.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CoffAvailedComponent } from './components/time-report-self/coff-availed/coff-availed.component';
import { OtCoffStatusComponent } from './components/time-report-self/ot-coff-status/ot-coff-status.component';
import { LeaveRegHistoryPopupComponent } from './components/leave-reg-history-popup/leave-reg-history-popup.component';
import { LeaveHistoryTabComponent } from './components/leave-reg-history-popup/leave-history-tab/leave-history-tab.component';
import { RegularizationHistoryTabComponent } from './components/leave-reg-history-popup/regularization-history-tab/regularization-history-tab.component';
import { CompOffWidgetComponent } from './components/time-report-self/comp-off-widget/comp-off-widget.component';
import {ShiftService} from './components/shift-change/manage_shift.service'
import { LeaveReconciliationComponent } from './components/leave-reconciliation/leave-reconciliation.component';
import { LeaveEncashmentComponent } from './components/leave-encashment/leave-encashment.component';
import { LeaveDetailsPopupComponent } from './components/leave-reconciliation/leave-details-popup/leave-details-popup.component';
import { LeaveCreditedPopupComponent } from './components/leave-reconciliation/leave-credited-popup/leave-credited-popup.component';
import { LeaveAvailedPopupComponent } from './components/leave-reconciliation/leave-availed-popup/leave-availed-popup.component';
import { CompOffLeaveDetailsComponent } from './components/leave-reconciliation/comp-off-leave-details/comp-off-leave-details.component';
import { NationalHolidayComponent } from './components/national-holiday/national-holiday/national-holiday.component';
import { MaternityModalComponent } from './components/maternity-modal/maternity-modal.component';
import { ErrorTableModalComponent } from '../leave-and-attendance-root/components/error-table-modal/error-table-modal.component';
@NgModule({
  declarations: [
    LeaveAndAttendanceComponent,
    ApplyLeavesWidgetComponent,
    ApplyLeavesServiceComponent,
    UpcomingHolidaysWidgetComponent,
    UpcomingHolidaysServiceComponent,
    AttendanceCalendarComponent,
    RegularizeModalComponent,
    TimeReportSelfComponent,
    TimeReportTeamComponent,
    ShiftChangeComponent,
    TeamAttendanceReportComponent,
    DailyAttendanceComponent,
    MonthlyAttendanceComponent,
    AnnualAttendanceComponent,
    LeaveRequestModalComponent,
    TeamAttendanceFilterModalComponent,
    HeaderCalendarComponent,
    CalendarListViewComponent,
    GenerateOtpWidgetComponent,
    GenerateOtpServiceComponent,
    CalActionPopupComponent,
    LeaveModalComponent,
    SuccessModalComponent,
    MyShiftComponent,
    ShiftPlanningComponent,
    WorkScheduleComponent,
    AssignShiftModalComponent,
    ShiftChangeModalComponent,
    ShiftFilterModalComponent,
    CoffAvailedComponent,
    OtCoffStatusComponent,
    LeaveRegHistoryPopupComponent,
    LeaveHistoryTabComponent,
    RegularizationHistoryTabComponent,
    CompOffWidgetComponent,
    LeaveReconciliationComponent,
    LeaveEncashmentComponent,
    LeaveDetailsPopupComponent,
    LeaveAvailedPopupComponent,
    LeaveCreditedPopupComponent,
    CompOffLeaveDetailsComponent,
    NationalHolidayComponent,
    MaternityModalComponent,
    ErrorTableModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    LeaveAttendanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
  ],
  entryComponents: [SharedModule, LeaveRegHistoryPopupComponent],
  providers: [TeamAttendanceService, AttendanceCalendarComponent,CalendarListViewComponent,ShiftService]
 
})
export class LeaveAndAttendanceRootModule {}
