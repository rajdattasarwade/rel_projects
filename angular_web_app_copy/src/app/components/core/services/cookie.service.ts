import { Injectable } from '@angular/core';
import { Config } from '../config/config';

@Injectable()
export class CookieService {
  constructor() {}
  getBUIdentifier() {
    console.log('Inside cookie service');
    let dataList: Array<string> = document.cookie.split(';');
    console.log('cookie  data', dataList);
    for (let item of dataList) {
      if (item.trim().includes('buIdentifier')) {
        let bUinit = item.split('buIdentifier=');
        console.log('BuIdentifier', bUinit[1]);
        Config.bUnit = bUinit[1];
        console.log('set Config variable', Config.bUnit);
      }
    }
  }
}
