import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RewardsAndRecognitionComponent } from './rewards-and-recognition/rewards-and-recognition.component';

const routes: Routes = [
  {
    path: '',
    component: RewardsAndRecognitionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardsAndRecognitionRoutingModule {}
