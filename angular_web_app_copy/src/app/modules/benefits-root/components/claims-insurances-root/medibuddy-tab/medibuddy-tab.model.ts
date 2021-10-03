export class MedibuddyList {
  primaryBeneficiaryEmployeeCode: any;
  primaryBeneficiaryName: string;
  beneficiaryRelationToPrimaryId: Number;
  beneficiaryRelation: string;
  beneficiaryMediAssistId: any;
  beneficiaryCorporateName: string;
  beneficiaryName: string;
  beneficiaryDOB: any;
  beneficiaryGender: string;
  policyStartDate: any;
  policyEndtDate: any;
  policyNumber: any;
  insuranceCompanyName: any;
  constructor() {
    this.primaryBeneficiaryEmployeeCode = 0;
    this.primaryBeneficiaryName = '';
    this.beneficiaryRelationToPrimaryId = 0;
    this.beneficiaryRelation = '';
    this.beneficiaryMediAssistId = '';
    this.beneficiaryCorporateName = '';
    this.beneficiaryName = '';
    this.beneficiaryDOB = '';
    this.beneficiaryGender = '';
    this.policyStartDate = '';
    this.policyEndtDate = '';
    this.policyNumber = '';
  }
}

export class EmailValue {
  benefMediAssistId: any;
  benefName: string;
  email: any;

  constructor() {
    this.benefMediAssistId = '';
    this.benefName = '';
    this.email = '';
  }
}

export class HospitalList {
  phone: string;
  associatedInsuranceCompanies: string;
  entityId: string;
  state: string;
  hospSpecialities: string;
  avgRating: string;
  blacklisted: string;
  city: string;
  id: string;
  pinCode: string;
  address: string;
  email: string;
  name: string;
  longitude: string;
  latitude: string;
  district: string;
  ppn: boolean;
  constructor() {
    this.phone = '';
    this.associatedInsuranceCompanies = '';
    this.entityId = '';
    this.state = '';
    this.hospSpecialities = '';
    this.avgRating = '';
    this.blacklisted = '';
    this.city = '';
    this.entityId = '';
    this.id = '';
    this.pinCode = '';
    this.address = '';
    this.email = '';
    this.city = '';
    this.name = '';
    this.id = '';
    this.longitude = '';
    this.latitude = '';
    this.district = '';
  }
}
