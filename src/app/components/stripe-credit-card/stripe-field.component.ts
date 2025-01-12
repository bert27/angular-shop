import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { BotonComponent } from '../custom-button/custom-button.component';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CarritoService, ProductCarritoInterface } from '../../../services/carrito.service';
import { DirectionShippingInterface } from '../../../data/interfaces-model';
import { dataWeb } from '../../../data/data';

@Component({
  selector: 'app-stripe-field',
  templateUrl: './stripe-field.component.html',
  styleUrls: ['./stripe-field.component.scss'],
  standalone: true,
  imports: [CommonModule, BotonComponent],
})
export class StripeFieldComponent implements OnInit, OnDestroy {
  @Input() directionShipping!: DirectionShippingInterface;

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  public cardElement: StripeCardElement | null = null;
  public errorMessage: string | null = null;

  @Output() errorOccurred = new EventEmitter<string>();
  @Output() ready = new EventEmitter<boolean>();
  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  private readonly publicKey: string = environment.stripePublicKey;

  productos: ProductCarritoInterface[] = [];

  constructor(
    private carritoService: CarritoService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.productos = this.carritoService.getProducts();
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

  async processPayment(): Promise<void> {
    try {
      const productsCompress = this.productos.map((producto) => ({
        title: producto.title,
        tipoSeleccionado: producto.tipoSeleccionado,
        cantidad: producto.cantidad,
      }));

      const response = await fetch(dataWeb.paymentIntentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          directionShipping: this.directionShipping,
          shippingCost: dataWeb.shippingCost,
          productos: productsCompress,
        }),
      });

      const paymentIntentResponse = await response.json();
      if (this.stripe && paymentIntentResponse.clientSecret) {
        const { error, paymentIntent } = await this.stripe.confirmCardPayment(paymentIntentResponse.clientSecret, {
          payment_method: {
            card: this.cardElement!,
          },
        });

        if (error) {
          console.error('Error al confirmar el pago:', error.message);
          this.errorOccurred.emit(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          this.nextStep.emit();
        }
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      this.errorOccurred.emit('Error al procesar el pago.');
    }
  }

  goToPreviousStep(): void {
    this.previousStep.emit();
  }

  goToNextStep(): void {
    this.nextStep.emit();
  }
}
