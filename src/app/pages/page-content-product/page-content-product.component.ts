import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataInterface } from '@data/interfaces-model';
import { BotonComponent } from '@components/custom-button/custom-button.component';
import { CarritoService } from '@services/carrito.service';
import { CustomQuantitySelectorComponent } from '@components/custom-quantity-selector/custom-quantity-selector.component';
import { CustomDropdownComponent } from '@components/custom-dropdown/custom-dropdown.component';

@Component({
  selector: 'app-page-content-product',
  standalone: true,
  templateUrl: './page-content-product.component.html',
  styleUrls: ['./page-content-product.component.css'],
  imports: [BotonComponent, CustomQuantitySelectorComponent, CustomDropdownComponent],
})
export class PageContentProductComponent implements OnInit {
  @Input() product: ProductDataInterface | null = null; // Bound from Resolver
  productData: ProductDataInterface | null = null;
  typeProduct: string | null = null;
  quantity = 1;
  selectedOption: { tipo: string; price: number } | null = null;

  constructor(
    public router: Router,
    private carritoService: CarritoService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { tipo?: string; quantity?: number };

    if (state?.tipo) {
      this.typeProduct = state.tipo;
    }

    if (typeof state?.quantity === 'number' && state.quantity > 0) {
      this.quantity = state.quantity;
    }
  }

  ngOnInit(): void {
    if (this.product) {
      this.productData = this.product;

      if (this.typeProduct) {
        const foundOption = this.productData.options.find((option) => option.tipo === this.typeProduct);
        this.selectedOption = foundOption || null;
      }

      if (!this.selectedOption && this.productData.options.length > 0) {
        this.selectedOption = this.productData.options[0];
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  getPrice(): number | undefined {
    return this.selectedOption?.price;
  }

  addShoppingBasket(): void {
    if (this.productData && this.selectedOption) {
      this.carritoService.addProduct(this.productData, this.selectedOption, this.quantity);
      this.carritoService.openCartView();
    }
  }

  onQuantityChange(newQuantity: number): void {
    this.quantity = newQuantity < 1 ? 1 : newQuantity;
  }

  buyNow(): void {
    if (this.productData && this.selectedOption) {
      this.carritoService.addProduct(this.productData, this.selectedOption, this.quantity);
    }
    this.router.navigate(['/carrito']);
  }
}
