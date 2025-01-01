import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { BotonComponent } from '../custom-button/custom-button.component';

@Component({
  selector: 'custom-quantity-selector',
  standalone: true,
  imports: [CommonModule, CustomInputComponent, BotonComponent],
  templateUrl: './custom-quantity-selector.component.html',
  styleUrls: ['./custom-quantity-selector.component.sass'],
})
export class CustomQuantitySelectorComponent {
  @Input() value = 1;
  @Output() valueChange = new EventEmitter<number>();

  increment(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.value++;
    this.valueChange.emit(this.value);
  }

  decrement(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.value > 1) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }

  onInputChange(newValue: number): void {
    this.value = newValue >= 1 ? newValue : 1;
    this.valueChange.emit(this.value);
  }
}
