import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleInterface } from '@data/interfaces-model';
import { articlesBlog } from '@data/data';
import { BotonComponent } from '@components/custom-button/custom-button.component';

@Component({
  selector: 'app-page-content-article',
  standalone: true,
  templateUrl: './page-content-article.component.html',
  styleUrls: ['./page-content-article.component.css'],
  imports: [BotonComponent],
})
export class PageContentArticleComponent implements OnInit {
  @Input() article: ArticleInterface | null = null; // Bound from Resolver
  articleData: ArticleInterface | null = null;

  constructor(public router: Router) {}

  ngOnInit(): void {
    if (this.article) {
      this.articleData = this.article;
    } else {
      this.router.navigate(['/']);
    }
  }
  goBack(): void {
    // Scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    this.router.navigate(['/blog']).then(() => {
      // Ensure scroll is at top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 0);
    });
  }
}
