import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertirfecha',
  standalone: true,
})
export class ConvertirfechaPipe implements PipeTransform {
  transform(value: any): Date | null {
    if (value) {
      return value.toDate();
    }
    return null;
  }
}
