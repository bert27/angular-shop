import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { BotonComponent } from '../custom-button/custom-button.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CarritoService, ProductCarritoInterface } from '../../../services/carrito.service';
import { dataWeb } from '../../../data/data';
import { DirectionShippingInterface } from '../../../data/interfaces-model';

@Component({
  selector: 'app-monei-credit-card',
  templateUrl: './monei-credit-card.html',
  styleUrls: ['./monei-credit-card.scss'],
  standalone: true,
  imports: [BotonComponent],
})
export class MoneiCreditCardComponent implements OnInit {
  @Input() directionShipping!: DirectionShippingInterface;

  @Output() errorOccurred = new EventEmitter<string>();
  @Output() previousStep = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();

  productos: ProductCarritoInterface[] = [];
  public errorMessage: string | null = null;
  public isLoading = false;

  constructor(
    private carritoService: CarritoService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.productos = this.carritoService.getProducts();
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;

    try {
      const response = await this.http
        .post<{ redirectUrl: string }>(dataWeb.paymentIntentUrl, {
          shippingCost: dataWeb.shippingCost,
          directionShipping: this.directionShipping,
          productos: this.productos,
        })
        .toPromise();

      if (response?.redirectUrl) {
        window.location.href = response.redirectUrl;
      } else {
        this.errorMessage = 'Error al procesar el pago en el servidor.';
        this.errorOccurred.emit(this.errorMessage);
      }
    } catch (error) {
      console.error('Error en la solicitud al servidor:', error);

      if (error instanceof HttpErrorResponse && error.error?.error) {
        this.errorMessage = error.error.error;
      } else {
        this.errorMessage = 'Error en la comunicación con el servidor.';
      }

      this.errorOccurred.emit(this.errorMessage ?? 'Error desconocido.');
    } finally {
      this.isLoading = false;
    }
  }

  goToPreviousStep(): void {
    this.previousStep.emit();
  }

  goToNextStep(): void {
    this.nextStep.emit();
  }
}
