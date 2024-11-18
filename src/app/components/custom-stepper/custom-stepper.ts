import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { CustomFormComponent } from '../forms/custom-form/custom-form.component';
import { BotonComponent } from '../boton/boton.component';
import { ShoppingCartListComponent } from '../shopping-cart-list/shopping-cart-list';
import { CommonModule } from '@angular/common';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StripeFieldComponent } from '../stripe field/stripe-field.compoonent';

@Component({
  selector: 'custom-stepper',
  templateUrl: './custom-stepper.html',
  styleUrls: ['./custom-stepper.sass'],
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule, // Asegúrate de que MatStepperModule está importado
    ReactiveFormsModule,
    MatIconModule,
    CustomFormComponent,
    BotonComponent,
    ShoppingCartListComponent,
    CommonModule,
    StripeFieldComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Asegura que Angular reconozca elementos personalizados
})
export class StepperComponent {
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild(CustomFormComponent) customFormComponent!: CustomFormComponent;

  directionShipping: any = {}; // Variable para guardar los datos del formulario
  currentStepIndex: number = 0;
  currentStepIcon: string = 'home'; // Icono inicial

  constructor(private formBuilder: FormBuilder) {}

  pay() {
    // Método de pago implementado aquí
  }

  nextStep() {
    if (this.stepper) {
      switch (this.stepper.selectedIndex) {
        case 0:
          // Lógica para el paso 1: Dirección de Envío
          if (this.customFormComponent) {
            this.customFormComponent.onSubmit();
            if (this.customFormComponent.customForm.valid) {
              // Guarda los datos del formulario en 'directionShipping'
              this.directionShipping = {
                ...this.customFormComponent.customForm.value,
              };
            } else {
              console.error('El formulario no es válido.');
              return; // Detén el avance si el formulario no es válido
            }
          }
          break;

        case 1:
          // Lógica para el paso 2: Pago
          console.log('Preparando para el pago...');
          break;

        case 2:
          // Lógica para el paso 3: Factura
          console.log('Mostrando la factura...');
          break;

        default:
          console.error('Paso no reconocido.');
          return;
      }

      // Avanza al siguiente paso y actualiza el índice del paso actual
      this.stepper.next();
      this.updateStepIcon(this.stepper.selectedIndex); // Actualiza el ícono
    }
  }

  previousStep() {
    // Retrocede al paso anterior y actualiza el índice del paso actual
    if (this.stepper) {
      this.stepper.previous();
      this.updateStepIcon(this.stepper.selectedIndex); // Actualiza el ícono
    }
  }

  onStepChange(event: any): void {
    // Actualiza el índice del paso actual y el ícono cuando se cambia de paso con las bolas
    this.currentStepIndex = event.selectedIndex;
    this.updateStepIcon(event.selectedIndex);
  }

  updateStepIcon(stepIndex: number): void {
    // Actualiza el ícono según el paso actual
    switch (stepIndex) {
      case 0:
        this.currentStepIcon = 'home';
        break;
      case 1:
        this.currentStepIcon = 'credit_card';
        break;
      case 2:
        this.currentStepIcon = 'receipt';
        break;
      default:
        this.currentStepIcon = 'home';
        break;
    }
  }

  onFormCompleted(isValid: boolean): void {
    // Callback para manejar la finalización del formulario
    if (isValid && this.customFormComponent) {
      this.directionShipping = { ...this.customFormComponent.customForm.value };
    } else {
      console.error('El formulario no se completó correctamente.');
    }
  }
}
