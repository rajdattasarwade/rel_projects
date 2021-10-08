import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Subject } from 'rxjs';

let newheaders = { 
  'Content-Type':  'application/json', 
  //'Authorization': 'Basic ' + btoa('P50002103:1q1q1q'),
  'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
  'Pragma': 'no-cache',
  'Expires': '0'
}

// const httpOptions = {
//   headers: new HttpHeaders()
//       .set('Content-Type', 'application/jpeg')
//       // .set('Authorization', 'Basic ' + btoa('P10053423:rr@123'))
//       //.set('Authorization', 'Basic ' + btoa('P37100256:rr@123'))
//       //.set('Authorization', 'Basic ' + btoa('P50002103:p0p0p0'))
//       .set('X-CSRF-Token' , 'fetch'),
//   observe: 'response' as 'body'
// };

const newHttpOptions  = {
  headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      //.set('Authorization', 'Basic ' + btoa('P10053423:rr@123'))
      //.set('Authorization', 'Basic ' + btoa('P37100256:rr@1234'))
      //.set('Authorization', 'Basic ' + btoa('P50002103:1q1q1q'))
      .set('X-CSRF-Token' , 'fetch'),
  observe: 'response' as 'body'
};

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {
  showDropVal: Subject<boolean> = new Subject<boolean>();
  showBackButton: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  getZ5Details(z5text):any {
    //return of(dataNew);
    return this.http.get("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/Z5DetailsSet(Z5='"+z5text+"')",newHttpOptions);
  }

  getJDDetails(z5text):any {
    return this.http.get("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/JDDetailsSet(ImZ5='"+z5text+"')",newHttpOptions);
  }   

  getPositionDetails(posText):any {
    return this.http.get("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/PosDetailsSet/?$filter=ImPos eq '"+posText+"'",newHttpOptions);
  }

  getZ5Download():any{
    return this.http.get("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/Z5DownloadSet",newHttpOptions);
  }

  getJDDownload():any{
    return this.http.get("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/JDDownloadSet",newHttpOptions);
  }

  getPositionsDownload():any{
    return this.http.get("/sap/opu/odata/sap/ZHR_Z5_POSITION_DETAILS_SRV/PosDetailsSet/?$filter=ImPos eq ''",newHttpOptions);
  }

  toggleDropdownVisibility(boolvalue){
    this.showDropVal.next(boolvalue);
  }

  toggleShowBackButton(boolvalue){
    this.showBackButton.next(boolvalue);
  }
}
