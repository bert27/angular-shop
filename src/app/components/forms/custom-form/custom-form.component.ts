import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.sass'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule]
})
export class CustomFormComponent {
  customForm: FormGroup;
  submitted = false;

  @Output() formCompleted = new EventEmitter<boolean>(); // Emite cuando el formulario se completa

  constructor(private formBuilder: FormBuilder) {
    this.customForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['123 Calle Falsa, Ciudad Ejemplo', Validators.required],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,12}$/)]],
      postalCode: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.customForm.valid) {
      this.formCompleted.emit(true); // Emitir evento al padre
      console.log('Formulario enviado con éxito', this.customForm.value);
    } else {
      this.formCompleted.emit(false); // Emitir evento al padre
      console.log('Formulario inválido');
    }
  }
}
