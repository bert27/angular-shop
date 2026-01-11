import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BotonComponent } from '@components/custom-button/custom-button.component';
import { IconSvgComponent } from '@components/icon-svg/icon-svg.component';
import { CustomInputNumberComponent } from '@components/custom-input-number/custom-input-number.component';

@Component({
  selector: 'custom-quantity-selector',
  standalone: true,
  imports: [CustomInputNumberComponent, BotonComponent, IconSvgComponent],
  templateUrl: './custom-quantity-selector.component.html',
  styleUrls: ['./custom-quantity-selector.component.scss'],
})
export class CustomQuantitySelectorComponent {
  @Input() value = 1;
  @Output() valueChange = new EventEmitter<number>();

  @Input() deleteButton?: boolean;

  @Output() productDelete = new EventEmitter<void>();

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

  onDelete(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.productDelete.emit();
  }
}
