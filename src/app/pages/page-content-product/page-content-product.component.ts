import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataInterface } from '../../../data/interfaces-moddel';
import { productsData } from '../../../data/data';
import { BotonComponent } from '../../components/boton/boton.component';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-page-content-product',
  standalone: true,
  templateUrl: './page-content-product.component.html',
  styleUrls: ['./page-content-product.component.sass'],
  imports: [BotonComponent],
})
export class PageContentProductComponent {
  productData: ProductDataInterface | null = null;
  typeProduct: string | null = null;


  constructor(private route: ActivatedRoute, public router: Router,private carritoService: CarritoService) {
    this.route.paramMap.subscribe((params) => {
      const title = params.get('title')?.replace(/-/g, ' ');
      this.typeProduct = params.get('tipo');
      const type = this.route.snapshot.data['type'];

      if (title && type) {
        if (type === 'product') {
          const foundProduct = productsData.find(
            (product: ProductDataInterface) =>
              product.title.toLowerCase() === title.toLowerCase()
          );

          if (foundProduct) {
            this.productData = foundProduct; // Asignación directa sin necesidad de crear un nuevo objeto
          } else {
            this.router.navigate(['/']);
          }
        }
      }
    });
  }

  getPrice(): number | undefined {
    return this.productData?.options.find(option => option.tipo === this.typeProduct)?.price;
  }

  addShoppingBasket(): void { // Eliminar parámetros de entrada
    if (this.productData) {
      const selectedOption = this.productData.options.find(option => option.tipo === this.typeProduct);
      if (selectedOption) {
        this.carritoService.addProduct(this.productData, selectedOption); // Pasar los datos correctos al servicio
      }
    }
  }
}
