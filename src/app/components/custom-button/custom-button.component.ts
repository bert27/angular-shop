import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'custom-button',
  standalone: true,

  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  imports: [CommonModule],
})
export class BotonComponent {
  @Input() texto = 'Botón';
  @Input() tipo: 'primario' | 'secundario' = 'primario';
  @Input() disabled = false;
  @Input() type?: 'button' | 'submit' | 'reset';
}
