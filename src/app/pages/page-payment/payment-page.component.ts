import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CustomFormComponent } from '../../components/forms/custom-form/custom-form.component';
import { CommonModule } from '@angular/common';
import { StepperComponent } from "../../components/custom-stepper/custom-stepper";

@Component({
  selector: 'app-payment-page',
  standalone: true,
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass'],
  imports: [FormsModule, CustomFormComponent, CommonModule, StepperComponent] // Agrega FormsModule aquí
 // Agrega FormsModule aquí
})
export class PaymentPageComponent {
  stripe: any;
  cardElement: any;
  formComplete = false; // Nueva variable para controlar el estado del formulario

  constructor(private router: Router) {
    // Inicializa Stripe
    this.initializeStripe();
  }

  async initializeStripe() {
    this.stripe = await loadStripe('TU_PUBLIC_KEY_DE_STRIPE'); // Reemplaza con tu clave pública de Stripe
  }

  async pay() {
    // Lógica para manejar el pago
    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      console.error('Error al procesar el pago:', error);
      // Manejo de errores
    } else {
      console.log('Método de pago creado:', paymentMethod);
      // Redirigir o mostrar un mensaje de éxito
    }
  }

  ngAfterViewInit() {
    // Crea un elemento de tarjeta de Stripe
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element'); // Monta el elemento en el div con id "card-element"
  }

  onFormComplete(completed: boolean) {
    this.formComplete = completed; // Actualiza el estado cuando se complete el formulario
  }
}
