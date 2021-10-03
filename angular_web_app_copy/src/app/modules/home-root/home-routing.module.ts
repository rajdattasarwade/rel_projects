import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home-root/home/home.component';
import { LoginService } from '../../components/core/services/login.service';
import { ProfileServiceComponent } from 'src/app/components/shared/user-profile/profile-service/profile-service.component';
import { TodoServiceComponent } from 'src/app/components/shared/to-do/todo-service/todo-service.component';
import { CalendarWidgetComponent } from 'src/app/components/shared/calendar/calendar-widget.component';
import { PolicyLandingComponent } from '../../components/shared/view-policies/view-policies-service/policy-landing/policy-landing.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginService],
  },
  {
    path: 'profile',
    component: ProfileServiceComponent,
  },
  {
    path: 'todo',
    component: TodoServiceComponent,
  },
  {
    path: 'calendar',
    component: CalendarWidgetComponent,
  },
  {
    path: 'company-policy',
    component: PolicyLandingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
