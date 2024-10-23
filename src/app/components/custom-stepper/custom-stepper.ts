import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon'
import { CustomFormComponent } from "../forms/custom-form/custom-form.component";
import { BotonComponent } from "../boton/boton.component"; // Asegúrate de importar esto

@Component({
  selector: 'custom-stepper',
  templateUrl: './custom-stepper.html',
  styleUrls: ['./custom-stepper.sass'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatIconModule,
    CustomFormComponent,
    BotonComponent
  ],
})
export class StepperComponent {
pay() {
throw new Error('Method not implemented.');
}
onFormCompleted(isValid: boolean) {
  if (isValid) {
    this.direccionFormData = this.customFormComponent.customForm.value; // Guardar los datos del formulario
  }
}
  @ViewChild(CustomFormComponent) customFormComponent!: CustomFormComponent;
  direccionFormData: any = {}; // Para almacenar los datos del formulario de dirección
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.createFormGroup(), // Paso 1
        this.createFormGroup(), // Paso 2
      ]),
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  get formArray(): FormArray {
    return this.formGroup.get('formArray') as FormArray;
  }

  nextStep() {
    if (this.customFormComponent) {
      this.customFormComponent.onSubmit(); // Llamada al método para enviar el formulario
      if (this.customFormComponent.customForm.valid) {
        this.direccionFormData = this.customFormComponent.customForm.value; // Guardar los datos del formulario
      }
    }
  }
}
