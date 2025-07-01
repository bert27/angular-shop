import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from '../../custom-button/custom-button.component';
import { CarritoService } from '../../../../services/carrito.service';
import { ProductDataInterface, ArticleInterface } from '../../../../data/interfaces-model';
import { CustomDropdownMaterialComponent } from '../../custom-dropdown-material/custom-dropdown-material.component';
import { Router } from '@angular/router';
import { CustomQuantitySelectorComponent } from '../../custom-quantity-selector/custom-quantity-selector.component';
import { ImageComponent } from '../../image/image';

@Component({
  selector: 'custom-card',
  standalone: true,
  imports: [CommonModule, BotonComponent, CustomDropdownMaterialComponent, CustomQuantitySelectorComponent, ImageComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  onQuantityChange(newQuantity: number): void {}
  @Input() cardData!: ProductDataInterface | ArticleInterface;
  selectedOption!: { tipo: string; price: number };
  quantity = 1;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.isArticle(this.cardData) && this.cardData.options.length > 0) {
      this.selectedOption = this.cardData.options[0];
    }
  }

  addShoppingBasket(productSelect: ProductDataInterface, optionSelect: { tipo: string; price: number }, quantity: number) {
    this.carritoService.addProduct(productSelect, optionSelect, quantity);
  }

  isArticle(data: ProductDataInterface | ArticleInterface): data is ArticleInterface {
    return (data as ArticleInterface).textContent !== undefined;
  }

  handleAddToCart() {
    if (!this.isArticle(this.cardData)) {
      this.addShoppingBasket(this.cardData, this.selectedOption, this.quantity);
      this.carritoService.openCartView();
    }
  }

  navigateToProduct(cardData: ProductDataInterface | ArticleInterface, selectedOption: { tipo: string; price: number } | undefined) {
    const productName = cardData.title.toLowerCase().replace(/\s+/g, '-');
    if (this.isArticle(cardData)) {
      const route = `/articulo/${productName}`;
      this.router.navigate([route]);
    } else {
      let route = '';

      if (cardData.category) {
        const categoryLower = cardData.category.toLowerCase().replace(/\s+/g, '-');
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
    if (!this.isArticle(this.cardData)) {
      return this.selectedOption.price;
    }
    return 0;
  }
}
