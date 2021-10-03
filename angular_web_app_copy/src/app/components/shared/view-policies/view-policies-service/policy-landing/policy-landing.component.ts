import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { PolicyService } from '../policy.service';
@Component({
  selector: 'app-policy-landing',
  templateUrl: './policy-landing.component.html',
  styleUrls: ['./policy-landing.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PolicyLandingComponent implements OnInit {
  breadcrumbJson: any = [
    {
      label: 'Home',
      link: '/home',
    },
    {
      label: 'Policies',
      link: '/home/policies',
    },
  ];
  viewSearch: boolean = false;
  policyShow: boolean = false;
  generalGuideShow: boolean = false;
  policies = {
    policyIndex: false,
    generalGuidelines: false,
    compensationLinked: false,
    healthInsurance: false,
    learningAssistance: false,
    teamBuilding: false,
    lifestyleAssistance: false,
    workEnablers: false,
    ITPolicies: false,
    GIPolicies: false,
    internalControls: false,
    corporateServicesPolicies: false,
    otherPolicies: false,
    socialMediaGuideline: false,
  };
  public searchData: any[];
  searchResults: any[] = [];
  searchFormControl: FormControl;
  subscription: Subscription[] = [];
  searchSubscription: Subscription;
  data: any;
  availableTiles: any;
  singleTileData: any;
  policyTilesData: any;
  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.availableTiles = [];
    this.subscription.push(
      this.policyService.getTiles().subscribe((res) => {
        this.policyTilesData = res;
        this.policyService.getPolicyDetails().subscribe((res) => {
          this.policyService.policyData = res;
          this.data = res;
          for (let each of this.data) {
            if (this.policyTilesData[each['text']] != undefined) {
              this.availableTiles.push(this.policyTilesData[each['text']]);
            }
          }
        });
      })
    );
    this.searchFormControl = new FormControl();
    this.getSearchData();
    this.registerSearchSubscription();
  }
  registerSearchSubscription() {
    this.searchSubscription = this.searchFormControl.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((searchTerm: string) => {
        this.policyService.searchTerm = searchTerm;
        if (searchTerm && searchTerm.length > 2) {
          this.searchResults = this.searchData.filter(
            (item) =>
              item.fKey.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          );
        } else {
          this.searchResults = [];
        }
        this.policyService.searchResults = this.searchResults;
        this.viewSearch = true;
        searchTerm.length > 2
          ? (this.viewSearch = true)
          : (this.viewSearch = false);
      });
  }
  getSearchData() {
    this.searchFormControl.reset();
    this.searchData = [];
    this.searchResults = [];
    this.subscription.push(
      this.policyService.getSearchPolicyDetails().subscribe((data: any) => {
        this.searchData = data;
      })
    );
  }
  viewPolicy(strings, index) {
    this.policies[index] = !this.policies[index];
    for (let each of Object.keys(this.policies))
      each != index ? (this.policies[each] = false) : '';
    this.policyService.activePolicy = strings;
  }

  ngOnDestroy() {
    this.subscription.length > 0
      ? this.subscription.forEach((s) => s.unsubscribe())
      : '';
    this.searchSubscription ? this.searchSubscription.unsubscribe() : '';
  }
}
