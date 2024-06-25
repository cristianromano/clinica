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

    if (value.some((elemento) => 'nombre' in elemento)) {
      filteredItems = value.filter((item) => {
        return (
          item.nombre.toLowerCase().includes(searchLower) ||
          item.especialidad.toLowerCase().includes(searchLower)
        );
      });
    } else if (value.some((elemento) => 'medico' in elemento)) {
      filteredItems = value.filter((item) => {
        return (
          item.medico.toLowerCase().includes(searchLower) ||
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
