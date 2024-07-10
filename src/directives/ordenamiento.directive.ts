import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOrdenamiento]',
  standalone: true
})
export class OrdenamientoDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    // Agregar clases
    this.renderer.addClass(this.el.nativeElement, 'd-flex');
    this.renderer.addClass(this.el.nativeElement, 'justify-content-evenly');
    this.renderer.addClass(this.el.nativeElement, 'align-items-center');

    // Agregar estilos
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid black');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '5px');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f8d7da');
  }
}
