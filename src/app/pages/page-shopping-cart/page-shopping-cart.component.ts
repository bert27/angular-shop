import { Component } from '@angular/core';

import { ShoppingCartListComponent } from '../../components/shopping-cart-list/shopping-cart-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-shopping-cart',
  standalone: true,
  templateUrl: './page-shopping-cart.component.html',
  styleUrls: ['./page-shopping-cart.component.scss'],
  imports: [ShoppingCartListComponent],
})
export class PageShoppingCartComponent {
  constructor(private router: Router) {}

  onCheckout() {
    this.router.navigate(['/checkout']);
  }
}
