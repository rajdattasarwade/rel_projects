import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DependentDetailModel } from './prmb.model';

@Injectable({
  providedIn: 'root',
})
export class PrmbService {
  constructor() {}
  prmbElements: DependentDetailModel[] = [];
  prmbDependentDetails: DependentDetailModel[] = [];
  prmbElementsSubject = new BehaviorSubject<DependentDetailModel[]>(
    this.prmbElements
  );
  setInitialDataSource(flag: boolean) {
    if (flag) {
      this.prmbElements = this.prmbDependentDetails;
    } else {
      this.prmbElements = [];
    }
    this.prmbElementsSubject.next(this.prmbElements);
  }

  addToElements(item: DependentDetailModel) {
    console.log('add....', item);
    this.prmbElements.push(item);
    console.log('listAfter add....', this.prmbElements);
    this.prmbElementsSubject.next(this.prmbElements);
  }
  removeElement(item: DependentDetailModel) {
    console.log('remove...', item);
    let removeElement = this.prmbElements.find((x) => {
      return (
        x.dependentName == item.dependentName &&
        x.dependentType == item.dependentType
      );
    });
    const removeFromIndex = this.prmbElements.indexOf(removeElement);
    if (removeFromIndex > -1) {
      console.log('prmb element removed from...index', removeFromIndex);
      this.prmbElements.splice(removeFromIndex, 1);
    }
    console.log('listAfter Remove....', this.prmbElements);
    this.prmbElementsSubject.next(this.prmbElements);
  }
  childCount: number = 0;
  spouseCount: number = 0;
  checkIfExistInElement(item: DependentDetailModel): boolean {
    let flag = false;
    console.log('this.prmbElemets', this.prmbElements);
    this.prmbElements.forEach((element) => {
      console.log(element.dependentType == item.dependentType);
      console.log(element.dependentType);
      console.log(item.dependentType);
      console.log(element.dependentName == item.dependentName);
      console.log(element.dependentName);
      console.log(item.dependentName);
      if (
        element.dependentType == item.dependentType &&
        element.dependentName == item.dependentName
      ) {
        console.log('true');
        flag = true;
      }
    });
    return flag;
  }
}
