import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CustomQuantitySelectorComponent } from '../../custom-quantity-selector/custom-quantity-selector.component';
import { ProductCarritoInterface } from '../../../../services/carrito.service';

@Component({
  selector: 'item-shopping-cart',
  standalone: true,
  templateUrl: './item-shopping-cart.component.html',
  styleUrls: ['./item-shopping-cart.component.scss'],
  imports: [CustomQuantitySelectorComponent],
})
export class ItemShoppingCartComponent {
  @Input() producto!: ProductCarritoInterface;
  @Output() remove = new EventEmitter<ProductCarritoInterface>();
  @Output() updateCantidad = new EventEmitter<{ producto: ProductCarritoInterface; nuevaCantidad: number }>();

  /**
   * Emits the event to remove the product.
   */
  onRemove() {
    this.remove.emit(this.producto);
  }

  /**
   * Emits the event to update the quantity.
   * @param nuevaCantidad New selected quantity.
   */
  onCantidadChange(nuevaCantidad: number) {
    this.updateCantidad.emit({ producto: this.producto, nuevaCantidad });
  }

  /**
   * Formats a number with thousand separators and up to two decimal places.
   * @param price The price to format.
   * @returns Formatted price as a string.
   */
  getPriceQuantity(price: number): string {
    const formatter = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
    return formatter.format(price);
  }
}
