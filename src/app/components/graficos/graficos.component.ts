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
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
interface TurnosEspecialidad {
  name: string;
  value: number;
}

interface TurnosDia {
  name: string;
  value: number;
}

interface turnoMedicoMes {
  name: string;
  value: number;
}

interface turnoMedicoDosSemanas {
  name: string;
  value: number;
}

interface usuariosLog {
  name: string;
  series: { name: string; value: number }[];
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
  public legendPositionBar: LegendPosition = LegendPosition.Below;
  showXAxis = true;
  showYAxis = true;

  showXAxisLabel = true;
  xAxisLabel = 'Medicos';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  xAxisLabelUser = 'Dias';
  yAxisLabelUser = 'Cantidad';
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  schemeType: ScaleType = ScaleType.Linear;
  xAxis: boolean = true;
  yAxis: boolean = true;
  legend: boolean = true;
  timeline: boolean = true;

  arrTurnosEspecialidad: TurnosEspecialidad[] = [];
  arrTurnosDia: TurnosDia[] = [];
  arrTurnosMedicoMes: turnoMedicoMes[] = [];
  arrTurnosMedicoDosSemanas: turnoMedicoDosSemanas[] = [];
  arrUsuariosLog: usuariosLog[] = [];
  constructor(
    private especialistaService: EspecialistaService,
    private authService: AuthService
  ) {
    Object.assign(this, { single: [...this.arrTurnosEspecialidad] });
  }

