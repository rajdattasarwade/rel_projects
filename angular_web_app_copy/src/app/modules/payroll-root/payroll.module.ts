import { NgModule } from '@angular/core';
import { CoreModule } from './../../core.module';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollReminderComponent } from './components/payroll-reminder/payroll-reminder.component';
import { PayrollLoansComponent } from './components/payroll-loans/payroll-loans.component';
import { PayslipsComponent } from './components/payslips/payslips.component';
import { PayrollTaxSummaryComponent } from './components/payroll-tax-summary/payroll-tax-summary.component';
import { TotalPayStatementServiceComponent } from '../payroll-root/components/total-pay-statement-service/total-pay-statement-service.component';
import { IncomeTaxPrjServiceComponent } from '../payroll-root/components/income-tax-prj-service/income-tax-prj-service.component';
import { DigitalFormServiceComponent } from '../payroll-root/components/digital-form-service/digital-form-service.component';
import { MyCompensationDetailsServiceComponent } from '../payroll-root/components/my-compensation-details-service/my-compensation-details-service.component';
import { ChoicePayLandingComponent } from '../payroll-root/components/choicepay-root/choicepay-landing.component';
import { ViewPayslipServiceComponent } from '../payroll-root/components/payslips/view-payslip-service/view-payslip-service.component';
import { PayrollService } from '../payroll-root/payroll.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PayrollLoanServiceComponent } from '../payroll-root/components/payroll-loans/payroll-loans-service/payroll-loans-service.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../components/shared/shared.module';
import { TotalPaySummaryComponent } from './components/total-pay-summary/total-pay-summary.component';
import { InvestmentDeclarationRootComponent } from '../payroll-root/components/investment-declaration-root/investment-declaration-root.component';
import { PersonalViewServiceComponent } from '../payroll-root/components/my-compensation-details-service/personal-view-service/personal-view-service.component';
import { TeamViewServiceComponent } from '../payroll-root/components/my-compensation-details-service/team-view-service/team-view-service.component';
import { SalaryDeductedDatesServiceComponent } from './components/salary-deducted-dates-service/salary-deducted-dates-service.component';
import { Section80cComponent } from '../payroll-root/components/investment-declaration-root/section-80c/section-80c.component';
import { HouseRentDeclarationComponent } from '../payroll-root/components/investment-declaration-root/house-rent-declaration/house-rent-declaration.component';
import { InterestHousingLoanComponent } from '../payroll-root/components/investment-declaration-root/interest-housing-loan/interest-housing-loan.component';
import { ChoicePayComponent } from './components/choicepay-root/choice-pay/choice-pay.component';
import { MandatoryDebitsComponent } from './components/choicepay-root/mandatory-debits/mandatory-debits.component';
import { ChoicePayElementsComponent } from './components/choicepay-root/choice-pay-elements/choice-pay-elements.component';
import { ViewTotalPayStatementComponent } from './components/choicepay-root/view-total-pay-statement/view-total-pay-statement.component';
import { AddNewElementComponent } from './components/choicepay-root/choice-pay-elements/add-new-element/add-new-element.component';
import { ChoicePayInfoComponent } from './components/choicepay-root/choice-pay-info/choice-pay-info.component';
import { ChoicepayRootService } from './components/choicepay-root/choicepay-root.service';
import { SalaryDeductedDateModalComponent } from './components/salary-deducted-dates-service/salary-deducted-date-modal/salary-deducted-date-modal.component';
import { MyCompensationDetailsService } from './components/my-compensation-details-service/my-compensation-details.service';
import { ErrorModalComponent } from './components/choicepay-root/error-modal/error-modal.component';
import { FuelReimbursementComponent } from './components/choicepay-root/fuel-reimbursement/fuel-reimbursement.component';
import { HraFormComponent } from './components/choicepay-root/hra-form/hra-form.component';
import { TeamCompensationHistoryComponent } from './components/my-compensation-details-service/team-view-service/team-compensation-history/team-compensation-history.component';
import { VehicleDetailsModalComponent } from './components/choicepay-root/vehicle-details-modal/vehicle-details-modal.component';
import { AttendanceCalendarComponent } from '../leave-and-attendance-root/components/calendar/attendance-calendar/attendance-calendar.component';
import { Form12bbComponent } from './components/investment-declaration-root/form12bb/form12bb.component';
import { InvestmentDeclarationRootService } from './components/investment-declaration-root/investment-declaration-root.service';
import { HousingLoanRootService } from './components/investment-declaration-root/housing-loan-root.service';
import { CalendarListViewComponent } from '../leave-and-attendance-root/components/calendar/calendar-list-view/calendar-list-view.component';
import { Section80dComponent } from './components/investment-declaration-root/section80d/section80d.component';
import { UploadFilesComponent } from './components/investment-declaration-root/upload-files/upload-files.component';
import { HouseRentReceiptComponent } from './components/investment-declaration-root/house-rent-receipt/house-rent-receipt.component';
import { HouseRentReceiptRootService } from './components/investment-declaration-root/house-rent-receipt-root.service';
@NgModule({
  declarations: [
    PayrollComponent,
    PayrollReminderComponent,
    PayrollLoansComponent,
    PayslipsComponent,
    PayrollTaxSummaryComponent,
    TotalPayStatementServiceComponent,
    DigitalFormServiceComponent,
    IncomeTaxPrjServiceComponent,
    MyCompensationDetailsServiceComponent,
    ChoicePayLandingComponent,
    ViewPayslipServiceComponent,
    PayrollLoanServiceComponent,
    TotalPaySummaryComponent,
    InvestmentDeclarationRootComponent,
    PersonalViewServiceComponent,
    TeamViewServiceComponent,
    SalaryDeductedDatesServiceComponent,
    Section80cComponent,
    HouseRentDeclarationComponent,
    InterestHousingLoanComponent,
    ChoicePayComponent,
    MandatoryDebitsComponent,
    ChoicePayElementsComponent,
    ViewTotalPayStatementComponent,
    AddNewElementComponent,
    ChoicePayInfoComponent,
    SalaryDeductedDateModalComponent,
    ErrorModalComponent,
    FuelReimbursementComponent,
    HraFormComponent,
    TeamCompensationHistoryComponent,
    VehicleDetailsModalComponent,
    Form12bbComponent,
    Section80dComponent,
    UploadFilesComponent,
    HouseRentReceiptComponent,
  ],
  imports: [
    CoreModule,
    PayrollRoutingModule,
    PdfViewerModule,
    ChartsModule,
    SharedModule,
  ],
  providers: [
    PayrollService,
    ChoicepayRootService,
    MyCompensationDetailsService,
    AttendanceCalendarComponent,
    InvestmentDeclarationRootService,
    HouseRentReceiptRootService,
    HousingLoanRootService,
    CalendarListViewComponent,
  ],
})
export class PayrollModule {}
