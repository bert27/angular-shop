import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ProductDataInterface, ArticleInterface } from '../../../data/interfaces-model';

@Component({
  selector: 'custom-cards',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass'],
})
export class CardsComponent {
  @Input() items: (ProductDataInterface | ArticleInterface)[] = []; // Cambié el nombre a items y ahora acepta ambos tipos
}
