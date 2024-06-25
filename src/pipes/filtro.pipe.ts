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
    let filteredItems = [];
    let searchLower = search.toLowerCase();

    if (value.includes('nombre')) {
      filteredItems = value.filter((item) => {
        return (
          item.nombre.toLowerCase().includes(searchLower) ||
          item.especialidad.toLowerCase().includes(searchLower)
        );
      });
    } else {
      filteredItems = value.filter((item) => {
        return (
          item.paciente.toLowerCase().includes(searchLower) ||
          item.especialidad.toLowerCase().includes(searchLower)
        );
      });
    }

    return filteredItems;
  }
}
