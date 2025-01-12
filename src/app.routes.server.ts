import { ServerRoute, RenderMode } from '@angular/ssr';
import { generateProductRoutes, generateArticleRoutes } from './utils';

export const serverRoutes: Array<ServerRoute> = [
  // Página principal
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },

  // Página de productos
  {
    path: 'productos',
    renderMode: RenderMode.Prerender,
  },

  // Página del blog
  {
    path: 'blog',
    renderMode: RenderMode.Prerender,
  },

  // Método de envío
  {
    path: 'metodo-envio',
    renderMode: RenderMode.Prerender,
  },

  // Página de contenido de productos (dinámica)
  {
    path: 'producto/:title/:tipo',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return generateProductRoutes();
    },
  },

  // Página de contenido de artículos (dinámica)
  {
    path: 'articulo/:title',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return generateArticleRoutes();
    },
  },

  // Aviso legal
  {
    path: 'avisoLegal',
    renderMode: RenderMode.Prerender,
  },

  // Devoluciones y reembolsos
  {
    path: 'devolucionesyReembolso',
    renderMode: RenderMode.Prerender,
  },

  // Privacidad
  {
    path: 'privacidad',
    renderMode: RenderMode.Prerender,
  },

  // Términos y condiciones
  {
    path: 'terminosyCondiciones',
    renderMode: RenderMode.Prerender,
  },

  // Carrito de compras
  {
    path: 'carrito',
    renderMode: RenderMode.Server,
  },

  // Checkout
  {
    path: 'checkout',
    renderMode: RenderMode.Server,
  },
  {
    path: 'checkout/success',
    renderMode: RenderMode.Server,
  },
  {
    path: 'checkout/error',
    renderMode: RenderMode.Server,
  },

  // Rutas no definidas
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
