import { ServerRoute, RenderMode } from '@angular/ssr';
import { generateProductRoutes, generateArticleRoutes } from './utils';

export const serverRoutes: Array<ServerRoute> = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },

  {
    path: 'productos',
    renderMode: RenderMode.Prerender,
  },

  {
    path: 'blog',
    renderMode: RenderMode.Prerender,
  },

  {
    path: 'metodo-envio',
    renderMode: RenderMode.Prerender,
  },

  {
    path: 'producto/:category/:title',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return generateProductRoutes('withCategory');
    },
  },
  {
    path: 'producto/:title',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return generateProductRoutes('withoutCategory');
    },
  },
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
