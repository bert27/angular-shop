import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDataInterface } from '../data/interfaces-model';
import { isPlatformBrowser } from '@angular/common';

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
  private lastPurchase: ProductCarritoInterface[] = [];

  private cantidadProductosSubject = new BehaviorSubject<number>(0);
  private openPopUpCart = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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

  addProduct(producto: ProductDataInterface, optionSelect: Option, cantidad = 1): void {
    const productoExistente = this.products.find((p) => p.title === producto.title && p.tipoSeleccionado.tipo === optionSelect.tipo);

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

  updateProductQuantity(producto: ProductCarritoInterface, nuevaCantidad: number): void {
    const productoExistente = this.products.find(
      (p) => p.title === producto.title && p.tipoSeleccionado.tipo === producto.tipoSeleccionado.tipo,
    );

    if (productoExistente) {
      productoExistente.cantidad = nuevaCantidad;
      this.persistChanges();
    }
  }

  removeProduct(productoAEliminar: ProductCarritoInterface): void {
    this.products = this.products.filter(
      (producto) =>
        producto.title !== productoAEliminar.title || producto.tipoSeleccionado.tipo !== productoAEliminar.tipoSeleccionado.tipo,
    );

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

  getTotalPriceValue(): string {
    const total = this.getTotalPrice();
    const formatter = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formatter.format(total);
  }

  getTotalQuantity(): number {
    return this.products.reduce((sum, producto) => sum + producto.cantidad, 0);
  }

  storeLastPurchase(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.lastPurchase = [...this.products];
      localStorage.setItem('lastPurchase', JSON.stringify(this.lastPurchase));
    }
  }

  getLastPurchase(): ProductCarritoInterface[] {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('lastPurchase');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }

  private loadFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const productosGuardados = localStorage.getItem('productosCarrito');
      if (productosGuardados) {
        this.products = JSON.parse(productosGuardados);
        this.updateTotalCantidad();
      }
    }
  }

  private saveToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('productosCarrito', JSON.stringify(this.products));
    }
  }

  removeProducts(): void {
    this.products = [];
    this.persistChanges();
  }

  private updateTotalCantidad(): void {
    const totalProductos = this.products.reduce((total, producto) => total + producto.cantidad, 0);
    this.cantidadProductosSubject.next(totalProductos);
  }

  private persistChanges(): void {
    this.saveToLocalStorage();
    this.updateTotalCantidad();
  }
}
