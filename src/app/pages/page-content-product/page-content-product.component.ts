import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataInterface } from '../../../data/interfaces-model';
import { BotonComponent } from '../../components/custom-button/custom-button.component';
import { CarritoService } from '../../../services/carrito.service';
import { CustomQuantitySelectorComponent } from '../../components/custom-quantity-selector/custom-quantity-selector.component'; // Import necesario
import { productsData } from '../../../data/products-data';

@Component({
  selector: 'app-page-content-product',
  standalone: true,
  templateUrl: './page-content-product.component.html',
  styleUrls: ['./page-content-product.component.sass'],
  imports: [BotonComponent, CustomQuantitySelectorComponent], 
})
export class PageContentProductComponent {
  productData: ProductDataInterface | null = null;
  typeProduct: string | null = null;
  quantity = 1; 

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private carritoService: CarritoService
  ) {
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
            this.productData = foundProduct;
          } else {
            this.router.navigate(['/']);
          }
        }
      }
    });
  }

  getPrice(): number | undefined {
    return this.productData?.options.find(
      (option) => option.tipo === this.typeProduct
    )?.price;
  }

  addShoppingBasket(): void {
    if (this.productData) {
      const selectedOption = this.productData.options.find(
        (option) => option.tipo === this.typeProduct
      );
      if (selectedOption) {
        this.carritoService.addProduct(
          this.productData,
          selectedOption,
          this.quantity // Pasar la cantidad seleccionada
        );
      }
    }
  }

  onQuantityChange(newQuantity: number): void {
    this.quantity = newQuantity < 1 ? 1 : newQuantity; // Asegura que no sea menor a 1
  }

  buyNow(): void {
    if (this.productData) {
      const selectedOption = this.productData.options.find(
        (option) => option.tipo === this.typeProduct
      );
      if (selectedOption) {
        this.carritoService.addProduct(
          this.productData,
          selectedOption,
          this.quantity // Asegura que la cantidad seleccionada se añada
        );
      }
      this.router.navigate(['/carrito']); // Redirige al carrito después de añadir los productos
    }
  }
}
