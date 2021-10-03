import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IconsModel } from '../../../../components/common/common-models';
import { BenefitsService } from '../../services/benefits.service';
import { EsicEligibilityModel } from './esic-tab/esic.model';
import { PrmbEligibilityModel } from './prmb-tab/prmb.model';

@Component({
  selector: 'app-claims-insurances-root',
  templateUrl: './claims-insurances-root.component.html',
  styleUrls: ['./claims-insurances-root.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ClaimsInsurancesRootComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  breadcrumbJson: any = [
    {
      label: 'Benefits',
      link: '/benefits',
    },
    {
      label: 'Claims & Insurances',
      link: '/benefits/claims-insurances',
    },
  ];
  icons: any;
  selectedValue: any;
  prmbAvailable: boolean = false;
  esicAvailable: boolean = false;
  prmbElibibilityDetailObj: PrmbEligibilityModel = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rootService: BenefitsService
  ) {
    this.icons = [];
    this.icons.push(new IconsModel('clear', '', '', 'close'));
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getEsicEligibility();
    this.getPrmbEligibility();
    this.selectedValue = this.route.snapshot.queryParams['tab']
      ? this.route.snapshot.queryParams['tab']
      : 0;
  }

  actionEvent(event) {
    if (event == 'close') {
      this.router.navigate(['/benefits']);
    }
  }
  getPrmbEligibility() {
    var sub = this.rootService.getPrmbEligibilityAPI().subscribe(
      (data: PrmbEligibilityModel) => {
        console.log('getEligibility... ', data);
        this.prmbElibibilityDetailObj = data;
        if (data.eligibiltyFlag) {
          this.prmbAvailable = true;
        } else {
          this.prmbAvailable = false;
        }
      },
      (error) => {
        console.error('Error in getEpancard...', error);
      }
    );
    this.subscription.add(sub);
  }
  getEsicEligibility() {
    var sub = this.rootService.getEsicEligibilityAPI().subscribe(
      (data: EsicEligibilityModel) => {
        console.log('getEsicEligibility... ', data);
        if (data.flag == 'Y') {
          this.prmbAvailable = true;
        } else {
          this.prmbAvailable = false;
        }
      },
      (error) => {
        console.error('Error in getEpancard...', error);
      }
    );
    this.subscription.add(sub);
  }
}
