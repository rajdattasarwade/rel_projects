import { Injectable } from '@angular/core';
import { MENU_MASTER } from './common-models';
@Injectable()
export class CommonService {
  constructor() {
    console.log('common service constructed');
  }

  get getMenuList() {
    return MENU_MASTER;
  }
}
