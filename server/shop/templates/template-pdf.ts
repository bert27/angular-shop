import {
  directionShippingInterface,
  ProductCarritoInterface,
} from '../model-interfaces';
/**
 * Formatea un número para mostrarlo con separadores de miles y sin decimales si son .00.
 * @param value - Número a formatear.
 * @returns Número formateado como string.
 */
function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

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
export function populatePDFContent(
  doc: PDFKit.PDFDocument,
  directionShipping: directionShippingInterface,
  invoiceNumber: string,
  productos: ProductCarritoInterface[],
): void {
  // Header: Title and Logo
  const logoUrl = 'shop/public/logo.png';
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
  addText(doc, ` ${invoiceNumber}`, 70, 100, 12);

  addText(doc, 'Fecha de Factura:', 50, 115, 12, true, { continued: true });
  addText(doc, ` ${formattedDate}`, 70, 115, 12);

  addText(doc, 'Dirección de Facturación:', 400, 100, 12, true);

  addText(doc, directionShipping.name, 400, 120, 12);
  addText(doc, directionShipping.surname, 400, 135, 12);
  addText(doc, directionShipping.address, 400, 150, 12);
  addText(
    doc,
    `${directionShipping.city}, ${directionShipping.province}`,
    400,
    165,
    12,
  );
  addText(
    doc,
    `${directionShipping.postalCode}, ${directionShipping.country}`,
    400,
    180,
    12,
  );
  addText(doc, `Teléfono: ${directionShipping.phone}`, 400, 195, 12);
  addText(doc, `Email: ${directionShipping.email}`, 400, 210, 12);

  doc.moveDown(2);

  // Draw table header
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .text('Producto', 50, 250)
    .text('Cantidad', 250, 250)
    .text('Precio (Sin IVA)', 320, 250)
    .text('IVA (21%)', 420, 250)
    .text('Subtotal', 500, 250);

  doc.moveTo(50, 265).lineTo(550, 265).stroke();

  let y = 270;
  let total = 0;
  let totalIVA = 0;

  productos.forEach((producto, index) => {
    const subtotal = producto.tipoSeleccionado.price * producto.cantidad;
    const precioSinIVA = subtotal / 1.21;
    const iva = subtotal * 0.21;
    const tipo = producto.tipoSeleccionado.tipo;
    total += subtotal;
    totalIVA += iva;
    const isEvenRow = index % 2 === 0;
    const rowColor = isEvenRow ? '#d7d7d8' : '#ffffff';

    // Color rows
    doc.rect(50, y - 5, 500, 20).fill(rowColor);

    // Data
    doc
      .fill('#000000') // Restaura el color de texto negro
      .font('Helvetica')
      .fontSize(10)
      .text(`${producto.title} - ${tipo}`, 50, y)
      .text(producto.cantidad.toString(), 250, y)
      .text(`${formatNumber(precioSinIVA)} €`, 320, y)
      .text(`${formatNumber(iva)} €`, 420, y)
      .text(`${formatNumber(subtotal)} €`, 500, y);

    y += 20; // Incrementa la posición vertical para la siguiente fila
  });

  // Ajusta la posición del borde para alinearlo con la última fila
  const tableHeight = y - 245; // Altura total de la tabla

  // Dibuja el borde alrededor de la tabla
  doc
    .rect(50, 245, 500, tableHeight - 5) // Ajusta la altura restando el espacio extra
    .lineWidth(1)
    .stroke();

  doc
    .moveTo(50, y - 5)
    .lineTo(550, y - 5)
    .stroke(); // Línea horizontal justo debajo de la última fila

  const totalConIva = total;
  const ivaTotal = totalIVA;
  const precioTotalSinIVA = totalConIva / 1.21;

  addText(
    doc,
    `Total (Sin IVA): ${formatNumber(precioTotalSinIVA)} €`,
    400,
    y + 10,
    12,
    true,
  );
  addText(doc, `IVA (21%): ${formatNumber(ivaTotal)} €`, 400, y + 30, 12, true);
  addText(
    doc,
    `Precio Total (inc. IVA): ${formatNumber(totalConIva)} €`,
    400,
    y + 50,
    12,
    true,
  );
}
