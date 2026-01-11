import { Component, Input } from '@angular/core';

import { BotonComponent } from '@components/custom-button/custom-button.component';
import { CarritoService } from '@services/carrito.service';
import { ProductDataInterface, ArticleInterface } from '@data/interfaces-model';
import { CustomDropdownComponent } from '@components/custom-dropdown/custom-dropdown.component';
import { Router } from '@angular/router';
import { CustomQuantitySelectorComponent } from '@components/custom-quantity-selector/custom-quantity-selector.component';
import { ImageComponent } from '@components/image/image';
import { slugify } from '@utils';

@Component({
  selector: 'custom-card',
  standalone: true,
  imports: [BotonComponent, CustomDropdownComponent, CustomQuantitySelectorComponent, ImageComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  private _cardData!: ProductDataInterface | ArticleInterface;

  @Input()
  set cardData(value: ProductDataInterface | ArticleInterface) {
    this._cardData = value;
    if (!this.isArticle(value) && value.options && value.options.length > 0) {
      this.selectedOption = value.options[0];
    }
  }

  get cardData(): ProductDataInterface | ArticleInterface {
    return this._cardData;
  }

  selectedOption!: { tipo: string; price: number };
  quantity = 1;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
  ) {}

  onQuantityChange(newQuantity: number): void {
    this.quantity = newQuantity;
  }

  addShoppingBasket(productSelect: ProductDataInterface, optionSelect: { tipo: string; price: number }, quantity: number) {
    this.carritoService.addProduct(productSelect, optionSelect, quantity);
  }

  isArticle(data: ProductDataInterface | ArticleInterface): data is ArticleInterface {
    return (data as ArticleInterface).textContent !== undefined;
  }

  handleAddToCart() {
    if (!this.isArticle(this.cardData)) {
      if (!this.selectedOption || this.quantity < 1) return;
      this.addShoppingBasket(this.cardData, this.selectedOption, this.quantity);
      this.carritoService.openCartView();
    }
  }

  navigateToProduct(cardData: ProductDataInterface | ArticleInterface, selectedOption: { tipo: string; price: number } | undefined) {
    const productName = slugify(cardData.title);
    if (this.isArticle(cardData)) {
      const route = `/articulo/${productName}`;
      this.router.navigate([route]);
    } else {
      let route = '';

      if (cardData.category) {
        const categoryLower = slugify(cardData.category);
        route = `/producto/${categoryLower}/${productName}`;
      } else {
        route = `/producto/${productName}`;
      }

      if (selectedOption?.tipo) {
        // Pasamos "tipo" como parte del estado, sin que aparezca en la URL
        this.router.navigate([route], {
          state: { tipo: selectedOption.tipo, quantity: this.quantity },
        });
      } else {
        this.router.navigate([route]);
      }
    }
  }

  get selectedPrice(): number {
    if (!this.isArticle(this.cardData) && this.selectedOption) {
      return this.selectedOption.price;
    }
    return 0;
  }
}
