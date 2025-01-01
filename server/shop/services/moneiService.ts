import { Request, Response } from 'express';
import { Monei } from '@monei-js/node-sdk';
import { sendEmail } from './emailService';
import {
  PaymentRequestInterface,
  ProductCarritoInterface,
} from '../model-interfaces';

const moneiApiKey = process.env['MONEI_API_KEY'];

if (!moneiApiKey) {
  throw new Error('La variable de entorno MONEI_API_KEY no está definida.');
}

const monei = new Monei(moneiApiKey);

export async function payMonei(req: Request, res: Response): Promise<void> {
  try {
    const orderId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const {
      directionShipping,
      productos,
      modeHtml,
      shippingCost,
    }: PaymentRequestInterface = req.body;

    if (!directionShipping || !productos || !productos.length) {
      res
        .status(400)
        .json({ error: 'Faltan datos requeridos en la solicitud.' });
      return;
    }

    const amount = calcularTotal(productos, shippingCost);
    const htmlExtension = modeHtml ? '.html' : '';
    console.log('Working directory:', process.cwd());

    console.log('URL CALLBACK:', process.env.SERVER_PUBLIC_URL);
    const payment = await monei.payments.create({
      amount,
      currency: 'EUR',
      orderId,
      description: `Compra de ${productos.length} productos`,
      customer: {
        name: `${directionShipping.name} ${directionShipping.surname}`,
        email: directionShipping.email,
        phone: directionShipping.phone,
      },
      metadata: {
        productos: JSON.stringify(productos),
        shippingCost,
        directionShipping: JSON.stringify(directionShipping),
      },
      callbackUrl: `${process.env.SERVER_PUBLIC_URL}/sendEmail`,
      completeUrl: `${process.env.CLIENT_BASE_URL}/checkout/success${htmlExtension}?orderId=${orderId}`,
      cancelUrl: `${process.env.CLIENT_BASE_URL}/checkout/cancel${htmlExtension}`,
      failUrl: `${process.env.CLIENT_BASE_URL}/checkout/error${htmlExtension}`,
    });

    if (payment.nextAction && payment.nextAction.redirectUrl) {
      res.json({ redirectUrl: payment.nextAction.redirectUrl });
    } else {
      res
        .status(500)
        .json({ error: 'No se pudo obtener la URL de redirección del pago.' });
    }
  } catch (error) {
    console.error('Error al procesar el pago2:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error inesperado al procesar el pago.';
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

  return (totalProductos + shippingCost) * 100;
};

export async function sendEmailFromMoney(
  req: Request,
  res: Response,
): Promise<void> {
  console.log('hook response start monei');
  try {
    const signature = req.headers['monei-signature'];

    if (!signature) {
      res.status(400).json({ error: 'Firma de MONEI faltante.' });
      return;
    }

    const paymentData = req.body;
    const productos = paymentData.metadata?.productos
      ? JSON.parse(paymentData.metadata.productos)
      : [];

    if (!Array.isArray(productos)) {
      res
        .status(400)
        .json({ error: 'Productos no definidos o en formato incorrecto.' });
      return;
    } else {
      console.log('Productos leídos:', productos.length);
    }

    const directionShipping = paymentData.metadata?.directionShipping
      ? JSON.parse(paymentData.metadata.directionShipping)
      : null;

    if (paymentData.status === 'SUCCEEDED') {
      console.log('Pago confirmado, enviando Email:');

      await sendEmail({
        directionShipping,
        invoiceNumber: paymentData.orderId,
        productos,
      });

      console.log('Correo enviado exitosamente a', paymentData.customer.email);
    } else {
      console.warn('Estado del pago:', paymentData.status);
    }

    res.status(200).json({ message: 'Webhook recibido correctamente.' });
  } catch (error) {
    console.error('Error en el webhook:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error inesperado al procesar el webhook.';
    res.status(500).json({ error: errorMessage });
  }
}

export const formatPrice = (price: number): string => {
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);

  return formattedPrice;
};

