import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  CarritoService,
  ProductCarritoInterface,
} from '../../../services/carrito.service';
import { IconSvgComponent } from '../../components/icon-svg/icon-svg.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BotonComponent } from '../custom-button/custom-button.component';
import { CustomQuantitySelectorComponent } from '../custom-quantity-selector/custom-quantity-selector.component';

@Component({
  selector: 'custom-shopping-cart-list',
  standalone: true,
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.sass'],
  imports: [
    IconSvgComponent,
    CommonModule,
    BotonComponent,
    CustomQuantitySelectorComponent,
  ],
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

  updateCantidad(producto: ProductCarritoInterface, nuevaCantidad: number) {
    if (nuevaCantidad < 1) {
      nuevaCantidad = 1; // Evita cantidades menores a 1
    }
    this.carritoService.updateProductQuantity(producto, nuevaCantidad);
    this.productos = this.carritoService.getProducts();
  }

  removeProduct(producto: ProductCarritoInterface) {
    this.carritoService.removeProduct(producto);
    this.productos = this.carritoService.getProducts();
  }

  getTotalPrice(): string {
    return this.carritoService.getTotalPriceWithQuantity();
  }

  async sendOrder() {
    this.nextStep.emit();
  }
}
