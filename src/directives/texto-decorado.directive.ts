import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTextoDecorado]',
  standalone: true
})
export class TextoDecoradoDirective {
  @Input() fontSize: string = '16px'; // Default font size
  @Input() isBold: boolean = true; // Default to bold
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fontSize']) {
      this.renderer.setStyle(this.el.nativeElement, 'font-size', this.fontSize);
    }
    if (changes['isBold']) {
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', this.isBold ? 'bold' : 'normal');
    }
  }
  
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', this.fontSize);
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', this.isBold ? 'bold' : 'normal');
  }
}
