import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
} from '@angular/core';
import { IconSvgComponent } from '../icon-svg/icon-svg.component';
import { Router, RouterModule } from '@angular/router'; // Asegúrate de importar Router
import { ShoppingCartPopupComponent } from '../shopping-cart-popup/shopping-cart-popup.component';
import { CarritoService } from '../../../services/carrito.service';
import { Subscription } from 'rxjs';
import { dataWeb } from '../../../data/data';

@Component({
  selector: 'app-head',
  standalone: true,
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.sass'],
  imports: [IconSvgComponent, RouterModule, ShoppingCartPopupComponent],
})
export class HeadComponent implements OnInit, OnDestroy {
  @ViewChild(ShoppingCartPopupComponent)
  shoppingCartPopup!: ShoppingCartPopupComponent; // Referencia al componente
  cantidadProductos = 0;
  private subscription: Subscription | undefined;
  logoSrc: string = dataWeb.logo.pc;

  constructor(private carritoService: CarritoService, public router: Router) {} // Inyección del Router

  ngOnInit() {
    // Escucha los cambios en el carrito
    this.subscription = this.carritoService
      .getProductCount()
      .subscribe((count) => {
        this.cantidadProductos = count;
      });

    // Inicializa el logo según el tamaño de la pantalla
    this.updateLogo();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateLogo();
  }

  private updateLogo() {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 768;
      this.logoSrc = isMobile ? dataWeb.logo.mobile : dataWeb.logo.pc;
    }
  }

  navigateToInicio() {
    this.router.navigate(['/']);
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
