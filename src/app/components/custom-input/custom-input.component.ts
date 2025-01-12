import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'custom-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent {
  @Input() label = 'Cantidad';
  @Input() placeholder = '';
  @Input() value = 1;
  @Input() typeVisual: 'material' | 'no-material' = 'material';

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
