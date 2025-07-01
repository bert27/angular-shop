import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataInterface } from '../../../data/interfaces-model';
import { BotonComponent } from '../../components/custom-button/custom-button.component';
import { CarritoService } from '../../../services/carrito.service';
import { CustomQuantitySelectorComponent } from '../../components/custom-quantity-selector/custom-quantity-selector.component';
import { productsData } from '../../../data/products-data';
import { CustomDropdownMaterialComponent } from '../../components/custom-dropdown-material/custom-dropdown-material.component';

@Component({
  selector: 'app-page-content-product',
  standalone: true,
  templateUrl: './page-content-product.component.html',
  styleUrls: ['./page-content-product.component.scss'],
  imports: [BotonComponent, CustomQuantitySelectorComponent, CustomDropdownMaterialComponent],
})
export class PageContentProductComponent {
  productData: ProductDataInterface | null = null;
  typeProduct: string | null = null;
  quantity = 1;
  selectedOption: { tipo: string; price: number } | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private carritoService: CarritoService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { tipo?: string; quantity?: number };

    if (state?.tipo) {
      this.typeProduct = state.tipo;
    }

    if (typeof state?.quantity === 'number' && state.quantity > 0) {
      this.quantity = state.quantity;
    }

    this.route.paramMap.subscribe((params) => {
      const title = params.get('title')?.replace(/-/g, ' ');
      const type = this.route.snapshot.data['type'];

      if (title && type === 'product') {
        const foundProduct = productsData.find((product: ProductDataInterface) => product.title.toLowerCase() === title.toLowerCase());

        if (foundProduct) {
          this.productData = foundProduct;

          if (this.typeProduct) {
            const foundOption = foundProduct.options.find((option) => option.tipo === this.typeProduct);
            this.selectedOption = foundOption || null;
          }

          if (!this.selectedOption && foundProduct.options.length > 0) {
            this.selectedOption = foundProduct.options[0];
          }
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }

  getPrice(): number | undefined {
    return this.selectedOption?.price;
    // return (this.selectedOption?.price ?? 1) * this.quantity;
  }

  addShoppingBasket(): void {
    if (this.productData && this.selectedOption) {
      this.carritoService.addProduct(this.productData, this.selectedOption, this.quantity);
      this.carritoService.openCartView();
    }
  }

  onQuantityChange(newQuantity: number): void {
    this.quantity = newQuantity < 1 ? 1 : newQuantity;
  }

  buyNow(): void {
    if (this.productData && this.selectedOption) {
      this.carritoService.addProduct(this.productData, this.selectedOption, this.quantity);
    }
    this.router.navigate(['/carrito']);
  }
}
