import { Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/page-principal/page-principal.component').then((m) => m.PagePrincipalComponent),
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/page-products/page-products.component').then((m) => m.ProductosComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-page/blog-page.component').then((m) => m.BlogPageComponent),
  },
  {
    path: 'metodo-envio',
    loadComponent: () =>
      import('./pages/pages-only-text/metodo-envio-page/metodo-envio-page.component').then((m) => m.MetodoEnvioPageComponent),
  },

  {
    path: 'producto/:category/:title',
    loadComponent: () =>
      import('./pages/page-content-product/page-content-product.component').then((m) => m.PageContentProductComponent),
    resolve: { product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => import('./pages/page-content-product/product.resolver').then((m) => m.productResolver(route, state)) },
    data: { type: 'product' },
  },
  {
    path: 'producto/:title',
    loadComponent: () =>
      import('./pages/page-content-product/page-content-product.component').then((m) => m.PageContentProductComponent),
    resolve: { product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => import('./pages/page-content-product/product.resolver').then((m) => m.productResolver(route, state)) },
    data: { type: 'product' },
  },
  {
    path: 'articulo/:title',
    loadComponent: () =>
      import('./pages/page-content-article/page-content-article.component').then((m) => m.PageContentArticleComponent),
    resolve: { article: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => import('./pages/page-content-article/article.resolver').then((m) => m.articleResolver(route, state)) },
    data: { type: 'article' },
  },

  {
    path: 'avisoLegal',
    loadComponent: () => import('./pages/pages-only-text/aviso-legal/aviso-legal-page.component').then((m) => m.AvisoLegalPageComponent),
  },
  {
    path: 'devolucionesyReembolso',
    loadComponent: () => import('./pages/pages-only-text/reembolso/reembolso-page.component').then((m) => m.ReembolsosPageComponent),
  },
  {
    path: 'privacidad',
    loadComponent: () => import('./pages/pages-only-text/privacidad/privacidad-page.component').then((m) => m.PrivacidadPageComponent),
  },
  {
    path: 'terminosyCondiciones',
    loadComponent: () => import('./pages/pages-only-text/terminos/terminos-page.component').then((m) => m.TerminosPageComponent),
  },

  {
    path: 'carrito',
    loadComponent: () => import('./pages/page-shopping-cart/page-shopping-cart.component').then((m) => m.PageShoppingCartComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/page-payment/payment-page.component').then((m) => m.PaymentPageComponent),
  },
  {
    path: 'checkout/success',
    loadComponent: () => import('./pages/page-payment/payment-page.component').then((m) => m.PaymentPageComponent),
  },
  {
    path: 'checkout/error',
    loadComponent: () => import('./pages/page-payment/payment-page.component').then((m) => m.PaymentPageComponent),
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
