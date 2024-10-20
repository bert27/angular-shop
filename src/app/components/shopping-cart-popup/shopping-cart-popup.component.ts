import { Component } from '@angular/core';
import {
  CarritoService,
  ProductCarritoInterface,
} from '../../../services/carrito.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IconSvgComponent } from '../icon-svg/icon-svg.component';
import { BotonComponent } from '../boton/boton.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart-popup',
  standalone: true,
  imports: [IconSvgComponent, BotonComponent, CommonModule],
  templateUrl: './shopping-cart-popup.component.html',
  styleUrl: './shopping-cart-popup.component.sass',
})
export class ShoppingCartPopupComponent {
  carritoAbierto: boolean = false;
  cantidadProductos: number = 0;
  public productos: ProductCarritoInterface[] = [];
  private autoCloseTimeout: any;
  private cantidadSubscription: Subscription = new Subscription();

  constructor(public router: Router, public carritoService: CarritoService) {
    this.router = router; // Puedes asignar el router al constructor
  }

  resetAutoClose() {
    clearTimeout(this.autoCloseTimeout);
  }
  ngOnInit() {
    this.productos = this.carritoService.getProductos();
    this.cantidadProductos = this.calcularCantidadTotal();
    this.cantidadSubscription = this.carritoService
      .getProductCount()
      .subscribe(() => {
        this.cantidadProductos = this.calcularCantidadTotal();
      });
  }

  private calcularCantidadTotal(): number {
    return this.carritoService.products.reduce((total, producto) => {
      return total + producto.cantidad;
    }, 0);
  }

  openCarrito() {
    this.carritoAbierto = true;
    clearTimeout(this.autoCloseTimeout);
  }



  closeCarritoView() {
    this.carritoAbierto = false;
    clearTimeout(this.autoCloseTimeout);
  }

  startAutoClose() {
    if (this.carritoAbierto) {
      this.autoCloseTimeout = setTimeout(() => {
        this.closeCarritoView();
      }, 3000);
    }
  }

  getTotalPrice() {
    return this.carritoService.getTotalPriceWithQuantity(); 
  }

  removeProduct(producto: ProductCarritoInterface) {
    this.carritoService.removeProduct(producto);
    this.productos = this.carritoService.getProductos();
  }

  navigateToBlog() {
    this.router.navigate(['/blog']);
  }

  ngOnDestroy() {
    this.cantidadSubscription.unsubscribe();
    clearTimeout(this.autoCloseTimeout);
  }
}
