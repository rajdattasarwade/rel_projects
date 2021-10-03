import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalentMarketplaceLandingComponent } from './talent-marketplace-landing/talent-marketplace-landing.component';
import { MyApplicationRootComponent } from './components/my-application-root/my-application-root.component';
import { RecommendedGigsLandingComponent } from './components/recommended-gigs-root/recommended-gigs-landing/recommended-gigs-landing.component';

const routes: Routes = [
  {
    path: '',
    component: TalentMarketplaceLandingComponent,
  },
  {
    path: 'my-applications',
    component: MyApplicationRootComponent
  },
  {
    path: 'recommended-gigs',
    component: RecommendedGigsLandingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TalentMarketplaceRoutingModule { }
