import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarritoService, ProductCarritoInterface } from '@services/carrito.service';

import { Router } from '@angular/router';
import { BotonComponent } from '@components/custom-button/custom-button.component';
import { ItemShoppingCartComponent } from './item-shopping-cart/item-shopping-cart.component';

@Component({
  selector: 'custom-shopping-cart-list',
  standalone: true,
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss'],
  imports: [BotonComponent, ItemShoppingCartComponent],
})
export class ShoppingCartListComponent {
  @Input() productos: ProductCarritoInterface[] = [];
  @Output() remove = new EventEmitter<ProductCarritoInterface>();
  @Output() nextStep = new EventEmitter<void>();

  constructor(
    private carritoService: CarritoService,
    public router: Router,
  ) {
    this.productos = this.carritoService.getProducts();
  }

  onUpdateCantidad(producto: ProductCarritoInterface, nuevaCantidad: number) {
    if (nuevaCantidad < 1) {
      nuevaCantidad = 1;
    }
    this.carritoService.updateProductQuantity(producto, nuevaCantidad);
    this.productos = this.carritoService.getProducts();
  }

  onRemoveProduct(producto: ProductCarritoInterface) {
    this.carritoService.removeProduct(producto);
    this.productos = this.carritoService.getProducts();
  }
  get totalQuantity(): number {
    return this.carritoService.getTotalQuantity();
  }

  get totalPriceValue(): string {
    return this.carritoService.getTotalPriceValue();
  }
  async sendOrder() {
    this.nextStep.emit();
  }
}
