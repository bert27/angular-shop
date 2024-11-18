import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CarritoService,
  ProductCarritoInterface,
} from '../../../services/carrito.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IconSvgComponent } from '../icon-svg/icon-svg.component';
import { BotonComponent } from '../boton/boton.component';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from "../custom-input/custom-input.component";

@Component({
  selector: 'app-shopping-cart-popup',
  standalone: true,
  imports: [IconSvgComponent, BotonComponent, CommonModule, CustomInputComponent],
  templateUrl: './shopping-cart-popup.component.html',
  styleUrls: ['./shopping-cart-popup.component.sass'],
})
export class ShoppingCartPopupComponent implements OnInit, OnDestroy {
  carritoAbierto = false;
  productos: ProductCarritoInterface[] = [];
  private autoCloseTimeout: any;
  private cantidadSubscription!: Subscription;

  constructor(public router: Router, public carritoService: CarritoService) {}

  ngOnInit() {
    this.actualizarProductos();
    this.cantidadSubscription = this.carritoService
      .getProductCount()
      .subscribe(() => this.actualizarProductos());
  }

  private actualizarProductos() {
    this.productos = this.carritoService.getProductos();
  }

  updateCantidad(producto: ProductCarritoInterface, nuevaCantidad: number) {
    if (nuevaCantidad < 1) {
      nuevaCantidad = 1; // Cantidad mínima permitida
    }
    this.carritoService.updateProductQuantity(producto, nuevaCantidad);
    this.actualizarProductos(); // Refresca la lista tras el cambio
  }

openCarrito() {
  if (this.router.url === '/carrito') {
    // Si ya estamos en la página del carrito, no abrimos el popup
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

  getTotalPrice(): string {
    return this.carritoService.getTotalPriceWithQuantity();
  }

  removeProduct(producto: ProductCarritoInterface) {
    this.carritoService.removeProduct(producto);
    this.actualizarProductos();
  }

navigateTo(route: string) {
  if (route === '/carrito') {
    this.carritoAbierto = false; // Cierra el popup
  }
  this.router.navigate([route]);
}


  ngOnDestroy() {
    this.cantidadSubscription.unsubscribe();
    this.resetAutoClose();
  }
}
