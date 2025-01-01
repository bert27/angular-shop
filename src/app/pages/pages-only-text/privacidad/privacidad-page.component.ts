import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { privacyPolicy } from '../../../../data/data';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacidad-page.component.html',
})
export class PrivacidadPageComponent {
  policySections = privacyPolicy;
}
