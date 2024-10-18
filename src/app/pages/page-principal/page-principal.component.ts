import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cardMultimediaData } from '../../../data/data';
import { CardComponent } from '../../components/cards/card/card.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, CardComponent], // Usamos directivas comunes de Angular
  templateUrl: './page-principal.component.html',
  styleUrls: ['./page-principal.component.sass'],
})
export class PagePrincipalComponent {
  title = 'mi-programa';
  title2 = 'mi-programa2';
  cardMultimediaData = cardMultimediaData;
  contador: number = 0;


}
