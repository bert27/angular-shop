import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDataInterface } from '../data/interfaces-moddel';
interface Option {
  tipo: string;
  price: number;
}
export interface ProductCarritoInterface extends ProductDataInterface {
  cantidad: number; // Propiedad para la cantidad
  tipoSeleccionado: Option; // Propiedad para la opción seleccionada
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  public productos: ProductCarritoInterface[] = []; // Cambia a ProductCarritoInterface
  private cantidadProductosSubject = new BehaviorSubject<number>(0); // Inicializa con 0

  agregarProducto(producto: ProductDataInterface, optionSelect: Option) {
    // Verifica si el producto ya existe en el carrito
    const productoExistente = this.productos.find(
      (p) =>
        p.title === producto.title &&
        p.tipoSeleccionado?.tipo === optionSelect?.tipo
    ); // Ajusta la comparación según lo que consideres único

    if (productoExistente) {
      // Si el producto ya existe, aumentar su cantidad
      productoExistente.cantidad += 1; // Aumenta la cantidad
    } else {
      // Si no existe, agregarlo a la lista
      const nuevoProducto: ProductCarritoInterface = {
        ...producto,
        cantidad: 1,
        tipoSeleccionado: optionSelect, // Guarda la opción seleccionada
      };
      this.productos.push(nuevoProducto);
    }

    this.cantidadProductosSubject.next(this.productos.length); // Actualiza la cantidad total
  }
  // Método para eliminar producto
  eliminarProducto(productoAEliminar: ProductCarritoInterface) {
    // Filtrar el producto a eliminar
    this.productos = this.productos.filter(
      (producto) =>
        producto.title !== productoAEliminar.title ||
        producto.tipoSeleccionado?.tipo !==
          productoAEliminar.tipoSeleccionado?.tipo
    );

    // Actualiza la cantidad de productos
    this.cantidadProductosSubject.next(this.productos.length);
  }
  getProductos(): ProductCarritoInterface[] {
    return this.productos; // Devuelve la lista de productos en el carrito
  }

  obtenerCantidadProductos() {
    return this.cantidadProductosSubject.asObservable(); // Devuelve un observable
  }
}
