import { Component, Input } from '@angular/core';


@Component({
  selector: 'custom-button',
  standalone: true,

  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  imports: [],
})
export class BotonComponent {
  @Input() texto = 'Botón';
  @Input() tipo: 'primario' | 'secundario' = 'primario';
  @Input() disabled = false;
  @Input() type?: 'button' | 'submit' | 'reset';
}
