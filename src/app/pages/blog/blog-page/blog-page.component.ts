import { Component } from '@angular/core';
import { CardsComponent } from '@components/cards/cards.component';
import { articlesBlog } from '@data/data';
import { setMetaTags } from '@data/seo';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css'],
})
export class BlogPageComponent {
  articles = articlesBlog;

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {}
  ngOnInit(): void {
    setMetaTags('blog', this.titleService, this.metaService);
  }
}
