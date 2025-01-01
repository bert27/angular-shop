import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestProductsComponent } from './components/best-products/best-products.component';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, BestProductsComponent, HomeCarouselComponent],
  templateUrl: './page-principal.component.html',
  styleUrls: ['./page-principal.component.sass'],
})
export class PagePrincipalComponent {}
