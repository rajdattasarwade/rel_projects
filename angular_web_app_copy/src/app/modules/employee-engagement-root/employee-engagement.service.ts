import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/app/components/core/config/config';
import { UserProfile } from './models/user-profile.model';
import { NewJoinee } from './models/new-joinee.model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class EmployeeEngagementService {
    menu_list = [
        {
            name:'allStreams',
            displayName: 'All Streams',
            icon: '',
            isVisible: true,
            count: '2',
            svgIcon:'allStream'
        },
        {
            name:'myGroup',
            displayName: 'My Group',
            icon: 'group',
            isVisible: true,
            count: '2',
            svgIcon:''
        },
        {
            name:'salesGroup',
            displayName: 'Sales Group',
            icon: '',
            isVisible: true,
            count: '7',
            svgIcon:'salesGroup'
        },
        {
            name:'tennis',
            displayName: 'Tennis',
            icon: 'sports_tennis',
            isVisible: true,
            count: '',
            svgIcon:''
        },
        {
            name:'marketingGroup',
            displayName: 'Marketing Group',
            icon: '',
            isVisible: true,
            count: '4',
            svgIcon: 'marketingGroup'
        },
        {
            name:'createGroup',
            displayName: 'Create Group',
            icon: 'group_add',
            isVisible: true,
            count: ''
        }
    ];
    
    private baseUrl: string = Config.baseUrl;
    private userProfileUrl = this.baseUrl + `user-info-service/${Config.apiVersion}/newUser/profile`;
    private newJoineeUrl = this.baseUrl + `new-joiner-service/${Config.apiVersion}/list`;
    private eventsBaseUrl = this.baseUrl + "birthday-wish-service/" + Config.apiVersion;
    constructor(private http: HttpClient, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
        this.iconRegistry.addSvgIcon(
            'allStream',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/emp_engagement_streams.svg'));
          this.iconRegistry.addSvgIcon(
            'salesGroup',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/emp_engagement_sales_grp.svg'));
          this.iconRegistry.addSvgIcon(
            'marketingGroup',
            this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/emp_engagement_marketing_grp.svg'));
     }

    getNewJoinees(): Observable<any> {
        const httpHeader = this.getRequestHeaders();
        return this.http.get(this.newJoineeUrl, { headers: httpHeader }).map((res: NewJoinee) =>  res);
    }

    getUserProfile(): Observable<any> {
        const httpHeader = this.getRequestHeaders();
        return this.http.get(this.userProfileUrl, { headers: httpHeader }).map((res: UserProfile) =>  res);
    }

    getTodaysEventsManager(): Observable<any> {
        const httpHeader = this.getRequestHeaders();
        return this.http.get(this.eventsBaseUrl+"/list/common/manager",{ headers: httpHeader });
    }

    getTodaysEventsBU(): Observable<any> {
        const httpHeader = this.getRequestHeaders();
        return this.http.get(this.eventsBaseUrl+"/list/common/bu",{ headers: httpHeader });
    }
    getRequestHeaders() {
        return new HttpHeaders({
          userId: Config.userId.slice(1),
          'Content-Type': 'application/json'
        });
    }
}