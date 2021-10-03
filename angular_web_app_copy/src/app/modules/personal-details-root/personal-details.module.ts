import { NgModule } from '@angular/core';
import { CoreModule } from './../../core.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../components/shared/shared.module';
import { PersonalDetailsRoutingModule } from './personal-details-routing.module';
import { PersonalDetailsRootComponent } from './personal-details-root.component';
import { PersonalIdRootComponent } from './components/personal-id-root/personal-id-root.component';
import { PersonalInformationRootComponent } from './components/personal-information-root/personal-information-root.component';
import { ContactDetailsEditComponent } from './components/contact-details-root/contact-details-edit/contact-details-edit.component';
import { ContactDetailsViewComponent } from './components/contact-details-root/contact-details-view/contact-details-view.component';
import { ContactDetailsRootComponent } from './components/contact-details-root/contact-details-root.component';
import { NominationDetailsRootComponent } from './components/nomination-details-root/nomination-details-root.component';
import { CreateNominationComponent } from './components/nomination-details-root/create-nomination/create-nomination.component';
import { FamilyDetailsRootComponent } from './components/family-details-root/family-details-root.component';
import { ImportantDateRootComponent } from './components/important-date-root/important-date-root.component';
import { ContactDetailsComponent } from './components/personal-information-root/contact-details/contact-details.component';
import { BasicInformationComponent } from './components/personal-information-root/basic-information/basic-information.component';
import { AddressDetailsRootComponent } from './components/address-details-root/address-details-root.component';
import { AddressInformationComponent } from './components/personal-information-root/address-information/address-information.component';
import { AddressInformationEditComponent } from './components/personal-information-root/address-information/address-information-edit/address-information-edit.component';
import { FamilyDetailsEditComponent } from './components/family-details-root/family-details-edit/family-details-edit.component';
import { MyTeamRootComponent } from './components/my-team-root/my-team-root.component';
import { MyTeamEditComponent } from './components/my-team-root/my-team-edit/my-team-edit.component';
import { RemoveSubordinateModalComponent } from './components/my-team-root/remove-subordinate-modal/remove-subordinate-modal.component';
import { BasicInformationEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/basic-information-edit.component';
import { FirstNameEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/first-name-edit/first-name-edit.component';
import { SubmenuRootComponent } from './components/submenu-root/submenu-root.component';
import { CurrentWorkLocationComponent } from './components/personal-information-root/address-information/address-information-edit/current-work-location/current-work-location.component';
import { BloodGroupEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/blood-group-edit/blood-group-edit.component';
import { CasteEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/caste-edit/caste-edit.component';
import { DobEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/dob-edit/dob-edit.component';
import { LastNameEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/last-name-edit/last-name-edit.component';
import { MartialStatusEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/martial-status-edit/martial-status-edit.component';
import { MotherTongueEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/mother-tongue-edit/mother-tongue-edit.component';
import { NationalityEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/nationality-edit/nationality-edit.component';
import { PlaceOfBirthEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/place-of-birth-edit/place-of-birth-edit.component';
import { ReligionEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/religion-edit/religion-edit.component';
import { TitleEditComponent } from './components/personal-information-root/basic-information/basic-information-edit/title-edit/title-edit.component';
import { BankDetailsRootComponent } from './components/bank-details-root/bank-details-root.component';
import { BankDetailsEditComponent } from './components/bank-details-root/bank-details-edit/bank-details-edit.component';
import { AadharDetailsEditComponent } from './components/personal-id-root/aadhar-details-edit/aadhar-details-edit.component';
import { PanCardEditComponent } from './components/personal-id-root/pan-card-edit/pan-card-edit.component';
import { VoterCardEditComponent } from './components/personal-id-root/voter-card-edit/voter-card-edit.component';
import { DrivingLicenseEditComponent } from './components/personal-id-root/driving-license-edit/driving-license-edit.component';
import { VisaDetailsEditComponent } from './components/personal-id-root/visa-details-edit/visa-details-edit.component';
import { PassportDetailsEditComponent } from './components/personal-id-root/passport-details-edit/passport-details-edit.component';
import { UanDetailsEditComponent } from './components/personal-id-root/pan-card-edit/uan-details-edit/uan-details-edit.component';
import { RelativesRelianceComponent } from './components/family-details-root/relatives-reliance/relatives-reliance.component';
import { FamilyDetailsPageComponent } from './components/family-details-root/family-details-page/family-details-page.component';
import { ImportantDateEditComponent } from './components/important-date-root/important-date-edit/important-date-edit.component';
import { AddFamilyDependentModalComponent } from './components/family-details-root/add-family-dependent-modal/add-family-dependent-modal.component';

@NgModule({
  declarations: [
    PersonalDetailsRootComponent,
    PersonalIdRootComponent,
    PersonalInformationRootComponent,
    ContactDetailsEditComponent,
    ContactDetailsViewComponent,
    ContactDetailsRootComponent,
    NominationDetailsRootComponent,
    CreateNominationComponent,
    FamilyDetailsRootComponent,
    ImportantDateRootComponent,
    ContactDetailsComponent,
    BasicInformationComponent,
    AddressDetailsRootComponent,
    AddressInformationComponent,
    AddressInformationEditComponent,
    FamilyDetailsEditComponent,
    MyTeamRootComponent,
    MyTeamEditComponent,
    RemoveSubordinateModalComponent,
    BasicInformationEditComponent,
    FirstNameEditComponent,
    SubmenuRootComponent,
    CurrentWorkLocationComponent,
    BloodGroupEditComponent,
    CasteEditComponent,
    DobEditComponent,
    LastNameEditComponent,
    MartialStatusEditComponent,
    MotherTongueEditComponent,
    NationalityEditComponent,
    PlaceOfBirthEditComponent,
    ReligionEditComponent,
    TitleEditComponent,
    BankDetailsRootComponent,
    BankDetailsEditComponent,
    AadharDetailsEditComponent,
    PanCardEditComponent,
    VoterCardEditComponent,
    DrivingLicenseEditComponent,
    VisaDetailsEditComponent,
    PassportDetailsEditComponent,
    UanDetailsEditComponent,
    RelativesRelianceComponent,
    FamilyDetailsPageComponent,
    ImportantDateEditComponent,
    AddFamilyDependentModalComponent,
  ],
  imports: [
    CoreModule,
    PdfViewerModule,
    ChartsModule,
    SharedModule,
    PersonalDetailsRoutingModule,
  ],
})
export class PersonalDetailsModule { }
