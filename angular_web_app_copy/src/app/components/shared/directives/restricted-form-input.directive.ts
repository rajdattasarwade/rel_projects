import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { FormControl, NgModel } from "@angular/forms";

@Directive({ selector: "[restrictedFormInput]", providers: [NgModel] })
export class RestrictedFormInputDirective {
  @Input() alphabetsOnly = false;
  @Input() alphaNumericOnly = false;
  @Input() alphaNumericDotOnly = false;
  @Input() numericOnly = false;
  @Input() decimalOnly = false;
  @Input() allowSpace = false;
  @Input() decimalPrecision = 2;
  @Input() formControl: FormControl;
  @Input() maxLength = 0;
  @HostListener("input", ["$event"]) input(event) {
    if (this.alphaNumericOnly) {
      const regex = this.allowSpace ? /[^a-zA-Z0-9 ]/g : /[^a-zA-Z0-9]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ""
      );
    } else if (this.alphaNumericDotOnly) {
      const regex = this.allowSpace ? /[^a-zA-Z0-9\. ]/g : /[^a-zA-Z0-9\.]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ""
      );
    } else if (this.alphabetsOnly) {
      const regex = this.allowSpace ? /[^a-zA-Z ]/g : /[^a-zA-Z]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ""
      );
    } else if (this.numericOnly) {
      const regex = this.allowSpace ? /[^0-9 ]/g : /[^0-9]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ""
      );
    } else if (this.decimalOnly) {
      const regex = /[^0-9.]/g;
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        regex,
        ""
      );
      let antecedantLength = this.el.nativeElement.value.indexOf(".");
      if (antecedantLength !== -1) {
        let returnValue = this.el.nativeElement.value;
        this.el.nativeElement.value = returnValue
          .toString()
          .slice(0, antecedantLength + this.decimalPrecision + 1);
      }
    }
    if (this.ngModel) {
      this.ngModel.update.emit(this.el.nativeElement.value);
    }
    if (this.formControl) {
      this.formControl.setValue(this.el.nativeElement.value);
      this.formControl.updateValueAndValidity();
    }
    if (this.maxLength > 0) {
      this.el.nativeElement.value = this.el.nativeElement.value
        .toString()
        .slice(0, this.maxLength);
      this.ngModel.update.emit(this.el.nativeElement.value);
    }
  }
  constructor(private el: ElementRef, private ngModel: NgModel) {}
}

