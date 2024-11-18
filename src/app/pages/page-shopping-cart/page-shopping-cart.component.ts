import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from '../../components/boton/boton.component';
import { IconSvgComponent } from '../../components/icon-svg/icon-svg.component';
import { ShoppingCartListComponent } from '../../components/shopping-cart-list/shopping-cart-list';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-page-shopping-cart',
  standalone: true,
  templateUrl: './page-shopping-cart.component.html',
  styleUrls: ['./page-shopping-cart.component.sass'],
  imports: [
    CommonModule,
    BotonComponent,
    IconSvgComponent,
    ShoppingCartListComponent,
  ],
})
export class PageShoppingCartComponent {
  constructor(private router: Router) {} // Inyecta Router en el constructor

  onCheckout() {
    this.router.navigate(['/checkout']);
  }
}
