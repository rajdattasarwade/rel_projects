import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validators, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appZipvalidator]',
  providers: [{provide: NG_VALIDATORS, useExisting:ZipvalidatorDirective, multi: true }]
})
export class ZipvalidatorDirective implements Validators {

  constructor() { }

  validate(control: AbstractControl){
    const elementValue = control.value;
    if(elementValue===null || elementValue===undefined || elementValue===''){
      return {'cus_required': "Field is required"};
    }
    const regval = new RegExp('^[0-9]{5}$');
    if(!regval.test(elementValue)){
      return {'cus_pattern': 'Zipcode value should be 5 digit number'};
    } 

    return null;
  }

}
