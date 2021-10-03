import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReimbursementsComponent } from './reimbursements/reimbursements.component';
import { LocalConveyanceComponent } from './components/reimbursements-forms/local-conveyance/local-conveyance.component';
import { ReimbursementsFormsComponent } from './components/reimbursements-forms/reimbursements-forms.component';
import { ExpenseReportComponent } from './components/expense-report/expense-report.component';
import { ReimbursementComponent } from './components/expense-report-manager/reimbursement/reimbursement.component';
import { ExpenseReportManagerComponent } from './components/expense-report-manager/expense-report-manager.component';
const routes: Routes = [
  {
    path: '',
    component: ReimbursementsComponent
  },
  {
    path: 'local-conveyance',
    component: LocalConveyanceComponent
  },
  {
    path: 'reimbursements-form',
    component: ReimbursementsFormsComponent
  },
  {
    path: 'expense-report',
    component: ExpenseReportComponent
  },
  {
    path: 'reimbursement-claims',
    component: ReimbursementComponent
  },
  {
    path: 'expense-report-manager',
    component: ExpenseReportManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReimbursementsRoutingModule {}
