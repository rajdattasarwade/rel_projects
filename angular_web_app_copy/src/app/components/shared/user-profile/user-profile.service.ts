import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  // getUserProfileDetails(): Observable<any> {
  //   return this.httpClient.get('assets/PROFILE.json');
  // }

  getUserProfileDetails(): Observable<any> {
    return this.httpClient.get('assets/userprofile.json');
  }
}
