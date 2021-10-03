import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChoicePayComponentModel } from '../choicepay-root.model';
import { MatDialog } from '@angular/material/dialog';
import { VehicleDetailsModalComponent } from '../vehicle-details-modal/vehicle-details-modal.component';
import { Subscription } from 'rxjs';
import { ChoicepayRootService } from '../choicepay-root.service';
import { HraFormComponent } from '../hra-form/hra-form.component';

@Component({
  selector: 'app-choice-pay-elements',
  templateUrl: './choice-pay-elements.component.html',
  styleUrls: ['./choice-pay-elements.component.css'],
})
export class ChoicePayElementsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input() elementFlag: boolean;
  choicePayComponents: ChoicePayComponentModel[];
  residualChoicePay: ChoicePayComponentModel;
  mandatoryDebits: ChoicePayComponentModel[];
  isFormInvalid: boolean = false;
  constructor(private service: ChoicepayRootService, public dialog: MatDialog) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    console.log('ChoicePaySelectNonMandatory ngOnInit()');
    this.getChoicePayComponent();
    this.getResidualChoicePay();
    this.getHraSelectedStatus();
    this.getFuelSelectedStatus();
    this.getIsFormInvalidStatus();
  }
  getResidualChoicePay() {
    let sub = this.service.residualChoicePaySubject.subscribe((data) => {
      this.residualChoicePay = data;
      console.log('residualchoicePay', this.residualChoicePay);
    });
    this.subscription.add(sub);
  }
  getChoicePayComponent() {
    let sub = this.service.choicePaySelectedNonMandateComponentsSubject.subscribe(
      (data) => {
        this.choicePayComponents = data;
      }
    );
    this.subscription.add(sub);
  }
  openComponent(component) {
    const dialogRef = this.dialog.open(component, {
      width: '500px',
    });
  }
  removeChoicePayComponent(item) {
    console.log('removeChoicePayComponent=>', item);
    this.service.removeFromChoicePayComponents(item.component);
  }

  getHraSelectedStatus() {
    var sub = this.service.isHraSelectedSubject.subscribe((data) => {
      if (data) {
        this.openComponent(HraFormComponent);
      }
    });
    this.subscription.add(sub);
  }
  getIsFormInvalidStatus() {
    var sub = this.service.isFormInvalidSubject.subscribe((data: boolean) => {
      this.isFormInvalid = data;
    });
    this.subscription.add(sub);
  }

  getFuelSelectedStatus() {
    var sub = this.service.isFuelSelectedSubject.subscribe((data) => {
      if (data) {
        this.openComponent(VehicleDetailsModalComponent);
      }
    });
    this.subscription.add(sub);
  }
  checkInput(item: ChoicePayComponentModel, event) {
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
      this.service.updateResidualChoicePay();
    } else {
      console.log('INvalid');
      console.log('INvalid amount', item.amount);
      console.log('valid maxAmount', item.maxAmount);
      this.service.addToListOFInvalidItems(item);
    }
  }
  bindAmount(item, event) {
    // setTimeout(() => {
    //   this.checkInput(item, event);
    // }, 2000);
    item.amount = Number(event.target['value']);
    this.checkInput(item, event);
  }
  isNumberKey(event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }
  checkErrorInput(item: ChoicePayComponentModel): boolean {
    return item.amount == 0 || (item.message != '' && this.isFormInvalid);
  }
  checkValidInput(item): boolean {
    return item.amount > 0 && item.message == '' && this.isFormInvalid;
  }
}
