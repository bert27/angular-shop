import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Option {
  tipo: string;
  price: number;
}

@Component({
  selector: 'custom-dropdown-material',
  standalone: true,
  templateUrl: './custom-dropdown-material.component.html',
  styleUrls: ['./custom-dropdown-material.component.scss'],
  imports: [CommonModule, MatSelectModule, FormsModule],
})
export class CustomDropdownMaterialComponent {
  @Input() options: Option[] = [];
  @Input() selectedOption: Option | null = this.options[0];
  @Output() selectedOptionChange = new EventEmitter<Option | null>();

  selectOption(option: Option) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption);
  }
}
