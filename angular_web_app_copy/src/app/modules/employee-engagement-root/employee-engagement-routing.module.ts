import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeEngagementComponent } from './employee-engagement/employee-engagement.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeEngagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EmployeeEngagementRoutingModule {}
