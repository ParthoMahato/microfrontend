import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doubleDecimal'
})
export class DecimalPipe implements PipeTransform {
  transform(value: number) {
    return value.toFixed(2);
  }
}
