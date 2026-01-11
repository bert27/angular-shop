import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { BotonComponent } from '../custom-button/custom-button.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CarritoService, ProductCarritoInterface } from '../../../services/carrito.service';
import { dataWeb } from '../../../data/data';
import { DirectionShippingInterface } from '../../../data/interfaces-model';

@Component({
  selector: 'app-redsys-credit-card',
  templateUrl: './redsys-credit-card.html',
  styleUrls: ['./redsys-credit-card.scss'],
  standalone: true,
  imports: [BotonComponent],
})
export class RedsysCreditCardComponent implements OnInit {
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
        .post<{
          url: string;
          body: {
            Ds_SignatureVersion: string;
            Ds_MerchantParameters: string;
            Ds_Signature: string;
          };
        }>(dataWeb.paymentIntentUrl, {
          shippingCost: dataWeb.shippingCost,
          directionShipping: this.directionShipping,
          productos: this.productos,
        })
        .toPromise();

      if (response?.url && response.body?.Ds_SignatureVersion && response.body?.Ds_MerchantParameters && response.body?.Ds_Signature) {
        console.log('Enviando a Redsys:', response);

        // Crear el formulario de pago
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = response.url;

        // Crear los inputs ocultos con los parámetros
        const signatureVersionInput = document.createElement('input');
        signatureVersionInput.type = 'hidden';
        signatureVersionInput.name = 'Ds_SignatureVersion';
        signatureVersionInput.value = response.body.Ds_SignatureVersion;
        form.appendChild(signatureVersionInput);

        const merchantParamsInput = document.createElement('input');
        merchantParamsInput.type = 'hidden';
        merchantParamsInput.name = 'Ds_MerchantParameters';
        merchantParamsInput.value = response.body.Ds_MerchantParameters;
        form.appendChild(merchantParamsInput);

        const signatureInput = document.createElement('input');
        signatureInput.type = 'hidden';
        signatureInput.name = 'Ds_Signature';
        signatureInput.value = response.body.Ds_Signature;
        form.appendChild(signatureInput);

        // Agregar formulario al body y enviarlo automáticamente
        document.body.appendChild(form);
        form.submit();
      } else {
        this.errorMessage = 'Error al procesar el pago en el servidor. Datos insuficientes.';
        this.errorOccurred.emit(this.errorMessage);
      }
    } catch (error) {
      console.error('Error creando el intento de pago:', error);
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
