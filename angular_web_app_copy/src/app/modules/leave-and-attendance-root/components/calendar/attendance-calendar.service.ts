import { Injectable } from '@angular/core';
import { Observable, config, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../../../components/core/config/config';
import isEqual from 'date-fns/isEqual';
import isFuture from 'date-fns/isFuture';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceCalendarService {
  cachedAttDetail: any = [];
  gridViewAttArray: any = [];
  private initiateFlag = new BehaviorSubject<any>([]);
  Attdata = this.initiateFlag.asObservable();

  public setData(data: any) {
    this.initiateFlag.next(data);
  }

  public reqOptions = {
    headers: new HttpHeaders({ userId: Config.userId }),
  };
  constructor(private httpClient: HttpClient) {}

  getAttendanceDetails(month, year): Observable<any> {
    return this.httpClient.get(
      Config.baseUrl +
        'attendance-service/' +
        Config.apiVersion +
        '/details/day/' +
        month +
        '/' +
        year
    //     ,
    //   this.reqOptions
    );
    // return this.httpClient.get(
    //   'assets/Leave_And_Attendance/ATTENDANCE_DETAILS.json'
    // );
  }

  formatInOutTime(time) {
    time = time + Config.timezoneOffset;
    time = new Date(time);
    return (
      this.mintwodigits(new Date(time).getHours()) +
      ':' +
      this.mintwodigits(new Date(time).getMinutes())
    );
  }

  formatActualInAndDefaultHrs(inputHrs) {
    return this.getTimeFromMillisecs(inputHrs * 3600000);
  }

  mintwodigits(n) {
    if (!isNaN(n)) {
      return (n < 10 ? '0' : '') + n;
    } else {
      return '00';
    }
  }

  getTimeFromMillisecs(
    time: number,
    replacement_string: string = '00:00'
  ): string {
    if (time < 0) {
      return replacement_string;
    }

    let hour = Math.floor(time / 3600000);

    let min = ((time / 3600000) * 100) % 100;

    min = Math.round((min / 100) * 60);
    var calculatedHrs;
    if (this.mintwodigits(this.numParse(hour)) != '00') {
      if (parseInt(this.mintwodigits(this.numParse(hour))) > 1) {
        calculatedHrs = this.mintwodigits(this.numParse(hour)) + ' hrs';
      } else {
        calculatedHrs = this.mintwodigits(this.numParse(hour)) + ' hr';
      }
    } else {
      calculatedHrs = '';
    }
    // this.mintwodigits(this.numParse(hour)) != '00'
    //   ? this.mintwodigits(this.numParse(hour)) + 'hr'
    //   : '';
    var calculatedMins;
    if (this.mintwodigits(Math.round(this.numParse(min))) != '00') {
      if (parseInt(this.mintwodigits(Math.round(this.numParse(min)))) > 1) {
        calculatedMins =
          this.mintwodigits(Math.round(this.numParse(min))) + ' mins';
      } else {
        this.mintwodigits(Math.round(this.numParse(min))) + ' min';
      }
    } else {
      calculatedMins = '';
    }

    return calculatedHrs + ' ' + calculatedMins;
  }

  numParse(n) {
    return n > 9 ? '' + n : 0 + n;
  }

  time_convert(num) {
    var decimalTime = parseFloat(num);
    decimalTime = decimalTime * 60 * 60;
    var hours = Math.floor(decimalTime / (60 * 60));
    decimalTime = decimalTime - hours * 60 * 60;
    var minutes = Math.floor(decimalTime / 60);
    decimalTime = decimalTime - minutes * 60;
    var seconds = Math.round(decimalTime);
    if (hours < 10) {
      hours = 0 + hours;
    }
    if (minutes < 10) {
      minutes = 0 + minutes;
    }
    if (seconds < 10) {
      seconds = 0 + seconds;
    }

    var minLabel = minutes > 1 ? 'mins' : 'min';
    var hrLabel = hours > 1 ? 'hrs' : 'hr';
    var finalVal;
    if (hours == 0) {
      finalVal = minutes + minLabel;
    } else if (minutes == 0) {
      finalVal = hours + hrLabel;
    } else {
      finalVal = hours + hrLabel + ' ' + minutes + minLabel;
    }

    return finalVal;
  }

  convertMilliDateToFormat(milliDate) {
    var convertedMilliDate = new Date(milliDate);
    return convertedMilliDate.toLocaleDateString(); // Format :- M/D/YYYY
  }

  checkIfDatesAreEqual(firstDate, secondDate) {
    return isEqual(
      new Date(
        parseInt(firstDate.split('/')[2]), //YYYY
        parseInt(firstDate.split('/')[0]), //M
        parseInt(firstDate.split('/')[1]), //D
        0, //hrs
        0, //min
        0, //sec
        0 //milSec
      ),
      new Date(
        parseInt(secondDate.split('/')[2]),
        parseInt(secondDate.split('/')[0]),
        parseInt(secondDate.split('/')[1]),
        0,
        0,
        0,
        0
      )
    );
  }

  checkIfDatesAreEqualSimple(firstDate, secondDate) {
    return isEqual(firstDate, secondDate);
  }

  isFutureDates(dateTocheck) {
    return isFuture(
      new Date(
        dateTocheck.split('/')[2],
        dateTocheck.split('/')[1] - 1,
        dateTocheck.split('/')[0]
      )
    );
  }

  cacheAttDetMonthWise(month, year, monthlyDet) {
    this.cachedAttDetail[month + year] = monthlyDet;
  }

  generateCalendar(currentDate, flag) {
    var generateCalPayload = {
      apiActionFlag: true,
      currentDate: currentDate,
      dataFlag: flag,
    };
    var month = moment(currentDate).format('DD/M/YYYY').split('/')[1]; // format current date and get month (Eg:-For August --- 8)
    var year = moment(currentDate).format('DD/MM/YYYY').split('/')[2]; //present year

    //caching of api responses, if already present then no need to hit api rather take data from response, else hit Api
    if (this.cachedAttDetail.length > 0) {
      if (this.cachedAttDetail[month + year] != undefined) {
        generateCalPayload.apiActionFlag = false;
      } else {
        generateCalPayload.apiActionFlag = true;
      }
    } else {
      generateCalPayload.apiActionFlag = true;
    }
    this.setData(generateCalPayload);
  }
}
