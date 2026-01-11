import { Component, OnInit } from '@angular/core';

import { BestProductsComponent } from '@pages/page-principal/components/best-products/best-products.component';
import { CarouselComponent } from '@pages/page-principal/components/carousel/carousel.component';
import { Title, Meta } from '@angular/platform-browser';
import { setMetaTags } from '@data/seo';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [BestProductsComponent, CarouselComponent],
  templateUrl: './page-principal.component.html',
  styleUrls: ['./page-principal.component.css'],
})
export class PagePrincipalComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
    setMetaTags('', this.titleService, this.metaService);
  }
}
