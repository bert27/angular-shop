import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'custom-button',
  standalone: true,

  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css'],
  imports: [],
})
export class BotonComponent {
  @Input() texto = 'Botón';
  @Input() tipo: 'primario' | 'secundario' = 'primario';
  @Input() disabled = false;
  @Input() type?: 'button' | 'submit' | 'reset';
  @Input() testId?: string;

  @Output() clicked = new EventEmitter<void>();

  onButtonClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
