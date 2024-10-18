import { Component } from '@angular/core';
import {  productsData } from '../../../data/data';
import { CardComponent } from '../../components/cards/card/card.component';
import { CardsComponent } from '../../components/cards/cards.component';
import { DropdownComponent } from '../../components/custom-dropdown/custom-dropdown.component';
import { CustomDropdownMaterialComponent } from "../../components/custom-dropdown-material/custom-dropdown-material.component";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CardComponent, CardsComponent, DropdownComponent, CustomDropdownMaterialComponent,],
  templateUrl: './productos.component.html',
  styles: ``
})
export class ProductosComponent {
  products = productsData; // Asignar el array de productos al componente
}
