import { GuestTravelExpensesComponent } from '../components/reimbursements-forms/guest-travel-expenses/guest-travel-expenses.component';
import { LocalConveyanceComponent } from '../components/reimbursements-forms/local-conveyance/local-conveyance.component';
import { LtaComponent } from '../components/reimbursements-forms/lta/lta.component';
import { ManagerialMedicalAllowanceComponent } from '../components/reimbursements-forms/managerial-medical-allowance/managerial-medical-allowance.component';
import { DailyFieldIncidentalExpenseComponent } from '../components/reimbursements-forms/daily-field-incidental-expense/daily-field-incidental-expense.component';
import { KitAllowanceComponent } from '../components/reimbursements-forms/kit-allowance/kit-allowance.component';
import { PreEmpMedicalComponent } from '../components/reimbursements-forms/pre-emp-medical/pre-emp-medical.component';
import { OtherReimbursementComponent } from '../components/reimbursements-forms/other-reimbursement/other-reimbursement.component';
import { TelephoneAndDataCardComponent } from '../components/reimbursements-forms/telephone-and-data-card/telephone-and-data-card.component';
import { AccidentRepairSohoAllowanceComponent } from '../components/reimbursements-forms/accident-repair-soho-allowance/accident-repair-soho-allowance.component';
import { ChildrenHostelAllowanceComponent } from '../components/reimbursements-forms/children-hostel-allowance/children-hostel-allowance.component';
import { AviationMedicalReimbComponent } from '../components/reimbursements-forms/aviation-medical-reimb/aviation-medical-reimb.component';
import { SohoAllowanceComponent } from '../components/reimbursements-forms/soho-allowance/soho-allowance.component';
import { DataCardRentalComponent } from '../components/reimbursements-forms/data-card-rental/data-card-rental.component';
import { HandsetReimbursementComponent } from '../components/reimbursements-forms/handset-reimbursement/handset-reimbursement.component';
import { MedicalReimbursementComponent } from '../components/reimbursements-forms/medical-reimbursement/medical-reimbursement.component';
import { FuelExpenseCarComponent } from '../components/reimbursements-forms/fuel-expense-car/fuel-expense-car.component';
import { UniformStitchingAllowanceComponent } from '../components/reimbursements-forms/uniform-stitching-allowance/uniform-stitching-allowance.component';
import { AccidentRepairsComponent } from '../components/reimbursements-forms/accident-repairs/accident-repairs.component';
import { PeriodicMedicalComponent } from '../components/reimbursements-forms/periodic-medical/periodic-medical.component';
import { TransferJoiningComponent } from '../components/reimbursements-forms/transfer-joining/transfer-joining.component';
import { MonsoonKitAllowanseComponent } from '../components/reimbursements-forms/monsoon-kit-allowanse/monsoon-kit-allowanse.component';
import { childrenEducationAllowanceComponent } from '../components/reimbursements-forms/children-education-allowance/children-education-allowance.component';
import { FuelExpenseTwoWheelerComponent } from '../components/reimbursements-forms/fuel-expense-two-wheeler/fuel-expense-two-wheeler.component';
import { DeputationFoodComponent } from '../components/reimbursements-forms/deputation-food/deputation-food.component';
import { DeputationOtherComponent } from '../components/reimbursements-forms/deputation-other/deputation-other.component';

