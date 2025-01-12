import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { shippingMethodText } from '../../../../data/data';

@Component({
  selector: 'app-metodo-envio-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metodo-envio-page.component.html',
  //   styleUrl: './metodo-envio-page.component.sass',
})
export class MetodoEnvioPageComponent {
  paragraphs = shippingMethodText;
}
