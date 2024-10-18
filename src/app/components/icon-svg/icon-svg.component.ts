import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-icon-svg',
  templateUrl: './icon-svg.component.html',
  styleUrls: ['./icon-svg.component.sass'],
  standalone: true // Añadido para usarlo como componente standalone
})
export class IconSvgComponent {
  @Input() src: string = '' // Ruta del SVG
  @Input() color: string = '#f93527' // Color por defecto
  @Input() size: number = 24 // Tamaño por defecto
}
