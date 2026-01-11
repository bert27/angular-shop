import { Component } from '@angular/core';
import { shippingPageData } from '@data/data';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-metodo-envio-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './metodo-envio-page.component.html',
  styleUrl: './metodo-envio-page.component.css',
})
export class MetodoEnvioPageComponent {
  data = shippingPageData;
}
