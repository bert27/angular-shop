import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  CarritoService,
  ProductCarritoInterface,
} from '../../../services/carrito.service';
import { IconSvgComponent } from '../../components/icon-svg/icon-svg.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BotonComponent } from '../boton/boton.component';
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

  constructor(private carritoService: CarritoService, public router: Router) {
    this.productos = this.carritoService.getProductos();
  }

  updateCantidad(producto: ProductCarritoInterface, nuevaCantidad: number) {
    if (nuevaCantidad < 1) {
      nuevaCantidad = 1; // Evita cantidades menores a 1
    }
    this.carritoService.updateProductQuantity(producto, nuevaCantidad);
    this.productos = this.carritoService.getProductos(); // Actualiza la lista tras el cambio
  }

  removeProduct(producto: ProductCarritoInterface) {
    this.carritoService.removeProduct(producto);
    this.productos = this.carritoService.getProductos();
  }

  getTotalPrice(): string {
    return this.carritoService.getTotalPriceWithQuantity();
  }
}
