import express, { Request, Response, Router } from 'express';
import path from 'path';
import { renderEmailTemplate } from './services/emailService';
import { handlePDFResponse } from './services/generatePdfService';
import { payMonei, sendEmailFromMoney } from './services/moneiService';
import { handleStripeWebhook, payStripe } from './services/stripeService';

export const indexShop = (): Router => {
  const shopRouter = Router();

  const publicDir = path.resolve(__dirname, 'public');
  shopRouter.use('/public', express.static(publicDir));

  const productosMocked = [
    {
      id: 1,
      title: 'Producto A',
      cantidad: 2,
      tipoSeleccionado: { tipo: 'Tipo 1', price: 50.0 },
    },
    {
      id: 2,
      title: 'Producto B',
      cantidad: 1,
      tipoSeleccionado: { tipo: 'Tipo 2', price: 100.0 },
    },
  ];

  const directionShippingMocked = {
    name: 'John',
    surname: 'Doe',
    address: '123 Calle Principal',
    postalCode: '12345',
    country: 'España',
    province: 'Madrid',
    city: 'Madrid',
    phone: '123456789',
    email: 'john.doe@example.com',
  };

  // preview email
  shopRouter.get('/preview-email', async (req: Request, res: Response) => {
    try {
      const htmlContent = await renderEmailTemplate({
        directionShipping: directionShippingMocked,
        invoiceNumber: '12345',
        productos: productosMocked,
      });

      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(htmlContent);
    } catch (error) {
      console.error(
        'Error al renderizar la plantilla:',
        (error as Error).message,
      );
      res.status(500).send('Error al renderizar la plantilla.');
    }
  });

  shopRouter.post('/monei-payment', (req: Request, res: Response) => {
    payMonei(req, res);
  });

  shopRouter.post('/stripe-payment', (req: Request, res: Response) => {
    payStripe(req, res);
  });
  shopRouter.post(
    '/stripe/webhook',
    express.raw({ type: 'application/json' }),
    handleStripeWebhook,
  );

  shopRouter.post('/sendEmail', (req: Request, res: Response) => {
    console.log('SENDEMAIL LLAMADO');
    sendEmailFromMoney(req, res);
  });

  shopRouter.post('/download-pdf', (req: Request, res: Response) => {
    const { invoiceNumber } = req.body;

    if (!invoiceNumber) {
      res.status(400).send('El número de factura es requerido.');
      return;
    }

    handlePDFResponse(res, {
      invoiceNumber,
      directionShipping: directionShippingMocked,
      productos: productosMocked,
    });
  });

  return shopRouter;
};
