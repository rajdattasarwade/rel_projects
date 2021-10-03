import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalDetailsRootComponent } from './personal-details-root.component';
import { ContactDetailsRootComponent } from './components/contact-details-root/contact-details-root.component';
import { PersonalIdRootComponent } from './components/personal-id-root/personal-id-root.component';
import { CreateNominationComponent } from './components/nomination-details-root/create-nomination/create-nomination.component';
import { FamilyDetailsRootComponent } from './components/family-details-root/family-details-root.component';
import { MyTeamEditComponent } from './components/my-team-root/my-team-edit/my-team-edit.component';
import { BasicInformationEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/basic-information-edit.component';
import { AadharDetailsEditComponent } from './components/personal-id-root/aadhar-details-edit/aadhar-details-edit.component';
import { PanCardEditComponent } from './components/personal-id-root/pan-card-edit/pan-card-edit.component';
import { PassportDetailsEditComponent } from './components/personal-id-root/passport-details-edit/passport-details-edit.component';
import { VisaDetailsEditComponent } from './components/personal-id-root/visa-details-edit/visa-details-edit.component';
import { VoterCardEditComponent } from './components/personal-id-root/voter-card-edit/voter-card-edit.component';
import { DrivingLicenseEditComponent } from './components/personal-id-root/driving-license-edit/driving-license-edit.component';
import { ImportantDateEditComponent } from './components/important-date-root/important-date-edit/important-date-edit.component';
import { FamilyDetailsEditComponent } from './components/family-details-root/family-details-edit/family-details-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalDetailsRootComponent
  },
  {
    path: 'personal-id',
    component: PersonalIdRootComponent,
  },
  {
    path: 'basic-information',
    component: BasicInformationEditComponent,
  },
  {
    path: 'contact-information',
    component: ContactDetailsRootComponent,
  },
  {
    path: 'nominations',
    component: CreateNominationComponent,
  },
  {
    path: 'my-team',
    component: MyTeamEditComponent
  },
  {
    path: 'aadhar-card-details',
    component: AadharDetailsEditComponent
  },
  {
    path: 'pan-card-details',
    component: PanCardEditComponent
  },
  {
    path: 'passport-details',
    component: PassportDetailsEditComponent
  },
  {
    path: 'visa-details',
    component: VisaDetailsEditComponent
  },
  {
    path: 'voter-cards-details',
    component: VoterCardEditComponent
  },
  {
    path: 'driving-license-details',
    component: DrivingLicenseEditComponent
  },
  {
    path: 'important-dates',
    component: ImportantDateEditComponent
  },
  {
    path: 'family-details',
    component: FamilyDetailsEditComponent
  }

  
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalDetailsRoutingModule { }
