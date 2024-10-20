import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe('tu_public_key_de_stripe'); // Reemplaza con tu clave pública de Stripe
  }

  async getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }
}
