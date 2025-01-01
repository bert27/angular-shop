import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { purchaseTerms } from '../../../../data/data';

@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminos-page.component.html',
})
export class TerminosPageComponent {
  terms = purchaseTerms;
}
