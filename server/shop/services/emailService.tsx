import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import InvoiceTemplate from "../templates/template";
import React from "react";
import fs from "fs";

import { generatePDF } from "./generatePdfService";
import {
  directionShippingInterface,
  ProductCarritoInterface,
} from "../model-interfaces";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env["GMAIL_USER"],
    pass: process.env["GMAIL_APP_PASSWORD"],
  },
});

/**
 * Renders the email template to HTML.
 * @param directionShipping - Shipping details of the recipient
 * @param invoiceNumber - Invoice number
 * @param productos - List of purchased products
 * @returns A promise with the rendered HTML as a string
 */
export async function renderEmailTemplate({
  directionShipping,
  invoiceNumber,
  productos,
}: {
  directionShipping: directionShippingInterface;
  invoiceNumber: string;
  productos: ProductCarritoInterface[];
}): Promise<string> {
  return await render(
    <InvoiceTemplate
      directionShipping={directionShipping}
      invoiceNumber={invoiceNumber}
      productos={productos}
    />,
  );
}

/**
 * Sends an email with a PDF attachment using Nodemailer.
 * @param directionShipping - Shipping details of the recipient
 * @param invoiceNumber - Invoice number
 * @param productos - List of purchased products
 */
export async function sendEmail({
  directionShipping,
  invoiceNumber,
  productos,
}: {
  directionShipping: directionShippingInterface;
  invoiceNumber: string;
  productos: ProductCarritoInterface[];
}): Promise<void> {
  try {
    // Render the email content as HTML
    const htmlContent = await renderEmailTemplate({
      directionShipping,
      invoiceNumber,
      productos,
    });

    // Generate the PDF for the invoice
    const pdfPath = generatePDF({
      directionShipping,
      invoiceNumber,
      productos,
    });

    // Configure email options
    const mailOptions = {
      from: `"Shop" <${process.env["GMAIL_USER"]}>`,
      to: directionShipping.email, // Recipient's email address
      bcc: process.env["GMAIL_USER"], // Blind carbon copy to the sender's email
      subject: `Invoice for your purchase - ${invoiceNumber}`, // Email subject
      html: htmlContent, // Rendered HTML content
      attachments: [
        {
          filename: `Invoice_${invoiceNumber}.pdf`, // Attachment filename
          path: pdfPath, // Path to the generated PDF
        },
      ],
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(
      `Email successfully sent to ${directionShipping.email}. ID: ${info.messageId}`,
    );

    // Delete the PDF after sending the email (optional)
    fs.unlinkSync(pdfPath);
  } catch (error) {
    console.error("Error sending the email:", (error as Error).message);
    throw error;
  }
}

