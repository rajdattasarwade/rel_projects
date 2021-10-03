import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Config } from '../../core/config/config';

@Injectable({
  providedIn: 'root',
})
export class UpcomingHolidayService {
  cachedHolidayObj: any = [];
  //getData from holiday-service/1.0/details/2020
  // Sample json ********************************************
  // holidaysList = [
  //   {
  //     holidayEndDate: 1577923199999,
  //     holidayStartDate: 1577836800000,
  //     holidayDesc: 'New Year',
  //     holidayType: 'PH',
  //   },
  //   {
  //     holidayEndDate: 1580083199999,
  //     holidayStartDate: 1579996800000,
  //     holidayDesc: 'Republic Day',
  //     holidayType: 'PH',
  //   },
  //   {
  //     holidayEndDate: 1583884799999,
  //     holidayStartDate: 1583798400000,
  //     holidayDesc: 'Holi',
  //     holidayType: 'PH',
  //   },
  //   {
  //     holidayEndDate: 1588377599999,
  //     holidayStartDate: 1588291200000,
  //     holidayDesc: 'Maharashtra Day',
  //     holidayType: 'PH',
  //   },
  //   {
  //     holidayEndDate: 1597535999999,
  //     holidayStartDate: 1597449600000,
  //     holidayDesc: 'Independence Day',
  //     holidayType: 'PH',
  //   },
  //   {
  //     holidayEndDate: 1598140799999,
  //     holidayStartDate: 1598054400000,
  //     holidayDesc: 'Ganesh Chaturthi',
  //     holidayType: 'PH',
  //   },
  //   {
  //     holidayEndDate: 1601683199999,
  //     holidayStartDate: 1601596800000,
  //     holidayDesc: 'Gandhi Jayanti',
  //     holidayType: 'PH',
  //   },
  //   {
  //     holidayEndDate: 1603670399999,
  //     holidayStartDate: 1603584000000,
  //     holidayDesc: 'Dussehra',
  //     holidayType: 'PH',
  //   },
  //   {
  //     holidayEndDate: 1605398399999,
  //     holidayStartDate: 1605312000000,
  //     holidayDesc: 'Diwali - Laxmi Pujan',
  //     holidayType: 'PH',
  //   },
  //   {
  //     holidayEndDate: 1605484799999,
  //     holidayStartDate: 1605398400000,
  //     holidayDesc: 'Bestu Varas / Govardhan Puja',
  //     holidayType: 'PH',
  //   },
  //   {
  //     holidayEndDate: 1605571199999,
  //     holidayStartDate: 1605484800000,
  //     holidayDesc: 'Bhaubij / Bhai Bij',
  //     holidayType: 'PH',
  //   },
  // ];
  // Sample json ********************************************
  baseUrl: string;
  reqOptions = {
    headers: new HttpHeaders({ userId: Config.userId }),
  };
  constructor(private http: HttpClient) {}

  getHolidayList(year) {
    return this.http.get(
      Config.baseUrl + `holiday-service/${Config.apiVersion}/details/` + year,
      this.reqOptions
    );
  }
  //to sort holidays in ascending order
  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
getNationalHolidayElig(){
  return this.http.get(
    Config.baseUrl + `holiday-service/${Config.apiVersion}/eligibility`,
    this.reqOptions
  ); 
}
  cacheHolidayList(holidayList, year) {
    this.cachedHolidayObj[year] = holidayList;
    console.log(this.cachedHolidayObj);
  }
}
