import { Component } from '@angular/core';
import { CardsComponent } from '@components/cards/cards.component';


import { productsData } from '@data/products-data';
import { Meta, Title } from '@angular/platform-browser';
import { setMetaTags } from '@data/seo';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.css'],
})
export class ProductosComponent {
  products = productsData;
  categories: string[] = [];
  selectedCategory = '';

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.initializeCategories();
  }
  ngOnInit(): void {
    setMetaTags('productos', this.titleService, this.metaService);
  }
  initializeCategories(): void {
    const uniqueCategories = new Set(this.products.map((product) => product.category));
    this.categories = Array.from(uniqueCategories);
    this.selectedCategory = this.categories[0];
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredProducts() {
    return this.products.filter((product) => product.category === this.selectedCategory);
  }
}
