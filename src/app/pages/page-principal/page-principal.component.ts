import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestProductsComponent } from './components/best-products/best-products.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, BestProductsComponent, CarouselComponent],
  templateUrl: './page-principal.component.html',
  styleUrls: ['./page-principal.component.sass'],
})
export class PagePrincipalComponent {}
