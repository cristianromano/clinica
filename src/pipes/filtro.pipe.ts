import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  standalone: true,
})
export class FiltroPipe implements PipeTransform {
  transform(value: any[], search: string): any[] {
    if (!value || !search) {
      return value;
    }

    let searchLower = search.toLowerCase();

    let filteredItems = value.filter((item) => {
      return (
        item.nombre.toLowerCase().includes(searchLower) ||
        item.especialidad.toLowerCase().includes(searchLower)
      );
    });

    return filteredItems;
  }
}
