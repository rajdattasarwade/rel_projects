import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatodate'})
export class FormatOdate implements PipeTransform {
  transform(value: string): string {
    let year = value.substr(0, 4);
    let month = value.substr(4, 2);
    let day = value.substr(6, 2);
    return year+"-"+month+"-"+day;
  }
}