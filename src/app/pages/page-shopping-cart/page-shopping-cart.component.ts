import { Component } from '@angular/core';
import {
  CarritoService,
  ProductCarritoInterface,
} from '../../../services/carrito.service';
import { CommonModule } from '@angular/common';
import { BotonComponent } from '../../components/boton/boton.component';
import { IconSvgComponent } from '../../components/icon-svg/icon-svg.component';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-page-shopping-cart',
  standalone: true,
  templateUrl: './page-shopping-cart.component.html',
  styleUrls: ['./page-shopping-cart.component.sass'],
  imports: [CommonModule, BotonComponent, IconSvgComponent],
})
export class PageShoppingCartComponent {
  productos: ProductCarritoInterface[] = []; // Inicializa la propiedad productos

  constructor(private carritoService: CarritoService, public router: Router) {
    this.productos = this.carritoService.getProductos(); // Obtiene los productos
  }

  removeProduct(producto: ProductCarritoInterface) {
    this.carritoService.removeProduct(producto);
    this.productos = this.carritoService.getProductos(); // Actualiza la lista de productos
  }

  getTotalPrice(): string {
    return this.carritoService.getTotalPriceWithQuantity(); // Llama al método del servicio
  }

  // Método para navegar a la página de pago
  goToPayment() {
    this.router.navigate(['/checkout']); 
  }
}