  ngOnInit(): void {
    this.pieChartTurnosEspecialidad();
    this.pieChartTurnosDia();
    this.barChartTurnosMedicoMes();
    this.barChartTurnosMedicoDosSemanasFinalizados();
    this.lineChartUsuariosLog();
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
    });
  }

  pieChartTurnosDia() {
    this.especialistaService.obtenerTurnosTotal().subscribe((data) => {
      this.single = [];
      let fecha: any;
      data.forEach((element: any) => {
        fecha = new Date(
          element.fechaPedido.seconds * 1000
        ).toLocaleDateString();

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
    });
  }

  barChartTurnosMedicoMes() {
    this.especialistaService.obtenerTurnosMedicoMes().subscribe((data) => {
      let single: { name: any }[] = [];

      data.forEach((element: any) => {
        single.push({
          name: element.medicoemail,
        });
      });

      single = single.reduce((acc: any, current: any) => {
        const x = acc.find((item: any) => item.name === current.name);
        if (x) {
          x.value += 1;
        } else {
          acc.push({ name: current.name, value: 1 });
        }
        return acc;
      }, []);
      this.arrTurnosMedicoMes = single as unknown as turnoMedicoMes[];
    });
  }

  barChartTurnosMedicoDosSemanasFinalizados() {
    this.especialistaService
      .obtenerTurnosMedicoDosSemanasFinalizados()
      .subscribe((data) => {
        let single: { name: any }[] = [];

        data.forEach((element: any) => {
          single.push({
            name: element.medicoemail,
          });
        });

        single = single.reduce((acc: any, current: any) => {
          const x = acc.find((item: any) => item.name === current.name);
          if (x) {
            x.value += 1;
          } else {
            acc.push({ name: current.name, value: 1 });
          }
          return acc;
        }, []);
        this.arrTurnosMedicoDosSemanas =
          single as unknown as turnoMedicoDosSemanas[];
      });
  }

  lineChartUsuariosLog() {
    this.especialistaService.obtenerLogUsuarios().subscribe((data) => {
      const single: {
        name: string;
        series: { name: string; value: number }[];
      }[] = [];

      data.forEach((element: any) => {
        const datePart = element.fecha.split(',')[0]; // Extrae solo la parte de la fecha
        const formattedDate = this.formatDate(datePart); // Convierte a formato ISO 8601

        const existingUser = single.find((user) => user.name === element.email);

        if (existingUser) {
          const existingDate = existingUser.series.find(
            (date) => date.name === formattedDate
          );

          if (existingDate) {
            existingDate.value += 1; // Incrementa el valor en 1
          } else {
            existingUser.series.push({ name: formattedDate, value: 1 });
          }
        } else {
          single.push({
            name: element.email,
            series: [{ name: formattedDate, value: 1 }],
          });
        }
      });

      single.forEach((user) => {
        user.series.sort((a, b) => this.compareDates(a.name, b.name));
      });

      // Ordena el array principal por la fecha mínima de cada serie
      single.sort((a, b) => {
        const minDateA = new Date(this.parseDate(a.series[0].name)).getTime();
        const minDateB = new Date(this.parseDate(b.series[0].name)).getTime();
        return minDateA - minDateB;
      });

      this.arrUsuariosLog = single as unknown as usuariosLog[];
      console.log(this.arrUsuariosLog);
    });
  }

  formatDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  }

  parseDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  compareDates(date1: string, date2: string): number {
    const d1 = new Date(this.parseDate(date1)).getTime();
    const d2 = new Date(this.parseDate(date2)).getTime();
    return d1 - d2;
  }

  descargarGrafico() {
    const chartContainer = document.getElementById('chart-container'); // ID del contenedor del gráfico
    // Guardar el fondo original

    if (!chartContainer) {
      return;
    }
    chartContainer.style.background = 'transparent';
    // Establecer un fondo transparente temporal

    html2canvas(chartContainer, { scale: 2 }).then((canvas) => {
      // Convertir canvas a imagen
      chartContainer.style.background = 'initial';
      const imgData = canvas.toDataURL('image/png');

      // Crear un enlace temporal para descargar la imagen

      // Configurar el documento PDF
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Agregar la imagen al documento PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Descargar el PDF
      pdf.save('chart.pdf');
      chartContainer.style.background = 'rgb(255,228,196)';
    });
  }

  descargarGrafico2() {
    const chartContainer = document.getElementById('chart-container-2'); // ID del contenedor del gráfico
    // Guardar el fondo original

    if (!chartContainer) {
      return;
    }
    chartContainer.style.background = 'transparent';
    // Establecer un fondo transparente temporal

    html2canvas(chartContainer, { scale: 2 }).then((canvas) => {
      // Convertir canvas a imagen
      chartContainer.style.background = 'initial';
      const imgData = canvas.toDataURL('image/png');

      // Crear un enlace temporal para descargar la imagen

      // Configurar el documento PDF
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Agregar la imagen al documento PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Descargar el PDF
      pdf.save('chart.pdf');
      chartContainer.style.background = 'rgb(255,228,196)';
    });
  }

  descargarGrafico3() {
    const chartContainer = document.getElementById('chart-container-3'); // ID del contenedor del gráfico
    // Guardar el fondo original

    if (!chartContainer) {
      return;
    }
    chartContainer.style.background = 'transparent';
    // Establecer un fondo transparente temporal

    html2canvas(chartContainer, { scale: 2 }).then((canvas) => {
      // Convertir canvas a imagen
      chartContainer.style.background = 'initial';
      const imgData = canvas.toDataURL('image/png');

      // Crear un enlace temporal para descargar la imagen

      // Configurar el documento PDF
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Agregar la imagen al documento PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Descargar el PDF
      pdf.save('chart.pdf');
      chartContainer.style.background = 'rgb(255,228,196)';
    });
  }

  descargarGrafico4() {
    const chartContainer = document.getElementById('chart-container-4'); // ID del contenedor del gráfico
    // Guardar el fondo original

    if (!chartContainer) {
      return;
    }
    chartContainer.style.background = 'transparent';
    // Establecer un fondo transparente temporal

    html2canvas(chartContainer, { scale: 2 }).then((canvas) => {
      // Convertir canvas a imagen
      chartContainer.style.background = 'initial';
      const imgData = canvas.toDataURL('image/png');

      // Crear un enlace temporal para descargar la imagen

      // Configurar el documento PDF
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Agregar la imagen al documento PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Descargar el PDF
      pdf.save('chart.pdf');
      chartContainer.style.background = 'rgb(255,228,196)';
    });
  }

  descargarGrafico5() {
    const chartContainer = document.getElementById('chart-container-5'); // ID del contenedor del gráfico
    // Guardar el fondo original

    if (!chartContainer) {
      return;
    }
    chartContainer.style.background = 'transparent';
    // Establecer un fondo transparente temporal

    html2canvas(chartContainer, { scale: 2 }).then((canvas) => {
      // Convertir canvas a imagen
      chartContainer.style.background = 'initial';
      const imgData = canvas.toDataURL('image/png');

      // Crear un enlace temporal para descargar la imagen

      // Configurar el documento PDF
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Agregar la imagen al documento PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Descargar el PDF
      pdf.save('chart.pdf');
      chartContainer.style.background = 'rgb(255,228,196)';
    });
  }
}
