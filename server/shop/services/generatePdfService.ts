import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

import * as Express from 'express';
import {
  directionShippingInterface,
  ProductCarritoInterface,
} from '../model-interfaces';

/**
 * Helper function to add text to the PDF.
 * @param doc - The PDFDocument instance.
 * @param text - The text to add.
 * @param x - The x-coordinate for the text.
 * @param y - The y-coordinate for the text.
 * @param fontSize - The font size for the text.
 * @param bold - Whether the text should be bold.
 * @param options - Additional options for the text.
 */
function addText(
  doc: PDFKit.PDFDocument,
  text: string,
  x: number,
  y: number,
  fontSize: number = 12,
  bold: boolean = false,
  options: PDFKit.Mixins.TextOptions = {},
): void {
  const font = bold ? 'Helvetica-Bold' : 'Helvetica';
  doc.font(font).fontSize(fontSize).text(text, x, y, options);
}

/**
 * Populates the PDF document with the common content for both stream and file-based generation.
 * @param doc - The PDFDocument instance.
 * @param directionShipping - Shipping information.
 * @param invoiceNumber - Invoice number.
 * @param productos - List of products.
 */
function populatePDFContent(
  doc: PDFKit.PDFDocument,
  directionShipping: directionShippingInterface,
  invoiceNumber: string,
  productos: ProductCarritoInterface[],
): void {
  // Header: Title and Logo
  const logoUrl = 'public/logo.png';
  const logoSize = 50;

  addText(doc, 'Factura', 50, 50, 20, true); // Title on the left
  doc.image(logoUrl, 400, 35, { width: logoSize }); // Logo on the right

  // Invoice details and Billing address
  const currentDate = new Date();
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, '0')}/${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${currentDate.getFullYear()}`;

  addText(doc, 'Número de Factura:', 50, 100, 12, true, { continued: true });
  addText(doc, ` ${invoiceNumber}`, 50, 100, 12);

  addText(doc, 'Fecha de Factura:', 50, 115, 12, true, { continued: true });
  addText(doc, ` ${formattedDate}`, 50, 115, 12);

  addText(doc, 'Dirección de Facturación:', 400, 100, 12, true);
  addText(
    doc,
    `${directionShipping.name} ${directionShipping.surname}`,
    400,
    115,
    12,
  );
  addText(doc, `${directionShipping.address}`, 400, 130, 12);
  addText(
    doc,
    `${directionShipping.city}, ${directionShipping.province}`,
    400,
    145,
    12,
  );
  addText(
    doc,
    `${directionShipping.postalCode}, ${directionShipping.country}`,
    400,
    160,
    12,
  );
  addText(doc, `Teléfono: ${directionShipping.phone}`, 400, 175, 12);
  addText(doc, `Email: ${directionShipping.email}`, 400, 190, 12);

  // Products summary
  doc.moveDown(2);
  addText(doc, 'Productos:', 50, 220, 12, true);

  // Draw table header
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .text('Producto', 50, 240)
    .text('Cantidad', 250, 240)
    .text('Precio Unitario', 350, 240)
    .text('Subtotal', 450, 240);

  doc.moveTo(50, 255).lineTo(550, 255).stroke(); // Horizontal line

  let y = 260;
  let total = 0;

  productos.forEach((producto) => {
    const subtotal = producto.tipoSeleccionado.price * producto.cantidad;
    total += subtotal;

    // Draw table rows
    doc
      .font('Helvetica')
      .fontSize(10)
      .text(producto.title, 50, y)
      .text(producto.cantidad.toString(), 250, y)
      .text(`${producto.tipoSeleccionado.price.toFixed(2)} €`, 350, y)
      .text(`${subtotal.toFixed(2)} €`, 450, y);

    y += 20;
  });

  doc.moveTo(50, y).lineTo(550, y).stroke(); // Horizontal line below the table

  // Calculate IVA and Base Imponible
  const baseImponible = total / 1.21; // Calculate base excluding 21% VAT
  const iva = total - baseImponible; // Calculate VAT amount
  const precioTotalConIVA = total;

  // Display Total, Base Imponible, IVA, and Price including IVA
  addText(doc, `Total: ${total.toFixed(2)} €`, 450, y + 10, 12, true);
  addText(doc, `Base Imponible: ${baseImponible.toFixed(2)} €`, 50, y + 30, 12);
  addText(doc, `IVA (21%): ${iva.toFixed(2)} €`, 50, y + 50, 12);
  addText(
    doc,
    `Precio Total (inc. IVA): ${precioTotalConIVA.toFixed(2)} €`,
    50,
    y + 70,
    12,
    true,
  );
}

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
    // Generar el PDF como stream
    const pdfStream = generatePDFStream({
      directionShipping,
      invoiceNumber,
      productos,
    });

    // Configurar los encabezados para la respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Factura_${invoiceNumber}.pdf"`,
    );

    // Enviar el PDF directamente al cliente
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

    // Manejar si el cliente cierra la conexión antes de completar
    res.on('close', () => {
      console.log('Conexión cerrada por el cliente.');
      pdfStream.end(); // Liberar recursos
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

