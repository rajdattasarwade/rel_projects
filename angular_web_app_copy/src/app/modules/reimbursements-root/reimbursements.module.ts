import { NgModule } from '@angular/core';
import { CoreModule } from './../../core.module';
import { CommonModule } from '@angular/common';
import { ReimbursementsComponent } from './reimbursements/reimbursements.component';
import { ReimbursementsRoutingModule } from './reimbursements-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReimbursementsFormsComponent } from './components/reimbursements-forms/reimbursements-forms.component';
import { LocalConveyanceComponent } from './components/reimbursements-forms/local-conveyance/local-conveyance.component';
import { GuestTravelExpensesComponent } from './components/reimbursements-forms/guest-travel-expenses/guest-travel-expenses.component';
import { OtherReimbursementComponent } from './components/reimbursements-forms/other-reimbursement/other-reimbursement.component';
import { KitAllowanceComponent } from './components/reimbursements-forms/kit-allowance/kit-allowance.component';
import { DailyFieldIncidentalExpenseComponent } from './components/reimbursements-forms/daily-field-incidental-expense/daily-field-incidental-expense.component';
import { SharedModule } from '../../components/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ReimbursementsListComponent } from './components/reimbursements-list/reimbursements-list.component';
import { ReimbursementsTypeComponent } from './components/reimbursements-type/reimbursements-type.component';
import { HandsetReimbursementComponent } from './components/reimbursements-forms/handset-reimbursement/handset-reimbursement.component';
import { PreEmpMedicalComponent } from './components/reimbursements-forms/pre-emp-medical/pre-emp-medical.component';
import { ReimbursementLandingComponent } from './reimbursements/reimbursement-landing/reimbursement-landing.component';
import { ClaimsListComponent } from './components/claims-list/claims-list.component';
import { ReimbursementHistoryComponent } from './components/reimbursement-history/reimbursement-history.component';
import { ExpenseReportComponent } from './components/expense-report/expense-report.component';
import { ReimbursementSummaryComponent } from './components/expense-report/reimbursement/reimbursement-summary/reimbursement-summary.component';
import { EmployeeWiseComponent } from './components/expense-report/reimbursement/employee-wise/employee-wise.component';
import { TravelEmployeeWiseComponent } from './components/expense-report/travel/travel-employee-wise/travel-employee-wise.component';
import { TravelSummaryComponent } from './components/expense-report/travel/travel-summary/travel-summary.component';
import { ExpenseReportManagerComponent } from './components/expense-report-manager/expense-report-manager.component';
import { ManagerReimbursementsComponent } from './components/expense-report-manager/manager-reimbursements/manager-reimbursements.component';
import { ManagerTravelComponent } from './components/expense-report-manager/manager-travel/manager-travel.component';
import { ExpenseReportService } from './components/expense-report/expense-report.service';
import { ChoicePayComponent } from './components/choice-pay/choice-pay.component';
import { ChartsModule } from 'ng2-charts';
import { LtaComponent } from './components/reimbursements-forms/lta/lta.component';
import { TelephoneAndDataCardComponent } from './components/reimbursements-forms/telephone-and-data-card/telephone-and-data-card.component';
import { AccidentRepairSohoAllowanceComponent } from './components/reimbursements-forms/accident-repair-soho-allowance/accident-repair-soho-allowance.component';
import { ManagerialMedicalAllowanceComponent } from './components/reimbursements-forms/managerial-medical-allowance/managerial-medical-allowance.component';
import { TripExpenseDetailsModalComponent } from './components/expense-report/trip-expense-details-modal/trip-expense-details-modal.component';
import { EligibilityComponent } from './components/eligibility/eligibility.component';
import { ExpenseReportManagerService } from './components/expense-report-manager/expense-report-manager.service';
import { PaginationComponent } from './components/expense-report-manager/pagination/pagination.component';
import { ReimbursementComponent } from './components/expense-report-manager/reimbursement/reimbursement.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MedicalReimbursementComponent } from './components/reimbursements-forms/medical-reimbursement/medical-reimbursement.component';
import { PeriodicMedicalComponent } from './components/reimbursements-forms/periodic-medical/periodic-medical.component';
import { FilesModelComponent } from './components/expense-report-manager/files-model/files-model.component';
import { ChildrenHostelAllowanceComponent } from './components/reimbursements-forms/children-hostel-allowance/children-hostel-allowance.component';
import { AviationMedicalReimbComponent } from './components/reimbursements-forms/aviation-medical-reimb/aviation-medical-reimb.component';
import { UniformStitchingAllowanceComponent } from './components/reimbursements-forms/uniform-stitching-allowance/uniform-stitching-allowance.component';
import { SohoAllowanceComponent } from './components/reimbursements-forms/soho-allowance/soho-allowance.component';
import { AviationTrainingReimbursementComponent } from './components/reimbursements-forms/aviation-training-reimbursement/aviation-training-reimbursement.component';
import { FuelExpenseCarComponent } from './components/reimbursements-forms/fuel-expense-car/fuel-expense-car.component';
import { TransferJoiningComponent } from './components/reimbursements-forms/transfer-joining/transfer-joining.component';
import { AccidentRepairsComponent } from './components/reimbursements-forms/accident-repairs/accident-repairs.component';
import { MonsoonKitAllowanseComponent } from './components/reimbursements-forms/monsoon-kit-allowanse/monsoon-kit-allowanse.component';
import { childrenEducationAllowanceComponent } from './components/reimbursements-forms/children-education-allowance/children-education-allowance.component';
import { FuelExpenseTwoWheelerComponent } from './components/reimbursements-forms/fuel-expense-two-wheeler/fuel-expense-two-wheeler.component';
import { DeputationFoodComponent } from './components/reimbursements-forms/deputation-food/deputation-food.component';
import { DeputationOtherComponent } from './components/reimbursements-forms/deputation-other/deputation-other.component';
import { OfficeWearAlloanceComponent } from './components/reimbursements-forms/office-wear-alloance/office-wear-alloance.component';
import { DataCardRentalComponent } from './components/reimbursements-forms/data-card-rental/data-card-rental.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    ReimbursementsComponent,
    ReimbursementsFormsComponent,
    LocalConveyanceComponent,
    GuestTravelExpensesComponent,
    OtherReimbursementComponent,
    KitAllowanceComponent,
    DailyFieldIncidentalExpenseComponent,
    ReimbursementsListComponent,
    ReimbursementsTypeComponent,
    HandsetReimbursementComponent,
    PreEmpMedicalComponent,
    ReimbursementLandingComponent,
    ClaimsListComponent,
    ReimbursementHistoryComponent,
    ExpenseReportComponent,
    ReimbursementSummaryComponent,
    EmployeeWiseComponent,
    TravelEmployeeWiseComponent,
    TravelSummaryComponent,
    ExpenseReportManagerComponent,
    ManagerReimbursementsComponent,
    ManagerTravelComponent,
    ChoicePayComponent,
    LtaComponent,
    TelephoneAndDataCardComponent,
    AccidentRepairSohoAllowanceComponent,
    ManagerialMedicalAllowanceComponent,
    TripExpenseDetailsModalComponent,
    EligibilityComponent,
    PaginationComponent,
    ReimbursementComponent,
    MedicalReimbursementComponent,
    PeriodicMedicalComponent,
    FilesModelComponent,
    ChildrenHostelAllowanceComponent,
    AviationMedicalReimbComponent,
    UniformStitchingAllowanceComponent,
    SohoAllowanceComponent,
    AviationTrainingReimbursementComponent,
    FuelExpenseCarComponent,
    TransferJoiningComponent,
    AccidentRepairsComponent,
    MonsoonKitAllowanseComponent,
    childrenEducationAllowanceComponent,
    FuelExpenseTwoWheelerComponent,
    DeputationFoodComponent,
    DeputationOtherComponent,
    OfficeWearAlloanceComponent,
    DataCardRentalComponent
  ],
  imports: [
    CoreModule,
    ReimbursementsRoutingModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    CommonModule,
    ChartsModule,
    SharedModule,
    MatTooltipModule,
    MatSortModule
  ],
  providers: [ExpenseReportService, ExpenseReportManagerService]
})
export class ReimbursementsModule {}
