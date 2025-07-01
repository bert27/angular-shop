import { Routes } from '@angular/router';
import { ProductosComponent } from './pages/page-products/page-products.component';
import { PagePrincipalComponent } from './pages/page-principal/page-principal.component';
import { BlogPageComponent } from './pages/blog/blog-page/blog-page.component';
import { MetodoEnvioPageComponent } from './pages/pages-only-text/metodo-envio-page/metodo-envio-page.component';
import { PageContentProductComponent } from './pages/page-content-product/page-content-product.component';
import { PageContentArticleComponent } from './pages/page-content-article/page-content-article.component';
import { PageShoppingCartComponent } from './pages/page-shopping-cart/page-shopping-cart.component';
import { PaymentPageComponent } from './pages/page-payment/payment-page.component';
import { AvisoLegalPageComponent } from './pages/pages-only-text/aviso-legal/aviso-legal-page.component';
import { ReembolsosPageComponent } from './pages/pages-only-text/reembolso/reembolso-page.component';
import { PrivacidadPageComponent } from './pages/pages-only-text/privacidad/privacidad-page.component';
import { TerminosPageComponent } from './pages/pages-only-text/terminos/terminos-page.component';

export const routes: Routes = [
  { path: '', component: PagePrincipalComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'metodo-envio', component: MetodoEnvioPageComponent },

  {
    path: 'producto/:category/:title',
    component: PageContentProductComponent,
    data: { type: 'product' },
  },
  {
    path: 'producto/:title',
    component: PageContentProductComponent,
    data: { type: 'product' },
  },
  {
    path: 'articulo/:title',
    component: PageContentArticleComponent,
    data: { type: 'article' },
  },

  { path: 'avisoLegal', component: AvisoLegalPageComponent },
  { path: 'devolucionesyReembolso', component: ReembolsosPageComponent },
  { path: 'privacidad', component: PrivacidadPageComponent },
  { path: 'terminosyCondiciones', component: TerminosPageComponent },

  { path: 'carrito', component: PageShoppingCartComponent },
  { path: 'checkout', component: PaymentPageComponent },
  { path: 'checkout/success', component: PaymentPageComponent },
  { path: 'checkout/error', component: PaymentPageComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
