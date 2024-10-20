import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonComponent } from '../../boton/boton.component';
import { CarritoService } from '../../../../services/carrito.service';
import {
  ProductDataInterface,
  ArticleInterface,
} from '../../../../data/interfaces-moddel';
import { CustomDropdownMaterialComponent } from '../../custom-dropdown-material/custom-dropdown-material.component';
import { Router } from '@angular/router';

@Component({
  selector: 'custom-card',
  standalone: true,
  imports: [CommonModule, BotonComponent, CustomDropdownMaterialComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  @Input() cardData!: ProductDataInterface | ArticleInterface;
  selectedOption!: { tipo: string; price: number }; // Cambia a un objeto para incluir tipo y precio

  constructor(private carritoService: CarritoService, private router: Router) {} // Inyecta Router aquí

  ngOnInit() {
    // Inicializa selectedOption con la primera opción disponible
    if (!this.isArticle(this.cardData) && this.cardData.options.length > 0) {
      this.selectedOption = this.cardData.options[0];
    }
  }

  addShoppingBasket(
    productSelect: ProductDataInterface,
    optionSelect: { tipo: string; price: number }
  ) {
    this.carritoService.addProduct(productSelect, optionSelect);
  }

  isArticle(
    data: ProductDataInterface | ArticleInterface
  ): data is ArticleInterface {
    return (data as ArticleInterface).textContent !== undefined; // Cambiado a 'textContent'
  }

  handleAddToCart() {
    if (!this.isArticle(this.cardData)) {
      console.log("añadiendo")
      this.addShoppingBasket(this.cardData, this.selectedOption);
    }
  }

  navigateToProduct(
    cardData: ProductDataInterface | ArticleInterface,
    selectedOption: { tipo: string; price: number } | undefined // Permite que sea undefined
  ) {
    const productName = cardData.title.toLowerCase().replace(/\s+/g, '-'); // Convierte el nombre a una URL amigable
    const routePrefix = this.isArticle(cardData) ? 'articulo' : 'producto'; // Determina si es un artículo o un producto
  
    let route = `/${routePrefix}/${productName}`; // Ruta base
  
    // Solo añade el tipo si es un producto y selectedOption está definido
    if (!this.isArticle(cardData) && selectedOption) {
      route += `/${selectedOption.tipo}`; // Agrega el tipo para productos
    }
  
    this.router.navigate([route]); // Redirige a la ruta adecuada
  }

  get selectedPrice(): number {
    if (!this.isArticle(this.cardData)) {
      return this.selectedOption.price; // Devuelve el precio de la opción seleccionada
    }
    return 0; // Para artículos, puedes devolver 0 o un valor que tenga sentido
  }
}
