import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormComponent } from '../../components/forms/custom-form/custom-form.component';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../../components/custom-stepper/custom-stepper';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass'],
  imports: [FormsModule, CustomFormComponent, CommonModule, StepperComponent],
})
export class PaymentPageComponent {
 
}
