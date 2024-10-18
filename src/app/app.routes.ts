import { Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { PagePrincipalComponent } from './pages/page-principal/page-principal.component';
import { BlogPageComponent } from './pages/blog/blog-page/blog-page.component';
import { MetodoEnvioPageComponent } from './pages/metodo-envio/metodo-envio-page/metodo-envio-page.component';
import { PageContentProductComponent } from './pages/page-content-product/page-content-product.component';

export const routes: Routes = [
  { path: '', component: PagePrincipalComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'metodo-envio', component: MetodoEnvioPageComponent },
  
  // Rutas dinámicas para productos y artículos
  {
    path: 'producto/:title', // Ruta para los productos
    component: PageContentProductComponent,
    data: { type: 'product' },
  },
  {
    path: 'articulo/:title', // Ruta para los artículos
    component: PageContentProductComponent,
    data: { type: 'article' },
  },
  
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirige a la página principal si la ruta no coincide
];
