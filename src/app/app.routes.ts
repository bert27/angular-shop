import { Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { PagePrincipalComponent } from './pages/page-principal/page-principal.component';
import { BlogPageComponent } from './pages/blog/blog-page/blog-page.component';
import { MetodoEnvioPageComponent } from './pages/metodo-envio/metodo-envio-page/metodo-envio-page.component';
import { PageContentProductComponent } from './pages/page-content-product/page-content-product.component';
import { PageContentArticleComponent } from './pages/page-content-article/page-content-article.component';
import { PageShoppingCartComponent } from './pages/page-shopping-cart/page-shopping-cart.component';
import { PaymentPageComponent } from './pages/page-payment/payment-page.component';

export const routes: Routes = [
  { path: '', component: PagePrincipalComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'metodo-envio', component: MetodoEnvioPageComponent },
  
  {
    path: 'producto/:title/:tipo', 
    component: PageContentProductComponent,
    data: { type: 'product' },
  },
  {
    path: 'articulo/:title', 
    component: PageContentArticleComponent,
    data: { type: 'article' },
  },
  
  { path: 'carrito', component: PageShoppingCartComponent }, 
  { path: 'checkout', component: PaymentPageComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' }, 
];
