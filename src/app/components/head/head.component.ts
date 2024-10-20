import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IconSvgComponent } from '../icon-svg/icon-svg.component';
import { Router, RouterModule } from '@angular/router'; // Asegúrate de importar Router
import { BotonComponent } from '../boton/boton.component';
import { ShoppingCartPopupComponent } from '../shopping-cart-popup/shopping-cart-popup.component';
import { CarritoService } from '../../../services/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-head',
  standalone: true,
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.sass'],
  imports: [
    IconSvgComponent,
    RouterModule,
    BotonComponent,
    ShoppingCartPopupComponent,
  ],
})
export class HeadComponent implements OnInit, OnDestroy {
  @ViewChild(ShoppingCartPopupComponent)
  shoppingCartPopup!: ShoppingCartPopupComponent; // Referencia al componente
  cantidadProductos: number = 0;
  private subscription: Subscription | undefined;
  constructor(private carritoService: CarritoService, public router: Router) {} // Inyección del Router

  ngOnInit() {
    this.subscription = this.carritoService
      .getProductCount()
      .subscribe((count) => {
        console.log('Cantidad de productos:', count) // Añade esta línea
        this.cantidadProductos = count;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openCarritoView() {
    if (this.shoppingCartPopup) {
      this.shoppingCartPopup.openCarrito();
    }
  }

  startAutoClose() {
    if (this.shoppingCartPopup) {
      this.shoppingCartPopup.startAutoClose();
    }
  }

  navigateToCarrito() {
    this.router.navigate(['/carrito']); // Método para navegar al carrito
  }
}
