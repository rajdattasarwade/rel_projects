import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningComponent } from './learning/learning.component';
import { ViewAllRecommendedComponent } from './components/learning-recommended/viewAll-recommended.component';
import { ViewAllInProgressComponent } from './components/learning-in-progress/viewAll-in-progress.component';
import { ReedemComponent } from './components/reedem/reedem.component';
import { ViewAllWeeklyGoalComponent } from './components/learning-weekly-goal/viewAll-weekly-goal.component';
import { LearningLandingComponent } from './components/learning-landing/learning-landing.component';

const routes: Routes = [
  {
    path: '',
    component: LearningComponent,
    children: [
      {
        path: '',
        component: LearningLandingComponent,
      },
      {
        path: 'viewAllRecommended',
        component: ViewAllRecommendedComponent,
      },
      {
        path: 'viewAllProgress',
        component: ViewAllInProgressComponent,
      },
      {
        path: 'reedem',
        component: ReedemComponent,
      },
      {
        path: 'viewAllWeeklyGoal',
        component: ViewAllWeeklyGoalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningRoutingModule {}
