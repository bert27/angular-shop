import { Request, Response } from 'express';
import { Monei } from '@monei-js/node-sdk';
import { sendEmail } from './emailService';
import { PaymentRequestInterface, ProductCarritoInterface } from '../model-interfaces';

const moneiApiKey = process.env['MONEI_API_KEY'];

if (!moneiApiKey) {
  throw new Error('La variable de entorno MONEI_API_KEY no está definida.');
}

const monei = new Monei(moneiApiKey);
const serverPublicUrl: string = process.env['SERVER_PUBLIC_URL'] || '';
const clientPublicUrl: string = process.env['CLIENT_BASE_URL'] || '';

export async function payMonei(req: Request, res: Response): Promise<void> {
  try {
    const orderId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const { directionShipping, productos, modeHtml, shippingCost }: PaymentRequestInterface = req.body;

    if (!directionShipping || !productos || !productos.length) {
      res.status(400).json({ error: 'Faltan datos requeridos en la solicitud.' });
      return;
    }

    const amount = calcularTotal(productos, shippingCost);
    const htmlExtension = modeHtml ? '.html' : '';

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
      callbackUrl: `${serverPublicUrl}/sendEmail`,
      completeUrl: `${clientPublicUrl}/checkout/success${htmlExtension}?orderId=${orderId}`,
      cancelUrl: `${clientPublicUrl}/checkout/cancel${htmlExtension}`,
      failUrl: `${clientPublicUrl}/checkout/error${htmlExtension}`,
    });

    if (payment.nextAction && payment.nextAction.redirectUrl) {
      res.json({ redirectUrl: payment.nextAction.redirectUrl });
    } else {
      res.status(500).json({ error: 'No se pudo obtener la URL de redirección del pago.' });
    }
  } catch (error) {
    console.error('Error al procesar el pago2:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error inesperado al procesar el pago.';
    res.status(500).json({ error: errorMessage });
  }
}

export const calcularTotal = (productos: ProductCarritoInterface[], shippingCost: number): number => {
  const totalProductosCents = productos.reduce(
    (acc, producto) => acc + Math.round(producto.tipoSeleccionado.price * 100) * producto.cantidad,
    0,
  );

  const shippingCostCents = Math.round(shippingCost * 100);
  const totalCents = totalProductosCents + shippingCostCents;

  return totalCents;
};

export async function sendEmailFromMoney(req: Request, res: Response): Promise<void> {
  try {
    const signature = req.headers['monei-signature'] as string;

    if (!signature) {
      console.error('Monei signature header missing');
      res.status(401).json({ error: 'Firma de MONEI faltante.' });
      return;
    }

    // Verify signature using the raw body captured in server.ts
    try {
      const rawBody = (req as any).rawBody;
      if (!rawBody) {
        throw new Error('Raw body not captured. Check server.js middleware.');
      }
      monei.verifySignature(rawBody.toString(), signature);
    } catch (err) {
      console.error('Monei signature verification failed:', (err as Error).message);
      res.status(401).json({ error: 'Firma de MONEI inválida.' });
      return;
    }

    const paymentData = req.body;
    const productos = paymentData.metadata?.productos ? JSON.parse(paymentData.metadata.productos) : [];

    if (!Array.isArray(productos)) {
      res.status(400).json({ error: 'Productos no definidos o en formato incorrecto.' });
      return;
    }

    const directionShipping = paymentData.metadata?.directionShipping ? JSON.parse(paymentData.metadata.directionShipping) : null;

    if (paymentData.status === 'SUCCEEDED') {
      await sendEmail({
        directionShipping,
        invoiceNumber: paymentData.orderId,
        productos,
      });
    } else {
      console.warn('Estado del pago no exitoso:', paymentData.status);
    }

    res.status(200).json({ message: 'Webhook procesado y verificado.' });
  } catch (error) {
    console.error('Error en el webhook de Monei:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error inesperado.';
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
