import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarritoService, ProductCarritoInterface } from '../../../services/carrito.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IconSvgComponent } from '../icon-svg/icon-svg.component';
import { BotonComponent } from '../custom-button/custom-button.component';

import { CustomInputNumberComponent } from '../custom-input-number/custom-input-number.component';

@Component({
  selector: 'app-shopping-cart-popup',
  standalone: true,
  imports: [IconSvgComponent, BotonComponent, CustomInputNumberComponent],
  templateUrl: './shopping-cart-popup.component.html',
  styleUrls: ['./shopping-cart-popup.component.sass'],
})
export class ShoppingCartPopupComponent implements OnInit, OnDestroy {
  carritoAbierto = false;
  productos: ProductCarritoInterface[] = [];
  private autoCloseTimeout: any;
  private cantidadSubscription!: Subscription;

  constructor(
    public router: Router,
    public carritoService: CarritoService,
  ) {}

  ngOnInit() {
    this.updateProducts();
    this.cantidadSubscription = this.carritoService.getProductCount().subscribe(() => this.updateProducts());
  }

  private updateProducts() {
    this.productos = this.carritoService.getProducts();
  }

  updateCantidad(producto: ProductCarritoInterface, nuevaCantidad: number) {
    if (nuevaCantidad < 1) {
      nuevaCantidad = 1;
    }
    this.carritoService.updateProductQuantity(producto, nuevaCantidad);
    this.updateProducts();
  }

  openCarrito() {
    if (this.router.url === '/carrito' || this.router.url === '/checkout') {
      return;
    }
    this.carritoAbierto = true;
    this.resetAutoClose();
  }
  closeCarritoView() {
    this.carritoAbierto = false;
    this.resetAutoClose();
  }

  startAutoClose() {
    if (this.carritoAbierto) {
      this.autoCloseTimeout = setTimeout(() => this.closeCarritoView(), 3000);
    }
  }

  resetAutoClose() {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }
  }

  get totalQuantity(): number {
    return this.carritoService.getTotalQuantity();
  }

  get totalPriceValue(): string {
    return this.carritoService.getTotalPriceValue();
  }

  removeProduct(producto: ProductCarritoInterface) {
    this.carritoService.removeProduct(producto);
    this.updateProducts();
  }

  navigateTo(route: string) {
    if (route === '/carrito') {
      this.carritoAbierto = false;
    }
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    this.cantidadSubscription.unsubscribe();
    this.resetAutoClose();
  }
}
