import express, { Request, Response, Router } from 'express';
import { handlePDFResponse } from './services/generatePdfService';
import { payMonei, sendEmailFromMoney } from './services/moneiService';
import { handleStripeWebhook, payStripe } from './services/stripeService';
import { directionShippingInterface, ProductCarritoInterface } from './model-interfaces';
import { renderEmailTemplate } from './services/emailService';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { payRedsys, sendEmailFromRedsys } from './services/redsysService';
import { selectedMethodPay } from '../../src/data/data';
import { directionShippingMocked, productosMocked } from './data-mock';

export const indexShop = (): Router => {
  const shopRouter = Router();

  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFile);
  const publicDir = resolve(currentDir, 'public');
  shopRouter.use('/public', express.static(publicDir));

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
      console.error('Error al renderizar la plantilla:', (error as Error).message);
      res.status(500).send('Error al renderizar la plantilla.');
    }
  });

  shopRouter.post('/monei-payment', (req: Request, res: Response) => {
    payMonei(req, res);
  });
  shopRouter.post('/redsys-payment', (req: Request, res: Response) => {
    payRedsys(req, res);
  });

  shopRouter.post('/stripe-payment', (req: Request, res: Response) => {
    payStripe(req, res);
  });
  shopRouter.post('/stripe/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

  shopRouter.post('/sendEmail', (req: Request, res: Response) => {
    if (selectedMethodPay === 'monei') {
      sendEmailFromMoney(req, res);
    } else {
      sendEmailFromRedsys(req, res);
    }
  });
  interface DownloadPdfBody {
    invoiceNumber: string;
    directionShipping: directionShippingInterface;
    productos: ProductCarritoInterface[];
  }
  shopRouter.post('/download-pdf', (req: Request<object, object, DownloadPdfBody>, res: Response) => {
    const { invoiceNumber, directionShipping, productos } = req.body;

    if (!invoiceNumber) {
      res.status(400).send('El número de factura es requerido.');
      return;
    }

    handlePDFResponse(res, {
      invoiceNumber,
      directionShipping,
      productos,
    });
  });

  return shopRouter;
};
