import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BenefitsService } from 'src/app/modules/benefits-root/services/benefits.service';

@Component({
  selector: 'app-view-edit-dependent-landing',
  templateUrl: './view-edit-dependent-landing.component.html',
  styleUrls: ['./view-edit-dependent-landing.component.css'],
})
export class ViewEditDependentLandingComponent implements OnInit, OnDestroy {
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
    {
      label: 'Family Details',
      link: '/benefits/view-edit-dependent-list',
    },
    
  ];
  constructor(private rootService: BenefitsService) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.populateLookupdata();
  }
  populateLookupdata() {
    var sub = this.rootService.getLookupDataApi().subscribe((data: any) => {
      this.rootService.setLookupdata(data);
      console.log('loookup....>', this.rootService.getLookupdata);
    });
    this.subscription.add(sub);
  }
}
