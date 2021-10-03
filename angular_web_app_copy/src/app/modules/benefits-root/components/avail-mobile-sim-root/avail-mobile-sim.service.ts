import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../../../components/core/config/config';
@Injectable()
export class AvailMobileSimService {

    private availSimBaseUrl = Config.baseUrl + 'availmobileconnection-service/'+ Config.apiVersion;
    public requestHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userId: Config.userId,
        }),
      };
      constructor(private http: HttpClient){}

    getOverviewConnectionList(){
        return this.http.get(this.availSimBaseUrl+'/details', this.requestHeader);
    }
    getMnpCircleList(){
        return this.http.get(this.availSimBaseUrl+'/mnp/circlelist', this.requestHeader);
    }
    submitMnpTransfer(reqObject: any, serialNo: string){
        return this.http.post(this.availSimBaseUrl+'/servicerequest/'+ serialNo, reqObject, this.requestHeader);
    }
    getAddService(serialNo) {
        return this.http.get(this.availSimBaseUrl+'/vasdetails?imSerialNo=' + serialNo, this.requestHeader);
    }
    getViewAttachment(serialNo) {
        const httpHeader = this.requestHeader.headers;
        return this.http.get(this.availSimBaseUrl + '/pdf?imSerialNo=' + serialNo, {headers: httpHeader ,responseType: "blob"});
    }
    getReasonsList(type) {
        return this.http.get(this.availSimBaseUrl+'/discontinue/reasons?flag=' + type, this.requestHeader);
    }
    putDiscontinueRequest(serialNo, data) {
        var body = JSON.stringify(data);
        return this.http.post(this.availSimBaseUrl + `/servicerequest/${serialNo}`,body, this.requestHeader);
    }
    postApplyRequest(data) {
        var body = JSON.stringify(data);
        return this.http.post(this.availSimBaseUrl+'/apply', body, this.requestHeader);
    }
    getIsdAndIrData(type: string) {
        return this.http.get(this.availSimBaseUrl+'/isd/ir/overview?reqType=' + type, this.requestHeader);
    }
    getDropDownList(filter: string) {
        return this.http.get(this.availSimBaseUrl+'/isd/ir/dropdown?reqType='+ filter, this.requestHeader);
    }
    postIsdIrRequest(data: any) {
        return this.http.post(this.availSimBaseUrl+'/isd/ir/save', data, this.requestHeader);
    }
    getAvailSim() {
        return this.http.get(this.availSimBaseUrl+'/serviceProviders', this.requestHeader);
    }
    postDeleteRequest(data) {
        var body = JSON.stringify(data);
        return this.http.post(this.availSimBaseUrl+'/delete', data, this.requestHeader);
    }
    getIsdValidity() {
        return this.http.get(this.availSimBaseUrl+'/check/isd/validity', this.requestHeader);
    }
}

