import { NgModule } from '@angular/core';
import { PeopleRoutingModule } from '../people-root/people-routing.module';
import { CoreModule } from './../../core.module';
import {TitleCasePipe} from '@angular/common'
import { PeopleComponent } from './people/people.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PeopleCardComponent } from '../../components/shared/common-cards/people-card/people-card.component';
import { FindPeopleComponent } from './components/find-people/find-people.component';
import { MyOrgRelationshipComponent } from './components/my-org-relationship/my-org-relationship.component';
import { MyReporteesComponent } from './components/my-reportees/my-reportees.component';

@NgModule({
  declarations: [PeopleComponent, SearchBarComponent, PeopleCardComponent, FindPeopleComponent, MyOrgRelationshipComponent, MyReporteesComponent],
  imports: [CoreModule, PeopleRoutingModule],
  providers: [TitleCasePipe],
})
export class PeopleModule {}