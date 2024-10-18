import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  CarritoService,
  ProductCarritoInterface,
} from '../../../services/carrito.service';
import { IconSvgComponent } from '../icon-svg/icon-svg.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BotonComponent } from '../boton/boton.component';
@Component({
  selector: 'app-head',
  standalone: true,
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.sass'],
  imports: [IconSvgComponent, RouterModule, CommonModule, BotonComponent],
})
export class HeadComponent implements OnInit, OnDestroy {
  carritoAbierto: boolean = false;
  cantidadProductos: number = 0;
  public productos: ProductCarritoInterface[] = [];
  private autoCloseTimeout: any;
  private cantidadSubscription: Subscription = new Subscription();

  constructor(private router: Router, public carritoService: CarritoService) {}
  ngOnInit() {
    this.productos = this.carritoService.getProductos();

    // Calcula la cantidad total de productos al inicializar el componente
    this.cantidadProductos = this.calcularCantidadTotal();

    // Suscripción a los cambios en la cantidad de productos en el carrito
    this.cantidadSubscription = this.carritoService
      .obtenerCantidadProductos()
      .subscribe(() => {
        this.cantidadProductos = this.calcularCantidadTotal();
      });
  }

  // Método para calcular la cantidad total de productos
  private calcularCantidadTotal(): number {
    return this.carritoService.productos.reduce((total, producto) => {
      return total + producto.cantidad;
    }, 0);
  }

  openCarritoView() {
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

  resetAutoClose() {
    clearTimeout(this.autoCloseTimeout);
  }

  calcularSubtotal(): number {
    const subtotal = this.carritoService.productos.reduce((total, producto) => {
      const precioPorTipo = producto.tipoSeleccionado?.price || 0;
      return total + precioPorTipo * producto.cantidad;
    }, 0);
    return parseFloat(subtotal.toFixed(2));
  }

  // Método para eliminar producto del carrito
  eliminarProducto(producto: ProductCarritoInterface) {
    this.carritoService.eliminarProducto(producto); // Llama al método del servicio
    this.productos = this.carritoService.getProductos(); // Actualiza la lista de productos
  }
  navigateToBlog() {
    this.router.navigate(['/blog']);
  }
  ngOnDestroy() {
    this.cantidadSubscription.unsubscribe();
    clearTimeout(this.autoCloseTimeout);
  }
}
