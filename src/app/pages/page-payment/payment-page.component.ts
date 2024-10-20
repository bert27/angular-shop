import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-payment-page',
  standalone: true,
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass'],
  imports: [FormsModule] // Agrega FormsModule aquí
})
export class PaymentPageComponent {
  stripe: any;
  cardElement: any;
  address: string = '123 Calle Falsa, Ciudad Ejemplo'; // Dirección por defecto

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
      console.log('Dirección:', this.address); // Muestra la dirección en consola
      // Redirigir o mostrar un mensaje de éxito
    }
  }

  ngAfterViewInit() {
    // Crea un elemento de tarjeta de Stripe
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element'); // Monta el elemento en el div con id "card-element"
  }
}
