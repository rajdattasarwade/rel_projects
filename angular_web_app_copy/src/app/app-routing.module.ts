import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginService } from './components/core/services/login.service';
import { LoginPage } from './components/core/misc/login-page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [LoginService],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home-root/home.module').then((m) => m.HomeModule),
    canActivate: [LoginService],
  },
  {
    path: 'people',
    loadChildren: () =>
      import('./modules/people-root/people.module').then((m) => m.PeopleModule),
    canActivate: [LoginService],
  },
  {
    path: 'leave-and-attendance',
    loadChildren: () =>
      import(
        './modules/leave-and-attendance-root/leave-and-attendance-root.module'
      ).then((m) => m.LeaveAndAttendanceRootModule),
    canActivate: [LoginService],
  },
  {
    path: 'payroll',
    loadChildren: () =>
      import('./modules/payroll-root/payroll.module').then(
        (m) => m.PayrollModule
      ),
    canActivate: [LoginService],
  },

  {
    path: 'rewardsRecognition',
    loadChildren: () =>
      import(
        './modules/rewards-and-recognition-root/rewards-and-recognition.module'
      ).then((m) => m.RewardsAndRecognitiontModule),
    canActivate: [LoginService],
  },
  {
    path: 'empEngagement',
    loadChildren: () =>
      import(
        './modules/employee-engagement-root/employee-engagement.module'
      ).then((m) => m.EmployeeEngagementRootModule),
    canActivate: [LoginService],
  },
  {
    path: 'learning',
    loadChildren: () =>
      import('./modules/learning-root/learning.module').then(
        (m) => m.LearningModule
      ),
    canActivate: [LoginService],
  },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {
  //   path: '**',
  //   redirectTo: '/home',
  //   pathMatch: 'full',
  // },
  {
    path: 'reimbursements',
    loadChildren: () =>
      import('./modules/reimbursements-root/reimbursements.module').then(
        (m) => m.ReimbursementsModule
      ),
    canActivate: [LoginService],
  },
  {
    path: 'benefits',
    loadChildren: () =>
      import('./modules/benefits-root/benefits.module').then(
        (m) => m.BenefitsModule
      ),
    canActivate: [LoginService],
  },
  {
    path: 'talent-marketplace',
    loadChildren: () =>
      import('./modules/talent-marketplace-root/talent-marketplace.module').then(
        (m) => m.TalentMarketplaceModule
      ),
    canActivate: [LoginService],
  },
  { path: 'login', component: LoginPage },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
