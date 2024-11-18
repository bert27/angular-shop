import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeElements,
} from '@stripe/stripe-js';
import { BotonComponent } from '../boton/boton.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-stripe-field',
  templateUrl: './stripe-field.component.html',
  styleUrls: ['./stripe-field.component.sass'],
  standalone: true,
  imports: [CommonModule, BotonComponent],
})
export class StripeFieldComponent implements OnInit, OnDestroy {
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  public cardElement: StripeCardElement | null = null;
  public errorMessage: string | null = null; // Nueva propiedad para manejar mensajes de error

  @Output() errorOccurred = new EventEmitter<string>();
  @Output() ready = new EventEmitter<boolean>();
  @Output() previousStep = new EventEmitter<void>(); // Nueva salida para el paso anterior
  @Output() nextStep = new EventEmitter<void>(); // Nueva salida para el paso siguiente

  // Usa la clave pública de Stripe desde el environment
  private readonly publicKey: string = environment.stripePublicKey;

  constructor() {}

  ngOnInit(): void {
    this.initializeStripe();
  }

  ngOnDestroy(): void {
    if (this.cardElement) {
      this.cardElement.unmount();
    }
  }

  private async initializeStripe(): Promise<void> {
    if (!this.publicKey) {
      console.error('La clave pública de Stripe no está definida.');
      return;
    }

    try {
      this.stripe = await loadStripe(this.publicKey);
    } catch (error) {
      console.error('Error al cargar Stripe:', error);
      this.errorOccurred.emit('Error al cargar Stripe.');
      return;
    }

    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card');
      this.cardElement.mount('#card-element');
      this.ready.emit(true);
      this.addCardEventListeners();
    } else {
      console.error('No se pudo inicializar Stripe.');
      this.errorOccurred.emit('No se pudo inicializar Stripe.');
    }
  }

  private addCardEventListeners(): void {
    if (!this.cardElement) return;

    this.cardElement.on('change', (event) => {
      if (event.error) {
        this.errorMessage = event.error.message;
        this.errorOccurred.emit(event.error.message);
      } else {
        this.errorMessage = null;
        this.errorOccurred.emit('');
      }
    });
  }

  // Método para enviar datos al backend y crear un PaymentIntent
  async processPayment(): Promise<void> {
    try {
      const response = await fetch(
        'http://localhost:4000/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 100, // 100 céntimos = 1 euro
            currency: 'eur',
          }),
        }
      );
      const paymentIntentResponse = await response.json();
      console.log('clientSecret recibido:', paymentIntentResponse.clientSecret);

      // Confirmar el pago en el cliente
      if (this.stripe && paymentIntentResponse.clientSecret) {
        const { error, paymentIntent } = await this.stripe.confirmCardPayment(
          paymentIntentResponse.clientSecret,
          {
            payment_method: {
              card: this.cardElement!,
            },
          }
        );

        if (error) {
          console.error('Error al confirmar el pago:', error.message);
          this.errorOccurred.emit(
            `Error al confirmar el pago: ${error.message}`
          );
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          console.log('Pago confirmado con éxito:', paymentIntent);
          // Aquí puedes manejar la lógica después de una confirmación exitosa
        }
      }
    } catch (error) {
      this.errorMessage = 'Error al enviar los datos al backend.';
      console.error('Error al procesar el pago:', error);
      this.errorOccurred.emit('Error al procesar el pago.');
    }
  }

  // Métodos para manejar la navegación en el mat-stepper
  goToPreviousStep(): void {
    this.previousStep.emit();
  }

  goToNextStep(): void {
    this.nextStep.emit();
  }
}
