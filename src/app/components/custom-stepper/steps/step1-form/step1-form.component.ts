import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DirectionShippingInterface } from '../../../../../data/interfaces-model';

@Component({
  selector: 'app-step1-form',
  templateUrl: './step1-form.component.html',
  styleUrls: ['./step1-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class Step1Form {
  customForm: FormGroup;
  submitted = false;

  @Output() formCompleted =
    new EventEmitter<DirectionShippingInterface | null>();
  constructor(private formBuilder: FormBuilder) {
    this.customForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,12}$/)]],
      email: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.customForm.valid) {
      this.formCompleted.emit(
        this.customForm.value as DirectionShippingInterface
      );
    } else {
      this.formCompleted.emit(null);
      console.log('Formulario inválido');
    }
  }
}
