import { Component } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { CommonModule } from '@angular/common';
import { BotonComponent } from '../../components/custom-button/custom-button.component';
import { productsData } from '../../../data/products-data';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CardsComponent, CommonModule, BotonComponent],
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.scss'],
})
export class ProductosComponent {
  products = productsData;
  categories: string[] = [];
  selectedCategory = '';

  constructor() {
    this.initializeCategories();
  }

  initializeCategories(): void {
    const uniqueCategories = new Set(
      this.products.map((product) => product.category)
    );
    this.categories = Array.from(uniqueCategories);
    this.selectedCategory = this.categories[0];
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredProducts() {
    return this.products.filter(
      (product) => product.category === this.selectedCategory
    );
  }
}
