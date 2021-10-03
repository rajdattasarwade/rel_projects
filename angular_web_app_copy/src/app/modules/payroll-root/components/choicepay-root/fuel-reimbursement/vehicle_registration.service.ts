import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Config } from 'src/app/components/core/config/config';

@Injectable()
export class VehicleRegService {
  private choicePayBaseURL =
    Config.baseUrl + "choicepay-selection-service/" + Config.apiVersion;

  private getRequestHeaders() {
    return new HttpHeaders({
      userId: Config.userId,
      "Content-Type": "application/json"
    });
  }

  constructor(private http: HttpClient) {}

  submitVehicleRegistration(vehicleRegObj, attachment) {
    const servicePath = this.choicePayBaseURL + "/vehicle/save";
    let formData: FormData = new FormData();
    let body = JSON.stringify(vehicleRegObj);
    formData.append("jsonString", body);

    if (attachment) {
      formData.append("files", attachment, attachment.name);
    }

    const header = new HttpHeaders({
      userId: Config.userId
    });
    return this.http
      .post(servicePath, formData, { headers: header })
      .map((res: any) => res);
  }

  getVehicleType() {
    return this.http.get(this.choicePayBaseURL + "/vehicle/type", {
      headers: this.getRequestHeaders()
    });
  }

  getEngineCap(subType: string) {
    return this.http.get(
      this.choicePayBaseURL +
        "/enginecapacity/type?subType=" +
        subType +
        "&vehicleType=VC",
      { headers: this.getRequestHeaders() }
    );
  }

  getSelfDeclarationForm(vehicleRegObj) {
    let body = JSON.stringify(vehicleRegObj);
    return this.http
      .post(this.choicePayBaseURL + "/vehicle/selfdeclarationform", body, {
        headers: this.getRequestHeaders(),
        responseType: "blob" as "json"
      })
      .map((res: any) => res);
  }
}
