import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StepperComponent } from '@components/custom-stepper/custom-stepper';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass'],
  imports: [FormsModule, StepperComponent],
})
export class PaymentPageComponent {
  orderId: string | null = null;
}
