import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BenefitsLandingComponent } from './benefits-landing/benefits-landing.component';
import { RetiralsRootComponent } from './components/retirals-root/retirals-root.component';
import { LoanAndAdvancesComponent } from './components/loan-and-advances-root/loan-and-advances.component';
import { ClaimsInsurancesRootComponent } from './components/claims-insurances-root/claims-insurances-root.component';
import { VehicleBenefitsModalComponent } from './components/vehicle-benefits-root/vehicle-benefits-modal.component';
import { CompanyLeasedVehicleComponent } from './components/company-leased-vehicle-root/company-leased-vehicle.component';
import { EducationAssistanceRequestComponent } from './components/education-assistance-root/education-assistance-request.component';
import { AvailMobileSimRootComponent } from './components/avail-mobile-sim-root/avail-mobile-sim-root.component';
import { MedibuddyTabComponent } from './components/claims-insurances-root/medibuddy-tab/medibuddy-tab.component';
import { IsdCallingComponent } from './components/avail-mobile-sim-root/isd-calling/isd-calling.component';
import { InternationalRoamingServicesComponent } from './components/avail-mobile-sim-root/international-roaming-services/international-roaming-services.component';
import { ViewEditDependentLandingComponent } from './components/claims-insurances-root/overview-tab/view-edit-dependents-modal/view-edit-dependent-landing/view-edit-dependent-landing.component';

const routes: Routes = [
  {
    path: '',
    component: BenefitsLandingComponent,
  },
  {
    path: 'retirals',
    component: RetiralsRootComponent,
  },
  {
    path: 'loan-and-advances',
    component: LoanAndAdvancesComponent,
  },
  {
    path: 'claims-insurances',
    component: ClaimsInsurancesRootComponent,
  },
  {
    path: 'medibuddy',
    component: MedibuddyTabComponent,
  },
  {
    path: 'vehicle-benefits-modal',
    component: VehicleBenefitsModalComponent,
  },
  {
    path: 'company-leased-vehicle',
    component: CompanyLeasedVehicleComponent,
  },
  {
    path: 'education-assistance-request',
    component: EducationAssistanceRequestComponent,
  },
  {
    path: 'avail-mobile-sim',
    component: AvailMobileSimRootComponent,
  },
  {
    path: 'isd-calling',
    component: IsdCallingComponent,
  },
  {
    path: 'international-roaming-services',
    component: InternationalRoamingServicesComponent,
  },
  {
    path: 'view-edit-dependent-list',
    component: ViewEditDependentLandingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BenefitsRoutingModule { }
