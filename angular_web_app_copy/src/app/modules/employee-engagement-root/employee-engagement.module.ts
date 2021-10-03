import { NgModule } from '@angular/core';

import { CoreModule } from './../../core.module';
import { EmployeeEngagementComponent } from './employee-engagement/employee-engagement.component';
import { EmployeeEngagementRoutingModule } from './employee-engagement-routing.module';
import { NoticeBoardComponent } from './components/notice-board/notice-board.component';
import { NewJoineesComponent } from './components/new-joinees/new-joinees.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { EventsComponent } from './components/events/events.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

import { SidenavEmpEngagementComponent } from './components/sidenav-emp-engagement/sidenav-emp-engagement.component';
import { EmployeeEngagementService } from './employee-engagement.service';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  declarations: [
    EmployeeEngagementComponent,
    NoticeBoardComponent,
    NewJoineesComponent,
    NewPostComponent,
    EventsComponent,
    PostsListComponent,
    SidenavEmpEngagementComponent
  ],
  imports: [
    CoreModule,
    EmployeeEngagementRoutingModule,
    SharedModule,
  ],
  providers: [EmployeeEngagementService],
})

export class EmployeeEngagementRootModule {}
