import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollComponent } from '../payroll-root/payroll/payroll.component';
import { TotalPayStatementServiceComponent } from '../payroll-root/components/total-pay-statement-service/total-pay-statement-service.component';
import { IncomeTaxPrjServiceComponent } from '../payroll-root/components/income-tax-prj-service/income-tax-prj-service.component';
import { DigitalFormServiceComponent } from '../payroll-root/components/digital-form-service/digital-form-service.component';
import { MyCompensationDetailsServiceComponent } from '../payroll-root/components/my-compensation-details-service/my-compensation-details-service.component';
import { ChoicePayLandingComponent } from '../payroll-root/components/choicepay-root/choicepay-landing.component';
import { ViewPayslipServiceComponent } from '../payroll-root/components/payslips/view-payslip-service/view-payslip-service.component';
import { PayrollLoanServiceComponent } from '../payroll-root/components/payroll-loans/payroll-loans-service/payroll-loans-service.component';
import { InvestmentDeclarationRootComponent } from '../payroll-root/components/investment-declaration-root/investment-declaration-root.component';
import { SalaryDeductedDatesServiceComponent } from './components/salary-deducted-dates-service/salary-deducted-dates-service.component';
import { AddNewElementComponent } from './components/choicepay-root/choice-pay-elements/add-new-element/add-new-element.component';
import { TeamCompensationHistoryComponent } from './components/my-compensation-details-service/team-view-service/team-compensation-history/team-compensation-history.component';
import { Form12bbComponent } from './components/investment-declaration-root/form12bb/form12bb.component';
const routes: Routes = [
  {
    path: '',
    component: PayrollComponent,
  },
  {
    path: 'total-pay-statement',
    component: TotalPayStatementServiceComponent,
  },
  {
    path: 'income-tax-projection',
    component: IncomeTaxPrjServiceComponent,
  },
  {
    path: 'digital-form-16',
    component: DigitalFormServiceComponent,
  },
  {
    path: 'my-compensation-details',
    component: MyCompensationDetailsServiceComponent
  },
  {
    path: 'teams-compensation-details',
    component: TeamCompensationHistoryComponent
  },
  {
    path: 'choicepay',
    component: ChoicePayLandingComponent,
  },
  {
    path: 'view-payslip/:data',
    component: ViewPayslipServiceComponent,
  },
  {
    path: 'payroll-loan-service',
    component: PayrollLoanServiceComponent,
  },
  {
    path: 'investment-declaration',
    component: InvestmentDeclarationRootComponent,
  },
  {
    path: 'salary-deducted-payback',
    component: SalaryDeductedDatesServiceComponent,
  },
  {
    path: 'add-new-element',
    component: AddNewElementComponent,
  },
  {
    path: 'form12bb',
    component: Form12bbComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollRoutingModule {}
