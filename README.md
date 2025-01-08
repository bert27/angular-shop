# Ng-shop

This project is an online store in Spanish created with Angular.
If you use stripe change the stripePublicKey in the client, everything else is in data.ts

**V1.2 Features:**

- Multiple payment gateways.
- Invoice delivery via email with React HTML templates.
- PDF generation attached with the company’s logo and VAT included.

### Components:

- Carousel with animations
- Forms for user inputs
- Shopping cart for managing products
- Button to download invoices in PDF format
- Responsive design for all devices

### Configuration:

- Data, and sections are configured in data.ts.
- Product configuration is located in products-data.ts, both in the data folder.
- In selectedMethodPay, you can use monei or stripe. This will automatically switch the payment method.

  ```export const dataWeb = {
  nameShop: 'Tecnología Avanzada',
  name: 'mike',
  email: 'soporte@tecnologiaavanzada.com',
  instagram: 'https://www.instagram.com',
  youtube: 'https://www.youtube.com',
  phone: '+34 900 123 456',
  address: 'Calle Innovación 42, 28001 Madrid, España',
  nif: 'A12345678',
  paymentIntentUrl:
   (selectedMethodPay as MethodPayInterface) === 'stripe'
     ? 'http://localhost:4000/stripe-payment'
     : 'http://localhost:4000/monei-payment',

  shippingCost: 9,
  logo: {
   mobile: `${directory}/images-logo/logo-head-mobile.png`,
   pc: `${directory}/images-logo/logo-head.png`,
   icon: `${directory}/icon.ico`,
  },
  colorBackground: 'white',
  colorText: 'black',
  ```

**Webhooks and External Communication:**

    -  The server includes an example .env file. For the webhooks to work, use ngrok or any other tool to expose your local server to the internet.
    -  If you deploy the server outside your local machine, this issue will not occur.
    -  External communication allows payment gateways to return the status of the order (successful or failed) to the server.
    -  Once the server receives the payment status, it sends a PDF invoice with a React HTML template.

## PC

<div style="display: flex; align-items: center; width: 100%;">
  <img src="public/screenshots/index_PC.png" alt="Home" style="width: 40%;">
  <img src="public/screenshots/products_PC.png" alt="Products" style="width: 40%;">
</div>

## SmartPhone

<div style="display: flex; align-items: center; width: 100%;">
  <img src="public/screenshots/index_MVL.png" alt="Home" style="width: 40%;">
  <img src="public/screenshots/products_MVL.png" alt="Products" style="width: 40%;">
</div>

---

### Other Characteristics

| **View template in server**                                                        | **PDF template in server**                        | **Cart**                           |
| ---------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------- |
| localhost:4000/preview-email<br>![Template](public/screenshots/template-email.png) | ![Template](public/screenshots/template-pdf.jpeg) | ![Cart](public/screenshots/1a.png) |

---

## Install

Navigate to the project and run:

npm run install:all

This will install both the server and the client dependencies.

## Start the web to get started

Run npm run start to start both the client and server. The client will run on http://localhost:3000/, and the server will run on http://localhost:4000/.

The application will automatically reload if you change any of the source files.

Alternatively, you can click on start-mac.sh (for macOS) or start-windows.bat (for Windows) to start the application.

---

## How to modify products

To modify the products, go to `src/data/products-data.ts`. This file contains an array of product objects exported as `productsData`. Each product has properties such as `title`, `description`, `stock`, `imageUrl`, `category`, and `options`. You can add or update products by modifying the objects in this file.

### Example

```javascript
export const cardProduct1 = {
  title: "Iphone 16 pro",
  description: "Smartphone 5G con Control de Cámara, grabación en 4K a 120 f/s con Dolby Vision.",
  stock: true,
  imageUrl: "images-products/1.jpg",
  options: [
    {
      price: 1219,
      tipo: "128Gb",
    },
    {
      price: 1540,
      tipo: "256Gb",
    },
    {
      price: 1800,
      tipo: "512Gb",
    },
  ],
};
```
