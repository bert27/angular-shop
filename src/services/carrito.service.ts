import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDataInterface } from '../data/interfaces-model';

interface Option {
  tipo: string;
  price: number;
}

export interface ProductCarritoInterface extends ProductDataInterface {
  cantidad: number;
  tipoSeleccionado: Option;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private products: ProductCarritoInterface[] = [];
  private cantidadProductosSubject = new BehaviorSubject<number>(0);
  private openPopUpCart = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadFromLocalStorage();
  }

  openCartView(): void {
    this.openPopUpCart.next(true);
  }
  closeCartView(): void {
    this.openPopUpCart.next(false);
  }

  getCartOpen() {
    return this.openPopUpCart.asObservable();
  }

  addProduct(
    producto: ProductDataInterface,
    optionSelect: Option,
    cantidad = 1
  ): void {
    const productoExistente = this.products.find(
      (p) =>
        p.title === producto.title &&
        p.tipoSeleccionado.tipo === optionSelect.tipo
    );

    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      const nuevoProducto: ProductCarritoInterface = {
        ...producto,
        cantidad,
        tipoSeleccionado: optionSelect,
      };
      this.products.push(nuevoProducto);
    }

    this.persistChanges();
  }

  updateProductQuantity(
    producto: ProductCarritoInterface,
    nuevaCantidad: number
  ): void {
    const productoExistente = this.products.find(
      (p) =>
        p.title === producto.title &&
        p.tipoSeleccionado.tipo === producto.tipoSeleccionado.tipo
    );

    if (productoExistente) {
      productoExistente.cantidad = nuevaCantidad;
      this.persistChanges();
    }
  }

  removeProduct(productoAEliminar: ProductCarritoInterface): void {
    this.products = this.products.filter(
      (producto) =>
        producto.title !== productoAEliminar.title ||
        producto.tipoSeleccionado.tipo !==
          productoAEliminar.tipoSeleccionado.tipo
    );

    this.persistChanges();
  }

  clearCart(): void {
    this.products = [];
    this.persistChanges();
  }

  getProducts(): ProductCarritoInterface[] {
    return [...this.products];
  }

  getProductCount() {
    return this.cantidadProductosSubject.asObservable();
  }

  getTotalPrice(): number {
    return this.products.reduce((total, producto) => {
      const price = producto.tipoSeleccionado?.price || 0;
      return total + price * producto.cantidad;
    }, 0);
  }

  getTotalPriceWithQuantity(): string {
    const total = this.getTotalPrice();
    const cantidad = this.products.reduce(
      (sum, producto) => sum + producto.cantidad,
      0
    );

    const totalFormatted =
      total % 1 === 0 ? total.toFixed(0) : total.toFixed(2);

    return `Subtotal (${cantidad} productos): ${totalFormatted} €`;
  }

  private loadFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const productosGuardados = localStorage.getItem('productosCarrito');
      if (productosGuardados) {
        this.products = JSON.parse(productosGuardados);
        this.updateTotalCantidad();
      }
    }
  }

  private saveToLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('productosCarrito', JSON.stringify(this.products));
    }
  }
  removeProducts(): void {
    this.products = [];
    this.persistChanges();
  }

  private updateTotalCantidad(): void {
    const totalProductos = this.products.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );
    this.cantidadProductosSubject.next(totalProductos);
  }

  private persistChanges(): void {
    this.saveToLocalStorage();
    this.updateTotalCantidad();
  }
}
