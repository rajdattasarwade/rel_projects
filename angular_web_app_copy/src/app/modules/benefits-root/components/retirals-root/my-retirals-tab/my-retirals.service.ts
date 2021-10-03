import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyRetiralsService {

  constructor() { }

  alphabetSpaceValidation(event){
    var regex = /^[a-zA-Z ]*$/
    if (regex.test(event.key) == false) {
      return false
    } else {
      return true
    }
  }

  onlyNumbersValidation(event){
    var regex = /^[0-9]*$/
    if (regex.test(event.key) == false) {
      return false
    } else {
      return true
    }
  }

  decimalNumberValidation(event){
    var regex = /^[0-9.]*$/
    if (regex.test(event.key) == false) {
      return false
    } else {
      return true
    }
  }

}
