import { NgModule } from '@angular/core';
import { CoreModule } from './../../core.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../components/shared/shared.module';
import { BenefitsRoutingModule } from './benefits-routing.module';
import { BenefitsLandingComponent } from './benefits-landing/benefits-landing.component';
import { RetiralsRootComponent } from './components/retirals-root/retirals-root.component';
import { MyRetiralsTabComponent } from './components/retirals-root/my-retirals-tab/my-retirals-tab.component';
import { PfTransferPensionComponent } from './components/retirals-root/my-retirals-tab/pf-transfer-pension/pf-transfer-pension.component';
import { PfWithdrawalsComponent } from './components/retirals-root/my-retirals-tab/pf-withdrawals/pf-withdrawals.component';
import { GratuityComponent } from './components/retirals-root/my-retirals-tab/gratuity/gratuity.component';
import { GratuityLeaveEncashmentComponent } from './components/retirals-root/my-retirals-tab/gratuity-leave-encashment/gratuity-leave-encashment.component';
import { InternalTransfersComponent } from './components/retirals-root/my-retirals-tab/internal-transfers/internal-transfers.component';
import { LoanAndAdvancesComponent } from './components/loan-and-advances-root/loan-and-advances.component';
import { InstallmentDetailsPopupComponent } from './components/retirals-root/my-retirals-tab/pf-withdrawals/installment-details-popup/installment-details-popup.component';
import { ClaimsInsurancesRootComponent } from './components/claims-insurances-root/claims-insurances-root.component';
import { CreatePfTransferFormComponent } from './components/retirals-root/my-retirals-tab/pf-transfer-pension/create-pf-transfer-form/create-pf-transfer-form.component';
import { RetiralBenefitsTabComponent } from './components/retirals-root/retiral-benefits-tab/retiral-benefits-tab.component';
import { PfPensionInfoPopupComponent } from './components/retirals-root/my-retirals-tab/pf-pension-info-popup/pf-pension-info-popup.component';
import { InternalTransferDetailsPopupComponent } from './components/retirals-root/my-retirals-tab/internal-transfers/internal-transfer-details-popup/internal-transfer-details-popup.component';
import { GratuityEncashmentDeclarationComponent } from './components/retirals-root/my-retirals-tab/gratuity-leave-encashment/gratuity-encashment-declaration/gratuity-encashment-declaration.component';
import { CreatePfWithdrawalFormComponent } from './components/retirals-root/my-retirals-tab/pf-withdrawals/create-pf-withdrawal-form/create-pf-withdrawal-form.component';
import { WithdrawalTermsPopupComponent } from './components/retirals-root/my-retirals-tab/pf-withdrawals/create-pf-withdrawal-form/withdrawal-terms-popup/withdrawal-terms-popup.component';
import { ProvisionalGratuityDetailsComponent } from './components/retirals-root/retiral-benefits-tab/provisional-gratuity-details/provisional-gratuity-details.component';
import { GratuityFormulaPopupComponent } from './components/retirals-root/retiral-benefits-tab/provisional-gratuity-details/gratuity-formula-popup/gratuity-formula-popup.component';
import { ProvisionalPfDetailsComponent } from './components/retirals-root/retiral-benefits-tab/provisional-pf-details/provisional-pf-details.component';
import { ProvisonalSuperannuationDetailsComponent } from './components/retirals-root/retiral-benefits-tab/provisonal-superannuation-details/provisonal-superannuation-details.component';
import { PfYearWiseDetailsComponent } from './components/retirals-root/retiral-benefits-tab/provisional-pf-details/pf-year-wise-details/pf-year-wise-details.component';
import { PfMonthWiseDetailsComponent } from './components/retirals-root/retiral-benefits-tab/provisional-pf-details/pf-month-wise-details/pf-month-wise-details.component';
import { SuperannuationYearWiseDetailsComponent } from './components/retirals-root/retiral-benefits-tab/provisonal-superannuation-details/superannuation-year-wise-details/superannuation-year-wise-details.component';
import { SuperannuationMonthWiseDetailsComponent } from './components/retirals-root/retiral-benefits-tab/provisonal-superannuation-details/superannuation-month-wise-details/superannuation-month-wise-details.component';
import { VehicleBenefitsModalComponent } from './components/vehicle-benefits-root/vehicle-benefits-modal.component';
import { CompanyLeasedVehicleComponent } from './components/company-leased-vehicle-root/company-leased-vehicle.component';
import { CompanyLeasedVehicleModalComponent } from './components/company-leased-vehicle-root/company-leased-vehicle-modal/company-leased-vehicle-modal-component';
import { CovBuybackComponent } from './components/company-leased-vehicle-root/cov-buyback/cov-buyback.component';
import { EducationAssistanceRequestComponent } from './components/education-assistance-root/education-assistance-request.component';
import { AssistanceRequestModalComponent } from './components/education-assistance-root/assistance-request-modal/assistance-request-modal.component';
import { ClaimInsuranceWidgetComponent } from './components/claims-insurances-root/claim-insurance-widget/claim-insurance-widget.component';
import { RetiralsBenefitWidgetComponent } from './components/retirals-root/retirals-benefit-widget/retirals-benefit-widget.component';
import { AmountAppliedInfoPopupComponent } from './components/retirals-root/my-retirals-tab/pf-withdrawals/create-pf-withdrawal-form/amount-applied-info-popup/amount-applied-info-popup.component';
import { MedibuddyTabComponent } from './components/claims-insurances-root/medibuddy-tab/medibuddy-tab.component';
import { ClaimInsuranceInfoComponent } from './components/claims-insurances-root/claim-insurance-info/claim-insurance-info.component';
import { OverviewTabComponent } from './components/claims-insurances-root/overview-tab/overview-tab.component';
import { GhpClaimTabComponent } from './components/claims-insurances-root/ghp-claim-tab/ghp-claim-tab.component';
import { GhpClaimModalComponent } from './components/claims-insurances-root/ghp-claim-tab/ghp-claim-modal/ghp-claim-modal.component';
import { GpaClaimTabComponent } from './components/claims-insurances-root/gpa-claim-tab/gpa-claim-tab.component';
import { GpaClaimModalComponent } from './components/claims-insurances-root/gpa-claim-tab/gpa-claim-modal/gpa-claim-modal.component';
import { PmeTabComponent } from './components/claims-insurances-root/pme-tab/pme-tab.component';
import { PmeReportsModalComponent } from './components/claims-insurances-root/pme-tab/pme-reports-modal/pme-reports-modal.component';
import { HospitalsListPopupComponent } from './components/claims-insurances-root/medibuddy-tab/hospitals-list-popup/hospitals-list-popup.component';
import { PfTransferStatePopupComponent } from './components/retirals-root/my-retirals-tab/pf-transfer-pension/pf-transfer-state-popup/pf-transfer-state-popup.component';
import { MarriageDetailsModalComponent } from './components/Marriage-root/marriage-details-modal/marriage-details-modal.component';
import { HealthWellnessModalComponent } from './components/health-wellness-root/health-wellness-modal/health-wellness-modal.component';
import { MaternityPaternityLandingComponent } from './components/maternity-paternity-root/maternity-paternity-landing/maternity-paternity-landing.component';
import { MaternityInfoModalComponent } from './components/maternity-paternity-root/maternity-info-modal/maternity-info-modal.component';
import { PaternityInfoModalComponent } from './components/maternity-paternity-root/paternity-info-modal/paternity-info-modal.component';
import { PhoneRootComponent } from './components/phone-root/phone-root.component';
import { ViewEditDependentsModalComponent } from './components/claims-insurances-root/overview-tab/view-edit-dependents-modal/view-edit-dependents-modal.component';
import { AddDependentModalComponent } from './components/claims-insurances-root/overview-tab/add-dependent-modal/add-dependent-modal.component';
import { AddRelativeModalComponent } from './components/claims-insurances-root/overview-tab/add-relative-modal/add-relative-modal.component';
import { SearchRelativeModalComponent } from './components/claims-insurances-root/overview-tab/search-relative-modal/search-relative-modal.component';
import { MarriageLoanModalComponent } from './components/loan-and-advances-root/marriage-loan-modal/marriage-loan-modal.component';
import { LoanRepaymentModalComponent } from './components/loan-and-advances-root/loan-repayment-modal/loan-repayment-modal.component';
import { AddressInfoModalComponent } from './components/health-wellness-root/address-info-modal/address-info-modal.component';
import { NpsTabComponent } from './components/retirals-root/nps-tab/nps-tab.component';
import { VpfTabComponent } from './components/retirals-root/vpf-tab/vpf-tab.component';
import { SuperannuationTabComponent } from './components/retirals-root/superannuation-tab/superannuation-tab.component';
import { NpsDeductionModalComponent } from './components/retirals-root/nps-tab/nps-deduction-modal/nps-deduction-modal.component';
import { VpfCreateDeductionModalComponent } from './components/retirals-root/vpf-tab/vpf-create-deduction-modal/vpf-create-deduction-modal.component';
import { RetiralBenefitsPdfViewerComponent } from './components/retirals-root/retiral-benefits-tab/retiral-benefits-pdf-viewer/retiral-benefits-pdf-viewer.component';
import { AdvancesModalComponent } from './components/loan-and-advances-root/advances-modal/advances-modal.component';
import { MedicalAdvanceComponent } from './components/loan-and-advances-root/advances-modal/medical-advance/medical-advance.component';
import { ImprestAdvanceComponent } from './components/loan-and-advances-root/advances-modal/imprest-advance/imprest-advance.component';
import { TeamBuildingAdvanceComponent } from './components/loan-and-advances-root/advances-modal/team-building-advance/team-building-advance.component';
import { SuperCreateDeductionModalComponent } from './components/retirals-root/superannuation-tab/super-create-deduction-modal/super-create-deduction-modal.component';
import { TransferComponent } from './components/retirals-root/superannuation-tab/transfer/transfer.component';
import { ContributionComponent } from './components/retirals-root/superannuation-tab/contribution/contribution.component';
import { TransferSuperannuationModalComponent } from './components/retirals-root/superannuation-tab/transfer-superannuation-modal/transfer-superannuation-modal.component';
import { SpecialtiesFilterComponent } from './components/claims-insurances-root/medibuddy-tab/specialties-filter/specialties-filter.component';
import { HospitalsDetailModalComponent } from './components/claims-insurances-root/medibuddy-tab/hospitals-detail-modal/hospitals-detail-modal.component';
import { ViewMedibuddyCardComponent } from './components/claims-insurances-root/medibuddy-tab/view-medibuddy-card/view-medibuddy-card.component';
import { GenericWithdrawalFormComponent } from './components/retirals-root/my-retirals-tab/pf-withdrawals/create-pf-withdrawal-form/generic-withdrawal-form/generic-withdrawal-form.component';
import { InsuranceWithdrawalFormComponent } from './components/retirals-root/my-retirals-tab/pf-withdrawals/create-pf-withdrawal-form/insurance-withdrawal-form/insurance-withdrawal-form.component';
import { MedicalWithdrawalFormComponent } from './components/retirals-root/my-retirals-tab/pf-withdrawals/create-pf-withdrawal-form/medical-withdrawal-form/medical-withdrawal-form.component';
import { MarriageWithdrawalFormComponent } from './components/retirals-root/my-retirals-tab/pf-withdrawals/create-pf-withdrawal-form/marriage-withdrawal-form/marriage-withdrawal-form.component';
import { PensionsComponent } from './components/retirals-root/my-retirals-tab/pensions/pensions.component';
import { GratuityDetailsPopupComponent } from './components/retirals-root/my-retirals-tab/gratuity/gratuity-details-popup/gratuity-details-popup.component';
import { GratuityPdfViewerComponent } from './components/retirals-root/my-retirals-tab/gratuity-leave-encashment/gratuity-pdf-viewer/gratuity-pdf-viewer.component';
import { AvailMobileSimRootComponent } from './components/avail-mobile-sim-root/avail-mobile-sim-root.component';
import { AvailOverviewTabComponent } from './components/avail-mobile-sim-root/avail-overview-tab/avail-overview-tab.component';
import { BillCertificationTabComponent } from './components/avail-mobile-sim-root/bill-certification-tab/bill-certification-tab.component';
import { IsdCallingComponent } from './components/avail-mobile-sim-root/isd-calling/isd-calling.component';
import { InternationalRoamingServicesComponent } from './components/avail-mobile-sim-root/international-roaming-services/international-roaming-services.component';
import { IsdActivationModalComponent } from './components/avail-mobile-sim-root/isd-calling/isd-activation-modal/isd-activation-modal.component';
import { ClvViewModalComponent } from './components/company-leased-vehicle-root/clv-view-modal/clv-view-modal.component';
import { AttachmenmtsModalComponent } from './components/company-leased-vehicle-root/attachmenmts-modal/attachmenmts-modal.component';
import { MobileNumberPortabilityComponent } from './components/avail-mobile-sim-root/avail-overview-tab/mobile-number-portability/mobile-number-portability.component';
import { ConfirmationSimModalComponent } from './components/avail-mobile-sim-root/avail-overview-tab/confirmation-sim-modal/confirmation-sim-modal.component';
import { ValueAddedServiceModalComponent } from './components/avail-mobile-sim-root/avail-overview-tab/value-added-service-modal/value-added-service-modal.component';
import { DiscontinueSimModalComponent } from './components/avail-mobile-sim-root/avail-overview-tab/discontinue-sim-modal/discontinue-sim-modal.component';
import { IrRequestCreationModalComponent } from './components/avail-mobile-sim-root/international-roaming-services/ir-request-creation-modal/ir-request-creation-modal.component';
import { PmeCentersModalComponent } from './components/claims-insurances-root/pme-tab/pme-centers-modal/pme-centers-modal.component';
import { AppointmentModalComponent } from './components/claims-insurances-root/pme-tab/pme-centers-modal/appointment-modal/appointment-modal.component';
import { RequestCreationModalComponent } from './components/claims-insurances-root/pme-tab/pme-centers-modal/request-creation-modal/request-creation-modal.component';
import { AvailMobileSimService } from './components/avail-mobile-sim-root/avail-mobile-sim.service';
import { ViewEditDependentLandingComponent } from './components/claims-insurances-root/overview-tab/view-edit-dependents-modal/view-edit-dependent-landing/view-edit-dependent-landing.component';
import { DependentDetailsComponent } from './components/claims-insurances-root/overview-tab/view-edit-dependents-modal/dependent-details/dependent-details.component';
import { RelativesInRelianceComponent } from './components/claims-insurances-root/overview-tab/view-edit-dependents-modal/relatives-in-reliance/relatives-in-reliance.component';
import { CoverageClaimsModalComponent } from './components/claims-insurances-root/gpa-claim-tab/coverage-claims-modal/coverage-claims-modal.component';
import { InfoModalComponent } from './components/company-leased-vehicle-root/info-modal/info-modal.component';
import { EsicTabComponent } from './components/claims-insurances-root/esic-tab/esic-tab.component';
import { PrmbTabComponent } from './components/claims-insurances-root/prmb-tab/prmb-tab.component';
import { PrmbAddDependentModalComponent } from './components/claims-insurances-root/prmb-tab/prmb-add-dependent-modal/prmb-add-dependent-modal.component';
import { MedicalCentersInfoModalComponent } from './components/health-wellness-root/medical-centers-info-modal/medical-centers-info-modal.component';
@NgModule({
  declarations: [
    BenefitsLandingComponent,
    RetiralsRootComponent,
    MyRetiralsTabComponent,
    PfTransferPensionComponent,
    PfWithdrawalsComponent,
    GratuityComponent,
    GratuityLeaveEncashmentComponent,
    InternalTransfersComponent,
    LoanAndAdvancesComponent,
    ClaimsInsurancesRootComponent,
    InstallmentDetailsPopupComponent,
    CreatePfTransferFormComponent,
    RetiralBenefitsTabComponent,
    PfPensionInfoPopupComponent,
    InternalTransferDetailsPopupComponent,
    GratuityEncashmentDeclarationComponent,
    CreatePfWithdrawalFormComponent,
    WithdrawalTermsPopupComponent,
    ProvisionalGratuityDetailsComponent,
    GratuityFormulaPopupComponent,
    ProvisionalPfDetailsComponent,
    ProvisonalSuperannuationDetailsComponent,
    PfYearWiseDetailsComponent,
    PfMonthWiseDetailsComponent,
    SuperannuationYearWiseDetailsComponent,
    SuperannuationMonthWiseDetailsComponent,
    VehicleBenefitsModalComponent,
    CompanyLeasedVehicleComponent,
    CompanyLeasedVehicleModalComponent,
    CovBuybackComponent,
    EducationAssistanceRequestComponent,
    AssistanceRequestModalComponent,
    ClaimInsuranceWidgetComponent,
    RetiralsBenefitWidgetComponent,
    AmountAppliedInfoPopupComponent,
    MedibuddyTabComponent,
    ClaimInsuranceInfoComponent,
    OverviewTabComponent,
    GhpClaimTabComponent,
    GhpClaimModalComponent,
    GpaClaimTabComponent,
    GpaClaimModalComponent,
    PmeTabComponent,
    PmeReportsModalComponent,
    HospitalsListPopupComponent,
    PfTransferStatePopupComponent,
    MarriageDetailsModalComponent,
    HealthWellnessModalComponent,
    MaternityPaternityLandingComponent,
    MaternityInfoModalComponent,
    PaternityInfoModalComponent,
    PhoneRootComponent,
    ViewEditDependentsModalComponent,
    AddDependentModalComponent,
    AddRelativeModalComponent,
    SearchRelativeModalComponent,
    MarriageLoanModalComponent,
    LoanRepaymentModalComponent,
    AddressInfoModalComponent,
    NpsTabComponent,
    VpfTabComponent,
    SuperannuationTabComponent,
    NpsDeductionModalComponent,
    VpfCreateDeductionModalComponent,
    RetiralBenefitsPdfViewerComponent,
    AdvancesModalComponent,
    MedicalAdvanceComponent,
    ImprestAdvanceComponent,
    TeamBuildingAdvanceComponent,
    SuperCreateDeductionModalComponent,
    TransferComponent,
    ContributionComponent,
    TransferSuperannuationModalComponent,
    SpecialtiesFilterComponent,
    HospitalsDetailModalComponent,
    ViewMedibuddyCardComponent,
    GenericWithdrawalFormComponent,
    InsuranceWithdrawalFormComponent,
    MedicalWithdrawalFormComponent,
    MarriageWithdrawalFormComponent,
    PensionsComponent,
    GratuityDetailsPopupComponent,
    GratuityPdfViewerComponent,
    AvailMobileSimRootComponent,
    AvailOverviewTabComponent,
    BillCertificationTabComponent,
    IsdCallingComponent,
    InternationalRoamingServicesComponent,
    IsdActivationModalComponent,
    ClvViewModalComponent,
    AttachmenmtsModalComponent,
    MobileNumberPortabilityComponent,
    ConfirmationSimModalComponent,
    ValueAddedServiceModalComponent,
    DiscontinueSimModalComponent,
    IrRequestCreationModalComponent,
    PmeCentersModalComponent,
    AppointmentModalComponent,
    RequestCreationModalComponent,
    ViewEditDependentLandingComponent,
    DependentDetailsComponent,
    RelativesInRelianceComponent,
    CoverageClaimsModalComponent,
    InfoModalComponent,
    EsicTabComponent,
    PrmbTabComponent,
    PrmbAddDependentModalComponent,
    MedicalCentersInfoModalComponent,
  ],
  imports: [
    CoreModule,
    BenefitsRoutingModule,
    PdfViewerModule,
    ChartsModule,
    SharedModule
  ],
  providers: [AvailMobileSimService]
})
export class BenefitsModule {}
