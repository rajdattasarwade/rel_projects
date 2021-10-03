import { NgModule } from '@angular/core';
import { CoreModule } from './../../core.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../components/shared/shared.module';
import { TalentMarketplaceRoutingModule } from './talent-market-routing.module';
import { TalentMarketplaceLandingComponent } from './talent-marketplace-landing/talent-marketplace-landing.component';
import { MarketplaceProfileCardComponent } from './components/marketplace-profile-card/marketplace-profile-card.component';
import { MyApplicationRootComponent } from './components/my-application-root/my-application-root.component';
import { AppliedTabComponent } from './components/my-application-root/applied-tab/applied-tab.component';
import { AcceptedTabComponent } from './components/my-application-root/accepted-tab/accepted-tab.component';
import { CompletedTabComponent } from './components/my-application-root/completed-tab/completed-tab.component';
import { ReferredToMeTabComponent } from './components/my-application-root/referred-to-me-tab/referred-to-me-tab.component';
import { RecommendedGigsLandingComponent } from './components/recommended-gigs-root/recommended-gigs-landing/recommended-gigs-landing.component';

@NgModule({
  declarations: [
    TalentMarketplaceLandingComponent,
    MarketplaceProfileCardComponent,
    MyApplicationRootComponent,
    AppliedTabComponent,
    AcceptedTabComponent,
    CompletedTabComponent,
    ReferredToMeTabComponent,
    RecommendedGigsLandingComponent
  ],
  imports: [
    CoreModule,
    TalentMarketplaceRoutingModule,
    PdfViewerModule,
    ChartsModule,
    SharedModule,
  ],
  providers: [
  ],
})

export class TalentMarketplaceModule { }
