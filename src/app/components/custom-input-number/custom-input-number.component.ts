import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'custom-input-number',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './custom-input-number.component.html',
  styleUrls: ['./custom-input-number.component.css'],
})
export class CustomInputNumberComponent {
  @Input() label = 'Cantidad';
  @Input() placeholder = '';
  @Input() value = 1;
  @Input() typeVisual: 'material' | 'no-material' | 'html' = 'material';

  @Output() valueChange = new EventEmitter<number>();

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    let newValue = parseFloat(target.value);

    if (isNaN(newValue) || newValue < 1) {
      newValue = 1;
    }

    this.value = newValue;
    target.value = this.value.toString();
    this.valueChange.emit(this.value);
  }
}
