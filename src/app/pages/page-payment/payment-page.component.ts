import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../../components/custom-stepper/custom-stepper';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass'],
  imports: [FormsModule, CommonModule, StepperComponent],
})
export class PaymentPageComponent {
  orderId: string | null = null;
}
