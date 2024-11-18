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
    this.loadInLocalStorage(); // Cargar productos de localStorage al inicializar
  }

  addProduct(
    producto: ProductDataInterface,
    optionSelect: Option,
    cantidad: number = 1 // Añadimos cantidad como parámetro opcional, por defecto 1
  ) {
    console.log('Añadiendo producto:', producto);

    const productoExistente = this.products.find(
      (p) =>
        p.title === producto.title &&
        p.tipoSeleccionado?.tipo === optionSelect?.tipo
    );

    if (productoExistente) {
      // Si el producto ya está en el carrito, sumamos la cantidad
      productoExistente.cantidad += cantidad;
    } else {
      // Si es un nuevo producto, lo añadimos con la cantidad especificada
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

  removeProduct(productoAEliminar: ProductCarritoInterface) {
    this.products = this.products.filter(
      (producto) =>
        producto.title !== productoAEliminar.title ||
        producto.tipoSeleccionado?.tipo !==
          productoAEliminar.tipoSeleccionado?.tipo
    );

    this.saveInLocalStorage(); // Guardar los productos actualizados
    this.updateTotalCantidad();
  }

  getProductos(): ProductCarritoInterface[] {
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

  const totalFormatted = total % 1 === 0 ? total.toFixed(0) : total.toFixed(2);

  return `Subtotal (${cantidad} productos): ${totalFormatted} €`;
}


  public loadInLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const productosGuardados = localStorage.getItem('productosCarrito');
      if (productosGuardados) {
        this.products = JSON.parse(productosGuardados);
        this.updateTotalCantidad(); // Actualiza la cantidad
      }
    }
  }

  private saveInLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('productosCarrito', JSON.stringify(this.products));
    }
  }

  private updateTotalCantidad() {
    // Calcula la cantidad total de productos en el carrito
    const totalProductos = this.products.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );
    this.cantidadProductosSubject.next(totalProductos); // Actualiza el BehaviorSubject
  }
}
