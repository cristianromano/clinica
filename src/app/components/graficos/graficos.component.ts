import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Color,
  LegendPosition,
  NgxChartsModule,
  ScaleType,
} from '@swimlane/ngx-charts';
import { NavbarComponent } from '../navbar/navbar.component';
import { EspecialistaService } from '../../../services/especialista.service';
import { AuthService } from '../../../services/auth.service';

interface TurnosEspecialidad {
  name: string;
  value: number;
}

interface TurnosDia {
  name: string;
  value: number;
}

interface turnoMedicoMes{
  name: string;
  value: number;

}

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NgxChartsModule],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css',
})
export class GraficosComponent implements OnInit {
  view: [number, number] = [700, 400];
  single: any[] = [];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  public legendPosition: LegendPosition = LegendPosition.Below;

  
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  arrTurnosEspecialidad: TurnosEspecialidad[] = [];
  arrTurnosDia: TurnosDia[] = [];

  constructor(
    private especialistaService: EspecialistaService,
    private authService: AuthService
  ) {
    Object.assign(this, { single: [...this.arrTurnosEspecialidad] });
  }

  ngOnInit(): void {
    this.pieChartTurnosEspecialidad();
    this.pieChartTurnosDia();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  pieChartTurnosEspecialidad() {
    this.especialistaService.obtenerTurnosTotal().subscribe((data) => {
      this.single = [];
      data.forEach((element: any) => {
        this.single.push({
          name: element.especialidad,
        });
      });

      this.single = this.single.reduce((acc: any, current: any) => {
        const x = acc.find((item: any) => item.name === current.name);
        if (x) {
          x.value += 1;
        } else {
          acc.push({ name: current.name, value: 1 });
        }
        return acc;
      }, []);
      this.arrTurnosEspecialidad = this.single;
      console.log(this.arrTurnosEspecialidad);
    });
  }

  pieChartTurnosDia() {
    this.especialistaService.obtenerTurnosTotal().subscribe((data) => {
      this.single = [];
      let fecha: any;
      data.forEach((element: any) => {
        fecha = new Date(element.fechaPedido.seconds * 1000).toLocaleDateString();
        console.log(fecha);
        console.log(fecha);
        this.single.push({
          name: fecha,
        });
      });

      this.single = this.single.reduce((acc: any, current: any) => {
        const x = acc.find((item: any) => item.name === current.name);
        if (x) {
          x.value += 1;
        } else {
          acc.push({ name: current.name, value: 1 });
        }
        return acc;
      }, []);
      this.arrTurnosDia = this.single;

      console.log(this.arrTurnosDia);
    });
  }


}
