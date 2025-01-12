import React from 'react';
import { directionShippingInterface, ProductCarritoInterface } from '../model-interfaces';
import { formatPrice } from '../services/moneiService';
import { calcularTotal } from '../services/stripeService';

interface InvoiceTemplateProps {
  directionShipping: directionShippingInterface;
  invoiceNumber: string;
  productos: ProductCarritoInterface[];
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ directionShipping, invoiceNumber, productos }) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${currentDate.getFullYear()}`;

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        lineHeight: '1.5',
        color: '#333',
        maxWidth: '600px',
        margin: 'auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="https://i.ibb.co/qYnJHMQ/logo.png" alt="Shop Logo" style={{ maxWidth: '200px', height: 'auto' }} />
      </div>
      <h1
        style={{
          textAlign: 'center',
          color: '#4CAF50',
          paddingBottom: '2px',
        }}
      >
        Número de factura: {invoiceNumber}
      </h1>
      <h1
        style={{
          textAlign: 'center',
          color: '#4CAF50',
          borderBottom: '2px solid #4CAF50',
          paddingBottom: '10px',
        }}
      >
        Fecha de emisión: {formattedDate}
      </h1>
      <p>
        Estimado/a{' '}
        <strong>
          {directionShipping.name} {directionShipping.surname}
        </strong>
        :
      </p>
      <p>Gracias por su compra, en Shop</p>
      <p>Le adjuntamos su factura</p>
      <h2 style={{ marginTop: '20px', fontSize: '18px', color: '#4CAF50' }}>Resumen de la Compra</h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '10px',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#f4f4f4',
              borderBottom: '2px solid #ddd',
            }}
          >
            <th style={{ textAlign: 'left', padding: '8px' }}>Producto</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>Cantidad</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>{producto.title}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{producto.cantidad}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{formatPrice(producto.tipoSeleccionado.price)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{ textAlign: 'right', padding: '8px' }}>
              <strong>Total</strong>
            </td>
            <td style={{ textAlign: 'right', padding: '8px' }}>
              <strong>{calcularTotal(productos, 100)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
      <footer
        style={{
          textAlign: 'center',
          marginTop: '20px',
          paddingTop: '10px',
          borderTop: '1px solid #ddd',
          color: '#666',
          fontSize: '12px',
        }}
      >
        Gracias por elegir Nuestra tienda.
      </footer>
    </div>
  );
};

export default InvoiceTemplate;
