import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChoicePayComponentModel } from '../choicepay-root.model';
import { ChoicepayRootService } from '../choicepay-root.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mandatory-debits',
  templateUrl: './mandatory-debits.component.html',
  styleUrls: ['./mandatory-debits.component.css'],
})
export class MandatoryDebitsComponent implements OnInit, OnDestroy {
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
    this.getMedatoryDebits();
  }
  getMedatoryDebits() {
    let sub = this.service.mandatoryDebitsSubject.subscribe((data) => {
      this.mandatoryDebits = data;
    });
    this.subscription.add(sub);
  }
  removeChoicePayComponent(item) {
    console.log('removeChoicePayComponent=>', item);
    this.service.removeFromMedatoryDebit(item.component);
  }
  bindAmount(item, event) {
    item.amount = Number(event.target['value']);
    this.checkInput(item);
  }
  checkInput(item: ChoicePayComponentModel) {
    console.log('error list=>', this.service.listOFInvalidItems);
    console.log('check...');
    if (
      item.amount &&
      Number(item.maxAmount - item.amount) >= 0 &&
      item.amount >= item.minAmount &&
      item.amount <= item.maxAmount
    ) {
      console.log('valid amount', item.amount);
      console.log('valid maxAmount', item.maxAmount);
      this.service.removeFromListOFInvalidItems(item);
    } else {
      console.log('INvalid');
      console.log('INvalid amount', item.amount);
      console.log('valid maxAmount', item.maxAmount);
      this.service.addToListOFInvalidItems(item);
    }
  }
}
