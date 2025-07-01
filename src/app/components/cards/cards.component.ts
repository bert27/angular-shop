import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ProductDataInterface, ArticleInterface } from '../../../data/interfaces-model';

@Component({
  selector: 'custom-cards',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() items: (ProductDataInterface | ArticleInterface)[] = [];
}
