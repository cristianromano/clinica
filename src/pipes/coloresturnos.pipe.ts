import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coloresturnos',
  standalone: true,
})
export class ColoresturnosPipe implements PipeTransform {
  transform(estado: string): string {
    switch (estado) {
      case 'abierto':
        return 'table-success';
      case 'cancelado':
        return 'table-danger';
      case 'realizado':
        return 'table-primary';
      default:
        return 'table-light';
    }
  }
}
