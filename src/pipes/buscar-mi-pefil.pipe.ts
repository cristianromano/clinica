import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarMiPefil',
  standalone: true,
})
export class BuscarMiPefilPipe implements PipeTransform {
  transform(value: any[], search: string): any[] {
    if (!value || !search) {
      return value;
    }
    let filteredItems: any[] = [];
    let searchLower = search.toLowerCase();

    value.forEach((elemento) => {
      if (
        elemento.historial.altura.toString().toLowerCase().includes(searchLower)
      ) {
        filteredItems.push(elemento);
      } else if (
        elemento.historial.peso.toString().toLowerCase().includes(searchLower)
      ) {
        filteredItems.push(elemento);
      } else if (
        elemento.historial.presion
          .toString()
          .toLowerCase()
          .includes(searchLower)
      ) {
        filteredItems.push(elemento);
      } else if (
        elemento.historial.temperatura
          .toString()
          .toLowerCase()
          .includes(searchLower)
      ) {
        filteredItems.push(elemento);
      } else if (
        elemento.especialidad !== undefined &&
        elemento.especialidad.toString().toLowerCase().includes(searchLower)
      ) {
        filteredItems.push(elemento);
      }
      else if (
        elemento.paciente !== undefined &&
        elemento.paciente.toString().toLowerCase().includes(searchLower)
      ) {
        filteredItems.push(elemento);
      }
    });

    if (filteredItems.length === 0) {
      return value;
    }
    return filteredItems;
  }
}
