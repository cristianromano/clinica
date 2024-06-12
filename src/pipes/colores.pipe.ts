import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colores',
  standalone: true,
})
export class ColoresPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'table-success' : 'table-danger';
  }
}
