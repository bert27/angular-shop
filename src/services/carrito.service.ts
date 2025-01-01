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
  updateProductQuantity(
    producto: ProductCarritoInterface,
    nuevaCantidad: number
  ) {
    const productoExistente = this.products.find(
      (p) =>
        p.title === producto.title &&
        p.tipoSeleccionado.tipo === producto.tipoSeleccionado.tipo
    );

    if (productoExistente) {
      productoExistente.cantidad = nuevaCantidad;
    }

    this.saveInLocalStorage();
    this.updateTotalCantidad();
  }

  public products: ProductCarritoInterface[] = [];
  private cantidadProductosSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.loadInLocalStorage();
  }

  addProduct(
    producto: ProductDataInterface,
    optionSelect: Option,
    cantidad = 1
  ) {

    const productoExistente = this.products.find(
      (p) =>
        p.title === producto.title &&
        p.tipoSeleccionado?.tipo === optionSelect?.tipo
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

    this.saveInLocalStorage(); // Guardar los productos actualizados

    // Actualizar la cantidad total de productos en el carrito
    this.updateTotalCantidad();
  }
  setEmptyCart(): void {
    this.products = [];
    this.saveInLocalStorage();
    this.updateTotalCantidad();
  }
  removeProduct(productoAEliminar: ProductCarritoInterface) {
    this.products = this.products.filter(
      (producto) =>
        producto.title !== productoAEliminar.title ||
        producto.tipoSeleccionado?.tipo !==
          productoAEliminar.tipoSeleccionado?.tipo
    );

    this.saveInLocalStorage();
    this.updateTotalCantidad();
  }

  getProducts(): ProductCarritoInterface[] {
    return this.products;
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
    const total = this.products.reduce((sum, producto) => {
      const price = producto.tipoSeleccionado?.price || 0;
      return sum + price * producto.cantidad;
    }, 0);

    const cantidad = this.products.reduce(
      (sum, producto) => sum + producto.cantidad,
      0
    );

    const totalFormatted =
      total % 1 === 0 ? total.toFixed(0) : total.toFixed(2);

    return `Subtotal (${cantidad} productos): ${totalFormatted} €`;
  }

  public loadInLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const productosGuardados = localStorage.getItem('productosCarrito');
      if (productosGuardados) {
        this.products = JSON.parse(productosGuardados);
        this.updateTotalCantidad();
      }
    }
  }

  private saveInLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('productosCarrito', JSON.stringify(this.products));
    }
  }

  private updateTotalCantidad() {
    const totalProductos = this.products.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );
    this.cantidadProductosSubject.next(totalProductos);
  }
}
