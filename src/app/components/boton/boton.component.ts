import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'custom-button',
  standalone: true,
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.sass'],
  imports: [CommonModule] // Agrega CommonModule aquí
})
export class BotonComponent {
  @Input() texto: string = 'Botón';  // Texto del botón
  @Input() tipo: 'primario' | 'secundario' = 'primario';  // Tipo de botón
  @Input() disabled: boolean = false; // Agrega la propiedad disabled
}
