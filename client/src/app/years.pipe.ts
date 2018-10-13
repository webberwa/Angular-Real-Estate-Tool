import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'years'
})
export class YearsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value + ' years';
  }
}