import { OfficeWearAlloanceComponent } from '../components/reimbursements-forms/office-wear-alloance/office-wear-alloance.component';
import { AviationTrainingReimbursementComponent } from '../components/reimbursements-forms/aviation-training-reimbursement/aviation-training-reimbursement.component';
export class ReimbursementsConstants {
  static readonly REIMBURSEMENTS_APPROVED_STATUS: string = 'A';
  static readonly REIMBURSEMENTS_DRAFT_STATUS: string = 'N';
  static readonly REIMBURSEMENTS_PENDING_STATUS_P: string = 'P';
  static readonly REIMBURSEMENTS_PENDING_STATUS_T: string = 'T';
  static readonly REIMBURSEMENTS_TYPE = [
    {
      reimbursementText: 'Daily Field Incidental Expenses',
      bgColor: 'blue-bg',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/money-ico.svg',
      sapCode: 'ZFLD',
      componentName: DailyFieldIncidentalExpenseComponent,
    },
    {
      reimbursementText: 'Guest-Travel Expenses',
      bgColor: 'seagreen-bg',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/guest-travel-ico.svg',
      sapCode: 'ZGEX',
      componentName: GuestTravelExpensesComponent,
    },
    {
      reimbursementText: 'Kit Allowance',
      bgColor: 'lightblue-bg',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/medical-kit-ico.svg',
      sapCode: 'ZKIT',
      componentName: KitAllowanceComponent,
    },
    {
      reimbursementText: 'Local Conveyance & Toll Tax',
      bgColor: 'blue-bg',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/toll-road-ico.svg',
      sapCode: 'ZCNV',
      componentName: LocalConveyanceComponent,
    },
    {
      reimbursementText: 'Handset Reimbursement',
      bgColor: '',
      icon: 'attach_money',
      flag: true,
      imgUrl: 'assets/images/svg/handset-ico.svg',
      sapCode: 'ZRIM',
      componentName: HandsetReimbursementComponent,
    },
    {
      reimbursementText: 'Pre-Employment Medical',
      bgColor: 'blue-bg',
      icon: 'attach_money',
      flag: true,

      imgUrl: 'assets/images/svg/pre-medical-ico.svg',
      sapCode: 'ZPEM',
      componentName: PreEmpMedicalComponent,
    },
    {
      reimbursementText: 'Other Reimbursement',
      bgColor: 'lightpink-bg',
      icon: '',
      flag: true,
      imgUrl: 'assets/images/others-ico.png',
      sapCode: 'ZOTR',
      componentName: OtherReimbursementComponent,
    },
    {
      reimbursementText: 'Deputation - Food Expenses',
      sapCode: 'ZDPF',
      componentName: DeputationFoodComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/food-expenses-ico.svg',
    },
    {
      reimbursementText: 'Periodic Medical Checkup - Self',
      sapCode: 'ZPME',
      componentName: PeriodicMedicalComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/medical-check-self-ico.svg',
    },

    {
      reimbursementText: 'Periodic Medical Checkup - Spouse',
      sapCode: 'ZPMS',
      componentName: PeriodicMedicalComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/medical-check-spouse.svg',
    },
    {
      reimbursementText: 'Deputation - Other Expenses',
      sapCode: 'ZDPM',
      componentName: DeputationOtherComponent,
      bgColor: '',
      icon: '',
      flag: true,
      imgUrl: 'assets/images/svg/deputation-other-ico.svg',
    },
    {
      reimbursementText: 'Fuel Expenses - Two Wheeler',
      sapCode: 'ZFMT',
      componentName: FuelExpenseTwoWheelerComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-large',
      flag: true,
      imgUrl: 'assets/images/svg/two-wheeler-ico.svg',
    },
    {
      reimbursementText: 'Managerial Medical',
      sapCode: 'ZMDN',
      componentName: ManagerialMedicalAllowanceComponent,
      bgColor: '',
      icon: '',
      flag: true,
      imgUrl: 'assets/images/svg/managerial-medical-ico.svg',
    },
    {
      reimbursementText: 'Telephone Claims',
      sapCode: 'ZTEL',
      componentName: TelephoneAndDataCardComponent,
      bgColor: '',
      icon: '',
      flag: true,
      imgUrl: 'assets/images/svg/phone-ico.svg',
    },
    {
      reimbursementText: 'Leave Travel Allowance',
      sapCode: 'SLTA',
      componentName: LtaComponent,
      bgColor: '',
      icon: '',
      flag: true,
      imgUrl: 'assets/images/svg/leave-travel-ico.svg',
    },
    {
      reimbursementText: 'SOHO Allowance',
      sapCode: 'ZSOH',
      componentName: SohoAllowanceComponent,
      bgColor: '',
      icon: '',
      flag: true,
      imgUrl: 'assets/images/svg/soho-allowance-ico.svg',
    },
    {
      reimbursementText: 'Medical Reimbursement',
      sapCode: 'ZMED',
      componentName: MedicalReimbursementComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/medical-report-ico.svg',
    },
    {
      reimbursementText: 'Children Education Allowance',
      sapCode: 'SCEA',
      componentName: childrenEducationAllowanceComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/children-education-ico.svg',
    },
    {
      reimbursementText: 'Fuel Expenses car',
      sapCode: 'ZFMC',
      componentName: FuelExpenseCarComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-large',
      flag: true,
      imgUrl: 'assets/images/svg/fuel-expenses-car-ico.svg',
    },
    {
      reimbursementText: 'Transfer/Joining',
      sapCode: 'ZTRF',
      componentName: TransferJoiningComponent,
      bgColor: '',
      icon: '',
      flag: true,
      imgUrl: 'assets/images/svg/transfer-joining-ico.svg',
    },
    {
      reimbursementText: 'Data Card Rental',
      sapCode: 'ZDCT',
      componentName: DataCardRentalComponent,
      bgColor: '',
      icon: 'wifi', // mat icons should be implemented in parent card
      imgClass: 'img-mini',
      flag: true,
      imgUrl: 'assets/images/svg/data-card-ico.svg',
    },
    {
      reimbursementText: 'Office Wear Allowance',
      sapCode: 'ZOWA',
      componentName: OfficeWearAlloanceComponent,
      bgColor: '',
      icon: '',
      flag: true,
      imgUrl: 'assets/images/svg/office-wear-ico.svg',
    },
    {
      reimbursementText: 'Monsoon Kit Reimbursements',
      sapCode: 'ZMON',
      componentName: MonsoonKitAllowanseComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/monsoon-kit-ico.svg',
    },
    {
      reimbursementText: 'Accident Repairs ',
      sapCode: 'ZREP',
      componentName: AccidentRepairsComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-large',
      flag: true,
      imgUrl: 'assets/images/svg/accident-repairs-ico.svg',
    },
    {
      reimbursementText: 'Aviation Medical Reimbursement',
      sapCode: 'ZAMR',
      componentName: AviationMedicalReimbComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/aviation-medical-ico.svg',
    },
    {
      reimbursementText: 'Aviation Training Reimbursement',
      sapCode: 'ZATR',
      componentName: AviationTrainingReimbursementComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/aviation-training-ico.svg',
    },
    {
      reimbursementText: 'Uniform Stitching Allowance',
      sapCode: 'ZUSR',
      componentName: UniformStitchingAllowanceComponent,
      bgColor: '',
      icon: '',
      flag: true,
      imgUrl: 'assets/images/svg/uniform-ico.svg',
    },
    {
      reimbursementText: 'Children Hostel Allowance',
      sapCode: 'SCHA',
      componentName: ChildrenHostelAllowanceComponent,
      bgColor: '',
      icon: '',
      imgClass: 'img-medium',
      flag: true,
      imgUrl: 'assets/images/svg/children-hostel-ico.svg',
    },
  ];
}
