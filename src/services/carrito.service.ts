import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDataInterface } from '../data/interfaces-moddel';

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
  public products: ProductCarritoInterface[] = [];
  private cantidadProductosSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.loadInLocalStorage(); // Cargar productos de localStorage al inicializar
  }

  addProduct(producto: ProductDataInterface, optionSelect: Option) {
    console.log('agregando producto', producto);
    const productoExistente = this.products.find(
      (p) =>
        p.title === producto.title &&
        p.tipoSeleccionado?.tipo === optionSelect?.tipo
    );

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      const nuevoProducto: ProductCarritoInterface = {
        ...producto,
        cantidad: 1,
        tipoSeleccionado: optionSelect,
      };
      this.products.push(nuevoProducto);
    }

    this.saveInLocalStorage(); // Guardar los productos actualizados
    this.cantidadProductosSubject.next(this.products.length);
  }

  removeProduct(productoAEliminar: ProductCarritoInterface) {
    this.products = this.products.filter(
      (producto) =>
        producto.title !== productoAEliminar.title ||
        producto.tipoSeleccionado?.tipo !==
          productoAEliminar.tipoSeleccionado?.tipo
    );

    this.saveInLocalStorage(); // Guardar los productos actualizados
    this.cantidadProductosSubject.next(this.products.length);
  }

  getProductos(): ProductCarritoInterface[] {
    return this.products;
  }

  getProductCount() {
    console.log('get productg count');
    return this.cantidadProductosSubject.asObservable();
  }

  private saveInLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      // Verifica si localStorage está definido
      localStorage.setItem('productosCarrito', JSON.stringify(this.products));
    }
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

    return `Subtotal (${cantidad} productos): ${total.toFixed(2)} €`;
  }

  public loadInLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      // Verifica si localStorage está definido
      const productosGuardados = localStorage.getItem('productosCarrito');
      if (productosGuardados) {
        this.products = JSON.parse(productosGuardados);
        this.cantidadProductosSubject.next(this.products.length); // Actualiza la cantidad
      }
    }
  }
}
