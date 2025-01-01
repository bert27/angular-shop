import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { refundPolicy } from '../../../../data/data';

@Component({
  selector: 'app-reembolso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reembolso-page.component.html',
})
export class ReembolsosPageComponent {
  policy = refundPolicy;
}
