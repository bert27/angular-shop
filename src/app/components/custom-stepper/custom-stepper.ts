import { Component, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { BotonComponent } from '../custom-button/custom-button.component';
import { ShoppingCartListComponent } from '../shopping-cart-list/shopping-cart-list';
import { isPlatformBrowser } from '@angular/common';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { StripeFieldComponent } from '../stripe-credit-card/stripe-field.component';
import { MoneiCreditCardComponent } from '../monei-credit-card/monei-credit-card';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { dataWeb, selectedMethodPay } from '../../../data/data';
import { DirectionShippingInterface } from '../../../data/interfaces-model';
import { Step1Form } from './steps/step1-form/step1-form.component';
import { Step2DirectionComponent } from './steps/step2-direction/step2-direction';
import { FormStateService } from '../../../services/formstate.service';
import { RedsysCreditCardComponent } from '../redsys-credit-card/redsys-credit-card';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'custom-stepper',
  templateUrl: './custom-stepper.html',
  styleUrls: ['./custom-stepper.scss'],
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatIconModule,
    Step1Form,
    BotonComponent,
    ShoppingCartListComponent,
    StripeFieldComponent,
    MoneiCreditCardComponent,
    RedsysCreditCardComponent,
    Step2DirectionComponent
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StepperComponent implements AfterViewInit, OnInit {
  @ViewChild(MatStepper) stepper!: MatStepper;

  // Declarar el formulario principal
  customForm: FormGroup;

  // Variables generales del componente
  orderId: string | null = null;
  isErrorPage = false;
  totalPrice = 0;
  shippingCost = dataWeb.shippingCost;
  directionShipping: DirectionShippingInterface = {
    name: '',
    surname: '',
    address: '',
    postalCode: '',
    country: '',
    province: '',
    city: '',
    phone: '',
    email: '',
  };

  currentStepIcon = 'home';
  titleShop = dataWeb.nameShop;
  selectedMethodPay = selectedMethodPay;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private router: Router,
    private carritoService: CarritoService,
    private formStateService: FormStateService,
  ) {
    // Inicializar el formulario principal
    this.customForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,12}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Recuperar datos guardados en localStorage
    const savedDirection = this.formStateService.getFormData();
    if (savedDirection) {
      this.directionShipping = savedDirection;
      this.customForm.patchValue(savedDirection);
    }

    this.route.queryParamMap.subscribe((params) => {
      this.orderId = params.get('orderId');
      this.isErrorPage = this.router.url.includes('/checkout/error');
    });

    this.updateTotalPrice();
  }

  ngAfterViewInit(): void {
    if (this.orderId) {
      setTimeout(() => {
        this.goToInvoiceStep();
      });
    }
  }

  private goToInvoiceStep(): void {
    if (this.stepper) {
      this.stepper.next();
      this.stepper.next();
      this.carritoService.storeLastPurchase();
      this.carritoService.removeProducts();
    }
  }

  retryPayment(): void {
    this.router.navigate(['/checkout']);
  }

  async downloadInvoice(): Promise<void> {
    try {
      if (!this.orderId) {
        console.error('No hay orderId para generar la factura.');
        return;
      }

      const response = await fetch('http://localhost:4000/download-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceNumber: this.orderId,
          directionShipping: this.directionShipping,
          productos: this.carritoService.getLastPurchase(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al descargar la factura. Estado: ${response.status}`);
      }

      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition?.match(/filename="(.+)"/)?.[1] || `Factura_${this.orderId}.pdf`;

      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          if (value) {
            chunks.push(value);
          }
        }
      }

      if (isPlatformBrowser(this.platformId)) {
        const blob = new Blob(chunks, { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error al descargar la factura:', (error as Error).message);
      alert('Hubo un error al intentar descargar la factura. Por favor, inténtelo de nuevo.');
    }
  }

  //Not work

  private scrollToFirstInvalidControl(): void {
    const firstInvalidControlName = Object.keys(this.customForm.controls).find((key) => this.customForm.get(key)?.invalid);
    console.log('scroll', firstInvalidControlName);

    if (firstInvalidControlName) {
      const customInputElement = document.querySelector(`custom-input[controlName="${firstInvalidControlName}"]`) as HTMLElement;
      console.log('customInputElement', customInputElement);

      if (customInputElement) {
        const inputElement = customInputElement.querySelector('input') as HTMLElement;

        if (inputElement) {
          inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          inputElement.focus();
        }
      }
    }
  }

  onSubmit(): void {
    if (this.customForm.valid) {
      console.log('Formulario válido', this.customForm.value);
      this.formStateService.setFormData(this.customForm.value);
    } else {
      this.scrollToFirstInvalidControl(); // Agregar scroll al primer control inválido
    }
  }

  nextStep(): void {
    if (this.stepper) {
      const isStepValid = (() => {
        switch (this.stepper.selectedIndex) {
          case 0:
            this.onSubmit();
            return this.customForm.valid;
          case 1:
            return true;
          case 2:
            return true;
          default:
            return false;
        }
      })();

      if (isStepValid) {
        this.stepper.next();
        this.updateStepIcon(this.stepper.selectedIndex);
      }
    }
  }

  previousStep(): void {
    if (this.stepper) {
      this.stepper.previous();
      this.updateStepIcon(this.stepper.selectedIndex);
    }
  }

  onStepChange(event: { selectedIndex: number }): void {
    this.updateStepIcon(event.selectedIndex);
    this.updateTotalPrice();
  }

  updateStepIcon(stepIndex: number): void {
    const icons = ['home', 'credit_card', 'receipt'];
    this.currentStepIcon = icons[stepIndex] || 'home';
  }

  updateTotalPrice(): void {
    this.totalPrice = this.carritoService.getTotalPrice();
  }
  onFormCompleted(formData: DirectionShippingInterface | null): void {
    if (formData) {
      this.directionShipping = formData;
    } else {
      console.error('Error en el formulario');
    }
  }
}
