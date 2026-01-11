import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { CustomInputComponent } from '../../../custom-input/custom-input.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { DirectionShippingInterface } from '../../../../../data/interfaces-model';

export class SubmittedErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted);
  }
}

@Component({
  selector: 'app-step1-form',
  templateUrl: './step1-form.component.html',
  styleUrls: ['./step1-form.component.scss'],
  standalone: true,
  imports: [CustomInputComponent, MatButtonModule],
})
export class Step1Form {
  @Input() customForm!: FormGroup;
  @Output() formCompleted = new EventEmitter<DirectionShippingInterface | null>();

  matcher = new SubmittedErrorStateMatcher();

  constructor() {}

  getControl(controlName: string): FormControl {
    return this.customForm.get(controlName) as FormControl;
  }
}
