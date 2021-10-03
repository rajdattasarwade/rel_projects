import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChoicePayComponentModel } from '../choicepay-root.model';
import { Subscription } from 'rxjs';
import { ChoicepayRootService } from '../choicepay-root.service';

@Component({
  selector: 'app-choice-pay',
  templateUrl: './choice-pay.component.html',
  styleUrls: ['./choice-pay.component.css'],
})
export class ChoicePayComponent implements OnInit, OnDestroy {
  @Input() effectiveDateMessage: string;
  @Input() effectiveDate: number;
  basicPay: ChoicePayComponentModel;
  basePay: ChoicePayComponentModel;
  choicePay: ChoicePayComponentModel;
  totalCtc: ChoicePayComponentModel;
  //rupeeSymbol: string = 'Rs. ';
  private subscription: Subscription;
  mandatoryDebits: ChoicePayComponentModel[];
  constructor(private service: ChoicepayRootService) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    console.log('Mandatory ngOnInit()');
    this.getBasicPay();
    this.getBasePay();
    this.getChoicePay();
    this.getTotalCtc();
  }
  getBasicPay() {
    let sub = this.service.basicPaySubject.subscribe((data) => {
      this.basicPay = data;
    });
    this.subscription.add(sub);
  }
  getBasePay() {
    let sub = this.service.basePaySubject.subscribe((data) => {
      this.basePay = data;
    });
    this.subscription.add(sub);
  }
  getChoicePay() {
    let sub = this.service.choicePaySubject.subscribe((data) => {
      this.choicePay = data;
    });
    this.subscription.add(sub);
  }
  getTotalCtc() {
    let sub = this.service.totalCtcSubject.subscribe((data) => {
      console.log("TCTC=>",data)
      this.totalCtc = data;
    });
    this.subscription.add(sub);
  }
}
