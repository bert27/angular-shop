import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';

export interface Option {
  tipo: string;
  price: number;
}

@Component({
  selector: 'custom-dropdown',
  standalone: true,
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css'],
  imports: [MatFormFieldModule, MatSelectModule, FormsModule],
})
export class CustomDropdownComponent {
  @Input() options: Option[] = [];
  @Input() selectedOption: Option | null = this.options[0];
  @Output() selectedOptionChange = new EventEmitter<Option | null>();

  selectOption(option: Option) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption);
  }
}
