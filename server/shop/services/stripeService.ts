import { Request, Response } from 'express';
import { Stripe } from 'stripe';
import { sendEmail } from './emailService';
import {
  PaymentRequestInterface,
  ProductCarritoInterface,
} from '../model-interfaces';

const stripeSecretKey = process.env['STRIPE_SECRET_KEY'];

if (!stripeSecretKey) {
  throw new Error('La variable de entorno STRIPE_SECRET_KEY no está definida.');
}

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'] as string);
//const SUCCESS_STATE = 'requires_payment_method';
const SUCCESS_STATE = 'succeeded';

export async function payStripe(req: Request, res: Response): Promise<void> {
  try {
    const orderId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const {
      directionShipping,
      productos,
      shippingCost,
    }: PaymentRequestInterface = req.body;

    if (!directionShipping || !productos || !productos.length) {
      res
        .status(400)
        .json({ error: 'Faltan datos requeridos en la solicitud.' });
      return;
    }

    const amount = calcularTotal(productos, shippingCost);
    console.log('total:', amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'EUR',
      description: `Compra de ${productos.length} productos`,
      metadata: {
        productos: JSON.stringify(productos),
        shippingCost,
        directionShipping: JSON.stringify(directionShipping),
        orderId,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error al procesar el pago con Stripe:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error inesperado al procesar el pago.';
    res.status(500).json({ error: errorMessage });
  }
}

export async function handleStripeWebhook(
  req: Request,
  res: Response,
): Promise<void> {
  console.log('hook response start stripe');
  const stripeSignature = req.headers['stripe-signature'];
  if (!stripeSignature) {
    res.status(400).json({ error: 'Firma de Stripe faltante.' });
    return;
  }
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      stripeSignature,
      process.env['STRIPE_WEBHOOK_SECRET']!,
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const productos = paymentIntent.metadata?.productos
        ? JSON.parse(paymentIntent.metadata.productos)
        : [];
      const directionShipping = paymentIntent.metadata?.directionShipping
        ? JSON.parse(paymentIntent.metadata.directionShipping)
        : null;

      if (productos.length && directionShipping) {
        console.log('Pago confirmado, enviando Email:');

        await sendEmail({
          directionShipping,
          invoiceNumber: paymentIntent.metadata.orderId,
          productos,
        });

        console.log('Correo enviado exitosamente a', directionShipping.email);
      }
    }

    res.status(200).json({ message: 'Webhook recibido correctamente.' });
  } catch (error) {
    console.error('Error en el webhook de Stripe:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error inesperado al procesar el webhook.';
    res.status(500).json({ error: errorMessage });
  }
}

export const calcularTotal = (
  productos: ProductCarritoInterface[],
  shippingCost: number,
): number => {
  const totalProductos = productos.reduce(
    (acc, producto) =>
      acc + producto.tipoSeleccionado.price * producto.cantidad,
    0,
  );

  return (totalProductos + shippingCost) * 100; // En céntimos para Stripe
};

