import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injectable
} from '@angular/core';
import { Config } from '../../../../../components/core/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeddibuddyTabService {
  private medibuddyBaseUrl =
    Config.baseUrl + 'dhs-service/' + Config.apiVersion + '/';
  private memberList: string = this.medibuddyBaseUrl + 'members';
  private stateList: string = this.medibuddyBaseUrl + 'states';
  private cityList: string = this.medibuddyBaseUrl + 'states/cities';
  private hospitalList: string = this.medibuddyBaseUrl + 'hospital';
  private specialityList: string = this.medibuddyBaseUrl + 'specialities';
  private ecard: string = this.medibuddyBaseUrl + 'ecard';
  private ecardemail: string = this.medibuddyBaseUrl + 'ecard/mail';
  constructor(private http: HttpClient) {}
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  private getRequestHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    });
  }
  getCardDetails() {
    return this.http.get(this.memberList, this.reqOptions).map(res => res);
  }
  getStatDetails() {
    return this.http.get(this.stateList, this.reqOptions).map(res => res);
  }
  getCityDetails(state) {
    return this.http
      .get(this.cityList + '?state=' + state, this.reqOptions)
      .map(res => res);
  }
  searchHospitaList(state, city, insuranceCmpnyName) {
    let url =
      this.hospitalList +
      '?&state_name=' +
      state +
      '&city_name=' +
      city +
      '&insuranceCompanyName=' +
      insuranceCmpnyName;
    return this.http.get(url, this.reqOptions).map(res => res);
  }
  getSpecialityDetails() {
    return this.http.get(this.specialityList, this.reqOptions).map(res => res);
  }
  fetchAttachment(id, name) {
    const httpHeader = this.getRequestHeaders();
    let url = this.ecard + '?mediAssistId=' + id + '&memberName=' + name;
    return this.http.get(url, {
      headers: httpHeader,
      responseType: 'blob' as 'json'
    });
  }
  dhsEcardMail(data) {
    var body = JSON.stringify(data);
    return this.http.post(this.ecardemail, body, this.reqOptions);
  }
  getAllCards(policyNumber) {
    return this.http.get(
      this.medibuddyBaseUrl + 'family/ecard?policyNumber=' + policyNumber,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userId: Config.userId
        }),
        responseType: 'blob' as 'json'
      }
    );
  }
  public viewData: any;
  get getviewData() {
    return this.viewData;
  }
  set setviewData(obj: any) {
    this.viewData = obj;
  }
  public insuranceName: any;
  get getInsuranceName() {
    return this.insuranceName;
  }
  set setInsuranceName(obj: any) {
    this.insuranceName = obj;
  }
  public hospitalDetail: any;
  get getHospitalDetail() {
    return this.hospitalDetail;
  }
  set setHospitalDetail(obj: any) {
    this.hospitalDetail = obj;
  }
  public specHospital: any;
  get getspecHospital() {
    return this.specHospital;
  }
  set setspecHospital(obj: any) {
    this.specHospital = obj;
  }
}
