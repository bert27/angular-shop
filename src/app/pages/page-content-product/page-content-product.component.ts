import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ArticleInterface,
  ProductDataInterface,
} from '../../../data/interfaces-moddel';
import { articlesBlog, productsData } from '../../../data/data';
import { BotonComponent } from '../../components/boton/boton.component';

@Component({
  selector: 'app-page-content-product',
  standalone: true,
  templateUrl: './page-content-product.component.html',
  styleUrls: ['./page-content-product.component.sass'],
  imports: [BotonComponent],
})
export class PageContentProductComponent {
  productData: {
    title: string;
    imageUrl: string;
    description: string | undefined;
  } | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      const title = params.get('title')?.replace(/-/g, ' '); // Reemplaza los guiones por espacios
      const type = this.route.snapshot.data['type']; // Recupera el tipo (product o article) de la propiedad data

      console.log('title', title, type);
      if (title && type) {
        if (type === 'product') {
          // Buscar en la lista de productos
          const foundProduct = productsData.find(
            (product: ProductDataInterface) =>
              product.title.toLowerCase() === title.toLowerCase()
          );
          console.log('foundProduct', foundProduct);
          if (foundProduct) {
            this.productData = {
              title: foundProduct.title,
              imageUrl: foundProduct.imageUrl,
              description: foundProduct.description,
            };
          } else {
            // Redirigir a la página principal si no se encuentra el producto
            this.router.navigate(['/']);
          }
        } else if (type === 'article') {
          // Buscar en la lista de artículos
          const foundArticle = articlesBlog.find(
            (article: ArticleInterface) =>
              article.title.toLowerCase() === title.toLowerCase()
          );
          if (foundArticle) {
            this.productData = {
              title: foundArticle.title,
              imageUrl: foundArticle.imageUrl,
              description: foundArticle.bodyTitle,
            };
          } else {
            // Redirigir a la página principal si no se encuentra el artículo
            this.router.navigate(['/']);
          }
        }
      }
    });
  }
}
