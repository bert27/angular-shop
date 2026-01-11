import { directory } from './data';
import { IProductData } from '@models/product.interface';

export const productsData = [
  {
    title: 'Iphone 16 Pro Max',
    description: 'Smartphone 5G con cámara revolucionaria y autonomía extendida.',
    stock: true,
    imageUrl: `${directory}/images-products/iphone16promax.jpg`,
    category: 'Tecnología',
    options: [
      {
        price: 5,
        tipo: '128Gb',
      },
      {
        price: 1549,
        tipo: '256Gb',
      },
      {
        price: 1749,
        tipo: '512Gb',
      },
    ],
  },
  {
    title: 'Apple Watch Series 9',
    description: 'Monitorización avanzada de la salud con sensores de precisión y pantalla siempre activa.',
    stock: true,
    imageUrl: `${directory}/images-products/apple-watch.png`,
    category: 'Wearables',
    options: [
      {
        price: 499,
        tipo: '41mm GPS',
      },
      {
        price: 549,
        tipo: '45mm GPS + Cellular',
      },
    ],
  },
  {
    title: 'MacBook Pro 14"',
    description: 'Laptop con chip M2 Pro, diseño ligero y rendimiento profesional.',
    stock: true,
    imageUrl: `${directory}/images-products/macbook.png`,
    category: 'Tecnología',
    options: [
      {
        price: 2199,
        tipo: '16GB RAM, 512GB',
      },
      {
        price: 2499,
        tipo: '32GB RAM, 1TB',
      },
    ],
  },
  {
    title: 'AirPods Pro 2',
    description: 'Auriculares con cancelación de ruido activa y audio espacial personalizado.',
    stock: true,
    imageUrl: `${directory}/images-products/airpodspro2.png`,
    category: 'Accesorios',
    options: [
      {
        price: 279,
        tipo: 'Con estuche MagSafe',
      },
    ],
  },
  {
    title: 'Mac Mini M4',
    description: 'Ordenador compacto con el avanzado chip M4, diseñado para alto rendimiento y eficiencia.',
    stock: true,
    imageUrl: `${directory}/images-products/mac-mini.jpg`,
    category: 'Tecnología',
    options: [
      {
        price: 799,
        tipo: '256Gb',
      },
      {
        price: 999,
        tipo: '512Gb',
      },
      {
        price: 1299,
        tipo: '1Tb',
      },
    ],
  },
] as IProductData[];
