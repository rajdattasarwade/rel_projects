import { NgModule } from '@angular/core';
import { RewardsAndRecognitionRoutingModule } from '../rewards-and-recognition-root/rewards-and-recognition-routing.module';
import { CoreModule } from './../../core.module';
import { RewardsAndRecognitionComponent } from './rewards-and-recognition/rewards-and-recognition.component';
import { RewardsLeftComponent } from './components/rewards-left/rewards-left.component';
import { TopOffersComponent } from './components/top-offers/top-offers.component';
import { ActivityFeedComponent } from './components/activity-feed/activity-feed.component';
import { AllFeedComponent } from './components/activity-feed/all-feed/all-feed.component';
import {SharedModule} from '../../components/shared/shared.module';

@NgModule({
  declarations: [RewardsAndRecognitionComponent, RewardsLeftComponent, TopOffersComponent, ActivityFeedComponent, AllFeedComponent],
  imports: [CoreModule, RewardsAndRecognitionRoutingModule, SharedModule],
  providers: [],
})
export class RewardsAndRecognitiontModule {}
