import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Config } from '../../../../../../components/core/config/config';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  public formSelected:EventEmitter<any>=new EventEmitter()
  public commonformData:EventEmitter<any>=new EventEmitter()
  public formEmitter:EventEmitter<any>=new EventEmitter()
  public editDataEmitter:EventEmitter<any>=new EventEmitter()
  private retiralsBaseurl =Config.baseUrl + 'manage-retirals-pfwithdrawal-service/' + Config.apiVersion;
  public reqOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  };
  constructor(private http: HttpClient) { }

  amountChange(event,formgroup) {
    let amount = formgroup.value.amountApplied.toString()
    var regex = /^[0-9.]*$/    
    if (regex.test(event.key) == false) {
      return false
    } else {
      if (amount.indexOf(".") != -1 && event.key == ".") {
        // if there is . and present pressed is .
        return false
      } else {
        return true
      }
    }
  }

  getWithdrawalTypes(){
    return this.http
      .get(
        this.retiralsBaseurl + '/type',
        this.reqOptions
      )
  }
  getWithdrawalTerm(){
    return this.http
    .get(
      this.retiralsBaseurl + '/term',
      this.reqOptions
    )
  }
  getRelations(){
    return this.http
    .get(
      this.retiralsBaseurl + '/relations',
      this.reqOptions
    )
  }
  getAccountType(){
    return this.http
    .get(
      this.retiralsBaseurl + '/accounttype',
      this.reqOptions
    )
  }
  getAccountDetail(){
    return this.http
    .get(
      this.retiralsBaseurl + '/account/detail',
      this.reqOptions
    )
  }
  saveWithdrawalForm(requestObj:any,flag:any){
    let body = JSON.stringify(requestObj);
    var endpoint=''
    if(flag=='C'){
      endpoint='create'
    }
    else{
      endpoint='edit'
    }
    return this.http
      .post(
        this.retiralsBaseurl+ '/'+endpoint+'',
        body,
        this.reqOptions
      )
  }

  getWithdrawalList(){
    return this.http
    .get(
      this.retiralsBaseurl + '/list',
      this.reqOptions
    )
  }

  getInstallmentType(mode,withdrawlCode, appliedDate, appliedAmount){
    return this.http
    .get(
      this.retiralsBaseurl +
       '/installments?mode='+
       mode +
       '&withdrawlCode='+
       withdrawlCode +
       '&appliedDate=' + 
       appliedDate +
       '&appliedAmount=' +
       appliedAmount,
      this.reqOptions
    )
  }

  getWithdrawalPDF(inwardNo, withdrawalCode, applyDate, maxNo){
    let headers =  new HttpHeaders({
      'Content-Type': 'application/json',
      userId: Config.userId
    })
  return this.http
    .get(
      this.retiralsBaseurl + 
      '/pdf?inwardNo=' +
      inwardNo +
      '&withdrawalCode='+
      withdrawalCode +
      '&applyDate='+
      applyDate +
      '&maxNo=' +
      maxNo,
      {
        headers: headers,
        responseType: 'blob'
      }
      )

  }


  deleteWithdrawal(payload){
    let body = JSON.stringify(payload);
    return this.http
      .post(
        this.retiralsBaseurl + '/delete',
        body,
        this.reqOptions
      )

  }
  getWithdrawalDetail(data){
    return this.http
    .get(
      this.retiralsBaseurl + '/detail?withdrawalCode='+data.withdrawalCode+'&maxNo='+data.maxNo+'&imMode=&applyDate='+data.applyDate+'',
      this.reqOptions
    )
  }
}
