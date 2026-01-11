
import { Component } from '@angular/core';
import { refundPolicy } from '@data/data';

@Component({
  selector: 'app-reembolso',
  standalone: true,
  imports: [],
  templateUrl: './reembolso-page.component.html',
})
export class ReembolsosPageComponent {
  policy = refundPolicy;
}
