import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleInterface } from '../../../data/interfaces-moddel';
import { articlesBlog } from '../../../data/data';
import { BotonComponent } from '../../components/boton/boton.component';

@Component({
  selector: 'app-page-content-article',
  standalone: true,
  templateUrl: './page-content-article.component.html',
  styleUrls: ['./page-content-article.component.sass'],
  imports: [BotonComponent],
})
export class PageContentArticleComponent {
  articleData: ArticleInterface | null = null; // Usar ArticleInterface directamente

  constructor(public  route: ActivatedRoute, public  router: Router) {
    this.route.paramMap.subscribe((params) => {
      const title = params.get('title')?.replace(/-/g, ' '); // Reemplaza los guiones por espacios

      // Verificar si title no es undefined
      if (!title) {
        // Redirigir a la página principal si title es undefined
        this.router.navigate(['/']);
        return;
      }

      // Buscar en la lista de artículos
      const foundArticle = articlesBlog.find(
        (article: ArticleInterface) =>
          article.title.toLowerCase() === title.toLowerCase()
      );

      if (foundArticle) {
        this.articleData = foundArticle; // Asignar directamente el artículo encontrado
      } else {
        // Redirigir a la página principal si no se encuentra el artículo
        this.router.navigate(['/']);
      }
    });
  }
}
