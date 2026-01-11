import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormBuilder, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'custom-input',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label: string = 'Campo';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = 'Este campo es obligatorio.';
  @Input() control!: FormControl; // Usa el operador `!` para evitar problemas de inicialización
  @Input() matcher!: ErrorStateMatcher;
  @Input() @HostBinding('attr.controlName') controlName!: string; // Vincula controlName al DOM

  value: any = '';
  isDisabled: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInputChange(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  get errorText(): string {
    if (this.control?.hasError('required')) {
      return this.errorMessage;
    }
    if (this.control?.hasError('email')) {
      return 'El formato del correo electrónico no es válido.';
    }
    if (this.control?.hasError('pattern')) {
      // Assuming pattern is primarily used for phone in this context or general formatting
      if (this.controlName === 'phone') {
         return 'El formato del teléfono no es válido (9-12 dígitos).';
      }
      return 'El formato ingresado no es válido.';
    }
    if (this.control?.hasError('minlength')) {
      const min = this.control.errors?.['minlength'].requiredLength;
      return `Mínimo ${min} caracteres.`;
    }
    return this.errorMessage;
  }
}
