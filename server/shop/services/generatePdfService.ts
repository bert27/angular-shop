import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

import * as Express from 'express';
import {
  directionShippingInterface,
  ProductCarritoInterface,
} from '../model-interfaces';
import { populatePDFContent } from '../templates/template-pdf';

/**
 * Generates a PDF invoice and saves it in the `public` folder.
 * @param directionShipping - Shipping information.
 * @param invoiceNumber - Invoice number.
 * @param productos - List of products.
 * @returns The path to the generated PDF file.
 */
export function generatePDF({
  directionShipping,
  invoiceNumber,
  productos,
}: {
  directionShipping: directionShippingInterface;
  invoiceNumber: string;
  productos: ProductCarritoInterface[];
}): string {
  const doc = new PDFDocument({ margin: 50 });

  const outputDir = path.resolve('public');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  const filePath = path.join(outputDir, `Factura_${invoiceNumber}.pdf`);

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Populate the PDF content
  populatePDFContent(doc, directionShipping, invoiceNumber, productos);

  doc.end();
  return filePath;
}

/**
 * Generates a PDF invoice as a stream for direct response.
 * @param directionShipping - Shipping information.
 * @param invoiceNumber - Invoice number.
 * @param productos - List of products.
 * @returns A PDFDocument stream.
 */
export function generatePDFStream({
  directionShipping,
  invoiceNumber,
  productos,
}: {
  directionShipping: directionShippingInterface;
  invoiceNumber: string;
  productos: ProductCarritoInterface[];
}): PDFKit.PDFDocument {
  const doc = new PDFDocument({ margin: 50 });

  // Populate the PDF content
  populatePDFContent(doc, directionShipping, invoiceNumber, productos);
  // Finalizar el stream para garantizar que se complete correctamente
  doc.end();
  return doc;
}

/**
 * Handles the generation and response of a PDF invoice as a stream.
 * @param res - The Express response object.
 * @param invoiceNumber - Invoice number.
 * @param directionShipping - Shipping information.
 * @param productos - List of products.
 */
export function handlePDFResponse(
  res: Express.Response,
  {
    invoiceNumber,
    directionShipping,
    productos,
  }: {
    invoiceNumber: string;
    directionShipping: directionShippingInterface;
    productos: ProductCarritoInterface[];
  },
): void {
  try {
    const pdfStream = generatePDFStream({
      directionShipping,
      invoiceNumber,
      productos,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Factura_${invoiceNumber}.pdf"`,
    );

    pdfStream.pipe(res);

    pdfStream.on('error', (err) => {
      console.error('Error en el stream del PDF:', err.message);
      if (!res.headersSent) {
        res.status(500).send('Error al generar el PDF.');
      }
    });

    pdfStream.on('end', () => {
      console.log('PDF enviado correctamente.');
    });

    res.on('close', () => {
      console.log('Conexión cerrada por el cliente.');
      pdfStream.end();
    });
  } catch (error) {
    console.error(
      'Error al manejar la respuesta del PDF:',
      (error as Error).message,
    );
    if (!res.headersSent) {
      res.status(500).send('Error al manejar la respuesta del PDF.');
    }
  }
}

