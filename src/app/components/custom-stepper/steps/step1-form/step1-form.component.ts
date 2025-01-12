import { Component, Output, EventEmitter, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DirectionShippingInterface } from '../../../../../data/interfaces-model';
import { isPlatformBrowser } from '@angular/common';
import { FormStateService } from '../../../../../services/formstate.service';

@Component({
  selector: 'app-step1-form',
  templateUrl: './step1-form.component.html',
  styleUrls: ['./step1-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class Step1Form implements OnInit {
  customForm: FormGroup;
  submitted = false;

  @Output() formCompleted = new EventEmitter<DirectionShippingInterface | null>();

  constructor(
    private formBuilder: FormBuilder,
    private formStateService: FormStateService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
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
    if (isPlatformBrowser(this.platformId)) {
      const savedData = this.formStateService.getFormData();
      if (savedData) {
        this.customForm.patchValue(savedData);
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.customForm.valid) {
      this.formStateService.setFormData(this.customForm.value as DirectionShippingInterface);
      this.formCompleted.emit(this.customForm.value as DirectionShippingInterface);
    } else {
      this.formCompleted.emit(null);
    }
  }
}
