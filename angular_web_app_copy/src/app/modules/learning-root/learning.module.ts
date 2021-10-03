import { NgModule } from '@angular/core';
import { LearningRoutingModule } from '../learning-root/learning-routing.module';
import { CoreModule } from './../../core.module';
import { LearningComponent } from './learning/learning.component';
import { LearningService } from './learning.service';
import { LearningRecommendedComponent } from '../learning-root/components/learning-recommended/learning-recommended.component';
import { LearningInProgressComponent } from '../learning-root/components/learning-in-progress/learning-in-progress.component';
import { LearningWeeklyGoalComponent } from '../learning-root/components/learning-weekly-goal/learning-weekly-goal.component';
import { DonutChartComponent } from './components/donutchart/donutchart.component';
import { ChartsModule } from 'ng2-charts';
import { ViewAllInProgressComponent } from './components/learning-in-progress/viewAll-in-progress.component';
import { ViewAllRecommendedComponent } from './components/learning-recommended/viewAll-recommended.component';
import { ReedemComponent } from './components/reedem/reedem.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ViewAllWeeklyGoalComponent } from './components/learning-weekly-goal/viewAll-weekly-goal.component';
import { LearningLandingComponent } from './components/learning-landing/learning-landing.component';
@NgModule({
  declarations: [
    LearningComponent,
    LearningRecommendedComponent,
    LearningInProgressComponent,
    LearningWeeklyGoalComponent,
    DonutChartComponent,
    ViewAllInProgressComponent,
    ViewAllRecommendedComponent,
    ReedemComponent,
    ViewAllWeeklyGoalComponent,
    LearningLandingComponent,
  ],
  imports: [CoreModule, LearningRoutingModule, ChartsModule, SharedModule],
  providers: [LearningService],
})
export class LearningModule {}
