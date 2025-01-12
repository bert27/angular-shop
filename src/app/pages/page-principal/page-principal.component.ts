import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestProductsComponent } from './components/best-products/best-products.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { Title, Meta } from '@angular/platform-browser';
import { setMetaTags } from '../../../data/seo';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, BestProductsComponent, CarouselComponent],
  templateUrl: './page-principal.component.html',
  styleUrls: ['./page-principal.component.sass'],
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
