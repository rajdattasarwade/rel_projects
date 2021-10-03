import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './home/home.component';
import { CoreModule } from 'src/app/core.module';
import { FunctionalWidgetsComponent } from './components/functional-widgets/functional-widgets.component';
import { ProfileWidgetComponent } from '../../components/shared/user-profile/profile-widget/profile-widget.component';
//import { FeedComponent } from '../../components/shared/feed/feed.component';
import { CalendarWidgetComponent } from '../../components/shared/calendar/calendar-widget.component';
import { ProfileServiceComponent } from '../../components/shared/user-profile/profile-service/profile-service.component';
import { TodoWidgetComponent } from '../../components/shared/to-do/todo-widget/todo-widget.component';
import { TodoServiceComponent } from '../../components/shared/to-do/todo-service/todo-service.component';
import { ProfileService } from 'src/app/components/shared/user-profile/user-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { ToDoService } from 'src/app/components/shared/to-do/to-do.service';
import { SymptomCheckerWidgetComponent } from '../../components/shared/symptom-checker/symptom-checker-widget/symptom-checker-widget.component';
import { SymptomCheckerServiceComponent } from '../../components/shared/symptom-checker/symptom-checker-service/symptom-checker-service.component';
import { OrgDirectoryWidgetComponent } from '../../components/shared/organization-directory/org-directory-widget/org-directory-widget.component';
import { OrgDirectoryServiceComponent } from '../../components/shared/organization-directory/org-directory-service/org-directory-service.component';
import { WidgetListComponent } from '../../components/shared/widget-management/widget-list/widget-list.component';
import { CalendarService } from 'src/app/components/shared/calendar/calendar.service';
import { AdCarouselWidgetComponent } from './../../components/shared/ad_carousel/ad-carousel.component';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ViewPolicyWidgetComponent } from '../../components/shared/view-policies/view-policy-widget/view-policy-widget.component';
import { PolicyLandingComponent } from '../../components/shared/view-policies/view-policies-service/policy-landing/policy-landing.component'
import { PolicySearchListComponent } from '../../components/shared/view-policies/view-policies-service/policy-search-list/policy-search-list.component'
import { ViewPoliciesListComponent } from '../../components/shared/view-policies/view-policies-service/view-policies-list/view-policies-list.component';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileWidgetComponent,
    FunctionalWidgetsComponent,
    //FeedComponent,
    CalendarWidgetComponent,
    ProfileServiceComponent,
    TodoWidgetComponent,
    TodoServiceComponent,
    SymptomCheckerWidgetComponent,
    SymptomCheckerServiceComponent,
    OrgDirectoryWidgetComponent,
    OrgDirectoryServiceComponent,
    AdCarouselWidgetComponent,
    WidgetListComponent,
    CarouselComponent,
    ViewPolicyWidgetComponent,
    PolicyLandingComponent,
    PolicySearchListComponent,
    ViewPoliciesListComponent,
  ],
  imports: [CommonModule, MatSliderModule, CoreModule, HttpClientModule],
  providers: [ProfileService, ToDoService, CalendarService],
})
export class HomeModule {}
