import { Request, Response } from 'express';
import { createRedsysAPI, CurrencyNum, SANDBOX_URLS, TransactionType } from 'redsys-easy';
import { sendEmail } from './emailService';
import { PaymentRequestInterface, ProductCarritoInterface } from '../model-interfaces';
import { DirectionShippingInterface } from '../../../src/data/interfaces-model';

// Clave secreta obtenida desde .env y convertida de Base64 a Buffer
const redsysSecretBase64 = process.env['REDSYS_SECRET_KEY'];
if (!redsysSecretBase64) {
  throw new Error('La variable de entorno REDSYS_SECRET_KEY no está definida.');
}

const redsysSecretBuffer = Buffer.from(redsysSecretBase64, 'base64');
if (redsysSecretBuffer.length !== 32) {
  throw new Error('La clave secreta de Redsys no tiene la longitud correcta. Debe ser de 32 bytes.');
}

const redsysSecret = redsysSecretBuffer.toString('utf8');

const { createRedirectForm, processRestNotification } = createRedsysAPI({
  secretKey: redsysSecret,
  urls: SANDBOX_URLS, // URLs del entorno de pruebas
});
const clientPublicUrl: string = process.env['CLIENT_BASE_URL'] || '';

/**
 * Función para iniciar el proceso de pago con Redsys.
 * Se genera un formulario HTML con los datos requeridos por Redsys,
 * que redirigirá al usuario a la página de pago.
 */
//4548810000000003 12/49 123
export async function payRedsys(req: Request, res: Response): Promise<void> {
  try {
    const orderId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const { directionShipping, productos, modeHtml, shippingCost }: PaymentRequestInterface = req.body;

    if (!directionShipping || !productos || !productos.length) {
      res.status(400).json({ error: 'Faltan datos requeridos en la solicitud.' });
      return;
    }

    // Calcula el total en céntimos
    const amountCents = calcularTotal(productos, shippingCost);
    const amountStr = Math.round(amountCents).toString().padStart(3, '0');

    const htmlExtension = modeHtml ? '.html' : '';
    const transactionType: TransactionType = '0';
    const currency: CurrencyNum = '978';

    // Crear metadata en formato JSON
    const metadata = {
      productos,
      shippingCost,
      directionShipping,
    };
    //      DS_MERCHANT_MERCHANTURL: `${serverPublicUrl}/sendEmail`,
    const merchantDataBase64 = Buffer.from(JSON.stringify(metadata)).toString('base64');

    const paymentData = {
      DS_MERCHANT_AMOUNT: amountStr,
      DS_MERCHANT_CURRENCY: currency,
      DS_MERCHANT_MERCHANTCODE: '999008881',
      DS_MERCHANT_ORDER: orderId.padStart(12, '0'),
      DS_MERCHANT_TERMINAL: '001',
      DS_MERCHANT_TRANSACTIONTYPE: transactionType,
      DS_MERCHANT_URLKO: `${clientPublicUrl}/checkout/error${htmlExtension}`,
      DS_MERCHANT_URLOK: `${clientPublicUrl}/checkout/success${htmlExtension}?orderId=${orderId}`,
      DS_MERCHANT_MERCHANTURL: `https://ba9e-37-15-138-11.ngrok-free.app/sendEmail`, // 🚀 Ahora apunta a la URL de ngrok
      DS_MERCHANT_MERCHANTDATA: merchantDataBase64, // 👈 Enviamos los datos en Base64
    };

    // Genera los datos de pago con Redsys
    const formHtml = createRedirectForm(paymentData);

    // Envía los datos al frontend para construir el formulario
    res.send(formHtml);
  } catch (error) {
    console.error('Error al procesar el pago con Redsys:', error);
    res.status(500).json({ error: 'Error inesperado al procesar el pago.' });
  }
}
/**
 * Calcula el total a pagar en céntimos, sumando el precio de los productos y el coste de envío.
 */
export const calcularTotal = (productos: ProductCarritoInterface[], shippingCost: number): number => {
  const totalProductosCents = productos.reduce(
    (acc, producto) => acc + Math.round(producto.tipoSeleccionado.price * 100) * producto.cantidad,
    0,
  );
  const shippingCostCents = Math.round(shippingCost * 100);
  return totalProductosCents + shippingCostCents;
};
interface MerchantDataInterface {
  pedido: string;
  productos: ProductCarritoInterface[];
  directionShipping: DirectionShippingInterface;
}

/**
 * Webhook de notificación de Redsys.
 * Se utiliza processRestNotification para decodificar la notificación recibida.
 */
export async function sendEmailFromRedsys(req: Request, res: Response): Promise<void> {
  //  console.log('🔍 Body recibido por Express:', req.body);

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error('El cuerpo de la notificación de Redsys está vacío.');
    }

    const decodedData = processRestNotification(req.body);
    //  console.log('✅ Datos decodificados:', decodedData);

    let merchantData: MerchantDataInterface | null = null;

    if (decodedData.Ds_MerchantData) {
      try {
        // 🔥 Decodificar Base64 y convertir a JSON
        const merchantDataJson = Buffer.from(decodedData.Ds_MerchantData, 'base64').toString('utf8');
        merchantData = JSON.parse(merchantDataJson) as MerchantDataInterface;
        //console.log('📦 Datos extra recibidos:', merchantData);
      } catch (error) {
        console.warn('⚠️ Error al decodificar Ds_MerchantData:', error);
      }
    }

    const responseCode = parseInt(decodedData.Ds_Response, 10);
    // 🔥 Si hemos recibido datos y el pago es exitoso, enviamos el email
    if (responseCode < 100 && merchantData) {
      const dataEmail = {
        directionShipping: merchantData.directionShipping,
        invoiceNumber: decodedData.Ds_Order,
        productos: merchantData.productos,
      };
      console.log('dataEmail', dataEmail);
      await sendEmail(dataEmail);
      console.log('📧 Email enviado con éxito.');
    } else {
      console.warn('❌ Pago fallido o datos no recibidos, no se enviará factura:', decodedData.Ds_Response);
    }

    res.status(200).json({ message: 'Notificación recibida correctamente.' });
  } catch (error) {
    console.error('🚨 Error en el webhook de Redsys:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error inesperado.' });
  }
}

/**
 * Función de ayuda para formatear precios.
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
};
