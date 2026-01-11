import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleInterface } from '@data/interfaces-model';
import { articlesBlog } from '@data/data';
import { BotonComponent } from '@components/custom-button/custom-button.component';

@Component({
  selector: 'app-page-content-article',
  standalone: true,
  templateUrl: './page-content-article.component.html',
  styleUrls: ['./page-content-article.component.scss'],
  imports: [BotonComponent],
})
export class PageContentArticleComponent {
  articleData: ArticleInterface | null = null;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.route.paramMap.subscribe((params) => {
      const title = params.get('title')?.replace(/-/g, ' ');
      if (!title) {
        this.router.navigate(['/']);
        return;
      }

      const foundArticle = articlesBlog.find((article: ArticleInterface) => article.title.toLowerCase() === title.toLowerCase());

      if (foundArticle) {
        this.articleData = foundArticle;
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
