import { Component, Input } from '@angular/core';

import { CardComponent } from './card/card.component';
import { ProductDataInterface, ArticleInterface } from '@data/interfaces-model';

@Component({
  selector: 'custom-cards',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  @Input() items: (ProductDataInterface | ArticleInterface)[] = [];
}
